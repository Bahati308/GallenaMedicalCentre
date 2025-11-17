import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface ServiceInfo {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  whatToExpect: string[];
  whenToVisit: string[];
  additionalInfo?: string;
}

const serviceDetails: Record<string, ServiceInfo> = {
  'general-consultation': {
    title: 'General Consultation',
    shortDescription:
      'Thorough primary-care visits with personalised treatment plans and preventive screenings.',
    fullDescription:
      'Our General Consultation service provides comprehensive primary healthcare delivered by experienced physicians. We focus on preventive care, early disease detection, and personalized treatment plans tailored to your unique health needs.',
    features: [
      'Comprehensive health assessments and physical examinations',
      'Chronic disease management (diabetes, hypertension, etc.)',
      'Preventive health screenings and vaccinations',
      'Acute illness diagnosis and treatment',
      'Health counseling and lifestyle recommendations',
      'Referrals to specialists when needed',
    ],
    whatToExpect: [
      'Arrive 15 minutes early for registration',
      'Bring your medical history and current medications',
      'A thorough review of your symptoms and concerns',
      'Physical examination as needed',
      'Discussion of diagnosis and treatment options',
      'Prescription if medication is required',
      'Follow-up appointment scheduling if needed',
    ],
    whenToVisit: [
      'Annual health check-ups and preventive screenings',
      'New or persistent symptoms requiring evaluation',
      'Chronic condition monitoring and medication reviews',
      'Minor injuries or infections',
      'Health concerns or questions about your wellbeing',
      'Pre-travel health consultations',
    ],
  },
  'specialist-clinics': {
    title: 'Specialist Clinics',
    shortDescription:
      'Focused reviews across cardiology, pediatrics, orthopedics, ENT, dermatology, and more.',
    fullDescription:
      'Access expert care from board-certified specialists across multiple disciplines. Our specialist clinics offer focused evaluations, advanced diagnostics, and specialized treatment plans for complex health conditions.',
    features: [
      'Cardiology: Heart health assessments, ECG, and cardiac care',
      'Pediatrics: Child health from infancy through adolescence',
      'Orthopedics: Bone, joint, and musculoskeletal conditions',
      'ENT: Ear, nose, and throat disorders',
      'Dermatology: Skin conditions and dermatological care',
      "Gynecology: Women's health and reproductive care",
      'Neurology: Nervous system and brain health',
      'Coordinated care with primary physicians',
    ],
    whatToExpect: [
      'Referral from your primary care physician (recommended)',
      'Specialized examination and assessment',
      'Advanced diagnostic tests if needed',
      'Detailed explanation of your condition',
      'Specialized treatment plan',
      'Coordination with your primary care team',
    ],
    whenToVisit: [
      'When referred by your primary care physician',
      'Complex or persistent symptoms requiring specialist expertise',
      'Chronic conditions needing specialized management',
      'Second opinion consultations',
      'Follow-up care for specialized treatments',
    ],
  },
  'outpatient-services': {
    title: 'Outpatient Services',
    shortDescription:
      'Same-day diagnostics, wound care, infusions, and follow-up visits without admission.',
    fullDescription:
      'Our Outpatient Services provide convenient, same-day medical care without the need for hospital admission. From diagnostic procedures to therapeutic treatments, we deliver comprehensive care that fits your schedule.',
    features: [
      'Same-day diagnostic procedures and tests',
      'Wound care and dressing changes',
      'Intravenous (IV) infusion therapy',
      'Minor procedures and treatments',
      'Post-operative follow-up visits',
      'Health monitoring and check-ups',
      'No overnight stay required',
    ],
    whatToExpect: [
      'Scheduled appointment or walk-in availability',
      'Quick registration and check-in process',
      'Efficient service delivery',
      'Clear instructions for post-procedure care',
      'Same-day discharge with follow-up instructions',
      'Billing and payment processing',
    ],
    whenToVisit: [
      'Follow-up appointments after procedures',
      'Wound care and dressing changes',
      'Infusion therapy sessions',
      'Diagnostic tests and screenings',
      'Minor medical procedures',
      'Health monitoring visits',
    ],
  },
  'minor-and-major-surgeries': {
    title: 'Minor & Major Surgeries',
    shortDescription:
      'Elective and emergency procedures in fully equipped theatres with attentive recovery care.',
    fullDescription:
      'Our surgical services encompass both minor and major procedures performed in state-of-the-art operating theatres. Our experienced surgical team provides safe, effective procedures with comprehensive pre and post-operative care.',
    features: [
      'Fully equipped modern operating theatres',
      'Experienced surgical teams and anesthesiologists',
      'Minor procedures: biopsies, excisions, endoscopies',
      'Major surgeries: abdominal, orthopedic, gynecological',
      'Laparoscopic and minimally invasive options',
      'Pre-operative assessments and consultations',
      'Post-operative recovery and monitoring',
      '24/7 post-surgical support',
    ],
    whatToExpect: [
      'Pre-operative consultation and assessment',
      'Pre-surgical instructions and preparations',
      'Safe anesthesia and monitoring during surgery',
      'Recovery room care immediately after procedure',
      'Post-operative monitoring and pain management',
      'Discharge instructions and follow-up care plan',
      'Scheduled follow-up appointments',
    ],
    whenToVisit: [
      'When surgery is recommended by your physician',
      'Elective procedures for improved health',
      'Emergency surgical needs',
      'Second opinion on surgical options',
      'Pre-operative consultations',
    ],
  },
  ultrasonography: {
    title: 'Ultrasonography',
    shortDescription:
      'High-resolution imaging for obstetric, abdominal, thyroid, vascular, and musculoskeletal needs.',
    fullDescription:
      'Our Ultrasonography service provides high-resolution imaging using advanced ultrasound technology. Performed by experienced sonographers and interpreted by qualified radiologists, our imaging services support accurate diagnosis and treatment planning.',
    features: [
      'Obstetric ultrasounds: pregnancy monitoring and fetal development',
      'Abdominal imaging: liver, kidneys, gallbladder, and more',
      'Thyroid and neck ultrasounds',
      'Vascular studies: blood flow and circulation assessment',
      'Musculoskeletal imaging: joints, muscles, and soft tissues',
      'Pelvic and gynecological ultrasounds',
      'Pediatric imaging',
      'Real-time imaging with immediate preliminary results',
    ],
    whatToExpect: [
      'Appointment scheduling (some may require preparation)',
      'Preparation instructions if needed (fasting, full bladder, etc.)',
      'Comfortable imaging procedure',
      'Real-time viewing of images on screen',
      'Preliminary results discussion',
      'Formal report from radiologist within 24-48 hours',
      'Results shared with referring physician',
    ],
    whenToVisit: [
      'When referred by your physician for diagnostic imaging',
      'Pregnancy monitoring and fetal development checks',
      'Abdominal pain or organ function evaluation',
      'Thyroid or neck mass assessment',
      'Vascular circulation studies',
      'Musculoskeletal injury evaluation',
    ],
  },
  pharmacy: {
    title: 'Pharmacy',
    shortDescription:
      'Hospital-grade dispensary, medication counselling, and chronic therapy support on site.',
    fullDescription:
      'Our on-site Pharmacy provides convenient access to high-quality medications with professional pharmaceutical counseling. We stock a comprehensive range of medications and offer support for chronic disease management.',
    features: [
      'Hospital-grade medication dispensary',
      'Prescription and over-the-counter medications',
      'Medication counseling and education',
      'Chronic disease medication management',
      'Drug interaction reviews',
      'Medication adherence support',
      'Refill reminders and management',
      'Insurance billing support',
    ],
    whatToExpect: [
      'Present your prescription or request OTC medications',
      'Professional review of your medications',
      'Counseling on proper usage and side effects',
      'Insurance processing if applicable',
      'Clear medication labeling and instructions',
      'Availability of pharmacist for questions',
    ],
    whenToVisit: [
      'To fill prescriptions from our physicians',
      'Medication refills for chronic conditions',
      'Over-the-counter medication needs',
      'Medication counseling and questions',
      'Drug interaction concerns',
      'Medication adherence support',
    ],
  },
  'inpatient-services': {
    title: 'Inpatient Services',
    shortDescription:
      'Comfortable wards with 24/7 nursing, multidisciplinary rounds, and personalised rehab plans.',
    fullDescription:
      'Our Inpatient Services provide comprehensive hospital care in comfortable, well-equipped wards. With 24/7 nursing care, multidisciplinary medical teams, and personalized treatment plans, we ensure optimal recovery and comfort during your stay.',
    features: [
      'Comfortable, well-equipped patient rooms',
      '24/7 registered nursing care',
      'Multidisciplinary medical team rounds',
      'Personalized treatment and rehabilitation plans',
      'Pain management and comfort care',
      'Nutritional support and meal services',
      'Family visitation and support',
      'Discharge planning and home care coordination',
    ],
    whatToExpect: [
      'Admission process and room assignment',
      'Initial assessment by nursing and medical staff',
      'Regular physician visits and medical rounds',
      'Nursing care and monitoring throughout stay',
      'Meal service and dietary accommodations',
      'Rehabilitation services if needed',
      'Discharge planning and instructions',
      'Follow-up care coordination',
    ],
    whenToVisit: [
      'When hospitalization is medically necessary',
      'Post-surgical recovery requiring monitoring',
      'Serious illness requiring continuous care',
      'Complex medical conditions needing observation',
      'Rehabilitation and recovery programs',
    ],
  },
  laboratory: {
    title: 'Laboratory',
    shortDescription:
      'Accredited diagnostics spanning hematology, chemistry, microbiology, and rapid point-of-care tests.',
    fullDescription:
      'Our accredited Laboratory provides comprehensive diagnostic testing with fast, reliable results. From routine screenings to specialized tests, we support accurate diagnosis and treatment monitoring.',
    features: [
      'Hematology: Complete blood counts and blood analysis',
      'Clinical Chemistry: Metabolic panels and organ function tests',
      'Microbiology: Cultures and infectious disease testing',
      'Histology and Pathology services',
      'Rapid point-of-care testing',
      'Accredited quality standards',
      'Fast turnaround times',
      'Results available online or in-person',
    ],
    whatToExpect: [
      'Appointment or walk-in service',
      'Sample collection (blood, urine, etc.)',
      'Professional, comfortable collection process',
      'Clear instructions for any special preparations',
      'Results typically available within 24-48 hours',
      'Results shared with your physician',
      'Access to results through patient portal or in-person',
    ],
    whenToVisit: [
      'When ordered by your physician',
      'Routine health screenings and check-ups',
      'Diagnostic testing for symptoms',
      'Monitoring of chronic conditions',
      'Pre-operative testing',
      'Follow-up testing after treatment',
    ],
  },
  'maternity-services': {
    title: 'Maternity Services',
    shortDescription:
      'Antenatal classes, delivery suites, postnatal recovery, newborn screenings, and lactation support.',
    fullDescription:
      'Our Maternity Services provide comprehensive care throughout your pregnancy journey, from conception through delivery and beyond. We offer compassionate, family-centered care in a supportive environment.',
    features: [
      'Antenatal care and pregnancy monitoring',
      'Antenatal education classes',
      'Modern delivery suites with experienced midwives',
      'Postnatal recovery and care',
      'Newborn health screenings and assessments',
      'Lactation support and breastfeeding counseling',
      'Postpartum care and support',
      'Family-centered approach to care',
    ],
    whatToExpect: [
      'Regular antenatal visits throughout pregnancy',
      'Ultrasound scans and fetal monitoring',
      'Antenatal classes for expectant parents',
      'Comfortable delivery experience',
      'Immediate newborn care and bonding',
      'Postnatal recovery support',
      'Newborn health checks and vaccinations',
      'Ongoing support for new families',
    ],
    whenToVisit: [
      "When you discover you're pregnant",
      'Regular antenatal check-ups',
      'Antenatal education classes',
      'Labor and delivery',
      'Postnatal recovery visits',
      'Newborn health screenings',
      'Lactation support needs',
    ],
  },
  'online-consultation': {
    title: 'Online Consultation',
    shortDescription:
      'Secure virtual visits for follow-ups, prescription renewals, and health coaching wherever you are.',
    fullDescription:
      'Our Online Consultation service brings healthcare to you through secure, convenient virtual visits. Perfect for follow-ups, prescription renewals, and health consultations from the comfort of your home or office.',
    features: [
      'Secure, HIPAA-compliant video consultations',
      'Follow-up appointments and check-ins',
      'Prescription renewals and medication reviews',
      'Health coaching and counseling',
      'Test result discussions',
      'Convenient scheduling',
      'Access from anywhere with internet',
      'Reduced travel and wait times',
    ],
    whatToExpect: [
      'Easy online appointment booking',
      'Secure video link sent before appointment',
      'Virtual consultation with your physician',
      'Discussion of health concerns and questions',
      'Prescription sent to pharmacy if needed',
      'Follow-up recommendations',
      'Secure messaging for questions',
    ],
    whenToVisit: [
      'Follow-up appointments after in-person visits',
      'Prescription renewals',
      'Minor health concerns and questions',
      'Medication reviews and adjustments',
      'Test result discussions',
      'Health coaching and lifestyle counseling',
      'When in-person visit is not convenient',
    ],
  },
};

