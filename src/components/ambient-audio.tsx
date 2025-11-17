"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch {}
        audioRef.current = null;
      }
    };
  }, []);

  const start = async () => {
    if (enabled) return;
    if (!audioRef.current) {
      const a = new Audio("/audio/calm-ambient.mp3");
      a.loop = true;
      a.volume = 0.35;
      a.preload = "auto";
      a.addEventListener("playing", () => setEnabled(true));
      a.addEventListener("pause", () => setEnabled(false));
      a.addEventListener("ended", () => setEnabled(false));
      a.addEventListener("error", () => setEnabled(false));
      audioRef.current = a;
    }
    try {
      await audioRef.current!.play();
      setEnabled(true);
    } catch (e) {
      // Ignore; browser may block until a user gesture—button click triggers this so it should be fine
      setEnabled(false);
    }
  };

  const stop = () => {
    if (!enabled) return;
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch {}
    }
    setEnabled(false);
  };

  const toggle = () => {
    if (!enabled) start();
    else stop();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 items-center gap-2 rounded-full bg-white/5 px-3 text-sm text-foreground hover:bg-white/10 glow-strong"
      aria-label={enabled ? "Mute ambience" : "Play ambience"}
      aria-pressed={enabled}
      title={enabled ? "Mute ambience" : "Play ambience"}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="hidden sm:inline">{enabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
