import type { Progression } from "../types";

// Keyed by career ID. Covers all 31 careers.
// `track` lists levels from post-MBA entry upward.
// `likelihood` = realistic odds of reaching the top of the track.
// `likelihoodNote` = honest 1–2 sentence explanation of the bottlenecks.

export const PROGRESSIONS: Record<string, Progression> = {

  // ── Consulting ─────────────────────────────────────────────────
  "mbb-consulting": {
    track: [
      { title: "Senior Associate / Consultant", timeframe: "Years 0–2" },
      { title: "Engagement Manager", timeframe: "Years 2–4", note: "~50% of post-MBA starters" },
      { title: "Principal / Associate Principal", timeframe: "Years 4–7", note: "~25% of starters" },
      { title: "Partner", timeframe: "Years 7–12+", note: "~10–15% of starters" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Up-or-out culture means ~50% exit or are counseled out before reaching EM. Only 10–15% of post-MBA hires ever make Partner. That said, exit optionality at every level is exceptional — the brand travels.",
  },

  "boutique-consulting": {
    track: [
      { title: "Consultant / Senior Consultant", timeframe: "Years 0–2" },
      { title: "Manager / Senior Manager", timeframe: "Years 2–4" },
      { title: "Principal / Associate Partner", timeframe: "Years 4–7" },
      { title: "Partner", timeframe: "Years 7–12" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Less rigid up-or-out than MBB but still competitive for Partnership. Smaller firms mean fewer Partner slots; many strong performers exit to industry at Manager/Principal rather than chasing the full track.",
  },

  // ── Private Equity & Investing ─────────────────────────────────
  "pe-investing": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "Senior Associate / VP", timeframe: "Years 2–4" },
      { title: "Principal", timeframe: "Years 4–7" },
      { title: "Managing Director / Partner", timeframe: "Years 8–12+", note: "Carry requires reaching here" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "No guaranteed promotion track. Advancement depends on deal origination, judgment, and firm growth — many leave at VP or Principal for portfolio companies or other funds. Partnership (and real carry) is achieved by a small minority.",
  },

  "pe-portfolio-ops": {
    track: [
      { title: "Consultant / Senior Consultant", timeframe: "Years 0–2" },
      { title: "Manager / Director", timeframe: "Years 2–4" },
      { title: "VP / Principal", timeframe: "Years 4–7" },
      { title: "Partner / Head of Value Creation", timeframe: "Years 8–12+" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "More structured than the deal team with performance tied to portfolio outcomes. MBB pedigree accelerates early levels. Top performers earn carry; partner-level roles are fewer but the path is clearer than pure PE investing.",
  },

  "growth-equity": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "VP", timeframe: "Years 2–4" },
      { title: "Principal", timeframe: "Years 4–6" },
      { title: "Partner", timeframe: "Years 6–10+" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Consistent sourcing wins and a deal track record gate every promotion. Many Associates exit at VP to operating roles. Partner track is achievable but highly selective — sourcing ability is the differentiator.",
  },

  "hedge-fund": {
    track: [
      { title: "Analyst", timeframe: "Years 0–3" },
      { title: "Senior Analyst", timeframe: "Years 3–6" },
      { title: "Portfolio Manager", timeframe: "Years 5–10+", note: "P&L performance is the only criterion" },
    ],
    likelihood: "Variable",
    likelihoodNote:
      "Purely P&L-driven — stop-loss triggers mean underperformers are cut quickly, often within a year. Outperformers can reach PM in 3–5 years. There is no traditional promotion cycle; performance IS the promotion.",
  },

  "search-fund-eta": {
    track: [
      { title: "Searcher", timeframe: "Year 0–1.5", note: "~75–80% close an acquisition" },
      { title: "CEO / Owner-Operator", timeframe: "Post-acquisition (Year 2+)" },
      { title: "Scale / Exit", timeframe: "Years 5–10" },
    ],
    likelihood: "Variable",
    likelihoodNote:
      "~75–80% of traditional searchers successfully close an acquisition. Once you buy, you're the CEO immediately — there's no ladder to climb. Success then depends entirely on operating skill and business quality.",
  },

  "asset-management": {
    track: [
      { title: "Associate Analyst", timeframe: "Years 0–2" },
      { title: "Analyst", timeframe: "Years 2–4" },
      { title: "Senior Analyst", timeframe: "Years 4–7" },
      { title: "Portfolio Manager", timeframe: "Years 8–15+", note: "Very few seats" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "PM seats are scarce and opening slowly as active management consolidates under passive pressure. Many excellent analysts spend their careers at senior-analyst level. CFA + exceptional research differentiation are table stakes, not advantages.",
  },

  // ── Investment Banking ─────────────────────────────────────────
  "ib-associate": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "Vice President", timeframe: "Years 2–4" },
      { title: "Director / Executive Director", timeframe: "Years 4–7" },
      { title: "Managing Director", timeframe: "Years 7–12+", note: "Origination ability required" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Associate → VP is fairly systematic for strong performers. The Director → MD step is the critical gate — it requires client origination ability and relationships, where attrition is high. Many exit to the buy-side or corp dev at VP level.",
  },

  // ── Tech ───────────────────────────────────────────────────────
  "product-management": {
    track: [
      { title: "Product Manager / APM", timeframe: "Years 0–2" },
      { title: "Senior Product Manager", timeframe: "Years 2–4" },
      { title: "Staff / Principal PM", timeframe: "Years 4–6" },
      { title: "Group PM / Director of Product", timeframe: "Years 6–9" },
      { title: "VP Product", timeframe: "Years 10+", note: "Fewer seats; equity-heavy" },
    ],
    likelihood: "High",
    likelihoodNote:
      "Big tech has well-defined PM ladders with 2–3 year promotion cycles and calibrated performance reviews. Strong MBAs reach Director-level within 6–8 years. VP/CPO roles are fewer but the path is clearly mapped.",
  },

  "tech-bizops": {
    track: [
      { title: "Senior Associate / BizOps Analyst", timeframe: "Years 0–2" },
      { title: "Manager", timeframe: "Years 2–3" },
      { title: "Director", timeframe: "Years 3–6" },
      { title: "VP Strategy & Operations", timeframe: "Years 6–10" },
    ],
    likelihood: "High",
    likelihoodNote:
      "One of the fastest tracks for MBAs. The MBB-to-BizOps path is well-worn; strong performers hit Director within 4–5 years. Equity refreshes at each level make total comp grow meaningfully with every promotion.",
  },

  "tech-gm-rotational": {
    track: [
      { title: "Rotational Manager / Pathways Associate", timeframe: "Years 0–2" },
      { title: "Senior Manager", timeframe: "Years 2–3" },
      { title: "Director / Senior Director", timeframe: "Years 3–6" },
      { title: "VP / General Manager", timeframe: "Years 6–10" },
    ],
    likelihood: "High",
    likelihoodNote:
      "Programs like Amazon Pathways are explicitly designed to produce GMs and VPs. Participants who hit their metrics advance on predictable cycles. Cultural fit and operating metrics are the gatekeepers.",
  },

  // ── Startups ────────────────────────────────────────────────────
  "founder": {
    track: [
      { title: "Founder / Pre-Seed", timeframe: "Year 0–1", note: "90%+ fail here or never raise" },
      { title: "Seed-Funded CEO", timeframe: "Year 0–2" },
      { title: "Series A+ CEO", timeframe: "Year 1–4" },
      { title: "Growth-Stage / Pre-IPO CEO", timeframe: "Year 3–8" },
    ],
    likelihood: "Variable",
    likelihoodNote:
      "You set the pace — there's no external promotion, only fundraising milestones and revenue. 90%+ of startups fail; those that don't compress a decade of seniority into a few years. The upside is uncapped.",
  },

  "early-stage-operator": {
    track: [
      { title: "Head of BizOps / First Business Hire", timeframe: "Year 0" },
      { title: "VP (Function or Region)", timeframe: "Years 1–3" },
      { title: "COO / C-suite", timeframe: "Years 3–6", note: "If company survives and scales" },
    ],
    likelihood: "Variable",
    likelihoodNote:
      "At a successful startup, you can be COO in 3–4 years. But the path resets entirely if the company stalls or fails — which most do. Title and scope advance very fast when things work; this is entirely company-trajectory-dependent.",
  },

  "growth-stage-operator": {
    track: [
      { title: "Director / Senior Director", timeframe: "Year 0–1" },
      { title: "VP (Function or Region)", timeframe: "Years 1–3" },
      { title: "SVP / C-suite", timeframe: "Years 3–6" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Growth-stage companies promote faster than large corporates — good operators at scaling companies advance in 2–3 year cycles. Series C/D reorgs and leadership changes can disrupt or accelerate paths unpredictably.",
  },

  "eir-fir": {
    track: [
      { title: "EIR / Founder-in-Residence", timeframe: "Months 0–12" },
      { title: "Founder / CEO (spun-out company)", timeframe: "Year 1+" },
      { title: "Seed/Series A CEO", timeframe: "Years 1–3" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Most EIRs at reputable studios and funds launch a company. The venture-studio model increases idea-validation speed vs. going it alone. But the jump from EIR to funded company is not guaranteed — idea-market fit still determines everything.",
  },

  // ── Corporate & Industry ───────────────────────────────────────
  "corporate-strategy": {
    track: [
      { title: "Manager / Senior Manager", timeframe: "Years 0–2" },
      { title: "Director", timeframe: "Years 2–5" },
      { title: "Senior Director", timeframe: "Years 5–8" },
      { title: "VP Strategy", timeframe: "Years 8–12" },
    ],
    likelihood: "High",
    likelihoodNote:
      "Fortune 500 strategy teams have well-defined ladders with annual reviews. Strong MBAs reach Director in 4–6 years. C-suite visibility and strong sponsorship accelerate VP timing; political navigation is the main variable.",
  },

  "corporate-development": {
    track: [
      { title: "Manager", timeframe: "Years 0–1" },
      { title: "Director", timeframe: "Years 1–3" },
      { title: "Senior Director / VP", timeframe: "Years 3–6" },
      { title: "Head of Corporate Development", timeframe: "Years 7–12+" },
    ],
    likelihood: "High",
    likelihoodNote:
      "Tech companies especially have structured corp dev ladders. Deal track record and C-suite relationships are the promotion criteria. Head of Corp Dev roles are fewer but realistically achievable within 8–10 years for strong dealmakers.",
  },

  "general-management-ldp": {
    track: [
      { title: "Rotational Associate (LDP)", timeframe: "Years 0–2" },
      { title: "Manager", timeframe: "Years 2–4" },
      { title: "Senior Manager", timeframe: "Years 4–6" },
      { title: "Director", timeframe: "Years 6–9" },
      { title: "VP / General Manager", timeframe: "Years 10–15" },
    ],
    likelihood: "High",
    likelihoodNote:
      "LDPs are designed to produce general managers with explicit sponsorship and defined timelines. Completion rates are high and promotion cycles are documented. The runway to VP/GM is 10–15 years — long but clear and well-supported.",
  },

  "cpg-brand-management": {
    track: [
      { title: "Brand Manager (MBA entry)", timeframe: "Years 0–2" },
      { title: "Senior Brand Manager", timeframe: "Years 2–4" },
      { title: "Marketing Director", timeframe: "Years 4–7" },
      { title: "VP Marketing", timeframe: "Years 7–12" },
      { title: "CMO", timeframe: "Years 12–20" },
    ],
    likelihood: "High",
    likelihoodNote:
      "P&G, Unilever, and peers run the most structured promotion timelines in industry — essentially guaranteed 2-year review cycles with clear criteria. VP Marketing is reachable in 8–10 years; CMO is competitive but the path is explicitly mapped.",
  },

  "real-estate-pe": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "Vice President", timeframe: "Years 2–4" },
      { title: "Principal / Senior VP", timeframe: "Years 4–7" },
      { title: "Partner / Managing Director", timeframe: "Years 8–12+", note: "Promote is the real prize" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Similar dynamics to buyout PE — limited Partner seats and no guaranteed track. Advancement requires deal origination and underwriting excellence. Many leave at VP to develop independently, join a REIT, or start their own shop.",
  },

  "healthcare-pharma-commercial": {
    track: [
      { title: "Manager / Senior Manager", timeframe: "Years 0–2" },
      { title: "Director", timeframe: "Years 2–4" },
      { title: "Senior Director", timeframe: "Years 4–7" },
      { title: "VP Commercial / GM", timeframe: "Years 7–12" },
      { title: "C-suite (CCO / President)", timeframe: "Years 12+" },
    ],
    likelihood: "High",
    likelihoodNote:
      "Pharma and medtech companies have very defined promotion ladders with transparent performance frameworks. Large organizations systematically advance MBAs. VP requires a product launch track record; C-suite needs P&L ownership.",
  },

  // ── Luxury & Lifestyle ─────────────────────────────────────────
  "luxury-brand-management": {
    track: [
      { title: "Brand Manager / Senior Manager", timeframe: "Years 0–3" },
      { title: "Director / Senior Director", timeframe: "Years 3–6" },
      { title: "Brand VP / Commercial VP", timeframe: "Years 6–10" },
      { title: "Maison / Brand President", timeframe: "Years 12–25+", note: "1 role per house" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Each maison has exactly one president, and top positions are held for long European tenures. The ladder is clear to VP-level; above that, it's highly political, relationship-driven, and takes 15–25 years. Lateral moves between houses are common.",
  },

  "luxury-hospitality": {
    track: [
      { title: "Manager", timeframe: "Years 0–2" },
      { title: "Senior Manager / Department Head", timeframe: "Years 2–4" },
      { title: "Director of Operations", timeframe: "Years 4–7" },
      { title: "General Manager (flagship)", timeframe: "Years 7–12" },
      { title: "Regional VP / Brand SVP", timeframe: "Years 12–20" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Clear property-based ladder with defined performance milestones. Flagship GM roles are prestigious and achievable within 10–12 years for strong operators. Corporate SVP track is more limited, relationship-driven, and typically requires a flagship GM step.",
  },

  // ── Impact & Climate ───────────────────────────────────────────
  "impact-investing": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "VP / Senior Associate", timeframe: "Years 2–4" },
      { title: "Principal / Director", timeframe: "Years 4–7" },
      { title: "Partner / GP", timeframe: "Years 7–12+", note: "Carry becomes meaningful here" },
    ],
    likelihood: "Medium",
    likelihoodNote:
      "Similar structure to growth equity or PE, but at smaller, growing firms with less competition for seats. The impact mandate sometimes creates faster advancement as the field expands. Carry and GP economics are real at established funds.",
  },

  "climate-tech": {
    track: [
      { title: "Director / Senior Manager (Operator)", timeframe: "Years 0–2" },
      { title: "VP", timeframe: "Years 2–4" },
      { title: "C-suite / Principal (Investor)", timeframe: "Years 4–8+" },
    ],
    likelihood: "Variable",
    likelihoodNote:
      "Highly company- and fund-dependent. At a scaling climate-tech company, advancement can be very fast — the field is early and talent is scarce. At an early-stage fund, GP track requires demonstrated returns and fund-raising ability.",
  },

  // ── Media, Sports & Entertainment ─────────────────────────────
  "sports-business": {
    track: [
      { title: "Analyst / Manager", timeframe: "Years 0–2" },
      { title: "Director", timeframe: "Years 2–5" },
      { title: "Vice President", timeframe: "Years 5–9" },
      { title: "President / GM", timeframe: "Years 10–20+", note: "32 NFL GMs, 30 NBA GMs total" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Extremely few senior roles across all leagues combined. Ownership changes reset entire front-office hierarchies overnight. Sports PE is a newer track with fewer data points. Passion is required; banking on advancement to GM-level is high-risk.",
  },

  "media-entertainment-strategy": {
    track: [
      { title: "Manager / Senior Manager", timeframe: "Years 0–2" },
      { title: "Director / Senior Director", timeframe: "Years 2–5" },
      { title: "Vice President", timeframe: "Years 5–9" },
      { title: "SVP / EVP", timeframe: "Years 9–15+" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Traditional media is undergoing significant restructuring, compressing senior roles. Streaming/tech-media companies are more stable but have flatter hierarchies. SVP+ requires both strategic impact and significant political navigation.",
  },

  // ── Quant Finance ──────────────────────────────────────────────
  "quant-finance": {
    track: [
      { title: "Research Associate", timeframe: "Years 0–2", note: "MBA-accessible entry at AQR, Acadian" },
      { title: "Researcher / Quantitative Analyst", timeframe: "Years 2–4" },
      { title: "Senior Researcher", timeframe: "Years 4–7" },
      { title: "Portfolio Manager", timeframe: "Years 7–12+", note: "Very few seats; alpha required" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Meritocratic by signal quality and P&L — researchers who generate alpha advance; those who don't are quietly transitioned out. PM seats are extremely scarce. The MBA-accessible entry (research associate at AQR/Acadian) is a slower path to PM than the PhD route.",
  },

  // ── Venture & Family Capital ───────────────────────────────────
  "venture-capital": {
    track: [
      { title: "Associate", timeframe: "Years 0–2" },
      { title: "Principal", timeframe: "Years 2–4" },
      { title: "Partner", timeframe: "Years 5–10", note: "Requires demonstrated deal track record" },
      { title: "General Partner / Fund Raise", timeframe: "Years 10+", note: "Carry requires this level" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Most VC Associates leave within 3–5 years to found companies or join portfolio companies as operators. True GP track (with meaningful carry and fund-raising responsibility) requires an exceptional deal record and is accessible to very few — usually those who back a major winner.",
  },

  "family-office": {
    track: [
      { title: "Associate / Investment Analyst", timeframe: "Years 0–3" },
      { title: "Director of Investments", timeframe: "Years 3–8" },
      { title: "CIO", timeframe: "Years 8–15+", note: "Often the only seat above Director" },
    ],
    likelihood: "Low",
    likelihoodNote:
      "Teams are tiny — often 2–10 people. Advancement requires someone above you to leave, retire, or the family to expand. The CIO seat may never open. Lateral moves to other family offices or PE are the common escape valve when stuck.",
  },
};
