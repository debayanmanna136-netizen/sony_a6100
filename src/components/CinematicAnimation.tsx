"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export default function CinematicAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Canvas resize ----
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current, canvas, ctx, framesRef.current);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // ---- Loader helpers ----
    const loaderEl = document.getElementById("loader");
    const loaderFill = document.getElementById("loader-fill") as HTMLDivElement | null;
    const loaderPct = document.getElementById("loader-pct");

    const updateLoader = (pct: number) => {
      const p = Math.min(100, Math.round(pct));
      if (loaderFill) loaderFill.style.width = p + "%";
      if (loaderPct) loaderPct.textContent = p + "%";
    };

    const hideLoader = () => {
      loaderEl?.classList.add("hidden");
      window.dispatchEvent(new Event("appReady"));
      initScrollAnimations(canvas, ctx, framesRef.current, currentFrameRef);
    };

    // ---- Frame preloader ----
    const frames = framesRef.current;
    let batchSize = 10;
    let i = 1;

    const loadNext = () => {
      if (i > TOTAL_FRAMES) return;
      const end = Math.min(i + batchSize - 1, TOTAL_FRAMES);
      let pending = end - i + 1;

      for (let n = i; n <= end; n++) {
        const img = new Image();
        const idx = n - 1;
        img.onload = img.onerror = function () {
          frames[idx] =
            img.complete && img.naturalWidth ? img : null;
          loadedCountRef.current++;
          const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
          updateLoader(pct);
          pending--;
          if (pending === 0) {
            if (loadedCountRef.current === TOTAL_FRAMES) {
              hideLoader();
            } else {
              loadNext();
            }
          }
          if (idx === 0 && frames[0]) {
            drawFrame(0, canvas, ctx, frames);
          }
        };
        img.src = FRAME_PATH(n);
      }
      i = end + 1;
    };
    loadNext();

    // Init chapter display
    const ch0 = document.getElementById("ch-0");
    const sc1 = document.getElementById("spec-callout-1");
    if (ch0) ch0.style.display = "block";
    if (sc1) { sc1.style.display = "block"; sc1.classList.add("visible"); }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section id="animation-section" aria-label="Camera disassembly animation">
      <div className="animation-pin-wrapper">
        <div className="animation-sticky">
          <div className="animation-glow" aria-hidden="true" />

          {/* The scroll-driven frame canvas */}
          <canvas
            ref={canvasRef}
            id="camera-canvas"
            aria-label="Scroll-driven Sony α6100 disassembly animation"
          />

          {/* Section fades */}
          <div className="section-fade-top" aria-hidden="true" />
          <div className="section-fade-bottom" aria-hidden="true" />

          {/* UI overlay */}
          <div className="animation-ui-overlay" aria-hidden="true">
            {/* Chapter 0 */}
            <div className="chapter-label top-left" id="ch-0" style={{ display: "none" }}>
              <div className="cl-eyebrow">Chapter I</div>
              <div className="cl-title">Whole.</div>
              <div className="cl-desc">
                The Sony α6100 — an engineering masterpiece held in the palm of your hand.
              </div>
            </div>

            {/* Chapter 1 */}
            <div className="chapter-label top-left" id="ch-1" style={{ display: "none" }}>
              <div className="cl-eyebrow">Chapter II</div>
              <div className="cl-title">Separation.</div>
              <div className="cl-desc">
                Each component engineered to nano-tolerances, revealing the optical pathway within.
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="chapter-label top-left" id="ch-2" style={{ display: "none" }}>
              <div className="cl-eyebrow">Chapter III</div>
              <div className="cl-title">Exposed.</div>
              <div className="cl-desc">
                Pure BIONZ X processing power, CMOS precision, and copper-layer sensor technology.
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="chapter-label top-left" id="ch-3" style={{ display: "none" }}>
              <div className="cl-eyebrow">Chapter IV</div>
              <div className="cl-title">Every Atom.</div>
              <div className="cl-desc">
                425 phase-detection points. Zero compromises. Total mastery of light.
              </div>
            </div>

            {/* Scroll progress */}
            <div
              className="scroll-progress-bar"
              role="progressbar"
              aria-label="Animation progress"
            >
              <div className="scroll-progress-track">
                <div className="scroll-progress-fill" id="anim-progress-fill" />
              </div>
              <div className="scroll-progress-pct" id="anim-progress-pct">0%</div>
            </div>

            {/* Spec callouts */}
            <div className="spec-callout sc-right" id="spec-callout-1" style={{ display: "none" }}>
              <div className="sc-inner glass-panel-dark">
                <div className="sc-key">Sensor Resolution</div>
                <div className="sc-val">24.2</div>
                <div className="sc-unit">Megapixels — APS-C CMOS</div>
              </div>
            </div>
            <div className="spec-callout sc-right" id="spec-callout-2" style={{ display: "none" }}>
              <div className="sc-inner glass-panel-dark">
                <div className="sc-key">Autofocus Points</div>
                <div className="sc-val">425</div>
                <div className="sc-unit">Phase-detection coverage</div>
              </div>
            </div>
            <div className="spec-callout sc-right" id="spec-callout-3" style={{ display: "none" }}>
              <div className="sc-inner glass-panel-dark">
                <div className="sc-key">ISO Range</div>
                <div className="sc-val">100–32000</div>
                <div className="sc-unit">Extended sensitivity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Standalone draw helper ----
function drawFrame(
  frameIndex: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frames: (HTMLImageElement | null)[]
) {
  const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
  const img = frames[idx];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}

