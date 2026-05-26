"use client";
import { useEffect } from "react";

export default function Navigation() {
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    // Scroll → scrolled class
    const onScroll = () => {
      if (window.scrollY > 50) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll spy
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(
      '#main-nav .nav-links a[href^="#"]'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#" + entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));

    // CTA buttons
    document.getElementById("discover-btn")?.addEventListener("click", () => {
      document.getElementById("animation-section")?.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("specs-btn")?.addEventListener("click", () => {
      document.getElementById("specs")?.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("buy-now-btn")?.addEventListener("click", () => {
      alert("Sony α6100 — Experience the future of mirrorless photography.");
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav id="main-nav" role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="#overview" className="nav-logo" aria-label="Sony α6100 Home">
          Sony α6100
        </a>
        <div className="nav-links" role="list">
          <a href="#overview" className="active" role="listitem">Overview</a>
          <a href="#engineering" role="listitem">Engineering</a>
          <a href="#optics" role="listitem">Optics</a>
          <a href="#gallery" role="listitem">Gallery</a>
          <a href="#specs" role="listitem">Specs</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="nav-cta" id="buy-now-btn" aria-label="Buy Sony α6100">
            Buy Now
          </button>
          <button
            className="mobile-menu-btn"
            id="mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
