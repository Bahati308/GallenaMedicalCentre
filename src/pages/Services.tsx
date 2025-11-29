import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Services() {
  const services = [
    {
      t: 'General Consultation',
      d: 'Thorough primary-care visits with personalised treatment plans and preventive screenings.',
    },
    {
      t: 'Specialist Clinics',
      d: 'General gynecology, gynocology, infetility, pediatrics.',
    },
    {
      t: 'Outpatient Services',
      d: 'Same-day diagnostics, wound care, infusions, and follow-up visits without admission.',
    },
    {
      t: 'Minor & Major Surgeries',
      d: 'Elective and emergency procedures in fully equipped theatres with attentive recovery care.',
    },
    {
      t: 'Ultrasonography',
      d: 'High-resolution imaging for obstetric, abdominal, thyroid, vascular, and musculoskeletal needs.',
    },
    {
      t: 'Pharmacy',
      d: 'Hospital-grade dispensary, medication counselling, chronic therapy support on site, and delivery of medicines to your home.',
    },
    {
      t: 'Inpatient Services',
      d: 'Comfortable wards with 24/7 nursing, multidisciplinary rounds, and personalised rehab plans.',
    },
    {
      t: 'Laboratory',
      d: 'Accredited diagnostics spanning hematology, chemistry, microbiology, and rapid point-of-care tests.',
    },
    {
      t: 'Maternity Services',
      d: 'Antenatal classes, delivery suites, postnatal recovery, newborn screenings, and lactation support.',
    },
    {
      t: 'Online Consultation',
      d: 'Secure virtual visits for follow-ups, prescription renewals, and health coaching wherever you are.',
    },
    {
      t: 'Home Care Services',
      d: 'Home visits, palliative care, one-on-one nursing, and personalized medical care in the comfort of your home.',
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
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-16" ref={revealRef}>
      <SEO
        title="Medical Services"
        description="Comprehensive medical services at Gallena Medical Centre including general consultation, specialist clinics (gynecology, infertility, pediatrics), outpatient services, surgeries, pharmacy with home delivery, home care services, and more."
        canonical="/services"
      />
      <div className="container-1120">
        <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
          <h1 className="text-2xl sm:text-3xl font-semibold">Our Medical Services</h1>
          <p className="muted">
            Comprehensive, patient-centered services delivered by experienced specialists.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((s, idx) => {
            const slug = titleToSlug(s.t);
            return (
              <Link
                key={s.t}
                to={`/services/${slug}`}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition hover:scale-105 cursor-pointer block`}
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
                <p className="muted mb-3">{s.d}</p>
                <span className="text-brand-blue text-sm font-medium">Learn more →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
