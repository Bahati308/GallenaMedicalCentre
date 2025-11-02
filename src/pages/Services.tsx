import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';

export default function Services() {
  const services = [
    {
      t: 'General Medicine',
      d: 'Primary care, chronic disease management, annual physicals, preventive screening.',
    },
    {
      t: 'Dental',
      d: 'Exams, cleaning, fillings, root canals, crowns, cosmetic procedures, oral surgery.',
    },
    {
      t: 'Maternity',
      d: 'Antenatal classes, delivery, postnatal care; lactation support and mother-baby safety.',
    },
    { t: 'Surgery', d: 'General and minimally invasive procedures; pre-op to recovery support.' },
    {
      t: 'Pediatrics',
      d: 'Well-child visits, immunizations, acute and chronic condition management.',
    },
    {
      t: 'Cardiology',
      d: 'ECG, echocardiogram, risk assessment, medication management, ongoing follow-up.',
    },
    {
      t: 'Orthopedics',
      d: 'Fracture care, sports injuries, arthritis, joint replacement referrals, rehab.',
    },
    {
      t: 'Laboratory & Imaging',
      d: 'Blood tests, cultures, X-ray, ultrasound; accurate results supporting quick decisions.',
    },
  ];

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

  return (
    <section className="py-16" ref={revealRef}>
      <Helmet>
        <title>Services | Gallena Medical Centre</title>
      </Helmet>
      <div className="container-1120">
        <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
          <h1 className="text-3xl font-semibold">Our Medical Services</h1>
          <p className="muted">
            Comprehensive, patient-centered services delivered by experienced specialists.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {services.map((s, idx) => (
            <article
              key={s.t}
              className={`card card-3d reveal-up opacity-0 translate-y-3 transition`}
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
