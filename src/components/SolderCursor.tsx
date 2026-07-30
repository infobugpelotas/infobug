"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; life: number };

export default function SolderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      const last = lastPointRef.current;
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (dx * dx + dy * dy < 100) return; // throttle by distance
      }
      sparksRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (sparksRef.current.length > 40) sparksRef.current.shift();
    };
    window.addEventListener("pointermove", handlePointerMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current.forEach((s) => {
        s.life -= 0.035;
        const radius = 2 + (1 - s.life) * 3;
        const alpha = Math.max(s.life, 0);
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 138, 0, ${alpha * 0.55})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 176, ${alpha * 0.5})`;
        ctx.fill();
      });
      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden sm:block"
    />
  );
}
