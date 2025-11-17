"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Copy, Check, Sparkles } from "lucide-react";

const examples = [
  "Summarize a 10-page PDF to 5 bullets",
  "Draft a polite follow-up email",
  "Turn meeting notes into an action plan",
  "Create a 5-slide outline for a pitch",
];

function buildPrompt(opts: {
  task: string;
  role: string;
  audience: string;
  tone: string;
  length: string;
  format: string;
  constraints: string;
  example: string;
}) {
  const lines = [
    opts.role && `Role: ${opts.role}.`,
    `Task: ${opts.task}.`,
    opts.audience && `Audience: ${opts.audience}.`,
    opts.tone && `Tone: ${opts.tone}.`,
    opts.length && `Length: ${opts.length}.`,
    opts.format && `Output format: ${opts.format}.`,
    opts.constraints && `Constraints: ${opts.constraints}.`,
    opts.example && `Example: ${opts.example}.`,
    `Return: A concise, high-quality result. Ask 1 clarifying question if needed before answering.`,
  ].filter(Boolean);
  return lines.join("\n");
}

export default function Playground() {
  const [task, setTask] = useState("");
  const [role, setRole] = useState("Helpful AI assistant and writing coach");
  const [audience, setAudience] = useState("Busy professional with limited time");
  const [tone, setTone] = useState("Clear, plain language, no jargon");
  const [length, setLength] = useState("120–150 words");
  const [format, setFormat] = useState("Bulleted list with bold headers");
  const [constraints, setConstraints] = useState("Cite sources where appropriate; use India context where relevant");
  const [example, setExample] = useState("For instance: '3 steps to get started tomorrow.'");
  const [copied, setCopied] = useState(false);

  const score = useMemo(() => {
    let s = 0;
    if (task.trim().length > 3) s += 40;
    if (role) s += 10;
    if (audience) s += 10;
    if (tone) s += 10;
    if (length) s += 10;
    if (format) s += 10;
    if (constraints) s += 5;
    if (example) s += 5;
    return Math.min(100, s);
  }, [task, role, audience, tone, length, format, constraints, example]);

  const prompt = useMemo(() => buildPrompt({ task, role, audience, tone, length, format, constraints, example }), [task, role, audience, tone, length, format, constraints, example]);

  return (
    <section id="playground" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Interactive Prompt Playground</h2>
          <span className="text-sm text-muted">Build a great prompt with simple choices</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur">
            <div className="grid gap-3">
              <label className="text-sm text-muted">Your task</label>
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g., Summarize a 10-page PDF to 5 bullets"
                className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-white/20"
              />
              <div className="flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted hover:border-white/20 hover:text-foreground"
                    onClick={() => setTask(ex)}
                    type="button"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs text-muted">Role</label>
                <input value={role} onChange={(e) => setRole(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs text-muted">Audience</label>
                <input value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs text-muted">Tone</label>
                <input value={tone} onChange={(e) => setTone(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs text-muted">Length</label>
                <input value={length} onChange={(e) => setLength(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs text-muted">Output format</label>
                <input value={format} onChange={(e) => setFormat(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs text-muted">Constraints</label>
                <input value={constraints} onChange={(e) => setConstraints(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <label className="text-xs text-muted">Mini example</label>
                <input value={example} onChange={(e) => setExample(e.target.value)} className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/20" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Sparkles size={16} className="text-primary" /> Prompt quality score
              </div>
              <div className="text-sm text-muted">{score}%</div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-[linear-gradient(90deg,#00E2C3,#00D9FF)]"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="mt-5 grid gap-2">
              <label className="text-xs text-muted">Generated prompt</label>
              <textarea
                value={prompt}
                readOnly
                rows={10}
                className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
              />
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-black hover:opacity-90"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href="https://perplexity.ai" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm text-foreground hover:bg-white/5"
                >
                  <Wand2 size={16} /> Try in your favorite chat assistant
                </a>
              </div>
              <p className="mt-2 text-xs text-muted">Tip: Use role, constraints, and a tiny example to boost clarity. The model will do the rest.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
