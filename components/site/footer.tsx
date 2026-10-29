import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[var(--ink)] text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 text-xl font-extrabold">RajTest.in</div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">
            राजस्थान की भर्ती परीक्षाओं के लिए हिंदी में मुफ्त ऑनलाइन टेस्ट और अभ्यास पेपर।
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-orange-200">परीक्षाएँ</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/exams/rpsc" className="hover:text-white">RPSC</Link></li>
            <li><Link href="/exams/cet" className="hover:text-white">CET</Link></li>
            <li><Link href="/exams/reet" className="hover:text-white">REET</Link></li>
            <li><Link href="/exams/patwar" className="hover:text-white">Patwar</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-orange-200">RajTest</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/exams" className="hover:text-white">सभी टेस्ट</Link></li>
            <li><Link href="/leaderboard" className="hover:text-white">लीडरबोर्ड</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">मेरी तैयारी</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-orange-200">जुड़ें</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="https://t.me/rajtestofficial" target="_blank" rel="noreferrer" className="hover:text-white">Telegram updates</a></li>
            <li>राजस्थान, भारत</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container-shell flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 RajTest.in</span>
          <span>राजस्थान की तैयारी, हर दिन।</span>
        </div>
      </div>
    </footer>
  );
}
