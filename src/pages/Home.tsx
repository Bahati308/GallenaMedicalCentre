import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function useCarousel(length: number, intervalMs = 4500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return index;
}

export default function Home() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const testimonials = [
    { q: 'Professional and kind. My surgery and recovery were smooth.', a: '— Ama K.' },
    { q: 'The pediatric team made my child feel safe and happy.', a: '— Joseph N.' },
    { q: 'Easy booking and excellent dental care. Highly recommended!', a: '— Lydia A.' },
  ];
  const tIndex = useCarousel(testimonials.length);

  // simple intersection reveal
  const revealRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = revealRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('!opacity-100', '!translate-y-0');
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Handle hash navigation to open modal
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#consultation') {
        setIsModalOpen(true);
      }
    };
    const handlePopState = () => {
      handleHashChange();
    };
    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // React to location changes (when navigating with React Router)
  useEffect(() => {
    if (location.hash === '#consultation') {
      setIsModalOpen(true);
    }
  }, [location.hash]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    window.history.pushState(null, '', '#consultation');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Remove hash without triggering navigation
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div ref={revealRef}>
      <Helmet>
        <title>Gallena Medical Centre | Healthcare with Trust</title>
      </Helmet>

      <section className="py-16">
        <div className="container-1120 grid md:grid-cols-[1.1fr_.9fr] gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold reveal-up opacity-0 translate-y-3 transition">
              We Care to Heal
            </h1>
            <p className="muted reveal-up opacity-0 translate-y-3 transition">
              At Gallena Medical Centre, we deliver trusted, patient-centered healthcare across
              general medicine, dental, maternity, surgery, and more.
            </p>
            <div className="flex gap-3 reveal-up opacity-0 translate-y-3 transition">
              <button onClick={handleOpenModal} className="btn btn-primary btn-3d">
                Book Consultation
              </button>
              <Link to="/services" className="btn btn-outline btn-3d">
                Explore Services
              </Link>
            </div>
          </div>
          <div aria-hidden className="reveal-up opacity-0 translate-y-3 transition">
            <div className="w-full h-[280px] rounded-2xl border border-slate-200 shadow-soft bg-[radial-gradient(1200px_300px_at_-10%_-10%,#e6fffb_10%,transparent_40%),conic-gradient(from_0deg_at_50%_50%,rgba(16,185,129,.15),rgba(14,165,233,.15),rgba(14,165,233,.06),rgba(16,185,129,.06))] dark:hidden animate-float-3d"></div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              About Us
            </h2>
            <p className="muted">
              Gallena Medical Centre is committed to clinical excellence, safety, and compassionate
              service. Our multi-disciplinary team leverages modern technology to deliver reliable
              outcomes and a comfortable patient experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                t: 'Modern Facilities',
                d: 'State-of-the-art diagnostics and surgical suites for better, faster care.',
              },
              {
                t: 'Expert Team',
                d: 'Board-certified doctors, experienced nurses, and caring support staff.',
              },
              {
                t: 'Patient First',
                d: 'Personalized treatment plans and transparent communication at every step.',
              },
            ].map((i, idx) => (
              <div
                key={idx}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition delay-[${idx * 0.1}s]`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <h3 className="font-semibold text-lg">{i.t}</h3>
                <p>{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="py-16 bg-gradient-to-b from-[#f4fbfb] to-transparent dark:bg-transparent dark:bg-black"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Medical Services
            </h2>
            <p className="muted">
              Comprehensive services delivered by specialists across key disciplines.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              'General Medicine',
              'Dental',
              'Maternity',
              'Surgery',
              'Pediatrics',
              'Cardiology',
              'Orthopedics',
              'Laboratory',
            ].map((s, idx) => (
              <article
                key={idx}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition`}
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <h3 className="font-semibold text-lg">{s}</h3>
                <p className="muted">Learn more about our {s.toLowerCase()} services.</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/services" className="btn btn-outline btn-3d">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section id="consultation" className="py-16">
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Book a Consultation
            </h2>
            <p className="muted">
              Complete the form and our team will contact you to confirm your appointment.
            </p>
          </div>
          {/* Appointment form would have been here - now in modal */}
        </div>
      </section>

      {/* Appointment Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-[95vw] md:w-[60vw] max-h-[90vh] overflow-y-auto animate-bounce-in-3d z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-brand-blue to-brand-green px-6 py-4 flex items-center justify-between z-20">
              <h2 className="text-2xl font-bold text-white font-heading">Book Appointment</h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-slate-200 text-2xl font-bold transition-transform duration-300 hover:scale-125"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <AppointmentForm onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}

      <section
        id="staff"
        className="py-16 bg-gradient-to-b from-[#f4fbfb] to-transparent dark:bg-transparent dark:bg-black"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Our Team
            </h2>
            <p className="muted">Dedicated professionals delivering exceptional care.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                n: 'Dr. Aisha Mensah',
                t: 'Consultant Physician',
                d: '15+ years in internal medicine with focus on preventive care.',
              },
              {
                n: 'Dr. David Ofori',
                t: 'Dental Surgeon',
                d: 'Comprehensive dental care and cosmetic dentistry specialist.',
              },
              {
                n: 'Matilda Owusu',
                t: 'Senior Midwife',
                d: 'Compassionate maternity support from antenatal to postnatal.',
              },
              {
                n: 'Samuel Tetteh',
                t: 'Head Nurse',
                d: 'Patient advocacy and quality assurance across wards.',
              },
            ].map((p, idx) => (
              <article
                key={idx}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition`}
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-100 to-cyan-100 border border-slate-200 mb-2 dark:bg-slate-800 dark:border-slate-700 animate-tilt-3d" />
                <h3 className="font-semibold">{p.n}</h3>
                <p className="muted">{p.t}</p>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/staff" className="btn btn-outline btn-3d">
              Meet All Staff
            </Link>
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              From Our Blog
            </h2>
            <p className="muted">Health tips, hospital news, and community updates.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: '5 Habits for a Healthier Heart',
                d: 'Small lifestyle changes that make a big difference.',
              },
              {
                t: 'What to Expect in Prenatal Care',
                d: 'Your guide to a safe and informed pregnancy journey.',
              },
              {
                t: 'Dental Checkups: Why Twice a Year?',
                d: 'Prevention and early detection keep you smiling.',
              },
            ].map((p, idx) => (
              <article
                key={idx}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="w-full h-36 rounded-xl bg-gradient-to-tr from-sky-100 to-emerald-100 border border-slate-200 mb-2" />
                <h3 className="font-semibold">{p.t}</h3>
                <p className="muted">{p.d}</p>
                <Link to="/blog" className="text-brand-navy font-semibold">
                  Read more
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center mt-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/blog" className="btn btn-outline btn-3d">
              View Blog
            </Link>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="py-16 bg-gradient-to-b from-[#f4fbfb] to-transparent dark:bg-transparent dark:bg-black"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Patient Testimonials
            </h2>
            <p className="muted">Real stories from those we serve.</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1">
              {testimonials.map((t, idx) => (
                <figure
                  key={idx}
                  className={`transition-all duration-500 ${idx === tIndex ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4'}`}
                >
                  <blockquote className="text-lg font-medium">{t.q}</blockquote>
                  <figcaption className="muted">{t.a}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AppointmentForm({ onClose }: { onClose?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState('');

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    if (!email) {
      setEmailValid(true);
      setEmailError('');
      return;
    }
    if (validateEmail(email)) {
      setEmailValid(true);
      setEmailError('');
    } else {
      setEmailValid(false);
      setEmailError('Please enter a valid email address');
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.preferredDateTime ||
      !payload.department
    ) {
      setMsg('Please complete all required fields.');
      setStatus('err');
      return;
    }

    if (!emailValid) {
      setMsg('Please enter a valid email address.');
      setStatus('err');
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 600));
      setMsg('Appointment request sent successfully. We will contact you shortly.');
      setStatus('ok');
      setEmailValid(true);
      setEmailError('');
      e.currentTarget.reset();
      if (onClose) {
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      }
    } catch {
      setMsg('Something went wrong. Please try again later or contact us.');
      setStatus('err');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-slate-900">Full Name</span>
            <input
              name="fullName"
              required
              className="form-input-modern"
              placeholder="Your full name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-slate-900">Email</span>
            <input
              type="email"
              name="email"
              required
              onChange={handleEmailChange}
              className={`form-input-modern ${!emailValid ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="you@example.com"
            />
            {!emailValid && (
              <span className="text-red-600 text-sm font-medium animate-fade-in">{emailError}</span>
            )}
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-slate-900">Phone Number</span>
            <input
              name="phone"
              required
              className="form-input-modern"
              placeholder="e.g. +1 555 123 4567"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-slate-900">Preferred Date &amp; Time</span>
            <input
              type="datetime-local"
              name="preferredDateTime"
              required
              className="form-input-modern"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900">Department / Service</span>
          <select name="department" required className="form-input-modern">
            <option value="" disabled selected>
              Select a department
            </option>
            {[
              'General Medicine',
              'Dental',
              'Maternity',
              'Surgery',
              'Pediatrics',
              'Cardiology',
              'Orthopedics',
              'Laboratory',
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900">Additional Details (optional)</span>
          <textarea
            name="message"
            rows={4}
            className="form-input-modern resize-none"
            placeholder="Any additional details about your appointment needs..."
          />
        </label>
        <button type="submit" className="btn btn-primary btn-3d w-full py-4 text-lg font-bold">
          Book Appointment
        </button>
        {status !== 'idle' && (
          <div
            className={`p-4 rounded-lg font-medium animate-fade-in ${status === 'ok' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
          >
            {msg}
          </div>
        )}
        <p className="text-slate-600 text-sm text-center">
          By submitting, you agree to be contacted by our team.
        </p>
      </div>
    </form>
  );
}
