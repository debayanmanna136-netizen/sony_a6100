const SPECS = [
  { key: "Sensor",       val: "24.2MP",      sub: "APS-C Exmor CMOS" },
  { key: "Processor",    val: "BIONZ X",     sub: "Full-frame derived" },
  { key: "Autofocus",    val: "425",         sub: "Phase-detection points" },
  { key: "AF Speed",     val: "0.02s",       sub: "World's fastest*" },
  { key: "ISO Range",    val: "100–32000",   sub: "Expandable" },
  { key: "Video",        val: "4K",          sub: "30p oversampled" },
  { key: "Burst",        val: "11 fps",      sub: "Continuous shooting" },
  { key: "Viewfinder",   val: "2.36M",       sub: "OLED EVF dots" },
  { key: "Display",      val: '3.0"',        sub: "921k-dot flip LCD" },
  { key: "Weight",       val: "396g",        sub: "Body only" },
  { key: "Mount",        val: "E-mount",     sub: "Full system compatibility" },
  { key: "Connectivity", val: "Wi-Fi + BT",  sub: "NFC enabled" },
];

export default function SpecsSection() {
  return (
    <section id="specs" aria-label="Technical specifications">
      <div className="specs-bg-glow" aria-hidden="true" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span
          className="font-label-caps reveal"
          style={{ color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "16px" }}
        >
          Technical Specifications
        </span>
        <h2 className="font-display-lg specs-title reveal">
          Every detail,<br />specified.
        </h2>
        <p className="font-body-md specs-sub reveal">
          The α6100 is built on a foundation of precision engineering. Every
          specification is a deliberate choice.
        </p>

        <div className="specs-grid" role="table" aria-label="Sony α6100 specifications">
          {SPECS.map(({ key, val, sub }) => (
            <div className="spec-cell" role="row" key={key}>
              <div className="spec-cell-key">{key}</div>
              <div className="spec-cell-val">{val}</div>
              <div className="spec-cell-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
