import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  canonical?: string;
}

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';
const DEFAULT_IMAGE = `${SITE_URL}/logo2.jpg`;
const DEFAULT_DESCRIPTION =
  'Gallena Medical Centre offers comprehensive healthcare: general medicine, dental, maternity, surgery, and more. Book a consultation today.';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  canonical,
}: SEOProps) {
  const fullTitle = title.includes('Gallena') ? title : `${title} | Gallena Medical Centre`;
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const canonicalUrl = canonical || fullUrl;

  // Medical Organization Structured Data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Gallena Medical Centre',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo2.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Valley View Estate - Kitagobwa, Buwambo Rd',
      addressLocality: 'Wakiso',
      addressCountry: 'UG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+256-787-992-588',
      contactType: 'Customer Service',
      email: 'gallenamedicalcentre@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: [`https://wa.me/256787992588`, `mailto:gallenamedicalcentre@gmail.com`],
    medicalSpecialty: [
      'General Medicine',
      'Dentistry',
      'Maternity Care',
      'Surgery',
      'Pediatrics',
      'Cardiology',
      'Orthopedics',
    ],
  };

  // LocalBusiness Schema (for Google Business Profile)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Gallena Medical Centre',
    image: `${SITE_URL}/logo2.jpg`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+256-787-992-588',
    email: 'gallenamedicalcentre@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Valley View Estate - Kitagobwa, Buwambo Rd',
      addressLocality: 'Wakiso',
      addressRegion: 'Wakiso',
      postalCode: '',
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '0.4378043',
      longitude: '32.5614754',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        {!noindex && <meta name="robots" content="index, follow" />}

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Open Graph Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="Gallena Medical Centre" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Additional Meta Tags */}
        <meta name="author" content="Gallena Medical Centre" />
        <meta
          name="keywords"
          content="medical centre, healthcare, hospital, doctor, medical services, Uganda, Wakiso"
        />
      </Helmet>

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    </>
  );
}
