import { useEffect, useState } from 'react';

function getInitial(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (saved) return saved;
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitial());
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
    // Immediately update background variables for responsiveness
    if (theme === 'dark') {
      root.style.setProperty('--page-bg', '#0b0b0b');
      root.style.setProperty('--nav-bg', 'rgba(0,0,0,0.85)');
    } else {
      // Let ScrollBg compute on next frame
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'));
      });
    }
  }, [theme]);
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-12"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="transition-transform duration-500">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
