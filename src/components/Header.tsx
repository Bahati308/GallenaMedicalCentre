import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 bg-transparent backdrop-blur border-b border-slate-200 dark:border-slate-700 transition-all duration-300 ${elevated ? 'shadow-lg shadow-brand-blue/10' : ''}`}
    >
      <div className="container-1120 flex items-center justify-between py-3 gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 no-underline text-white font-semibold group transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/logo1.jpg"
            alt="Gallena Medical Centre Logo"
            className="w-10 h-10 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-white/30 animate-tilt-3d"
          />
          <span className="whitespace-nowrap text-white text-xl md:text-2xl italic font-heading">
            Gallena Medical Centre
          </span>
        </Link>
        <nav
          className="relative flex-1 flex justify-end"
          aria-label="Primary"
          style={{ position: 'relative' }}
        >
          {/* Mobile Menu Button */}
          <button
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label="Toggle navigation menu"
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:bg-white/20 active:scale-95"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                open ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>

          {/* Desktop Navigation */}
          <ul id="nav-menu" className="hidden md:flex gap-3 lg:gap-5 list-none m-0 p-0">
            <li>
              <NavLink
                to="/services"
                className="px-3 py-2 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/10 font-heading"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="px-3 py-2 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/10 font-heading"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="px-3 py-2 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/10 font-heading"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/#consultation"
            className="btn btn-primary hidden md:inline-flex animate-fade-in"
          >
            Book Consultation
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu - Using same pattern as appointment/contact modals */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setOpen(false)}>
          {/* Backdrop - No blur */}
          <div className="absolute inset-0 bg-black/50 animate-fade-in" />

          {/* Menu Dropdown - Popup below navbar */}
          <div
            className="absolute top-16 right-4 w-48"
            style={{
              zIndex: 10,
              background: '#000000',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="py-2">
              <ul className="list-none m-0 p-0">
                <li>
                  <NavLink
                    to="/services"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center px-4 py-3 transition-all duration-300 hover:bg-white/20 ${
                        isActive ? 'bg-white/20' : ''
                      }`
                    }
                  >
                    <span
                      className="font-bold italic text-base text-white"
                      style={{ fontSize: '1.3em' }}
                    >
                      Services
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blog"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center px-4 py-3 transition-all duration-300 hover:bg-white/20 ${
                        isActive ? 'bg-white/20' : ''
                      }`
                    }
                  >
                    <span
                      className="font-bold italic text-base text-white"
                      style={{ fontSize: '1.3em' }}
                    >
                      Blog
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center px-4 py-3 transition-all duration-300 hover:bg-white/20 ${
                        isActive ? 'bg-white/20' : ''
                      }`
                    }
                  >
                    <span
                      className="font-bold italic text-base text-white"
                      style={{ fontSize: '1.3em' }}
                    >
                      Contact
                    </span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
