import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';

export default function Staff() {
  const team = [
    {
      n: 'Dr. Aisha Mensah',
      t: 'Consultant Physician',
      d: 'Internal medicine, preventive care, chronic disease management.',
    },
    {
      n: 'Dr. David Ofori',
      t: 'Dental Surgeon',
      d: 'Comprehensive dentistry and cosmetic procedures.',
    },
    { n: 'Matilda Owusu', t: 'Senior Midwife', d: 'Maternal and newborn care with compassion.' },
    {
      n: 'Samuel Tetteh',
      t: 'Head Nurse',
      d: 'Quality assurance and patient advocacy across wards.',
    },
    { n: 'Grace Appiah', t: 'Pediatric Nurse', d: 'Child-centered care with a gentle approach.' },
    {
      n: 'Dr. Kwame Boateng',
      t: 'Cardiologist',
      d: 'Heart health diagnostics and long-term cardiac care.',
    },
    {
      n: 'Dr. Linda Owusu',
      t: 'Orthopedic Specialist',
      d: 'Joint and bone care; sports injury management.',
    },
    { n: 'Kojo Nartey', t: 'Lab Scientist', d: 'Accurate lab diagnostics and timely reporting.' },
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
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-16" ref={revealRef}>
      <Helmet>
        <title>Our Staff | Gallena Medical Centre</title>
      </Helmet>
      <div className="container-1120">
        <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
          <h1 className="text-3xl font-semibold">Meet Our Team</h1>
          <p className="muted">
            Highly skilled and compassionate professionals dedicated to your care.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {team.map((p, idx) => (
            <article
              key={p.n}
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
      </div>
    </section>
  );
}
