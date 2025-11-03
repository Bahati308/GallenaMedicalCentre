import { useEffect } from 'react';

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function hexToRgb(hex: string) {
  const m = hex.replace('#', '');
  const bigint = parseInt(m, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function mix(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  return `rgb(${lerp(a.r, b.r, t)}, ${lerp(a.g, b.g, t)}, ${lerp(a.b, b.b, t)})`;
}

function _rgbStringToRgb(str: string) {
  const m = str.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
  if (!m || m.length < 4) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(m[1] ?? '255', 10),
    g: parseInt(m[2] ?? '255', 10),
    b: parseInt(m[3] ?? '255', 10),
  };
}

function _relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (srgb[0] ?? 0) + 0.7152 * (srgb[1] ?? 0) + 0.0722 * (srgb[2] ?? 0);
}

export default function ScrollBg() {
  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      if (root.classList.contains('dark')) {
        // Dark mode: fixed black background
        root.style.setProperty('--page-bg', '#0b0b0b');
        root.style.setProperty('--text-color', '#e2e8f0');
        root.style.setProperty('--muted-color', '#94a3b8');
      } else {
        // Light mode: animate background based on scroll
        const white = '#ffffff';
        const green = '#10b981';
        const blue = '#0ea5e9';
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const p = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
        const seg = p * 3; // 0..3
        let color = white;
        if (seg <= 1) {
          color = mix(white, green, seg);
        } else if (seg <= 2) {
          color = mix(green, blue, seg - 1);
        } else {
          color = mix(blue, white, seg - 2);
        }
        // Force all text to black in light mode
        root.style.setProperty('--page-bg', color);
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--muted-color', '#000000');
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
