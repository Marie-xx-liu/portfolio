// src/data/library.ts
// Content & Assets — Library seed（已搜索补齐 v1）
//
// 说明：
// 1) source / sourceName 均为已核实的真实出处与链接（2026-06 检索）。
// 2) maturity 是我的判定（Marie 复核）。两个判断分歧点：
//    - human-centered-ai：我标 consensus（Shneiderman/Stanford 已立），但其 AI 化落地仍在演进，你也可改 emerging。
//    - appropriate-reliance：产品实践层面我标 emerging，但它在 HCI 学界其实已较成熟，你也可改 consensus。
// 3) note 字段是【MOCK——我替你写的"你的理解 + 短评"占位，请替换】。写成了你的口吻/视角，部分接了你的
//    时间杠杆 / RAG / multi-agent / 指标体系经验，方便你改成真实观点。
// 4) Maturity = 'consensus' | 'emerging' | 'synthesis'；Layer = 1 哲学 | 2 决策 | 3 AI-Native | 4 执行 | null 资源。

export interface LibraryEntry {
  id: string;
  title: string;
  type: 'framework' | 'paper' | 'podcast' | 'talk' | 'book' | 'blog' | 'tool';
  layer: 1 | 2 | 3 | 4 | null;
  maturity: 'consensus' | 'emerging' | 'synthesis';
  problem: string;
  note: string;          // MOCK，待替换
  relatedTo: string[];
  relation?: string;
  tags: string[];
  source?: string;
  sourceName?: string;
  addedAt?: string;
}

