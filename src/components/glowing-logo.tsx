"use client";

import { useEffect, useRef } from "react";

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, v };
}

export default function GlowingLogo({
  src = "/brand/kAItech_logo_small.png",
  size = 28,
  className = "",
  glow = "0 0 8px #00e2c3, 0 0 20px rgba(0,226,195,0.6), 0 0 42px rgba(0,217,255,0.35)",
}: {
  src?: string;
  size?: number;
  className?: string;
  glow?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = size;
      canvas.height = size;

      // Draw image scaled to square canvas
      const ratio = Math.min(size / img.width, size / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const dx = (size - w) / 2;
      const dy = (size - h) / 2;
      ctx.drawImage(img, dx, dy, w, h);

      const data = ctx.getImageData(0, 0, size, size);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i];
        const g = px[i + 1];
        const b = px[i + 2];
        const { h: hh, s, v } = rgbToHsv(r, g, b);
        const isTeal = (hh >= 160 && hh <= 190) && s > 0.35 && v > 0.35;
        if (!isTeal) {
          // Make background transparent
          px[i + 3] = 0;
        }
      }
      ctx.putImageData(data, 0, 0);
    };
  }, [src, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`${className}`}
      style={{ filter: `drop-shadow(${glow})` }}
      aria-label="kAItech logo"
    />
  );
}
