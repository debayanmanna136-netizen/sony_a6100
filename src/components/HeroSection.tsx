"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  useEffect(() => {
    // Hero animations fire after 'appReady' event (dispatched by CinematicAnimation after load)
    const handleReady = () => {
      const gsap = (window as any).gsap;
      if (!gsap) return;
      gsap.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.to(".hero-title",   { opacity: 1, y: 0, duration: 1,   ease: "power3.out", delay: 0.3 });
      gsap.to(".hero-desc",    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 });
      gsap.to(".hero-cta-group", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 });
      gsap.to(".hero-visual",  { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.4 });
    };
    window.addEventListener("appReady", handleReady, { once: true });
    return () => window.removeEventListener("appReady", handleReady);
  }, []);

  return (
    <section id="overview" aria-label="Product overview">
      {/* Ambient blobs */}
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
      </div>

      <div className="container hero-grid">
        {/* Left: Text */}
        <div className="hero-text">
          <span className="font-label-caps hero-eyebrow section-eyebrow">
            Mirrorless Reinvented
          </span>
          <h1 className="font-display-lg hero-title">
            Precision,<br />Distilled.
          </h1>
          <p className="font-body-md hero-desc">
            The α6100 strips away the superfluous, leaving only absolute optical
            clarity and lightning-fast autofocus. A clinical tool for pure vision.
          </p>
          <div className="hero-cta-group">
            <button
              className="btn-primary"
              id="discover-btn"
              aria-label="Discover more about Sony α6100"
            >
              Discover More
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </button>
            <button
              className="btn-ghost"
              id="specs-btn"
              aria-label="View specifications"
            >
              View Specs
            </button>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual">
          <div className="hero-visual-gradient" aria-hidden="true" />
          <Image
            src="/images/hero_camera.png"
            alt="Sony α6100 mirrorless camera — front view, floating in a minimalist studio"
            className="hero-img soft-shadow"
            width={1200}
            height={900}
            priority
          />
          {/* Floating spec badges */}
          <div
            className="glass-panel hero-float-badge"
            aria-label="AF Speed: 0.02 seconds"
          >
            <span className="font-label-caps" style={{ color: "var(--on-surface-variant)" }}>
              AF Speed
            </span>
            <span className="font-headline-lg" style={{ color: "var(--primary)" }}>
              0.02s
            </span>
          </div>
          <div
            className="glass-panel hero-float-badge"
            aria-label="Sensor: 24.2 megapixels"
          >
            <span className="font-label-caps" style={{ color: "var(--on-surface-variant)" }}>
              Sensor
            </span>
            <span className="font-headline-lg" style={{ color: "var(--primary)" }}>
              24.2MP
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll to explore</span>
        <div className="scroll-hint-arrow" />
      </div>
    </section>
  );
}
