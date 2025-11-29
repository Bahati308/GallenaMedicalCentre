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

export default function Blog() {
  const posts = [
    {
      t: 'Hydration and Heart Health',
      d: 'Why staying hydrated supports cardiovascular function.',
      img: '/hydration-heart-health.jpg',
    },
    {
      t: 'Understanding Blood Pressure',
      d: 'Know your numbers and what they mean.',
      img: '/understanding-blood-pressure.jpg',
    },
    {
      t: 'Childhood Vaccination Guide',
      d: 'Essential shots and schedules for kids.',
      img: '/childhood-vaccination-guide.jpg',
    },
    {
      t: 'Oral Hygiene Basics',
      d: 'Simple daily habits for healthier teeth.',
      img: '/oral-hygiene-basics.jpg',
    },
    {
      t: 'Preparing for Surgery',
      d: 'What to expect from pre-op to recovery.',
      img: '/preparing-for-surgery.jpg',
    },
    {
      t: 'Managing Diabetes',
      d: 'Diet, exercise, and medication tips.',
      img: '/managing-diabetes.jpg',
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
        title="Health Blog"
        description="Health tips, medical news, and community updates from Gallena Medical Centre. Learn about heart health, diabetes management, vaccination, oral hygiene, and more."
        canonical="/blog"
      />
      <div className="container-1120">
        <div className="max-w-3xl mx-auto text-center mb-7 reveal-up opacity-0 translate-y-3 transition">
          <h1 className="text-2xl sm:text-3xl font-semibold">Health Tips & News</h1>
          <p className="muted">Latest updates from our clinicians and community.</p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p, idx) => {
            const slug = titleToSlug(p.t);
            return (
              <Link
                key={p.t}
                to={`/blog/${slug}`}
                className={`card card-3d reveal-up opacity-0 translate-y-3 transition hover:scale-105 cursor-pointer block`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="w-full h-36 rounded-xl overflow-hidden mb-2">
                  <img
                    src={p.img}
                    alt={p.t}
                    className="w-full h-full object-cover"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                  />
                </div>
                <h3 className="font-semibold mb-2">{p.t}</h3>
                <p className="muted mb-3">{p.d}</p>
                <span className="text-brand-blue font-semibold">Read more →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