export default function ServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
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

  if (!serviceSlug || !serviceDetails[serviceSlug]) {
    return (
      <section className="py-16" ref={revealRef}>
        <Helmet>
          <title>Service Not Found | Gallena Medical Centre</title>
        </Helmet>
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-4">Service Not Found</h1>
            <p className="muted mb-6">The service you're looking for doesn't exist.</p>
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const service = serviceDetails[serviceSlug];

  return (
    <section className="py-16" ref={revealRef}>
      <Helmet>
        <title>{service.title} | Gallena Medical Centre</title>
        <meta name="description" content={service.fullDescription} />
      </Helmet>
      <div className="container-1120">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/services" className="text-brand-blue hover:underline mb-4 inline-block">
              ← Back to Services
            </Link>
          </div>

          <div className="reveal-up opacity-0 translate-y-3 transition">
            <h1 className="text-4xl font-semibold mb-4">{service.title}</h1>
            <p className="text-lg muted mb-8">{service.fullDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="card card-3d reveal-up opacity-0 translate-y-3 transition">
              <h2 className="text-2xl font-semibold mb-4 text-brand-blue">What We Offer</h2>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card card-3d reveal-up opacity-0 translate-y-3 transition">
              <h2 className="text-2xl font-semibold mb-4 text-brand-blue">What to Expect</h2>
              <ul className="space-y-2">
                {service.whatToExpect.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card card-3d reveal-up opacity-0 translate-y-3 transition mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-brand-blue">When to Visit</h2>
            <ul className="space-y-2">
              {service.whenToVisit.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-brand-green mr-2">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.additionalInfo && (
            <div className="card card-3d reveal-up opacity-0 translate-y-3 transition mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-brand-blue">
                Additional Information
              </h2>
              <p className="muted">{service.additionalInfo}</p>
            </div>
          )}

          <div className="text-center reveal-up opacity-0 translate-y-3 transition">
            <Link to="/#consultation" className="btn btn-primary btn-3d mr-4">
              Book Consultation
            </Link>
            <Link to="/services" className="btn btn-outline btn-3d">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
