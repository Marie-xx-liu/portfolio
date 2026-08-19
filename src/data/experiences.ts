// Experience timeline. Source: content-and-assets-pack-v3 §Profile.
// Client names desensitized per pack §🏷️. Numbers are interview-defensible only.

export interface Stat {
  value: number;
  valueTo?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface Experience {
  id: string;
  org: string; // display name (employer — may show logo)
  logoId: string; // [LOGO-*] placeholder id
  role: string;
  dates: string;
  location: string;
  keyFeature: string;
  stats: Stat[];
  responsibilities: string[];
  projects: string[];
  outcomes: string[];
  modalText: string;
  modalImageId: string; // [IMG-EXP-*]
  productAnchor?: string; // deep-link into /product#<anchor>
}

export const experiences: Experience[] = [
  {
    id: 'EXP-ZDT',
    org: 'ZiDongTaiChu (Chinese Academy of Sciences)',
    logoId: '[LOGO-ZDT]',
    role: 'Senior Product Manager — AI Strategy & Solutions',
    dates: '2024.11 – 2026.05',
    location: 'Beijing',
    keyFeature: 'Owned an enterprise AI Agent platform 0→1 and a €38M government bid.',
    stats: [
      { value: 11.15, decimals: 2, prefix: '¥', suffix: 'M', label: 'Contracts' },
      { value: 90, valueTo: 95, suffix: '%', label: 'R@5 retrieval' },
      { value: 38, prefix: '€', suffix: 'M', label: 'Bid pipeline' },
    ],
    responsibilities: [
      'Product owner of the Agent platform line: strategy, roadmap, cross-team delivery, commercial handoff',
      "Set the company's first multimodal RAG evaluation standard",
      'General coordinator for a provincial computing-hub bid (PMO, expert-panel presenter)',
    ],
    projects: [
      'Agent Platform 0→1',
      'Multimodal RAG Eval',
      'RAG QC (a global EV-battery leader)',
      'Computing-hub Blueprint (€38M)',
    ],
    outcomes: [
      '10+ B2B teams shipping agents; deployment time < 1 day; 200+ connected resources',
      '90%+ on-time release across 6 consecutive monthly versions',
      'Won the provincial expert-panel evaluation; established Yinchuan subsidiary',
    ],
    modalText:
      'At a CAS-incubated LLM company where the algorithm roadmap sat with the research institute, I owned the Agent platform with no precedent inside the company and no authority over the underlying models. I anchored the roadmap on two defensible segments — enterprise IT BPs and research scientists automating their own scripts — and built a repeatable framework to decide which ecosystem standards (MCP / A2A / Skill) were worth integrating as the stack churned. The platform let 10+ teams ship agents and supported ¥11.15M in contracts. I then carried that vertical fluency into solution design, coordinating a €38M government computing-hub bid we won at panel.',
    modalImageId: '[IMG-EXP-ZDT]',
    productAnchor: 'pm-agent-platform',
  },
  {
    id: 'EXP-DIPEAK',
    org: 'DiPEAK',
    logoId: '[LOGO-DIPEAK]',
    role: 'AI Product Manager — Data Agent',
    dates: '2023.11 – 2024.11',
    location: 'Beijing',
    keyFeature: "Built AI Data Agents (AskBI) for China's national banking sector.",
    stats: [
      { value: 15, prefix: '+', suffix: '%', label: 'Product satisfaction' },
      { value: 10000, suffix: '+', label: 'Metrics' },
      { value: 40, suffix: '%', label: 'Analyst workload cut' },
    ],
    responsibilities: [
      'Owned end-to-end lifecycle of a financial-analysis Agent solution (demo → production)',
      'Engineered a hybrid RAG retrieval architecture',
      'Drove model / metric / architecture / UI improvements',
    ],
    projects: ['Multi-Agent Credit Intelligence (AskBI) — a national joint-stock commercial bank'],
    outcomes: [
      'Multi-agent system live for smart-lending at a national bank; ~40% reduction in analyst baseline workload',
      'Interactive customisation layer kept human judgment at the decision point',
    ],
    modalText:
      'At a Series-B startup founded by a former Google Graph Search lead, I owned a data-analysis Agent for the national banking sector. The hardest part wasn’t retrieval — it was deciding what to automate and what to leave to the analyst. I shipped a three-agent system on top of AskBI, our in-house query engine over 10,000+ metrics: a data-analysis agent, a credit-analysis agent, and a report-synthesis agent. Multi-round output compression and validation cut analysts’ baseline workload by ~40%, while an interactive customisation layer preserved human judgment exactly where a credit decision is made.',
    modalImageId: '[IMG-EXP-DIPEAK]',
    productAnchor: 'pm-citic-multiagent',
  },
  {
    id: 'EXP-DELOITTE',
    org: 'Deloitte Consulting',
    logoId: '[LOGO-DELOITTE]',
    role: 'Digital Consultant — Enterprise Intelligence',
    dates: '2022.09 – 2023.11',
    location: 'Beijing',
    keyFeature: 'Digital strategy → delivery across manufacturing & energy clients.',
    stats: [
      { value: 15, prefix: '+', suffix: '%', label: 'SCM on-time' },
      { value: 10, prefix: '+', suffix: '%', label: 'Capacity' },
    ],
    responsibilities: [
      'End-to-end operational analysis & digital design for manufacturing clients',
      'Led cross-functional teams through full Smart Factory implementation (cost/QA/schedule control)',
      'Digital strategy research & report for a national energy client',
    ],
    projects: [
      'AI Factory Intelligence (a major power-equipment & energy group)',
      'IFRS 17 Consolidation (a state-owned reinsurance group)',
    ],
    outcomes: [
      '+15% SCM on-time delivery, +10% production capacity (validated post-implementation)',
      'Group-level "Best Digital Practice" award',
    ],
    modalText:
      'Deloitte gave me access — to how senior executives reason about transformation, and to the full lifecycle of a major project, from strategy blueprint through architecture, delivery, training, and operations. I ran operational analysis for manufacturing clients and led a Smart Factory build that delivered +15% on-time SCM and +10% capacity, recognised with a group-level "Best Digital Practice" award. I left because I kept advising on AI systems I hadn’t built — so I went inside to build them.',
    modalImageId: '[IMG-EXP-DELOITTE]',
    productAnchor: 'pjm-tbea-smartfactory',
  },
];

// Earlier roles — compact cards at the timeline tail.
export const earlierRoles = [
  { org: 'AWS', role: 'Data Analyst Intern (Python)', dates: '2021.07 – 2021.12', location: 'Beijing' },
  { org: 'Deutsche Post DHL HQ', role: 'Business Analyst Intern (Power BI)', dates: '2020.02 – 2020.08', location: 'Bonn' },
  { org: 'AIESEC', role: 'VP Marketing, Local Chapter', dates: '2018 – 2019', location: 'Bonn' },
];

export const education = [
  { degree: 'M.Sc. Data Science & Business Analytics', school: 'Bocconi University', dates: '2020–2022 · Milan', note: 'Graduate Scholarship' },
  { degree: 'B.Sc. Business Economics (German Track)', school: 'Bonn-Rhein-Sieg University', dates: '2017–2020 · Bonn', note: '' },
  { degree: 'B.Sc. Business Economics (Sino Track)', school: 'Hunan University', dates: '2015–2017', note: 'Sino-German Dual Degree · First-Class Scholarship' },
];

export const skills = {
  'AI Product': ['AI product strategy & roadmap', 'LLM Agent design (MCP, A2A)', 'RAG architecture & evaluation', 'Multi-agent systems (AutoGen, LangChain)'],
  Tools: ['Python', 'SQL', 'Power BI', 'Stata', 'SAP', 'LLM fine-tuning (Python)'],
  Certs: ['PMP', 'ACCA F1', 'ACCA F3'],
  Languages: ['Mandarin C2', 'German C1', 'English C1', 'Italian B1', 'Dutch A2'],
  Interests: ['Tennis', 'Trail Running', '100 KM Ultramarathon Finisher'],
};
