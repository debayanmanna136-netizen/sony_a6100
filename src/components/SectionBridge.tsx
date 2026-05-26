interface SectionBridgeProps {
  variant: "dark-to-light" | "light-to-dark";
}

export default function SectionBridge({ variant }: SectionBridgeProps) {
  return <div className={`bridge-${variant}`} aria-hidden="true" />;
}
