// Product / What I Did — projects by role. Source: pack §3.
// Client names desensitized per pack §🏷️. Four elements are DRAFT (replace as refined).

export type RoleKey = 'pm' | 'pjm' | 'bi';

export interface ProjectElement {
  design?: string;
  tech?: string;
  eval?: string;
  impact?: string;
  background?: string;
  actions?: string;
  method?: string;
  effect?: string;
}

export interface Project {
  id: string; // anchor + [VIDEO-*] base
  role: RoleKey;
  title: string;
  client: string; // desensitized label or employer
  videoId: string;
  outputImageId: string;
  tier: 'S' | 'A';
  signature?: boolean;
  elements: ProjectElement;
}

export const roles: { key: RoleKey; label: string }[] = [
  { key: 'pm', label: 'Product Manager' },
  { key: 'pjm', label: 'Project Management' },
  { key: 'bi', label: 'Business Intelligence / Data Analyst' },
];

export const projects: Project[] = [
  {
    id: 'pm-citic-multiagent',
    role: 'pm',
    title: 'Multi-Agent Credit Intelligence System',
    client: 'a national joint-stock commercial bank (DiPEAK)',
    videoId: '[VIDEO-PM-02]',
    outputImageId: '[IMG-pm-citic-output]',
    tier: 'S',
    signature: true,
    elements: {
      design:
        'Split the credit-analysis job across three scoped agents so each has a clear handoff and a human stays at the decision point.',
      tech:
        'AskBI query engine (10,000+ metrics, cross-dimensional customisation) → data-analysis agent → credit-analysis agent (unstructured data + behavioural model outputs) → report-synthesis agent. Pipeline: source data → metric layer → agent → analyst interface. Hybrid RAG retrieval.',
      eval:
        'Multi-round output compression + validation; human-override as labeled signal; interactive customisation preserved analyst judgment.',
      impact:
        '~40% reduction in analysts’ baseline workload; repetitive query/formatting work eliminated.',
    },
  },
  {
    id: 'pm-agent-platform',
    role: 'pm',
    title: 'Enterprise AI Agent Platform 0→1',
    client: 'ZiDongTaiChu (CAS)',
    videoId: '[VIDEO-PM-01]',
    outputImageId: '[IMG-pm-agent-output]',
    tier: 'A',
    elements: {
      design:
        'Refused to chase "general enterprise" or "pure SMB"; anchored on two defensible segments (enterprise IT BPs; research scientists with existing scripts). Segmentation drove every feature priority.',
      tech:
        'Low-code agent builder over MCP / A2A / Skill ecosystems; 200+ connected resources; shared knowledge-base + business-data layer designed as the durable asset under a narrowing platform ceiling.',
      eval:
        'Repeatable per-update evaluation (migration cost × performance uplift × breadth/depth), run as focused vertical case studies rather than abstract scoring.',
      impact:
        '10+ teams shipping agents; deployment < 1 day; 90%+ on-time across 6 monthly releases; ¥11.15M contracts (65%+ of pure-software revenue).',
    },
  },
  {
    id: 'pm-rag-eval',
    role: 'pm',
    title: 'Multimodal RAG Knowledge Product',
    client: 'ZiDongTaiChu (CAS)',
    videoId: '[VIDEO-PM-03]',
    outputImageId: '[IMG-pm-rag-output]',
    tier: 'A',
    elements: {
      design: 'Serve two masters — give algorithm a clear iterative target, give product a defensible go/no-go.',
      tech:
        'Structured matrix = question type × input modality × output modality (~20 cases/scenario/vertical); externally annotated ground truth; noise + semantic-interference sets.',
      eval: 'R@5 retrieval, citation accuracy, faithfulness; results fed back into pipeline/quantisation (−30% per-instance resource).',
      impact: 'R@5 90–95% in high-sensitivity use cases; became the company standard verification methodology; supported ¥50M+ pipeline.',
    },
  },
  {
    id: 'pm-catl-rag',
    role: 'pm',
    title: 'Multimodal RAG Quality Intelligence System',
    client: 'a global EV-battery leader (CAS)',
    videoId: '[VIDEO-PM-04]',
    outputImageId: '[IMG-pm-catl-output]',
    tier: 'A',
    elements: {
      design: 'Surface defect root causes in real time on battery-cell lines by fusing visual defect detection with technical-doc retrieval.',
      tech: 'Multimodal RAG across image + text + structured data.',
      eval: '90–95% retrieval accuracy on quality-inspection queries.',
      impact: 'Reduced manual QC documentation lookup; improved first-pass defect identification.',
    },
  },
  {
    id: 'pjm-ningxia-bid',
    role: 'pjm',
    title: '€38M Government Computing-Hub Bid',
    client: "a provincial node of China's national computing-hub program (CAS)",
    videoId: '[VIDEO-PJM-01]',
    outputImageId: '[IMG-pjm-ningxia-output]',
    tier: 'A',
    elements: {
      background:
        'One of China’s 8 national computing-hub nodes ("Eastern Data, Western Computing"); ¥1.2B/€38M 5-year pipeline; zero prior gov-platform experience and unable to match competitors’ heavy-asset commitments.',
      actions:
        'Reframed competition from "who invests more" to "who makes existing infrastructure more valuable" (compute-token monetisation, cross-cluster scheduling, green computing). Built a 5-workstream PMO from zero; integrated 27 local data centres supply-side; ran 2 weeks of closed-door mock expert-panel Q&A.',
      method: 'Modular workstreams (architecture / supply integration / hub partnerships / policy); explicit risk modeling.',
      effect: 'Won the panel on presentation day; Yinchuan subsidiary established.',
    },
  },
  {
    id: 'pjm-tbea-smartfactory',
    role: 'pjm',
    title: 'AI Factory Intelligence Platform',
    client: 'a major power-equipment & energy group (Deloitte)',
    videoId: '[VIDEO-PJM-02]',
    outputImageId: '[IMG-pjm-tbea-output]',
    tier: 'A',
    elements: {
      background: 'Operational assessment + AI factory platform design (production scheduling, energy mgmt, QC); Board-level investment decision.',
      actions: 'Core team member; built ROI quantification models; drove full delivery lifecycle with cost/QA/schedule control.',
      method: 'Strategy → business case → ROI model → delivery; cross-functional coordination.',
      effect: '+15% SCM on-time delivery, +10% capacity (post-implementation validated); group-level "Best Digital Practice" award.',
    },
  },
  {
    id: 'bi-citic-metrics',
    role: 'bi',
    title: 'Metric System & AskBI Query Engine',
    client: 'a national joint-stock commercial bank (DiPEAK)',
    videoId: '',
    outputImageId: '',
    tier: 'A',
    elements: {
      design: 'A metric layer that an agent (and an analyst) can query in natural language across 10,000+ metrics with cross-dimensional customisation.',
      tech: 'source data → cleaning → dimension definition → metric layer → analysis definition → result extraction. Hybrid RAG over structured + unstructured.',
      eval: 'Output validation loop; ~40% workload reduction while preserving human decision authority.',
      impact: 'Productionised from demo; analyst interface adopted in smart-lending. Drives the Metric-Tree explorer below.',
    },
  },
  {
    id: 'bi-ifrs17',
    role: 'bi',
    title: 'IFRS 17 Consolidation Upgrade',
    client: 'a state-owned reinsurance group (Deloitte)',
    videoId: '',
    outputImageId: '',
    tier: 'A',
    elements: {
      design: 'Cross-jurisdictional business-finance rule updates across 40+ regional entities (Asia/Europe/Americas).',
      tech: 'Sole owner of UK-subsidiary consolidated-reporting data requirements + end-to-end workflow; ERP GL consolidation logic design, validation, system upgrade, testing.',
      eval: 'Consolidation logic validation under new standard; cross-border coordination with EU/US finance execs.',
      impact: 'Delivered UK consolidation workflow; supported group rollout.',
    },
  },
];

export const projectsByRole = (role: RoleKey) => projects.filter((p) => p.role === role);
