export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-inner">
        <div className="font-headline-lg footer-logo">Sony α6100</div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#" className="font-body-sm">Privacy Policy</a>
          <a href="#" className="font-body-sm">Terms of Service</a>
          <a href="#" className="font-body-sm">Support</a>
          <a href="#" className="font-body-sm">Contact</a>
        </nav>
        <p className="font-body-sm footer-copy">
          © 2024 Sony Electronics Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
