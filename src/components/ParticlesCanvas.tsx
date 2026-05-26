"use client";
import { useEffect, useRef } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const NUM = 60;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.3 + 0.05,
    }));

    let heroVisible = true;
    const heroObserver = new IntersectionObserver(
      ([entry]) => { heroVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    const heroEl = document.getElementById("overview");
    if (heroEl) heroObserver.observe(heroEl);

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!heroVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        ctx.fill();
      });
    };

    // Only start after loader hides
    const startParticles = () => {
      canvas.style.opacity = "0.6";
      tick();
    };
    window.addEventListener("appReady", startParticles, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("appReady", startParticles);
      heroObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      aria-hidden="true"
    />
  );
}
