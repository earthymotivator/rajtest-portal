import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';

const navItems = [
  { name: 'टेस्ट', href: '/#today-tests' },
  { name: 'परीक्षाएँ', href: '/exams' },
  { name: 'लीडरबोर्ड', href: '/leaderboard' },
  { name: 'मेरी तैयारी', href: '/dashboard' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="border-b border-white/10 bg-[var(--ink)] text-white">
        <div className="container-shell flex min-h-8 items-center justify-between gap-3 text-xs">
          <p>राजस्थान सरकारी परीक्षाओं की तैयारी अब रोज़ाना</p>
          <Link href="/exams" className="hidden items-center gap-1 font-semibold text-orange-200 sm:inline-flex">फ्री टेस्ट शुरू करें <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
      <div className="container-shell flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="RajTest.in होम">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--saffron)] text-lg font-black text-white">R</span>
          <span>
            <span className="block text-xl font-extrabold leading-5 text-[var(--ink)]">RajTest.in</span>
            <span className="mt-1 block text-[11px] text-slate-500">राज टेस्ट सीरीज़</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex" aria-label="मुख्य नेविगेशन">
          {navItems.map((item) => <Link key={item.name} href={item.href} className="transition hover:text-[var(--saffron)]">{item.name}</Link>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/dashboard" className="text-sm font-semibold text-[var(--ink)]">प्रोफ़ाइल</Link>
          <Link href="/exams" className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-[var(--saffron)] px-4 text-sm font-bold text-white transition hover:bg-[var(--saffron-dark)]">
            मुफ़्त शुरुआत <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-sm border border-slate-300 text-[var(--ink)]" aria-label="नेविगेशन खोलें" title="मेन्यू">
            <Menu className="h-5 w-5" />
          </summary>
          <nav className="absolute right-0 top-12 z-50 flex w-56 flex-col border border-slate-200 bg-white p-2 shadow-lg" aria-label="मोबाइल नेविगेशन">
            {navItems.map((item) => <Link key={item.name} href={item.href} className="px-3 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-orange-50">{item.name}</Link>)}
            <Link href="/dashboard" className="px-3 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-orange-50">प्रोफ़ाइल</Link>
            <Link href="/exams" className="mt-1 flex items-center justify-between bg-[var(--saffron)] px-3 py-3 text-sm font-bold text-white">मुफ़्त शुरुआत <ArrowRight className="h-4 w-4" /></Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
