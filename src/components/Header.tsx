import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      setIsLoggedIn(!!token);
    };
    checkAuth();
    // Listen for storage changes (e.g., logout)
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 1000); // Check every second
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  function handleAdminClick() {
    if (isLoggedIn) {
      // Scroll to admin panel
      navigate('/');
      setTimeout(() => {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) {
          adminPanel.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Open login modal - this will be handled by Home component
      navigate('/#admin-login');
    }
  }
  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 bg-transparent backdrop-blur border-b border-slate-200 dark:border-slate-700 transition-all duration-300 ${elevated ? 'shadow-lg shadow-brand-blue/10' : ''}`}
    >
      <div className="container-1120 flex items-center justify-between py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 no-underline text-white font-semibold group transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/logo.svg"
            alt="Gallena Medical Centre Logo"
            className="w-10 h-10 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-white/30 animate-tilt-3d"
          />
          <span className="whitespace-nowrap text-white text-xl md:text-2xl italic font-heading">
            Gallena Medical Centre
          </span>
        </Link>
        <nav className="relative" aria-label="Primary">
          <button
            aria-expanded={open}
            aria-controls="nav-menu"
            className="md:hidden bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'} Menu
          </button>
          <ul
            id="nav-menu"
            className={`md:flex gap-5 list-none m-0 p-0 absolute md:static right-0 top-12 bg-brand-green md:bg-transparent border md:border-0 border-white/20 rounded-xl md:rounded-none px-3 py-2 md:p-0 transition-all duration-300 ${open ? 'flex flex-col animate-scale-in' : 'hidden md:flex'}`}
          >
            <li>
              <NavLink
                to="/services"
                className="px-2 py-2 rounded-lg text-white font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-[1.3] font-heading"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className="px-2 py-2 rounded-lg text-white font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-[1.3] font-heading"
              >
                Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="px-2 py-2 rounded-lg text-white font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-[1.3] font-heading"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="px-2 py-2 rounded-lg text-white font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-[1.3] font-heading"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdminClick}
            className="btn btn-outline hidden md:inline-flex text-sm px-3 py-2"
            title={isLoggedIn ? 'View Admin Panel' : 'Admin Login'}
          >
            {isLoggedIn ? '👤 Admin' : '🔐 Admin'}
          </button>
          <Link
            to="/#consultation"
            className="btn btn-primary hidden md:inline-flex animate-fade-in"
          >
            Book Consultation
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