// ---- GSAP ScrollTrigger animations ----
function initScrollAnimations(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frames: (HTMLImageElement | null)[],
  currentFrameRef: React.MutableRefObject<number>
) {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Nav dark/light
  ScrollTrigger.create({
    trigger: "#animation-section",
    start: "top 80px",
    end: "bottom 80px",
    onEnter: () => document.getElementById("main-nav")?.classList.add("dark-mode"),
    onLeave: () => document.getElementById("main-nav")?.classList.remove("dark-mode"),
    onEnterBack: () => document.getElementById("main-nav")?.classList.add("dark-mode"),
    onLeaveBack: () => document.getElementById("main-nav")?.classList.remove("dark-mode"),
  });

  const progressFill = document.getElementById("anim-progress-fill");
  const progressPct = document.getElementById("anim-progress-pct");

  /*
   * CHAPTER MAP — 240 frames across 400vh (4 scrolls)
   * ─────────────────────────────────────────────────
   * Scroll 1  progress 0.000 → 0.250  frames 0–59    "Whole."
   * Scroll 2  progress 0.250 → 0.500  frames 60–119  "Separation."
   * Scroll 3  progress 0.500 → 0.750  frames 120–179 "Exposed."
   * Scroll 4  progress 0.750 → 1.000  frames 180–239 "Every Atom."
   *
   * Switch points are at the EXACT frame boundary:
   *   frame 60  = progress 60/239  ≈ 0.251
   *   frame 120 = progress 120/239 ≈ 0.502
   *   frame 180 = progress 180/239 ≈ 0.753
   */
  const CHAPTER_FRAME_BOUNDARIES = [
    { id: "ch-0", spec: "spec-callout-1", frameStart: 0,   frameEnd: 59  },
    { id: "ch-1", spec: "spec-callout-2", frameStart: 60,  frameEnd: 119 },
    { id: "ch-2", spec: "spec-callout-3", frameStart: 120, frameEnd: 179 },
    { id: "ch-3", spec: null,             frameStart: 180, frameEnd: 239 },
  ];
  let activeChapter = -1;

  function updateChapters(currentFrame: number) {
    const chIdx = CHAPTER_FRAME_BOUNDARIES.findIndex(
      (ch) => currentFrame >= ch.frameStart && currentFrame <= ch.frameEnd
    );
    if (chIdx === activeChapter) return;

    // Hide outgoing chapter
    CHAPTER_FRAME_BOUNDARIES.forEach((ch, i) => {
      const el = document.getElementById(ch.id);
      if (el) {
        el.classList.remove("visible");
        if (i !== chIdx) {
          setTimeout(() => { el.style.display = "none"; }, 500);
        }
      }
      if (ch.spec) {
        const sel = document.getElementById(ch.spec);
        if (sel && i !== chIdx) {
          sel.classList.remove("visible");
          setTimeout(() => { sel.style.display = "none"; }, 500);
        }
      }
    });

    // Reveal incoming chapter
    if (chIdx >= 0) {
      const ch = CHAPTER_FRAME_BOUNDARIES[chIdx];
      const el = document.getElementById(ch.id);
      if (el) {
        el.style.display = "block";
        requestAnimationFrame(() => el.classList.add("visible"));
      }
      if (ch.spec) {
        const sel = document.getElementById(ch.spec);
        if (sel) {
          sel.style.display = "block";
          requestAnimationFrame(() => sel.classList.add("visible"));
        }
      }
    }
    activeChapter = chIdx;
  }

  // Main frame scroll trigger — scrub: 0.3 keeps frame & text tightly in sync
  let animationTween: any;

  function resetAnimation() {
    if (animationTween) animationTween.kill();
    drawFrame(0, canvas, ctx, frames);
    if (progressFill) progressFill.style.height = "0%";
    if (progressPct) progressPct.textContent = "0%";
    updateChapters(0);
  }

  ScrollTrigger.create({
    trigger: "#animation-section",
    start: "top 75%",
    end: "bottom top",
    onEnter: () => {
      if (animationTween) animationTween.kill();
      let obj = { progress: 0 };
      animationTween = gsap.to(obj, {
        progress: 1,
        duration: 6,
        ease: "power2.inOut",
        onUpdate: function () {
          const progress = obj.progress;
          const frameIndex = progress * (TOTAL_FRAMES - 1);
          currentFrameRef.current = Math.round(frameIndex);
          drawFrame(frameIndex, canvas, ctx, frames);

          const pctVal = Math.round(progress * 100);
          if (progressFill) progressFill.style.height = pctVal + "%";
          if (progressPct) progressPct.textContent = pctVal + "%";

          updateChapters(Math.round(frameIndex));
        },
      });
    },
    onLeave: resetAnimation,
    onLeaveBack: resetAnimation,
  });

  // Engineering bento cards
  gsap.utils.toArray(".bento-card").forEach((card: any, i: number) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.8,
      delay: i * 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // General reveal elements
  gsap.utils.toArray(".reveal").forEach((el: any) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  // Optics section
  gsap.to(".optics-visual", {
    opacity: 1, x: 0, duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".optics-visual",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  gsap.to(".optics-text", {
    opacity: 1, x: 0, duration: 1.1,
    ease: "power3.out", delay: 0.2,
    scrollTrigger: {
      trigger: ".optics-text",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Specs cells stagger
  gsap.utils.toArray(".spec-cell").forEach((cell: any, i: number) => {
    gsap.to(cell, {
      opacity: 1, y: 0, duration: 0.6,
      delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#specs",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  });

  // Gallery cards
  gsap.utils.toArray(".gallery-card").forEach((card: any, i: number) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#gallery",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Testimonial cards
  gsap.utils.toArray(".testimonial-card").forEach((card: any, i: number) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#testimonials",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Hero blob parallax
  gsap.to(".hero-blob-1", {
    y: -80, ease: "none",
    scrollTrigger: {
      trigger: "#overview",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".hero-blob-2", {
    y: 60, ease: "none",
    scrollTrigger: {
      trigger: "#overview",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
