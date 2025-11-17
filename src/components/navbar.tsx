"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import GlowingLogo from "@/components/glowing-logo";
import dynamic from "next/dynamic";

const Ambient = dynamic(() => import("@/components/ambient-audio"), { ssr: false });

const links = [
  { href: "#workshops", label: "Workshops" },
  { href: "#cases", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-transparent backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-2 sm:px-4">
            <Link href="#top" className="flex items-center gap-4">
              <GlowingLogo size={40} />
              <span className="glow-text text-lg sm:text-xl font-bold tracking-wide text-foreground">kAItech</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="glow-text text-sm text-foreground/90 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="btn-glow rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Book a Workshop
              </Link>
              <div className="pl-2">
                <Ambient />
              </div>
            </nav>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-surface/60 text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          {open && (
            <div className="grid gap-2 p-4 md:hidden">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-2 py-2 text-sm text-foreground/90 hover:bg-white/5 hover:text-foreground glow-text"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="btn-glow rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Book a Workshop
              </Link>
              <div className="pt-2">
                <Ambient />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
