/**
 * Home-page composition.
 *
 * Maps the existing résumé data (experiences.ts / products.ts) onto the
 * reference site's section grammar:
 *
 *   hero → #work (employer chapters) → #other-work (2×2 grid)
 *        → #experience (voyage timeline) → #ahead → #contact
 *
 * Content is unchanged; only the arrangement is new. Every card that
 * points at a project id gets a detail page at /work/<id>.
 */
import { projects } from './products';

export interface WorkFeature {
  /** Project id → /work/<id>, or null for a card with no detail page. */
  project: string | null;
  title: string;
  blurb: string;
  /** Asset slot id — replace with a real image in public/work/. */
  asset: string;
  /** 486px vs 730px column of the reference's 1216 grid. */
  span: 'narrow' | 'wide';
  href?: string;
}

export interface WorkChapter {
  id: string;
  org: string;
  role: string;
  dates: string;
  /** Repeating strip under the header, as on the reference site. */
  marquee: string;
  headline: string;
  description: string;
  disciplines: string;
  myRole: string;
  features: WorkFeature[];
}

export const hero = {
  greeting: 'Hello! Welcome to my corner of the Web.',
  line: "I'm an AI Product Manager who has learned to read the current before setting a course, and who builds systems for the places where being right matters more than being fast.",
};

export const chapters: WorkChapter[] = [
  {
    id: 'zidongtaichu',
    org: 'ZiDongTaiChu',
    role: 'Senior Product Manager — AI Strategy & Solutions',
    dates: '2024.11 → 2026.05',
    marquee: 'Incubated by the Chinese Academy of Sciences',
    headline:
      'Taking an enterprise AI Agent platform from zero to ten teams shipping — with no precedent inside the company and no authority over the models underneath',
    description:
      'ZiDongTaiChu is a CAS-incubated large-model company where the algorithm roadmap sits with the research institute. I owned the Agent platform line end to end: strategy, roadmap, cross-team delivery, and commercial handoff. I anchored the roadmap on two defensible segments — enterprise IT business partners and research scientists automating their own scripts — and built a repeatable framework for deciding which ecosystem standards (MCP / A2A / Skill) were worth integrating as the stack churned underneath us.',
    disciplines:
      'AI Product Strategy · Agent Platform Design · RAG Evaluation · Roadmap · PMO · Pre-sales',
    myRole:
      'Product owner of the Agent platform line, author of the company’s first multimodal RAG evaluation standard, and general coordinator for a provincial computing-hub bid.',
    features: [
      {
        project: 'pm-agent-platform',
        title: 'Enterprise AI Agent Platform 0→1',
        blurb:
          'A low-code agent builder over the MCP / A2A / Skill ecosystems. 10+ B2B teams shipping their own agents, 200+ connected resources, deployment under a day.',
        asset: 'work/agent-platform',
        span: 'narrow',
      },
      {
        project: 'pm-rag-eval',
        title: 'Multimodal RAG Evaluation Framework',
        blurb:
          'A question-type × input-modality × output-modality matrix with externally annotated ground truth. Became the company standard verification methodology.',
        asset: 'work/rag-eval',
        span: 'wide',
      },
    ],
  },
  {
    id: 'dipeak',
    org: 'DiPEAK',
    role: 'AI Product Manager — Data Agent',
    dates: '2023.11 → 2024.11',
    marquee: 'Data agents for the national banking sector',
    headline:
      'Deciding what to automate — and what to leave to the analyst — inside a credit decision at a national bank',
    description:
      'At a Series-B startup founded by a former Google Graph Search lead, I owned a data-analysis Agent for the national banking sector. The hardest part was never retrieval. It was drawing the line between what the system should decide and what the analyst must. I shipped a three-agent system on top of AskBI, our in-house query engine over 10,000+ metrics, with an interactive customisation layer that preserved human judgment exactly where a credit decision is made.',
    disciplines:
      'Agent System Design · Hybrid RAG · Metric Modelling · NL-to-Data · Human-in-the-Loop',
    myRole:
      'Owned the end-to-end lifecycle of the financial-analysis Agent solution, from demo through production, including the hybrid retrieval architecture.',
    features: [
      {
        project: 'pm-citic-multiagent',
        title: 'Multi-Agent Credit Intelligence',
        blurb:
          'Three scoped agents — data analysis, credit analysis, report synthesis — with a clear handoff between each and a human at the decision point. ~40% cut in analyst baseline workload.',
        asset: 'work/credit-intelligence',
        span: 'wide',
      },
      {
        project: 'bi-citic-metrics',
        title: 'Metric System & AskBI Query Engine',
        blurb:
          'A metric layer an agent — or an analyst — can query in natural language across 10,000+ metrics with cross-dimensional customisation.',
        asset: 'work/askbi',
        span: 'narrow',
      },
    ],
  },
  {
    id: 'deloitte',
    org: 'Deloitte Consulting',
    role: 'Digital Consultant — Enterprise Intelligence',
    dates: '2022.09 → 2023.11',
    marquee: 'Digital strategy → delivery, manufacturing & energy',
    headline:
      'Watching how senior executives actually reason about transformation — then leaving to go build the systems I kept advising on',
    description:
      'Deloitte gave me access: to how executives reason about transformation, and to the full lifecycle of a major project — strategy blueprint through architecture, delivery, training, and operations. I ran operational analysis for manufacturing clients and led a Smart Factory build recognised with a group-level "Best Digital Practice" award. I left because I kept advising on AI systems I had not built.',
    disciplines:
      'Digital Strategy · Operational Analysis · ROI Modelling · Smart Factory · IFRS 17 · Delivery',
    myRole:
      'End-to-end operational analysis and digital design for manufacturing clients; led cross-functional teams through full Smart Factory implementation with cost, QA, and schedule control.',
    features: [
      {
        project: 'pjm-tbea-smartfactory',
        title: 'AI Factory Intelligence Platform',
        blurb:
          'Production scheduling, energy management, and QC for a major power-equipment group — carried from board-level investment case through validated delivery. +15% SCM on-time, +10% capacity.',
        asset: 'work/smart-factory',
        span: 'narrow',
      },
      {
        project: 'bi-ifrs17',
        title: 'IFRS 17 Consolidation Upgrade',
        blurb:
          'Cross-jurisdictional finance rule updates across 40+ regional entities. Sole owner of the UK subsidiary’s consolidated-reporting workflow, end to end.',
        asset: 'work/ifrs17',
        span: 'wide',
      },
    ],
  },
];

