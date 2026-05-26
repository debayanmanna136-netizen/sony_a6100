import Image from "next/image";

export default function OpticsSection() {
  return (
    <section id="optics" aria-label="Optical system details">
      <div className="container">
        <div className="optics-grid">
          {/* Visual */}
          <div
            className="optics-visual"
            role="img"
            aria-label="Sony mirrorless camera sensor macro photography"
          >
            <Image
              src="/images/optics_sensor.png"
              alt="Sony camera sensor and lens mount — extreme macro detail"
              width={900}
              height={1200}
            />
            <div className="optics-visual-border" aria-hidden="true" />
          </div>

          {/* Text */}
          <div className="optics-text">
            <div className="optics-eyebrow">
              <div className="optics-eyebrow-line" aria-hidden="true" />
              <span
                className="font-label-caps"
                style={{ color: "var(--on-surface-variant)" }}
              >
                Optical Integrity
              </span>
            </div>
            <h2 className="font-headline-lg optics-title">
              Capture light<br />with absolute truth.
            </h2>
            <div className="optics-specs">
              <div className="optics-spec-item reveal">
                <h3 className="font-body-md" style={{ fontWeight: 500 }}>
                  Copper Wiring Layer
                </h3>
                <p className="font-body-sm">
                  Accelerated readout speeds and superior light-gathering efficiency
                  across the entire sensor plane.
                </p>
              </div>
              <div className="optics-spec-item reveal">
                <h3 className="font-body-md" style={{ fontWeight: 500 }}>
                  ISO 100–32000
                </h3>
                <p className="font-body-sm">
                  Exceptional noise suppression in low-light environments, maintaining
                  critical detail and texture.
                </p>
              </div>
              <div className="optics-spec-item reveal">
                <h3 className="font-body-md" style={{ fontWeight: 500 }}>
                  425 Phase-Detection Points
                </h3>
                <p className="font-body-sm">
                  Dense AF point coverage tracking subjects across the frame with
                  surgical precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
