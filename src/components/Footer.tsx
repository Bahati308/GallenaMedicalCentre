import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container-1120 flex flex-col md:flex-row justify-between gap-5 py-3 footer-inner">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 no-underline text-slate-900 font-semibold"
          >
            <span className="grid place-items-center w-7 h-7 rounded-lg text-white font-bold bg-gradient-to-tr from-brand-blue to-brand-green">
              +
            </span>
            <span>Gallena Medical Centre</span>
          </Link>
          <p className="text-black italic text-2xl">We Care to Heal !</p>
        </div>
        <div>
          <ul className="list-none m-0 p-0 flex gap-3">
            <li>
              <a
                aria-label="Facebook"
                href="https://facebook.com/"
                target="_blank"
                rel="noopener"
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#eef8f8] text-black no-underline border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] dark:bg-slate-900 pop-on-scroll visible transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-blue-50 active:scale-95"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.01 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.77 8.44-4.93 8.44-9.94z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="WhatsApp"
                href="https://wa.me/256787992588"
                target="_blank"
                rel="noopener"
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#eef8f8] text-black no-underline pop-on-scroll visible border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] dark:bg-slate-900 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-emerald-50 active:scale-95"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.17 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.78 1.49h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.18-1.24-6.17-3.47-8.43zM12.05 21.2h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.24-.37a9.9 9.9 0 0 1-1.55-5.35c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.91 7.01c0 5.47-4.45-9.92-9.92-9.92zm5.64-7.44c-.31-.15-1.84-.9-2.13-1-.29-.1-.5-.15-.71.15-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.31-.15-1.34-.49-2.55-1.56-.94-.84-1.58-1.88-1.76-2.19-.18-.31-.02-.48.13-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.71-.97-2.34-.26-.63-.52-.54-.71-.55h-.6c-.2 0-.52.08-.79.39-.27.31-1.04 1.02-1.04 2.49 0 1.47 1.07 2.9 1.22 3.1.15.21 2.1 3.2 5.09 4.49.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="Email"
                href="mailto:gallenamedicalcentre@gmail.com"
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#eef8f8] text-black no-underline pop-on-scroll visible border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] dark:bg-slate-900 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-blue-50 active:scale-95"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
