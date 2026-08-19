// Home capability highlight cards. Source: pack §CAP-1..4.
export interface Capability {
  id: string;
  title: string;
  body: string;
}

export const capabilities: Capability[] = [
  {
    id: 'CAP-1',
    title: 'Enterprise Agent Platforms, 0→1',
    body: 'Built a low-code platform and hands-on helped 10+ enterprise teams ship their own agents (200+ connected resources), supporting millions in contracts.',
  },
  {
    id: 'CAP-2',
    title: 'RAG & Evaluation You Can Trust',
    body: 'Designed multimodal RAG evaluation frameworks from zero; lifted R@5 retrieval to 90–95% in high-sensitivity use cases.',
  },
  {
    id: 'CAP-3',
    title: 'Data Agents for Regulated Industries',
    body: 'Delivered NL-to-data agents (AskBI) for a national bank; cut analyst baseline workload by ~40% while keeping humans at the decision point.',
  },
  {
    id: 'CAP-4',
    title: 'Strategy → Delivery, Full Stack',
    body: 'From Deloitte digital strategy to a millions-scale infrastructure bid; PMO design, cost modeling, and hands-on Python/SQL in the same career.',
  },
];

// Section summary cards (the home "table of contents"). Source: Build Prompt §4.4.
export interface SectionCard {
  href: string;
  label: string;
  blurb: string;
}

export const sectionCards: SectionCard[] = [
  {
    href: '/profile',
    label: 'Profile',
    blurb: 'An interactive résumé — who I am, and the thesis behind how I work with AI.',
  },
  {
    href: '/product',
    label: 'Product',
    blurb: 'What I built, by role: agent platforms, multi-agent systems, RAG evaluation, BI.',
  },
  {
    href: '/offer',
    label: 'What I Offer',
    blurb: 'Three layers of value — strategy, business operations, and product execution.',
  },
  {
    href: '/contact',
    label: 'Contact',
    blurb: 'Open to AI product, strategy, data, and delivery roles. Let’s talk.',
  },
];
