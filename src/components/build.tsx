"use client";

import { motion } from "framer-motion";

const deliverables = [
  { title: "Research brief", desc: "One-page, source-linked summary." },
  { title: "Social image", desc: "Share-ready visual for your post." },
  { title: "Short video clip", desc: "4–6s B‑roll to enhance content." },
  { title: "Voiceover", desc: "Natural-sounding MP3 narration." },
  { title: "Mini deck", desc: "5-slide executive summary." },
];

export default function Build() {
  return (
    <section className="py-20" id="build">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-semibold">What you’ll build in 60 minutes</h2>
          <span className="text-sm text-muted">Browser‑based • Works on macOS & Windows • Zero installs</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {deliverables.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted">{d.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(0,226,195,0.12),rgba(0,217,255,0.08))] p-6">
          <p className="text-sm text-muted">
            <span className="font-medium text-foreground">Example tool:</span> We’ll use <span className="text-foreground">Perplexity</span> to generate a one‑page research brief with inline sources and a concise executive summary.
          </p>
        </div>
      </div>
    </section>
  );
}
