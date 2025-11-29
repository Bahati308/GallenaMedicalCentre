import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import { submitAppointmentForm, type AppointmentFormData } from '../utils/formHandler';
import SEO from '../components/SEO';

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gallery = useMemo(
    () => [
      { src: '/image6.jpg', alt: 'Entrance to Gallena Medical Centre' },
      { src: '/image10.jpg', alt: 'interior view of Gallena Medical Centre' },
      { src: '/image11.jpg', alt: 'reception area of Gallena Medical Centre' },
      { src: '/image13.jpg', alt: 'side view of Gallena Medical Centre' },
      { src: '/image14.jpg', alt: 'a compound suitable for therapy' },
    ],
    []
  );
  const testimonials = [
    { q: 'Professional and kind. My surgery and recovery were smooth.', a: '— Ama K.' },
    { q: 'The pediatric team made my child feel safe and happy.', a: '— Joseph N.' },
    { q: 'Easy booking and excellent dental care. Highly recommended!', a: '— Lydia A.' },
  ];
  const gIndex = useCarousel(gallery.length, 5000);
  const tIndex = useCarousel(testimonials.length);

  // Preload next image in carousel
  useEffect(() => {
    const nextIndex = (gIndex + 1) % gallery.length;
    if (gallery[nextIndex]) {
      const img = new Image();
      img.src = gallery[nextIndex].src;
    }
  }, [gIndex, gallery]);

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
      { threshold: 0.12 }
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
      <SEO
        title="Gallena Medical Centre | We care to heal"
        description="Gallena Medical Centre offers comprehensive healthcare services including general medicine, dental care, maternity services, surgery, and more. Book your consultation online today."
        image="/logo2.jpg"
        canonical="/"
      />
      <Helmet>
        {gallery[0] && <link rel="preload" as="image" href={gallery[0].src} fetchPriority="high" />}
        {gallery[1] && <link rel="preload" as="image" href={gallery[1].src} fetchPriority="high" />}
      </Helmet>

      <section className="py-8 sm:py-12 md:py-16">
        <div className="container-1120 grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-6 md:gap-8">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold reveal-up opacity-0 translate-y-3 transition">
              We Care to Heal
            </h1>
            <p className="text-sm sm:text-base muted">
              At Gallena Medical Centre, we deliver trusted, patient-centered healthcare across
              general medicine, dental, maternity, surgery, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal-up opacity-0 translate-y-3 transition">
              <button
                onClick={handleOpenModal}
                className="btn btn-primary btn-3d text-sm sm:text-base"
              >
                Book Consultation
              </button>
              <Link to="/services" className="btn btn-outline btn-3d text-sm sm:text-base">
                Explore Services
              </Link>
            </div>
          </div>
          <div aria-hidden className="reveal-up opacity-0 translate-y-3 transition">
            <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden animate-float-3d">
              <img
                src="/logo2.jpg"
                alt="Gallena Medical Centre at a glance"
                role="presentation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-lg sm:text-xl md:text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              About Us
            </h2>
            <p className="muted">
              Gallena Medical Centre is committed to clinical excellence, safety, and compassionate
              service. Our multi-disciplinary team leverages modern technology to deliver reliable
              outcomes and a comfortable patient experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                t: 'Modern Facilities',
                d: 'State-of-the-art diagnostics and surgical suites for better, faster care.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                ),
              },
              {
                t: 'Expert Team',
                d: 'Board-certified doctors, experienced nurses, and caring support staff.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                t: 'Patient First',
                d: 'Personalized treatment plans and transparent communication at every step.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((i, idx) => (
              <div
                key={idx}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition delay-[${idx * 0.1}s]`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center justify-center mb-4 p-4 bg-gradient-to-br from-brand-blue/10 to-brand-green/10 rounded-xl">
                  {i.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{i.t}</h3>
                <p className="muted">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="py-16 bg-white dark:bg-black dark:from-black dark:via-black dark:to-transparent"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-lg sm:text-xl md:text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Medical Services
            </h2>
            <p className="muted">
              Comprehensive services delivered by specialists across key disciplines.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: 'General Consultation',
                d: 'Thorough primary-care visits with personalised treatment plans and preventive screenings.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
              },
              {
                t: 'Specialist Clinics',
                d: 'General gynecology, gynocology, infetility, pediatrics.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
              {
                t: 'Outpatient Services',
                d: 'Same-day diagnostics, wound care, infusions, and follow-up visits without admission.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                ),
              },
              {
                t: 'Minor & Major Surgeries',
                d: 'Elective and emergency procedures in fully equipped theatres with attentive recovery care.',
                icon: (
                  <svg
                    className="w-16 h-16 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                ),
              },
            ].map((service, idx) => {
              const slug = titleToSlug(service.t);
              return (
                <Link
                  key={service.t}
                  to={`/services/${slug}`}
                  className={`card card-3d reveal-up opacity-0 translate-y-3 transition hover:scale-105 cursor-pointer block`}
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-center mb-4 p-4 bg-gradient-to-br from-brand-blue/10 to-brand-green/10 rounded-xl">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.t}</h3>
                  <p className="muted mb-3">{service.d}</p>
                  <span className="text-brand-blue text-sm font-medium">Learn more →</span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/services" className="btn btn-outline btn-3d">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section
        id="tour"
        className="py-16 bg-white dark:bg-black dark:from-black dark:via-black/20 dark:to-black"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-lg sm:text-xl md:text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Take a Quick Tour
            </h2>
            <p className="muted">
              Step inside our space and see the environment where compassionate care comes first.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${gIndex * 100}%)` }}
              >
                {gallery.map((item, idx) => (
                  <article
                    key={item.src}
                    className="w-full flex-shrink-0 px-1"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="card card-3d overflow-hidden p-0">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px] object-cover"
                        loading={idx <= 1 ? 'eager' : 'lazy'}
                        fetchPriority={idx === 0 ? 'high' : idx === 1 ? 'high' : 'auto'}
                        decoding="async"
                        width="1200"
                        height="800"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {gallery.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === gIndex ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
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
            className="relative bg-white dark:bg-[#050505] rounded-2xl shadow-2xl w-[95vw] sm:w-[90vw] md:w-[70vw] lg:w-[60vw] max-h-[90vh] overflow-y-auto animate-bounce-in-3d z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-brand-blue to-brand-green px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-20">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-heading">
                Book Appointment
              </h2>
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

      <section id="blog" className="py-16">
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-lg sm:text-xl md:text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              From Our Blog
            </h2>
            <p className="muted">Health tips, hospital news, and community updates.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: '5 Habits for a Healthier Heart',
                d: 'Small lifestyle changes that make a big difference.',
                img: '/hydration-heart-health.jpg',
              },
              {
                t: 'What to Expect in Prenatal Care',
                d: 'Your guide to a safe and informed pregnancy journey.',
                img: '/childhood-vaccination-guide.jpg',
              },
              {
                t: 'Dental Checkups: Why Twice a Year?',
                d: 'Prevention and early detection keep you smiling.',
                img: '/oral-hygiene-basics.jpg',
              },
            ].map((p, idx) => (
              <Link
                key={idx}
                to="/blog"
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition hover:scale-105 cursor-pointer block`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="w-full h-36 rounded-xl overflow-hidden mb-2">
                  <img
                    src={p.img}
                    alt={p.t}
                    className="w-full h-full object-cover"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <h3 className="font-semibold mb-2">{p.t}</h3>
                <p className="muted mb-3">{p.d}</p>
                <span className="text-brand-blue font-semibold">Read more →</span>
              </Link>
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
        className="py-16 bg-white dark:bg-black dark:from-black dark:via-black dark:to-transparent"
      >
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
            <h2 className="btn btn-primary text-lg sm:text-xl md:text-2xl mb-[0.5cm] border border-brand-blue shadow-[0_8px_20px_rgba(14,165,233,.35)] animate-tilt-3d">
              Patient Testimonials
            </h2>
            <p className="muted">Real stories from those we serve.</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${tIndex * 100}%)` }}
              >
                {testimonials.map((t, idx) => (
                  <article
                    key={idx}
                    className="w-full flex-shrink-0 px-1"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="card card-3d h-full flex flex-col justify-between gap-4">
                      <blockquote className="text-lg leading-relaxed font-medium">
                        &ldquo;{t.q}&rdquo;
                      </blockquote>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {t.a}
                        </span>
                        <span className="inline-flex items-center gap-1 text-brand-blue">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.021 3.149a1 1 0 0 0 .95.69h3.312c.969 0 1.371 1.24.588 1.81l-2.68 1.948a1 1 0 0 0-.364 1.118l1.022 3.149c.3.921-.755 1.688-1.54 1.118l-2.68-1.947a1 1 0 0 0-1.176 0l-2.68 1.947c-.784.57-1.838-.197-1.539-1.118l1.022-3.149a1 1 0 0 0-.364-1.118L2.08 8.576c-.783-.57-.38-1.81.588-1.81h3.312a1 1 0 0 0 .95-.69l1.02-3.149z" />
                          </svg>
                          Trusted patient
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === tIndex ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AppointmentForm({ onClose }: { onClose?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');
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
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    // Validation
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

    // Prepare form data
    const formData: AppointmentFormData = {
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      preferredDateTime: payload.preferredDateTime,
      department: payload.department,
      message: payload.message || undefined,
    };

    setStatus('loading');
    setMsg('');

    try {
      // Submit to API endpoint
      await submitAppointmentForm(formData);

      setMsg('Appointment request sent successfully. We will contact you shortly.');
      setStatus('ok');
      setEmailValid(true);
      setEmailError('');
      form.reset();

      if (onClose) {
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMsg(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later or contact us.'
      );
      setStatus('err');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              Full Name
            </span>
            <input
              name="fullName"
              required
              className="form-input-modern text-sm sm:text-base"
              placeholder="Your full name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              onChange={handleEmailChange}
              className={`form-input-modern text-sm sm:text-base ${!emailValid ? 'border-red-500 bg-red-50 dark:bg-red-900/40 dark:border-red-400' : ''}`}
              placeholder="you@example.com"
            />
            {!emailValid && (
              <span className="text-red-600 dark:text-red-300 text-xs sm:text-sm font-medium animate-fade-in">
                {emailError}
              </span>
            )}
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              Phone Number
            </span>
            <input
              name="phone"
              required
              className="form-input-modern"
              placeholder="e.g. +1 555 123 4567"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              Preferred Date &amp; Time
            </span>
            <input
              type="datetime-local"
              name="preferredDateTime"
              required
              className="form-input-modern"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Department / Service
          </span>
          <select name="department" required className="form-input-modern">
            <option value="" disabled selected>
              Select a department
            </option>
            {[
              'General Consultation',
              'Specialist Clinics',
              'Outpatient Services',
              'Minor & Major Surgeries',
              'Ultrasonography',
              'Pharmacy',
              'Inpatient Services',
              'Laboratory',
              'Maternity Services',
              'Online Consultation',
              'Home Care Services',
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Additional Details (optional)
          </span>
          <textarea
            name="message"
            rows={4}
            className="form-input-modern resize-none"
            placeholder="Any additional details about your appointment needs..."
          />
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary btn-3d w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Book Appointment'}
        </button>
        {status !== 'idle' && (
          <div
            className={`p-4 rounded-lg font-medium animate-fade-in ${
              status === 'ok'
                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700'
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700'
            }`}
          >
            {msg}
          </div>
        )}
        <p className="text-slate-600 dark:text-slate-300 text-sm text-center">
          By submitting, you agree to be contacted by our team.
        </p>
      </div>
    </form>
  );
}
