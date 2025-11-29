import { useEffect } from 'react';

export default function ScrollBg() {
  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      if (root.classList.contains('dark')) {
        // Dark mode: fixed black background
        root.style.setProperty('--page-bg', '#000000');
        root.style.setProperty('--text-color', '#e2e8f0');
        root.style.setProperty('--muted-color', '#94a3b8');
        document.body.style.backgroundColor = '#000000';
      } else {
        // Light mode: fixed white background
        root.style.setProperty('--page-bg', '#ffffff');
        root.style.setProperty('--text-color', '#0f172a');
        root.style.setProperty('--muted-color', '#64748b');
        document.body.style.backgroundColor = '#ffffff';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Reveal pop-on-scroll elements (already present)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' }
    );
    const candidates = Array.from(document.querySelectorAll('.pop-on-scroll')) as HTMLElement[];
    candidates.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('visible');
      }
      io.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io.disconnect();
    };
  }, []);
  return null;
}
