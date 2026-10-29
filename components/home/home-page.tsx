export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 text-2xl font-black tracking-tight text-white">RajTest</div>
          <p className="text-sm text-slate-300">
            Mock tests and analytics for aspirants preparing for competitive exams across India.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Exams</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>SSC</li>
            <li>Banking</li>
            <li>Railway</li>
            <li>Teaching</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy policy</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>support@rajtest.in</li>
            <li>+91 98765 43210</li>
            <li>New Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4">
        <div className="container-shell flex flex-col gap-3 text-xs text-slate-400 md:flex-row md:justify-between">
          <span>© 2026 RajTest Portal.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
