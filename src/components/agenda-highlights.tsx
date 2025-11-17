"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agenda = [
  {
    t: "0–8 min",
    h: "Why adopt AI now",
    p: "Mindset and ROI—how faster first drafts create more iterations and better outcomes.",
  },
  {
    t: "8–18 min",
    h: "What tools exist",
    p: "The landscape by category and when to use which—focused on fit, privacy, and export needs.",
  },
  {
    t: "18–53 min",
    h: "Hands‑on build",
    p: "We create five assets end‑to‑end using browser tools: brief, image, video clip, voiceover, mini‑deck.",
  },
  {
    t: "53–60 min",
    h: "Q&A + next steps",
    p: "Prompt libraries, governance basics, and a 48‑hour action challenge.",
  },
];

type MediaItem =
  | { kind: "giphy"; id: string; alt: string; preview: string }
  | { kind: "pixabay"; page: string; alt: string; preview: string };

const gallery: MediaItem[] = [
  {
    kind: "giphy",
    id: "3oFzlVJAzNUDwvpcc0",
    alt: "Why adopt AI now",
    preview: "https://i.giphy.com/media/3oFzlVJAzNUDwvpcc0/giphy.webp",
  },
  {
    kind: "giphy",
    id: "Tz30dcgKE3GCTYpxol",
    alt: "Tool landscape & fit",
    preview: "https://i.giphy.com/media/Tz30dcgKE3GCTYpxol/giphy.webp",
  },
  {
    kind: "giphy",
    id: "YS57N6teaevJASvcMA",
    alt: "Hands‑on build",
    preview: "https://i.giphy.com/media/YS57N6teaevJASvcMA/giphy.webp",
  },
  {
    kind: "giphy",
    id: "CVtNe84hhYF9u",
    alt: "Q&A and next steps",
    preview: "https://i.giphy.com/media/CVtNe84hhYF9u/giphy.webp",
  },
];

export default function AgendaHighlights() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="py-14" id="agenda">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Agenda highlights</h2>
          <span className="text-sm text-muted">No installs • Mac & Windows friendly</span>
        </div>
        <div className="mt-2 grid gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <motion.button
                type="button"
                className={`group relative aspect-[3/2] w-full overflow-visible rounded-2xl border border-white/10 bg-surface/60 text-left transition-opacity ${hovered !== null && hovered !== i ? "opacity-35" : "opacity-100"}`}
              >
                {g.kind === "giphy" ? (
                  <video
                    src={`https://media.giphy.com/media/${(g as any).id}/giphy.mp4`}
                    poster={(g as any).preview}
                    className="h-full w-full rounded-2xl object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img src={(g as any).preview} alt={g.alt} className="h-full w-full rounded-2xl object-cover" />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-white/10 bg-surface/90 p-4 text-sm backdrop-blur"
                  >
                    <div className="font-semibold">{agenda[i].h}</div>
                    <div className="mt-1 text-muted">{agenda[i].p}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
