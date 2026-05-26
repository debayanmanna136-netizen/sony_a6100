"use client";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    // Expose loader control to window so CinematicAnimation can call hideLoader
    (window as any).__loaderReady = false;
  }, []);

  return (
    <div id="loader" role="progressbar" aria-label="Loading camera experience">
      <div className="loader-logo">Sony α6100</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" id="loader-fill"></div>
      </div>
      <div className="loader-pct" id="loader-pct">0%</div>
    </div>
  );
}
