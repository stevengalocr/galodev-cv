"use client";

import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import type { Dict } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: Dict }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-text placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:bg-surface";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono-label mb-2 block">{dict.contact.name}</span>
          <input name="name" required maxLength={120} className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mono-label mb-2 block">{dict.contact.email}</span>
          <input name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="mono-label mb-2 block">{dict.contact.message}</span>
        <textarea name="message" required minLength={5} maxLength={5000} rows={6} className={cn(field, "resize-none")} />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {status === "sending" ? dict.cta.sending : dict.cta.sendMessage}
          <Send className="h-4 w-4" />
        </button>

        {status === "success" && (
          <span className="inline-flex items-center gap-2 text-sm text-accent" role="status">
            <Check className="h-4 w-4" /> {dict.contact.success}
          </span>
        )}
        {status === "error" && (
          <span className="inline-flex items-center gap-2 text-sm text-[#ff6b6b]" role="alert">
            <AlertCircle className="h-4 w-4" /> {dict.contact.error}
          </span>
        )}
      </div>
    </form>
  );
}
