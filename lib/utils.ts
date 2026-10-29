@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #f8fafc;
}

* {
  box-sizing: border-box;
}

@layer components {
  .container-shell {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .section-title {
    @apply text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl;
  }

  .pill {
    @apply inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600;
  }

  .card {
    @apply rounded-2xl border border-slate-200 bg-white shadow-soft;
  }
}
