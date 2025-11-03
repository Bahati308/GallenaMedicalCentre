import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { submitContactForm, type ContactFormData } from '../utils/formHandler';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');
  const [msg, setMsg] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (!payload.fullName || !payload.email || !payload.message) {
      setMsg('Please fill out all required fields.');
      setStatus('err');
      return;
    }

    if (!emailValid) {
      setMsg('Please enter a valid email address.');
      setStatus('err');
      return;
    }

    // Prepare form data
    const formData: ContactFormData = {
      fullName: payload.fullName,
      email: payload.email,
      message: payload.message,
    };

    setStatus('loading');
    setMsg('');

    try {
      // Submit to API endpoint
      await submitContactForm(formData);

      setMsg('Message sent successfully. We will get back to you shortly.');
      setStatus('ok');
      setEmailValid(true);
      setEmailError('');
      form.reset();

      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setMsg(error instanceof Error ? error.message : 'Failed to send. Please try again later.');
      setStatus('err');
    }
  }
  return (
    <section className="py-16" ref={revealRef}>
      <Helmet>
        <title>Contact Us | Gallena Medical Centre</title>
      </Helmet>
      <div className="container-1120">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal-up opacity-0 translate-y-3 transition">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Have a question or need assistance? We&apos;re here to help. Reach out to us through any
            of the channels below.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-3d font-heading"
            >
              Send Us a Message
            </button>
            <a href="/services" className="btn btn-outline btn-3d font-heading">
              View Services
            </a>
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div
            className="reveal-up opacity-0 translate-y-3 transition space-y-6"
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="bg-gradient-to-br from-brand-blue/5 to-brand-green/5 p-8 rounded-2xl border border-brand-green/20">
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:gallenamedicalcentre@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600 text-sm">gallenamedicalcentre@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/256787992588"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.17 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.78 1.49h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.18-1.24-6.17-3.47-8.43zM12.05 21.2h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.24-.37a9.9 9.9 0 0 1-1.55-5.35c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.91 7.01c0 5.47-4.45 9.92-9.92 9.92zm5.64-7.44c-.31-.15-1.84-.9-2.13-1-.29-.1-.5-.15-.71.15-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.31-.15-1.34-.49-2.55-1.56-.94-.84-1.58-1.88-1.76-2.19-.18-.31-.02-.48.13-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.71-.97-2.34-.26-.63-.52-.54-.71-.55h-.6c-.2 0-.52.08-.79.39-.27.31-1.04 1.02-1.04 2.49 0 1.47 1.07 2.9 1.22 3.1.15.21 2.1 3.2 5.09 4.49.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">WhatsApp</p>
                    <p className="text-slate-600 text-sm">Chat with us</p>
                  </div>
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v1h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Facebook</p>
                    <p className="text-slate-600 text-sm">Visit our page</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Address</p>
              <p className="text-slate-600">
                Valley View Estate - Kitagobwa, Buwambo Rd, Wakiso, Uganda
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d127670.45903231614!2d32.47907342490039!3d0.43780384724524285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x177db117412d78eb%3A0x661fe967add4b853!2sValley%20View%20estate%2C%20Kampala!3m2!1d0.4378043!2d32.5614754!5e0!3m2!1sen!2sug!4v1762115863796!5m2!1sen!2sug"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-[95vw] md:w-[60vw] max-h-[90vh] overflow-y-auto animate-bounce-in-3d z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-brand-blue to-brand-green px-6 py-4 flex items-center justify-between z-20">
              <h2 className="text-2xl font-bold text-white font-heading">Contact Us</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-slate-200 text-2xl font-bold transition-transform duration-300 hover:scale-125"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={onSubmit} noValidate>
                <div className="space-y-4">
                  <label className="flex flex-col gap-2">
                    <span className="font-semibold text-slate-900">Name</span>
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
                      placeholder="your.email@example.com"
                    />
                    {!emailValid && (
                      <span className="text-red-600 text-sm font-medium animate-fade-in">
                        {emailError}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-semibold text-slate-900">Message</span>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className="form-input-modern resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </label>
                  <button
                    className="btn btn-primary btn-3d w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status !== 'idle' && (
                    <div
                      className={`p-4 rounded-lg font-medium animate-fade-in ${status === 'ok' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
                    >
                      {msg}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
