// Global identity, contact, and SEO data.
// Source: content-and-assets-pack-v3 §Global. Edit here to update site-wide.

export const site = {
  name: 'Marie Xiaoxu Liu',
  tagline: 'AI Product Manager · Business Analysis · Digital Transformation',
  // Keep in sync with `site` + `base` in astro.config.mjs.
  url: 'https://marie-xx-liu.github.io/portfolio',
  email: 'marie_liu2402@hotmail.com',
  location: 'Amsterdam, NL',
  // Default theme for the site shell. Phase 1 delivers both for comparison.
  defaultTheme: 'light' as 'light' | 'dark',
  social: {
    linkedin: 'https://www.linkedin.com/in/xiaoxu-liu-3b5211176/',
  },
  // Placeholder until provided — the "time lever" essay.
  aiThesisUrl: '#',
  // Placeholder until a Formspree/Netlify endpoint is provided.
  formEndpoint: '#',
} as const;

// Per-page <title>/description. Source: pack §SEO.
export const seo = {
  '/': {
    title: 'Marie Xiaoxu Liu — AI Product Manager | Strategy · Data · Delivery',
    description:
      'AI PM building enterprise agent platforms, data agents, and RAG evaluation from zero. Strategy-to-delivery across the AI stack.',
  },
  '/profile': {
    title: 'Profile — Marie Xiaoxu Liu | AI Product Manager',
    description:
      'Interactive résumé: enterprise agent platforms, multi-agent credit intelligence, RAG evaluation, and strategy-to-delivery experience.',
  },
  '/product': {
    title: 'Work — Agent Platforms, Multi-Agent Systems & RAG Evaluation | Marie Xiaoxu Liu',
    description:
      'Projects by role — Product Manager, Project Management, and Business Intelligence — with methodology for evaluating workflows, agents, multi-agent systems, and RAG.',
  },
  '/offer': {
    title: 'What I Offer — Strategy, Business & Product Value | Marie Xiaoxu Liu',
    description:
      'Three layers of value: corporate strategy, business operations, and product execution across the AI stack.',
  },
  '/library': {
    title: 'Library — Frameworks, Papers & Ideas | Marie Xiaoxu Liu',
    description:
      'A positioned knowledge map: product, strategy, and AI-native frameworks tagged by layer and maturity — consensus, emerging, and my own synthesis.',
  },
  '/contact': {
    title: 'Contact — Marie Xiaoxu Liu',
    description: 'Get in touch with Marie Xiaoxu Liu — AI Product Manager based in Amsterdam.',
  },
} as const;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marie Xiaoxu Liu',
  jobTitle: 'AI Product Manager',
  url: site.url,
  sameAs: [site.social.linkedin],
  alumniOf: ['Bocconi University', 'Bonn-Rhein-Sieg University', 'Hunan University'],
  knowsAbout: [
    'AI product management',
    'LLM agents',
    'RAG evaluation',
    'multi-agent systems',
    'digital transformation',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
  },
} as const;

// Primary nav. Source: Build Prompt §2.
export const nav = [
  { href: '/', label: 'Guide' },
  { href: '/profile', label: 'Profile' },
  { href: '/product', label: 'Product' },
  { href: '/offer', label: 'Offer' },
  { href: '/library', label: 'Library' },
  { href: '/contact', label: 'Contact' },
] as const;
