import Image from "next/image";

export default function EngineeringSection() {
  return (
    <section id="engineering" aria-label="Engineering highlights">
      <div className="container">
        <div className="section-header">
          <span className="font-label-caps section-eyebrow reveal">Architecture</span>
          <h2 className="font-headline-lg section-title reveal">
            Uncompromising<br />internals.
          </h2>
          <p className="font-body-md section-desc reveal">
            Engineered with a dense magnesium alloy chassis, the α6100 houses immense
            processing power within a minimalist form factor.
          </p>
        </div>

        <div className="bento-grid">
          {/* Large card */}
          <div
            className="bento-card bento-card-large"
            role="img"
            aria-label="Layered precision engineering view"
          >
            <Image
              src="/images/engineering_exploded.png"
              alt="Exploded engineering view of Sony α6100 components"
              width={1200}
              height={900}
            />
            <div className="bento-card-overlay" />
            <div className="bento-card-caption glass-panel">
              <h3 className="font-headline-lg">Layered Precision</h3>
              <p className="font-body-sm">
                Every micron accounted for. The stacked CMOS sensor integrates seamlessly
                with the BIONZ X processor.
              </p>
            </div>
          </div>

          {/* Small card 1 */}
          <div className="bento-card bento-card-sm bento-info-card">
            <div className="card-glow card-glow-top" aria-hidden="true" />
            <span className="material-symbols-outlined bento-info-icon" aria-hidden="true">
              memory
            </span>
            <div>
              <h4 className="font-body-md" style={{ fontWeight: 500 }}>BIONZ X Engine</h4>
              <p className="font-body-sm">
                Advanced image processing algorithms derived from full-frame models ensure
                pristine clarity.
              </p>
            </div>
          </div>

          {/* Small card 2 */}
          <div className="bento-card bento-card-sm bento-info-card">
            <div className="card-glow card-glow-bottom" aria-hidden="true" />
            <span className="material-symbols-outlined bento-info-icon" aria-hidden="true">
              battery_charging_full
            </span>
            <div>
              <h4 className="font-body-md" style={{ fontWeight: 500 }}>Endurance</h4>
              <p className="font-body-sm">
                High-capacity NP-FW50 battery management for extended studio sessions
                without compromise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
