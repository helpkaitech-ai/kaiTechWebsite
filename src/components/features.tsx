"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  PenLine,
  BarChart3,
  Bot,
  Image as ImageIcon,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Write faster",
    desc: "Draft emails, summaries, and reports in minutes.",
  },
  { icon: PenLine, title: "Prompt smarter", desc: "Turn ideas into precise prompts." },
  { icon: BarChart3, title: "Analyze data", desc: "Make sense of sheets and dashboards." },
  { icon: Bot, title: "Automate tasks", desc: "Build simple AI workflows without code." },
  { icon: ImageIcon, title: "Create content", desc: "Concept visuals, edits, and storyboards." },
  { icon: GraduationCap, title: "Learn with AI", desc: "Personalized study plans and tutors." },
  { icon: ShieldCheck, title: "Use safely", desc: "Privacy, reliability, and ethics basics." },
];

export default function Features() {
  return (
    <section className="py-20" id="learn">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">What you’ll learn</h2>
          <span className="text-sm text-muted">Practical skills you can use tomorrow</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur hover:border-white/20"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-primary">
                <it.icon size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{it.title}</h3>
              <p className="mt-1 text-sm text-muted">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
