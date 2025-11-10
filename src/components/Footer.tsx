import { Link } from 'react-router-dom';

export default function Footer() {
  const _year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container-1120 flex flex-col md:flex-row justify-between gap-5 py-3 footer-inner">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 no-underline text-white text-xl md:text-2xl italic font-heading"
          >
            <img src="/logo.svg" alt="Gallena Medical Centre Logo" className="w-10 h-10" />
            <span className="flex flex-col md:flex-row md:items-center md:gap-2">
              Gallena Medical Centre
              <span className="hidden md:inline text-lg md:text-xl font-semibold not-italic text-white">
                — We Care to Heal !
              </span>
            </span>
          </Link>
          <p className="md:hidden text-white italic text-lg font-bold mt-2">We Care to Heal !</p>
        </div>
        <div>
          <ul className="list-none m-0 p-0 flex gap-3">
            <li>
              <a
                aria-label="Call Gallena Medical Centre"
                href="tel:+256787992588"
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#0b3b4f] text-white no-underline pop-on-scroll visible shadow-[0_8px_20px_rgba(14,165,233,.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_26px_rgba(14,165,233,.4)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .96-.26c1.05.26 2.17.4 3.32.4a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C11.4 22 2 12.6 2 1a1 1 0 0 1 1-1h4.68a1 1 0 0 1 1 1c0 1.15.14 2.27.4 3.32a1 1 0 0 1-.26.96l-2.2 2.2Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="WhatsApp"
                href="https://wa.me/256787992588"
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#0b3b4f] text-white no-underline pop-on-scroll visible shadow-[0_8px_20px_rgba(16,185,129,.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_26px_rgba(16,185,129,.4)]"
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
                className="grid place-items-center w-10 h-10 rounded-xl bg-[#0b3b4f] text-white no-underline pop-on-scroll visible shadow-[0_8px_20px_rgba(14,165,233,.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_26px_rgba(14,165,233,.4)]"
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
