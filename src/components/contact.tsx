"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setOk(null);
    setErr(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "contact" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setOk("Thanks! We received your request. We'll get back within 1–2 business days.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong. You can also email us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Get in touch</h2>
          <span className="text-sm text-muted">We’ll reply within 1–2 business days</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
            <div className="grid gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-white/20"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-white/20"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your needs"
                rows={5}
                className="resize-none rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-white/20"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={submit}
                  disabled={loading}
                  className="btn-glow rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black disabled:opacity-60"
                >
                  {loading ? "Booking..." : "Book a Workshop"}
                </button>
                <a
                  className="text-sm text-muted underline hover:text-foreground"
                  href={`mailto:contact@example.com?subject=${encodeURIComponent("kAItech workshop inquiry")}`}
                >
                  or email us
                </a>
              </div>
              {ok && <div className="text-sm text-success">{ok}</div>}
              {err && <div className="text-sm text-error">{err}</div>}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 text-muted">
            Prefer a quick note? Email us directly at <a className="text-foreground underline" href="mailto:contact@example.com">contact@example.com</a> or follow us on socials.
          </div>
        </div>
      </div>
    </section>
  );
}
