"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40" id="top">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Gateway to learn and use AI</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl"
          >
            Learn, apply, and scale AI — for everyone.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-3xl text-lg text-muted"
          >
            Hands-on workshops that turn AI into practical results for your daily life and work — no technical background required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Book a Workshop
            </Link>
            <Link
              href="#workshops"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-white/5"
            >
              Explore Workshops
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
