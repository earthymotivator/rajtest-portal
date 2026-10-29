import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

const navItems = [
  { name: 'Tests', href: '/#available-tests' },
  { name: 'Exams', href: '/exams' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ece9e2] bg-white">
      <div className="container-shell flex min-h-[62px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Rajtest.in home">
          <Image src="https://rajtest.in/icons/icon-192.png" alt="Rajtest.in logo" width={42} height={42} priority className="h-[42px] w-[42px] object-contain" />
          <span>
            <span className="block text-[17px] font-extrabold leading-5 text-[#231300]">Rajtest.in</span>
            <span className="block text-[11px] leading-4 text-[#676e7e]">Raj Test Series</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#231300] md:flex" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.name} href={item.href} className="transition hover:text-[#1a7f45]">{item.name}</Link>)}
        </nav>

        <Link href="/dashboard" className="hidden text-sm font-semibold text-[#231300] hover:text-[#1a7f45] md:inline-flex">Profile</Link>

        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-[#ece9e2] text-[#231300]" aria-label="Open navigation" title="Menu">
            <Menu className="h-5 w-5" />
          </summary>
          <nav className="absolute right-0 top-12 z-50 flex w-52 flex-col border border-[#ece9e2] bg-white p-2 shadow-lg" aria-label="Mobile navigation">
            {navItems.map((item) => <Link key={item.name} href={item.href} className="px-3 py-3 text-sm font-semibold text-[#231300] hover:bg-[#f1faf3]">{item.name}</Link>)}
            <Link href="/dashboard" className="px-3 py-3 text-sm font-semibold text-[#231300] hover:bg-[#f1faf3]">Profile</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
