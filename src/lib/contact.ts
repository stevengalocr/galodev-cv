import { NextResponse } from "next/server";
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(5).max(5000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Sends the contact email. Isolated + injectable so the route can be tested
 * without hitting Resend. Lazily imports resend so a missing key doesn't crash
 * the module at import time.
 */
export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    return { ok: false, error: "Email service not configured" };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "GaloDev Portfolio <onboarding@resend.dev>",
    to,
    replyTo: input.email,
    subject: `Nuevo mensaje de ${input.name}`,
    text: `De: ${input.name} <${input.email}>\n\n${input.message}`,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Core handler with an injectable sender (test seam). */
export async function handleContact(
  req: Request,
  sender: (input: ContactInput) => Promise<SendResult> = sendContactEmail,
): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }

  const result = await sender(parsed.data);
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
