import Link from 'next/link';

export function Footer() {
  return (
    <footer id="footer" className="border-t border-[#ded9cf] bg-white text-[#231300]">
      <div className="container-shell grid gap-6 py-7 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="text-lg font-extrabold">Rajtest.in</Link>
          <p className="mt-1 text-sm text-[#676e7e]">Study, test yourself, succeed</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#676e7e]" aria-label="Footer navigation">
          <Link href="/#available-tests" className="hover:text-[#1a7f45]">All Tests</Link>
          <Link href="/leaderboard" className="hover:text-[#1a7f45]">Leaderboard</Link>
          <Link href="/#next-test-heading" className="hover:text-[#1a7f45]">Exam Calendar</Link>
          <Link href="/#about" className="hover:text-[#1a7f45]">About</Link>
          <a href="mailto:support@rajtest.in" className="hover:text-[#1a7f45]">Contact</a>
          <Link href="/#legal" className="hover:text-[#1a7f45]">Privacy</Link>
          <Link href="/#legal" className="hover:text-[#1a7f45]">Terms</Link>
          <Link href="/#legal" className="hover:text-[#1a7f45]">Refund</Link>
        </nav>
      </div>
      <div id="legal" className="border-t border-[#ece9e2] py-3">
        <div className="container-shell flex flex-col gap-2 text-[10px] leading-5 text-[#676e7e] md:flex-row md:items-center md:justify-between">
          <p>Rajtest.in is not affiliated with any government body. Test questions and solutions are provided for practice and study purposes.</p>
          <p className="shrink-0">© 2026 Rajtest.in · RajTest · All rights reserved</p>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-[#ded9cf] bg-white/95 pb-[env(safe-area-inset-bottom)] text-center shadow-[0_-4px_16px_rgba(35,19,0,0.08)] backdrop-blur md:hidden" aria-label="Mobile bottom navigation">
        {[
          { label: 'Home', href: '/', icon: '🏠' },
          { label: 'Smart Study', href: '/dashboard', icon: '🧠' },
          { label: 'Exams', href: '/exams', icon: '📚' },
          { label: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
          { label: 'Profile', href: '/dashboard', icon: '👤' },
        ].map((item) => <Link key={item.label} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-[#676e7e]"><span className="text-base" aria-hidden="true">{item.icon}</span>{item.label}</Link>)}
      </nav>
    </footer>
  );
}
