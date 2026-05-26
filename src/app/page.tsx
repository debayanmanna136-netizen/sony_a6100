import Loader from "@/components/Loader";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CinematicAnimation from "@/components/CinematicAnimation";
import SectionBridge from "@/components/SectionBridge";
import EngineeringSection from "@/components/EngineeringSection";
import OpticsSection from "@/components/OpticsSection";
import GallerySection from "@/components/GallerySection";
import SpecsSection from "@/components/SpecsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Loading screen */}
      <Loader />

      {/* Floating particles (hero only) */}
      <ParticlesCanvas />

      {/* Sticky nav */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Cinematic scroll-animation (drives ALL GSAP after load) */}
        <CinematicAnimation />

        {/* 3. Bridge dark → light */}
        <SectionBridge variant="dark-to-light" />

        {/* 4. Engineering bento */}
        <EngineeringSection />

        {/* 5. Optics */}
        <OpticsSection />

        {/* 6. Gallery (new) */}
        <GallerySection />

        {/* 7. Bridge light → dark */}
        <SectionBridge variant="light-to-dark" />

        {/* 8. Specs */}
        <SpecsSection />

        {/* 9. Bridge dark → light */}
        <SectionBridge variant="dark-to-light" />

        {/* 10. Testimonials (new) */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