/** The 2×2 grid — work that sits outside the employer chapters. */
export const otherWork: WorkFeature[] = [
  {
    project: 'pjm-ningxia-bid',
    title: '€38M Computing-Hub Bid',
    blurb:
      'One of China’s eight national computing-hub nodes. Unable to match competitors on capital commitment, I reframed the competition from "who invests more" to "who makes existing infrastructure more valuable." Won at panel.',
    asset: 'work/computing-hub',
    span: 'narrow',
  },
  {
    project: 'pm-catl-rag',
    title: 'RAG Quality Intelligence',
    blurb:
      'Surfacing defect root causes in real time on battery-cell lines by fusing visual defect detection with technical-document retrieval, for a global EV-battery leader.',
    asset: 'work/quality-intelligence',
    span: 'narrow',
  },
  {
    project: null,
    href: '/library',
    title: 'The Library',
    blurb:
      'A positioned map of the frameworks, papers, and ideas I actually use — tagged by layer and by maturity: settled consensus, still emerging, or my own synthesis.',
    asset: 'work/library',
    span: 'narrow',
  },
  {
    project: null,
    title: 'Off the Clock',
    blurb:
      '100 KM ultramarathon finisher. Tennis, trail running, and five languages in various states of repair — Mandarin, German, English, Italian, and a hopeful amount of Dutch.',
    asset: 'work/off-the-clock',
    span: 'narrow',
  },
];

/** #experience — the compact voyage log, newest first. */
export const voyage = [
  { year: '2026', org: 'Open to the next crossing', note: 'AI product, strategy, data, and delivery roles. Based in Amsterdam.', now: true },
  { year: '2024 → 2026', org: 'ZiDongTaiChu', note: 'Enterprise agent platforms, RAG evaluation, and a €38M government bid' },
  { year: '2023 → 2024', org: 'DiPEAK', note: 'Multi-agent credit intelligence for the national banking sector' },
  { year: '2022 → 2023', org: 'Deloitte', note: 'Digital strategy and Smart Factory delivery across manufacturing and energy' },
  { year: '2021', org: 'AWS', note: 'Data analysis in Python, and a first look inside hyperscale infrastructure' },
  { year: '2020 → 2022', org: 'Bocconi', note: 'M.Sc. Data Science & Business Analytics, on a graduate scholarship' },
  { year: '2020', org: 'Deutsche Post DHL', note: 'Business analysis in Power BI at group headquarters in Bonn' },
  { year: '2017 → 2020', org: 'Bonn-Rhein-Sieg', note: 'B.Sc. Business Economics, German track. Learning to think in a second language' },
  { year: '2015 → 2017', org: 'Hunan University', note: 'Where it started. Sino-German dual degree, first-class scholarship' },
];

/** #ahead — the reference's "plotting a course" section, in her terms. */
export const ahead = {
  title: 'Plotting a course to the\nnext stretch of water',
  subtitle: 'Problems I want to spend the next few years on',
  themes: [
    {
      title: 'Evaluation as Product',
      body: 'Agent quality is still argued rather than measured. I want to build evaluation that a buyer trusts, an engineer can iterate against, and a regulator can read — the same artifact serving all three.',
    },
    {
      title: 'Human Authority in Automated Decisions',
      body: 'Not "human in the loop" as a compliance checkbox, but designing the specific moment where a person’s judgment is genuinely better than the system’s — and protecting it.',
    },
    {
      title: 'AI in Regulated Industries',
      body: 'Banking, energy, manufacturing. The places where being right matters more than being fast, and where the interesting product work is constraint design rather than feature design.',
    },
    {
      title: 'The Time Lever',
      body: 'What actually changes when a task drops from two days to two minutes. Most organisations bank the savings; the interesting ones spend it on work that was previously unaffordable.',
    },
  ],
};

/** Detail-page lookup used by /work/[slug]. */
export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
