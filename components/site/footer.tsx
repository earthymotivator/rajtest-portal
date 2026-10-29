import Link from 'next/link';
import { Bell, ChevronDown, Search } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Exams', href: '/exams' },
  { name: 'Results', href: '/results/ssc-cgl-practice' },
  { name: 'Study Material', href: '/dashboard' },
  { name: 'Admin', href: '/admin' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-lg font-bold text-white shadow-md">
            R
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900">RajTest</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Portal</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="transition hover:text-primary-600">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Search className="h-4 w-4" />
            Search exams
          </div>
          <button className="rounded-full border border-slate-200 p-2 text-slate-600">
            <Bell className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20">
            Login
          </button>
        </div>

        <button className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden">
          Menu <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