export const library: LibraryEntry[] = [
  // ───────────────────────── Layer 1 · Philosophy (Why) ─────────────────────────
  {
    id: 'jtbd',
    title: 'Jobs to Be Done (JTBD)',
    type: 'framework', layer: 1, maturity: 'consensus',
    problem: '用户"雇佣"产品去完成的真实进展是什么——而非用户是谁。',
    note: 'MOCK｜需求是稳定的，产品是易变的。我用它对抗"功能堆砌"：先问用户雇我去完成什么进展，再谈方案。',
    relatedTo: ['odi', 'ost'],
    tags: ['discovery', 'needs', 'innovation'],
    sourceName: 'Tony Ulwick（1990 首创）· Christensen et al.（HBR, 2016 普及）',
    source: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done',
  },
  {
    id: 'odi',
    title: 'Outcome-Driven Innovation (ODI)',
    type: 'framework', layer: 1, maturity: 'consensus',
    problem: '把模糊的"需求/进展"拆成可量化、可排序的 outcome 指标。',
    note: 'MOCK｜JTBD 的可落地版本——它解决了 JTBD"好懂但难执行"的问题：把进展变成能打分、能优先级排序的指标。',
    relatedTo: ['jtbd', 'north-star'],
    relation: '把 JTBD 操作化为可度量的 outcome',
    tags: ['discovery', 'metrics', 'prioritization'],
    sourceName: 'Tony Ulwick / Strategyn',
    source: 'https://strategyn.com/jobs-to-be-done/',
  },
  {
    id: 'human-centered-ai',
    title: 'Human-Centered AI (HCAI)',
    type: 'framework', layer: 1, maturity: 'consensus',
    problem: '让 AI 增强而非替代人，并保持有意义的人类控制。',
    note: 'MOCK｜"增强而非替代"是我做 agent 的设计底线：把人留在判断点上。比"AI 能不能做"更重要的是"该不该全自动"。',
    relatedTo: ['appropriate-reliance', 'hitl', 'autonomy-levels'],
    tags: ['ai', 'ethics', 'design-philosophy'],
    sourceName: 'Ben Shneiderman（2020/2022）· Stanford HAI',
    source: 'https://hai.stanford.edu/ai-definitions/what-is-human-centered-ai',
  },

  // ───────────────────────── Layer 2 · Decision & Org ─────────────────────────
  {
    id: 'one-way-door',
    title: 'One-way / Two-way Door',
    type: 'framework', layer: 2, maturity: 'consensus',
    problem: '决策审慎度应匹配"可逆性"，而非匹配"重要性"。',
    note: 'MOCK｜大公司最常见的病：把 two-way door 当 one-way door 来开，于是慢、不敢试。可逆的快决、不可逆的慎决。',
    relatedTo: ['ooda', 'cair'],
    tags: ['decision', 'reversibility', 'leadership'],
    sourceName: 'Jeff Bezos（Amazon 2015 致股东信）',
    source: 'https://s2.q4cdn.com/299287126/files/doc_financials/annual/2015-Letter-to-Shareholders.PDF',
  },
  {
    id: 'ooda',
    title: 'OODA Loop',
    type: 'framework', layer: 2, maturity: 'consensus',
    problem: '在不确定中靠"决策节奏"快过对手取得优势。',
    note: 'MOCK｜胜负手是 Orient（重定向），也是最常被跳过的一步。优势来自循环转得比对手快，而非单点决策更聪明。',
    relatedTo: ['one-way-door'],
    tags: ['decision', 'tempo', 'strategy'],
    sourceName: 'John Boyd（1970s–1995《Essence of Winning and Losing》）',
    source: 'https://en.wikipedia.org/wiki/OODA_loop',
  },
  {
    id: 'high-leverage',
    title: 'High-Leverage Activity',
    type: 'framework', layer: 2, maturity: 'consensus',
    problem: '管理者产出=团队产出；杠杆在于少数高杠杆动作。',
    note: 'MOCK｜我的"时间杠杆"其实是把 Grove 这个个人/团队尺度的洞察，推到组织与制度尺度。',
    relatedTo: ['time-lever'],
    tags: ['management', 'leverage', 'productivity'],
    sourceName: 'Andy Grove,《High Output Management》(1983)',
    source: 'https://addyosmani.com/blog/high-leverage-activites/',
  },
  {
    id: 'wardley',
    title: 'Wardley Mapping',
    type: 'framework', layer: 2, maturity: 'consensus',
    problem: '按价值链 × 演化阶段做战略定位（自建/外包/商品化）。',
    note: 'MOCK｜战略的前提是 situational awareness。把价值链按演化铺开，能看清下一个商品化浪潮在哪、该在哪下注。',
    relatedTo: [],
    tags: ['strategy', 'value-chain', 'evolution'],
    sourceName: 'Simon Wardley（2005）',
    source: 'https://learnwardleymapping.com/introduction/',
  },

  // ───────────────────────── Layer 3 · AI Native ─────────────────────────
  {
    id: 'context-engineering',
    title: 'Context Engineering',
    type: 'framework', layer: 3, maturity: 'emerging',
    problem: '系统化设计喂给 LLM/agent 的完整上下文（写/选/压/隔离）。',
    note: 'MOCK｜Agent 失败大多不是模型失败，是上下文失败——和我做 RAG/multi-agent 的体感一致：真正的工程量在"喂什么、怎么压、怎么隔离"。',
    relatedTo: ['hitl'],
    tags: ['ai', 'llm', 'agents', 'prompting'],
    sourceName: 'Tobi Lütke / Andrej Karpathy（2025.6）· Anthropic / LangChain 体系化',
    source: 'https://github.com/bonigarcia/context-engineering',
  },
  {
    id: 'cair',
    title: 'CAIR — Confidence in AI Results',
    type: 'framework', layer: 3, maturity: 'emerging',
    problem: '衡量"用户敢不敢用"：CAIR = Value /(Risk × Correction)。',
    note: 'MOCK｜准确 ≠ 被采用。很多采用问题靠产品设计（可预览、可回滚、沙箱）解决，而不是靠提升模型——这点我在交付里反复验证。',
    relatedTo: ['appropriate-reliance', 'one-way-door'],
    tags: ['ai', 'adoption', 'trust', 'metric'],
    sourceName: 'LangChain — Assaf Elovic & Harrison Chase（2025）',
    source: 'https://blog.langchain.com/the-hidden-metric-that-determines-ai-product-success/',
  },
  {
    id: 'appropriate-reliance',
    title: 'Appropriate Reliance',
    type: 'framework', layer: 3, maturity: 'emerging',
    problem: '让人对 AI 的信任与其真实能力"校准"：该信时信、该疑时疑。',
    note: 'MOCK｜目标不是"更信任 AI"，而是信任校准——over-trust 和 under-trust 都是失败模式。这直接决定我把人工 gate 放在哪。',
    relatedTo: ['cair', 'hitl', 'autonomy-levels'],
    tags: ['ai', 'trust-calibration', 'hci'],
    sourceName: 'HCI trust-calibration 研究（Lee & See 2004 奠基）',
    source: 'https://link.springer.com/article/10.1007/s00146-025-02422-7',
  },
  {
    id: 'autonomy-levels',
    title: 'Levels of Autonomy',
    type: 'framework', layer: 3, maturity: 'emerging',
    problem: '把 AI 自主程度分级，作为可与"能力"解耦的设计决策。',
    note: 'MOCK｜借自动驾驶分级。先想清这个场景需要 L2 还是 L4，而不是默认追 L5——自主度是设计选择，不是能力上限。',
    relatedTo: ['hitl', 'human-centered-ai'],
    tags: ['ai', 'agents', 'autonomy', 'governance'],
    sourceName: '借自 SAE J3016；agent 5 级框架（Knight Columbia, 2025 等）',
    source: 'https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1',
  },
  {
    id: 'hitl',
    title: 'Human-in-the-loop',
    type: 'framework', layer: 3, maturity: 'consensus',
    problem: '在高代价/不可逆的决策点强制保留人工 gate。',
    note: 'MOCK｜它是 CAIR 与 appropriate reliance 的落地手段，也是我交付金融 agent 的硬约束：自动化 Labor，把判断留给人。',
    relatedTo: ['appropriate-reliance', 'autonomy-levels'],
    tags: ['ai', 'oversight', 'safety'],
    sourceName: '通用概念（supervisory control；Sheridan / Parasuraman 等）',
    // source: 你后续挑一篇你认可的参考补上
  },

  // ───────────────────────── Layer 4 · Execution & Growth ─────────────────────────
  {
    id: 'lean-startup',
    title: 'Lean Startup',
    type: 'book', layer: 4, maturity: 'consensus',
    problem: 'build-measure-learn：用 MVP 把猜测快速变成验证学习。',
    note: 'MOCK｜2026 的变化：build 几乎免费，差异化转移到"measure 得更准、learn 得更快"。MVP 是学习载体，不是缩水版产品。',
    relatedTo: ['ost', 'continuous-discovery'],
    tags: ['startup', 'mvp', 'experimentation'],
    sourceName: 'Eric Ries,《The Lean Startup》(2011)',
    source: 'https://theleanstartup.com/principles',
  },
  {
    id: 'ost',
    title: 'Opportunity Solution Tree (OST)',
    type: 'framework', layer: 4, maturity: 'consensus',
    problem: '从单一 outcome 出发，结构化连接机会→方案→实验。',
    note: 'MOCK｜它的价值在于强制在"目标"和"方案"之间插入"机会空间"这一层——避免一上来就跳到功能清单。',
    relatedTo: ['continuous-discovery', 'jtbd'],
    tags: ['discovery', 'prioritization', 'outcomes'],
    sourceName: 'Teresa Torres（2016；《Continuous Discovery Habits》2021）',
    source: 'https://www.producttalk.org/opportunity-solution-trees/',
  },
  {
    id: 'north-star',
    title: 'North Star Metric',
    type: 'framework', layer: 4, maturity: 'consensus',
    problem: '用一个反映客户价值的领先指标对齐全公司。',
    note: 'MOCK｜不能用收入这种滞后指标。配合 metric tree 拆成可操作的 input metrics——这正好接上我做指标体系/AskBI 的工作。',
    relatedTo: ['odi'],
    tags: ['metrics', 'growth', 'alignment'],
    sourceName: 'Sean Ellis 提出；North Star Framework（Amplitude / John Cutler）',
    source: 'https://amplitude.com/north-star',
  },
  {
    id: 'continuous-discovery',
    title: 'Continuous Discovery',
    type: 'framework', layer: 4, maturity: 'consensus',
    problem: '把"发现"从项目初期一次性调研，变成每周触达用户的习惯。',
    note: 'MOCK｜核心是把和用户接触做成常态而非阶段性动作；OST 是它的核心工件。发现的果实往往是"决定不做某事"省下的时间。',
    relatedTo: ['ost'],
    tags: ['discovery', 'research', 'habits'],
    sourceName: 'Teresa Torres,《Continuous Discovery Habits》(2021)',
    source: 'https://www.producttalk.org/',
  },

  // ───────────────────────── Synthesis（Marie 自己的推演，暖金）─────────────────────────
  {
    id: 'time-lever',
    title: 'Time Lever（时间杠杆）',
    type: 'blog', layer: 2, maturity: 'synthesis',
    problem: 'AI 的同等生产力增益，该兑换成"更少人"还是"更少时间"？',
    note: 'MOCK｜（我的推演）substitution trap（裁人→需求走弱→自我强化的下行）vs embedding dividend（保留人于判断层、再投资省下的时间），是制度选择而非技术必然。把 Grove 的个人杠杆推到组织/制度尺度。',
    relatedTo: ['high-leverage', 'human-centered-ai'],
    relation: '把 High-Leverage Activity 从个人尺度推到组织/制度尺度',
    tags: ['synthesis', 'economics', 'ai', 'org'],
    sourceName: 'Marie（synthesis）',
    source: '[AI-THESIS-URL]',
  },
];
