"use client";
import { useRef } from "react";
import Image from "next/image";

const GALLERY_ITEMS = [
  {
    id: "g1",
    src: "/images/gallery_portrait.png",
    alt: "Sony α6100 studio portrait — shallow depth of field",
    title: "Studio Portrait",
    tag: "f/1.8 · ISO 400 · 1/200s",
  },
  {
    id: "g2",
    src: "/images/gallery_landscape.png",
    alt: "Sony α6100 sweeping landscape photography",
    title: "Mountain Landscape",
    tag: "f/8.0 · ISO 100 · 1/125s",
  },
  {
    id: "g3",
    src: "/images/gallery_wildlife.png",
    alt: "Sony α6100 wildlife eagle photography",
    title: "Wildlife Photography",
    tag: "f/4.0 · ISO 800 · 1/2000s",
  },
  {
    id: "g4",
    src: "/images/gallery_urban.png",
    alt: "Sony α6100 low-light urban landscape",
    title: "Low-Light Urban",
    tag: "ISO 6400 · f/2.8",
  },
  {
    id: "g5",
    src: "/images/gallery_action.png",
    alt: "Sony α6100 sports action burst mode",
    title: "Action Burst",
    tag: "11 fps · 0.02s AF",
  },
];

export default function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="gallery" aria-label="Product gallery">
      <div className="gallery-header">
        <div className="container" style={{ padding: 0 }}>
          <span className="font-label-caps section-eyebrow reveal">
            Visual Stories
          </span>
          <h2 className="font-headline-lg section-title reveal">
            Every frame,<br />a statement.
          </h2>
          <p className="font-body-md section-desc reveal" style={{ maxWidth: 440 }}>
            The α6100 captures moments with clinical precision. Drag to explore a
            selection of shots taken straight from the camera.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="gallery-scroll-track"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        role="list"
        aria-label="Gallery images"
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="gallery-card"
            role="listitem"
            aria-label={item.title}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="gallery-card-caption">
              <h4>{item.title}</h4>
              <span>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-scroll-hint" aria-hidden="true">
        <div className="gallery-scroll-line" />
        <span>Drag to explore</span>
        <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "var(--on-surface-variant)" }}>
          drag_pan
        </span>
      </div>
    </section>
  );
}
