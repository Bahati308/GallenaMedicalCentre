import { useEffect, useMemo, useRef, useState } from 'react';

type Message = { role: 'user' | 'assistant'; text: string };

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'What services do you offer?',
    a: 'We offer General Medicine, Dental, Maternity, Surgery, Pediatrics, Cardiology, Orthopedics, and Laboratory services.',
  },
  {
    q: 'How can I book an appointment?',
    a: 'Use the "Book Consultation" form on the Home page. Fill in your details and our team will contact you to confirm.',
  },
  {
    q: 'Where are you located?',
    a: 'Our address is Valley View Estate - Kitagobwa, Buwambo Rd, Wakiso, Uganda. See the map on the Contact page.',
  },
  {
    q: 'What are your working hours?',
    a: 'We are open Mon–Fri: 8:00–18:00, Sat: 9:00–14:00. For emergencies, please dial local emergency numbers.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'Yes, we accept a range of insurers. Please bring your insurance card; for specifics, contact our front desk.',
  },
  {
    q: 'What insurance do you accept?',
    a: 'We partner with most major insurers. If you are unsure, call us or bring your card for verification.',
  },
  {
    q: 'How do I get emergency care?',
    a: 'For medical emergencies, please dial emergency services. For other urgent care, visit our facility directly during working hours.',
  },
  {
    q: 'Can I request a specialist?',
    a: 'Yes, you may request to see a specific doctor or specialist, subject to schedule availability.',
  },
  {
    q: 'What are your COVID-19 policies?',
    a: 'We follow the latest health guidelines: masks required, symptom screening at entry, and sanitizers available throughout the centre.',
  },
  { q: 'Is there parking available?', a: 'Yes, patient and visitor parking is available on site.' },
  {
    q: 'Can I get lab results online?',
    a: 'Please contact the lab desk for portal access or delivery options. Some results can be issued online or sent to your email.',
  },
  {
    q: 'Can children get immunizations?',
    a: 'Absolutely! We offer childhood vaccinations according to the national schedule.',
  },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi, I'm Gallena PDA. How can I help you today?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const suggestions = useMemo(() => FAQ.map((f) => f.q).slice(0, 6), []);

  function findAnswer(text: string) {
    const n = normalize(text);
    const direct = FAQ.find((f) => normalize(f.q).includes(n) || n.includes(normalize(f.q)));
    if (direct) return direct.a;
    // simple keyword mapping
    if (/(book|appointment|consult)/i.test(text) && FAQ[1]) return FAQ[1].a;
    if (/(service|offer|department)/i.test(text) && FAQ[0]) return FAQ[0].a;
    if (/(where|address|locat)/i.test(text) && FAQ[2]) return FAQ[2].a;
    if (/(hour|time|open)/i.test(text) && FAQ[3]) return FAQ[3].a;
    if (/(insurance|insurer)/i.test(text) && FAQ[4]) return FAQ[4].a;
    return "I'm not sure yet. You can try our Services or Contact pages, or ask me another way.";
  }

  function send(text: string) {
    if (!text.trim()) return;
    const user: Message = { role: 'user', text };
    const reply: Message = { role: 'assistant', text: findAnswer(text) };
    setMessages((m) => [...m, user, reply]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
    setInput('');
  }

  return (
    <div className="fixed z-50 bottom-4 right-4">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Gallena PDA"
          className="shadow-soft w-14 h-14 rounded-full bg-[#0b3b4f] text-white text-sm font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl hover:rotate-6 active:scale-95 animate-pulse-glow animate-wiggle-3d"
        >
          PDA
        </button>
      )}
      {open && (
        <div className="w-80 max-w-[92vw] h-[480px] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft bg-white dark:bg-slate-900 overflow-hidden flex flex-col animate-bounce-in-3d">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-[#0b3b4f]">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-6 h-6 rounded-md text-white text-xs font-bold bg-[#0b3b4f]">
                +
              </span>
              <strong className="text-white">Gallena PDA</strong>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-slate-200">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto' : ''}`}>
                <div
                  className={`${m.role === 'user' ? 'bg-sky-100 text-slate-900' : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'} px-3 py-2 rounded-xl`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="px-3 pb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
