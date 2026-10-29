import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-bold text-[var(--saffron)]">404 · पेज नहीं मिला</p>
      <h1 className="mt-3 text-3xl font-extrabold text-[var(--ink)]">यह पेज उपलब्ध नहीं है।</h1>
      <p className="mt-3 max-w-md text-slate-600">हो सकता है लिंक बदल गया हो। उपलब्ध टेस्ट से अपनी तैयारी जारी रखें।</p>
      <Link href="/exams" className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-[var(--saffron)] px-5 font-semibold text-white">टेस्ट देखें</Link>
    </div>
  );
}
