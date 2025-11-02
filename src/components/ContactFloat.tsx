import { useEffect, useState } from 'react';

export default function ContactFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed left-4 top-[5cm] z-40 flex flex-col gap-3 transition-all duration-300 ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      <a
        aria-label="WhatsApp"
        href="https://wa.me/256787992588"
        target="_blank"
        rel="noopener"
        className="grid place-items-center w-10 h-10 rounded-xl bg-[#eef8f8] text-[#0b3b4f] no-underline border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] dark:bg-slate-900 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-emerald-50 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.17 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.78 1.49h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.18-1.24-6.17-3.47-8.43zM12.05 21.2h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.24-.37a9.9 9.9 0 0 1-1.55-5.35c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.91 7.01c0 5.47-4.45 9.92-9.92 9.92zm5.64-7.44c-.31-.15-1.84-.9-2.13-1-.29-.1-.5-.15-.71.15-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.31-.15-1.34-.49-2.55-1.56-.94-.84-1.58-1.88-1.76-2.19-.18-.31-.02-.48.13-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.71-.97-2.34-.26-.63-.52-.54-.71-.55h-.6c-.2 0-.52.08-.79.39-.27.31-1.04 1.02-1.04 2.49 0 1.47 1.07 2.9 1.22 3.1.15.21 2.1 3.2 5.09 4.49.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36z" />
        </svg>
      </a>
      <a
        aria-label="Email"
        href="mailto:gallenamedicalcentre@gmail.com"
        className="grid place-items-center w-10 h-10 rounded-xl bg-[#eef8f8] text-[#0b3b4f] no-underline border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] dark:bg-slate-900 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-blue-50 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>
    </div>
  );
}
