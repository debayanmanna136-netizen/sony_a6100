const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "The α6100 changed how I approach street photography. The 0.02s autofocus catches moments I'd have missed with any other camera. Absolutely clinical precision.",
    name: "Anya Kowalski",
    role: "Documentary Photographer",
    initials: "AK",
    stars: 5,
  },
  {
    id: "t2",
    quote:
      "I've used cameras costing three times as much. The BIONZ X processor in the α6100 produces files that stand up to extreme post-processing. It's a working professional's tool.",
    name: "Marcus Reid",
    role: "Commercial Director",
    initials: "MR",
    stars: 5,
  },
  {
    id: "t3",
    quote:
      "The 4K video oversampling quality is extraordinary for the price point. My clients can't believe the footage came from a camera this compact. A genuine sleeper hit.",
    name: "Priya Nair",
    role: "Cinematographer & Editor",
    initials: "PN",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" aria-label="Photographer testimonials">
      <div className="testimonials-bg-blob" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="font-label-caps section-eyebrow reveal">
          From the Field
        </span>
        <h2 className="font-headline-lg section-title reveal">
          What photographers<br />say.
        </h2>
        <p className="font-body-md section-desc reveal" style={{ maxWidth: 480 }}>
          Real voices. Real work. The α6100 trusted by professionals across every discipline.
        </p>

        <div className="testimonials-grid">
          {TESTIMONIALS.map(({ id, quote, name, role, initials, stars }) => (
            <article key={id} className="testimonial-card" aria-label={`Testimonial from ${name}`}>
              {/* Stars */}
              <div className="testimonial-stars" aria-label={`${stars} out of 5 stars`}>
                {Array.from({ length: stars }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined testimonial-star"
                    aria-hidden="true"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="testimonial-quote">{quote}</blockquote>

              {/* Author */}
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {initials}
                </div>
                <div className="testimonial-author-info">
                  <h5>{name}</h5>
                  <span>{role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
