"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(4);
  const visibleRef = useRef(false);
  const readyRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    // Start when sticky enters, end when it leaves the viewport
    offset: ["start end", "end start"],
  });

  // RAF-driven easing loop for smoother scrubbing
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 4);
    const onCanPlay = () => {
      readyRef.current = true;
    };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("canplaythrough", onCanPlay);
    v.muted = true;
    v.pause();
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplaythrough", onCanPlay);
    };
  }, []);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      const v = videoRef.current;
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (v && duration > 0 && readyRef.current) {
        const target = Math.max(0, Math.min(duration, scrollYProgress.get() * duration));
        const cur = v.currentTime || 0;
        const diff = target - cur;
        // Lerp toward target with capped step to avoid heavy seeks
        const maxStep = Math.max(0.03, duration / 180); // dynamic cap ~ up to ~33ms
        const step = Math.abs(diff) < 0.0015 ? 0 : Math.max(-maxStep, Math.min(maxStep, diff * 0.6));
        if (step !== 0) {
          try {
            v.currentTime = cur + step;
          } catch {}
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[320vh] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold glow-text">Your journey into the AI world</h2>
          <p className="mt-1 text-sm text-muted">Scroll to travel through the wormhole and come back with new skills.</p>
        </div>
      </div>
      <div ref={stickyRef} className="sticky top-0 z-0 h-screen overflow-hidden">
        {/* Background gradients */}
        <motion.div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,226,195,0.12),transparent_60%)]" />
        {/* Stars */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_25%),radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.04),transparent_25%)]" />

        {/* Wormhole video scrubbing */}
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ willChange: "transform, contents", transform: "translateZ(0)" }}
          src="/media/AI_scrolling_GIF_better.mp4"
          playsInline
          muted
          preload="auto"
          disablePictureInPicture
        />

        {/* Return state */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.75, 1], [0, 1]) }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="glow-text text-lg font-semibold">Back with superpowers for everyday work</div>
        </motion.div>
      </div>
    </section>
  );
}
