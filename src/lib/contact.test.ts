import { describe, expect, test, vi } from "vitest";
import { handleContact, ContactSchema } from "./contact";

function req(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("contact handler", () => {
  test("schema rejects a bad email", () => {
    expect(ContactSchema.safeParse({ name: "A", email: "nope", message: "hello!" }).success).toBe(false);
  });

  test("400 on invalid body", async () => {
    const sender = vi.fn();
    const res = await handleContact(req({ name: "", email: "x", message: "" }), sender);
    expect(res.status).toBe(400);
    expect(sender).not.toHaveBeenCalled();
  });

  test("200 on valid body, sender called once", async () => {
    const sender = vi.fn().mockResolvedValue({ ok: true });
    const res = await handleContact(
      req({ name: "Steven", email: "s@example.com", message: "Let's talk." }),
      sender,
    );
    expect(res.status).toBe(200);
    expect(sender).toHaveBeenCalledTimes(1);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  test("500 when the sender fails", async () => {
    const sender = vi.fn().mockResolvedValue({ ok: false, error: "boom" });
    const res = await handleContact(
      req({ name: "Steven", email: "s@example.com", message: "Let's talk." }),
      sender,
    );
    expect(res.status).toBe(500);
  });
});
