import { useState, useRef, useEffect } from "react";

const MetricCard = ({ icon, label, value, sub, onClick }) => (
  <button onClick={onClick} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col gap-0.5 text-left hover:border-amber-300 hover:shadow-md transition-all duration-200 group w-full">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{icon} {label}</span>
      <span className="text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">Ask AI →</span>
    </div>
    <div className="text-base font-bold text-gray-900">{value}</div>
    {sub && <div className="text-[11px] text-gray-500 leading-snug">{sub}</div>}
  </button>
);

const Pill = ({ icon, text, onClick, variant = "default" }) => {
  const styles = {
    default: "bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50",
    highlight: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",
    blue: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",
    green: "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100",
    purple: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100",
    red: "bg-red-50 border-red-200 text-red-800 hover:bg-red-100",
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 shadow-sm hover:shadow ${styles[variant]}`}>
      <span>{icon}</span> {text}
    </button>
  );
};

const Message = ({ role, content, type }) => (
  <div className={`flex ${role === "ai" ? "justify-start" : "justify-end"} animate-fadeIn`}>
    <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
      role === "ai"
        ? type === "report" ? "bg-gradient-to-br from-amber-50 to-white border border-amber-200 text-gray-800 rounded-bl-sm"
        : type === "finance" ? "bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 text-gray-800 rounded-bl-sm"
        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
        : "bg-amber-600 text-white rounded-br-sm shadow-sm"
    }`}>
      {role === "ai" && (
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-600">Suddeco Intelligence</span>
          {type === "report" && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium ml-1">Analysis</span>}
          {type === "finance" && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium ml-1">Finance Report</span>}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

const ValueBar = ({ label, before, after, color = "amber" }) => {
  const maxVal = Math.max(before, after);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-emerald-600">+£{(after - before).toLocaleString()}</span>
      </div>
      <div className="flex gap-1 h-3">
        <div className="bg-gray-200 rounded-full" style={{ width: `${(before / maxVal) * 100}%` }} title={`Before: £${before.toLocaleString()}`} />
        <div className={`bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full`} style={{ width: `${((after - before) / maxVal) * 100}%` }} title={`Uplift: £${(after - before).toLocaleString()}`} />
      </div>
    </div>
  );
};

export default function IntelligencePageV3() {
  const [input, setInput] = useState("");
  const [userType, setUserType] = useState("homeowner");
  const [sideTab, setSideTab] = useState("intel");
  const chatEndRef = useRef(null);

  const project = {
    name: "33 Finlay Street 1.4",
    types: ["Extension", "Loft Conversion", "Home Renovation", "Property Redesign"],
    quality: "Mid-Range",
    propertyType: "Semi-Detached House",
    address: "33 Finlay Street, London, SW6 6HE",
    postcode: "SW6 6HE",
    lat: 51.480383, lng: -0.214222,
    client: "Saimir Zejneli",
  };

  const intel = {
    epc: { rating: "D", efficiency: 52, area: 164, age: "pre-1900" },
    solar: { panels: 16, roof: 31, hours: 1116 },
    heritage: { count: 1, note: "Grade II terrace — 180m NE" },
    planning: { status: "No Major Constraints", conservation: false },
    market: { value: 978500, sqm: 5966, trend: "+3.2%" },
    flood: { risk: "Very Low", zone: "Zone 1" },
  };

  const finances = {
    currentValue: 978500,
    estimatedPostValue: 1285000,
    projectCost: 195000,
    professionalFees: 28500,
    totalInvestment: 223500,
    netUplift: 83000,
    roi: "37%",
    insuranceRebuild: 425000,
    mortgageLTV: { before: "65%", after: "52%" },
  };

  const [messages, setMessages] = useState([
    {
      role: "ai", type: "report",
      content: `<strong>Project Analysis — 33 Finlay Street, SW6 6HE</strong><br/><br/>
I've analysed <strong>4 PDFs (41 pages)</strong> including structural calculations, existing plans, proposed plans, and services drawings for your <strong>rear extension + loft conversion + renovation + redesign</strong>.<br/><br/>
<strong>Key findings:</strong><br/>
• <strong>Structural:</strong> 203×102 UB steel beam spanning 4.8m — rear wall removal<br/>
• <strong>Extension:</strong> Single-storey rear 4m × 6m, bi-fold doors, UFH, steel beam<br/>
• <strong>Loft:</strong> Hip-to-gable with rear dormer, new staircase, Velux windows<br/>
• <strong>Services:</strong> Full rewire, new consumer unit, UFH, mains smoke alarms<br/>
• <strong>Property:</strong> EPC D (52/100), 164m², pre-1900, semi-detached, £978,500 avg<br/>
• <strong>Heritage:</strong> 1 Grade II listed asset 180m away — design sensitivity advised<br/><br/>
<em>Ask me anything — planning, costs, finance, regulations, design, feasibility, or generate reports.</em>`
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAI = (q) => {
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setTimeout(() => {
      let reply = "", type = undefined;
      const ql = q.toLowerCase();

      if (ql.includes("finance report") || ql.includes("financial report") || ql.includes("cost breakdown")) {
        type = "finance";
        reply = `<strong>📊 Financial Report — 33 Finlay Street, SW6 6HE</strong><br/><br/>
<table style="width:100%; border-collapse:collapse; font-size:12px;">
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:6px 0; color:#6b7280;">Current Property Value</td><td style="text-align:right; font-weight:600;">£978,500</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:6px 0; color:#6b7280;">Estimated Post-Works Value</td><td style="text-align:right; font-weight:600; color:#059669;">£1,285,000</td></tr>
<tr style="border-bottom:2px solid #d1d5db;"><td style="padding:6px 0; color:#6b7280;"><strong>Gross Value Uplift</strong></td><td style="text-align:right; font-weight:700; color:#059669;">+£306,500</td></tr>
</table><br/>
<strong>Project Costs:</strong><br/>
<table style="width:100%; border-collapse:collapse; font-size:12px;">
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Construction (mid-range spec)</td><td style="text-align:right;">£195,000</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Architect fees (RIBA Stage 3-5)</td><td style="text-align:right;">£12,000</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Structural engineer</td><td style="text-align:right;">£3,500</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Party wall surveyor (×1 neighbour)</td><td style="text-align:right;">£1,200</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Building control</td><td style="text-align:right;">£1,800</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Planning application fee</td><td style="text-align:right;">£462</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Interior designer (rooms only)</td><td style="text-align:right;">£4,500</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0; color:#6b7280;">Contingency (10%)</td><td style="text-align:right;">£19,500</td></tr>
<tr style="border-bottom:2px solid #d1d5db;"><td style="padding:6px 0;"><strong>Total Investment</strong></td><td style="text-align:right; font-weight:700;">£238,000</td></tr>
</table><br/>
<strong>Return Analysis:</strong><br/>
• <strong>Net profit after all costs: £68,500</strong><br/>
• <strong>ROI: 29%</strong> on total investment<br/>
• <strong>Cost per m² added: £4,432/m²</strong> vs local avg £5,966/m² — strong margin<br/>
• <strong>Payback via remortgage:</strong> New LTV ~52% (from 65%) — significant equity release potential<br/><br/>
<em>Want me to generate a PDF finance report, or break down costs by construction stage?</em>`;
      } else if (ql.includes("value") || ql.includes("worth") || ql.includes("uplift")) {
        reply = `<strong>Property Value Impact — Before vs After</strong><br/><br/>
<strong>Current value:</strong> £978,500 (164m², £5,966/m²)<br/><br/>
<strong>Value uplift by works:</strong><br/>
<table style="width:100%; border-collapse:collapse; font-size:12px;">
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0;">🏗️ Rear extension (+24m²)</td><td style="text-align:right; color:#059669; font-weight:600;">+£143,000</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0;">🏠 Loft conversion (+20m²)</td><td style="text-align:right; color:#059669; font-weight:600;">+£119,000</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0;">⚡ EPC D→C improvement</td><td style="text-align:right; color:#059669; font-weight:600;">+£15,000</td></tr>
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:4px 0;">🍳 Open-plan kitchen premium</td><td style="text-align:right; color:#059669; font-weight:600;">+£30,500</td></tr>
<tr style="border-bottom:2px solid #d1d5db;"><td style="padding:6px 0;"><strong>Estimated post-works value</strong></td><td style="text-align:right; font-weight:700; color:#059669;">£1,285,000</td></tr>
</table><br/>
<strong>Comparable sales (SW6, last 12 months):</strong><br/>
• 41 Finlay St — £1,310,000 (renovated, 4-bed + loft, 198m²)<br/>
• 28 Reporton Rd — £1,175,000 (extended, 3-bed, 175m²)<br/>
• 15 Munster Rd — £1,450,000 (fully refurbished, 4-bed, 210m²)<br/><br/>
<em>Your project sits competitively within these comparables. Want a detailed appraisal report?</em>`;
      } else if (ql.includes("appraisal") || ql.includes("valuation")) {
        type = "finance";
        reply = `<strong>🏠 Property Appraisal Summary</strong><br/><br/>
<strong>RICS Red Book Basis:</strong> Market Value (MV)<br/>
<strong>Valuation Date:</strong> April 2026<br/><br/>
<strong>Current Condition:</strong><br/>
• Type: Pre-1900 semi-detached, 2-storey + cellar<br/>
• Size: 164m² (1,765 sq ft) — 3 bed, 1 bath<br/>
• EPC: D (52/100) — below average for area<br/>
• Condition: Habitable, requires modernisation<br/>
• Current MV estimate: <strong>£978,500</strong><br/><br/>
<strong>Post-Works (proposed scheme):</strong><br/>
• Size: ~208m² (2,239 sq ft) — 4 bed, 2 bath + open-plan kitchen<br/>
• EPC: Projected C (72/100)<br/>
• Condition: Fully modernised, extended, converted loft<br/>
• Post-works MV estimate: <strong>£1,250,000 — £1,320,000</strong><br/><br/>
<strong>Insurance Rebuild Cost:</strong> £425,000 (208m² × £2,044/m² BCIS rate)<br/><br/>
<strong>Mortgage Impact:</strong><br/>
• Current LTV (est.): 65% on £978,500 = £636,000 mortgage<br/>
• Post-works LTV: 52% on £1,285,000 = £636,000 mortgage<br/>
• Equity release potential: Up to £280,000 at 75% LTV<br/><br/>
<em>Note: This is an AI-generated estimate based on market data, not a formal RICS valuation. For legal/mortgage purposes, instruct a RICS surveyor.</em>`;
      } else if (ql.includes("timeline") || ql.includes("how long") || ql.includes("schedule")) {
        reply = `<strong>📅 Estimated Project Timeline</strong><br/><br/>
<table style="width:100%; border-collapse:collapse; font-size:12px;">
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:5px 0; font-weight:600;">Phase</td><td style="font-weight:600;">Duration</td><td style="font-weight:600;">Notes</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">📋 Planning application</td><td>8-12 weeks</td><td>Loft requires full planning</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🧱 Party wall notice</td><td>2 months min</td><td>Can run parallel with planning</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🏗️ Groundworks + foundations</td><td>2-3 weeks</td><td>Extension strip foundations</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🧱 Shell build (extension)</td><td>4-6 weeks</td><td>Walls, roof, steels, windows</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🏠 Loft conversion</td><td>6-8 weeks</td><td>Hip-to-gable, dormer, staircase</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">⚡ First fix (M&E)</td><td>2-3 weeks</td><td>Rewire, plumbing, UFH</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🎨 Second fix + finishes</td><td>4-6 weeks</td><td>Plastering, kitchen, bathrooms</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">✅ Snagging + sign-off</td><td>1-2 weeks</td><td>Building control completion</td></tr>
<tr style="border-bottom:2px solid #d1d5db;"><td style="padding:6px 0; font-weight:700;">Total on-site</td><td style="font-weight:700;">20-28 weeks</td><td>5-7 months</td></tr>
</table><br/>
<strong>Pre-construction lead time:</strong> 3-4 months (planning + party wall + tendering)<br/>
<strong>Total project duration:</strong> ~9-11 months start to finish<br/><br/>
<em>Want me to generate a detailed Gantt chart or check contractor availability?</em>`;
      } else if (ql.includes("risk")) {
        reply = `<strong>⚠️ Project Risk Register</strong><br/><br/>
<table style="width:100%; border-collapse:collapse; font-size:12px;">
<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:5px 0; font-weight:600;">Risk</td><td style="font-weight:600;">Level</td><td style="font-weight:600;">Mitigation</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">📋 Planning refusal (loft)</td><td>🟡 Medium</td><td>Pre-app meeting, check precedent</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🏛️ Heritage objection</td><td>🟢 Low</td><td>Asset 180m away, not adjacent</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🧱 Party wall dispute</td><td>🟡 Medium</td><td>Early notice, experienced surveyor</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">💷 Budget overrun</td><td>🟡 Medium</td><td>10% contingency included (£19.5k)</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🔨 Structural surprises</td><td>🟡 Medium</td><td>Pre-1900 — expect hidden issues</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">🌊 Flood risk</td><td>🟢 Very Low</td><td>EA Zone 1 — no FRA needed</td></tr>
<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:4px 0;">⏱️ Programme delay</td><td>🟡 Medium</td><td>Buffer weeks in programme</td></tr>
</table><br/>
<em>Overall risk profile: <strong>MODERATE</strong> — standard for London residential renovation. No showstoppers identified.</em>`;
      } else if (ql.includes("planning")) {
        reply = `<strong>Planning Permission Assessment</strong><br/><br/>
<strong>✅ Permitted Development (no application needed):</strong><br/>
• Single-storey rear extension up to 6m (yours: 4m) ✅<br/>
• Internal renovations, rewiring, replastering ✅<br/><br/>
<strong>⚠️ Full Planning Required:</strong><br/>
• Hip-to-gable loft conversion — changes roofline<br/>
• Rear dormer — check H&F borough policy<br/><br/>
<strong>📋 Also needed:</strong><br/>
• Building Regulations approval<br/>
• Party Wall Agreement (semi-detached)<br/>
• Structural engineer sign-off (already in drawings ✅)<br/><br/>
<strong>Fees:</strong> Planning app £462, Building Control ~£1,800, Pre-app meeting ~£600<br/>
<strong>Timeline:</strong> 8-12 weeks for planning decision<br/><br/>
<em>Want me to generate a pre-application checklist or check recent approvals on your street?</em>`;
      } else if (ql.includes("notes") || ql.includes("slack") || ql.includes("calendar") || ql.includes("notion")) {
        reply = `<strong>📝 Project Notes & Activity</strong><br/><br/>
<strong>From Slack #general:</strong><br/>
• Latest deploy: SHA f4f97d9e — scope generator context update ✅<br/>
• Sentry clean — no errors after deploy<br/>
• Cursor MCP connected successfully<br/><br/>
<strong>From Google Calendar:</strong><br/>
• Day 2 Sprint — 12 Apr 2026 (today)<br/>
• Tasks: Create fresh project → Upload → Extract → Scope → Test<br/><br/>
<strong>From Notion Session Logs:</strong><br/>
• Latest: SESSION — 11 Apr 2026 | 26 pushes, scope regen fixed<br/>
• Sprint board: 33efba41-149b-8157-9b23-f8f9d4be1c50<br/><br/>
<em>These notes are pulled from your connected integrations. Want me to create a session summary or update the sprint board?</em>`;
      } else {
        reply = `Based on the full analysis of your 4 PDFs, property data (EPC D, 164m², SW6 6HE), and market intelligence (avg £978,500), I can help with:<br/><br/>
<strong>📊 Financial:</strong> Generate finance report, property valuation, cost breakdown, ROI analysis, mortgage impact<br/>
<strong>📋 Planning:</strong> Permission assessment, building regs, conservation rules, pre-app checklist<br/>
<strong>🏗️ Technical:</strong> Structural analysis, surveyor report, risk register, specification document<br/>
<strong>🎨 Design:</strong> Design concept, material suggestions, interior options<br/>
<strong>📅 Programme:</strong> Project timeline, Gantt chart, contractor scheduling<br/>
<strong>💷 Market:</strong> Comparable sales, value uplift, area trends<br/>
<strong>📝 Notes:</strong> Slack activity, Calendar events, Notion session logs<br/><br/>
What would you like to explore?`;
      }
      setMessages((m) => [...m, { role: "ai", content: reply, type }]);
    }, 800);
  };

  const userPills = {
    homeowner: [
      { icon: "📊", text: "Generate finance report", v: "green" },
      { icon: "💷", text: "How much value will this add?", v: "green" },
      { icon: "🏠", text: "Property appraisal — before & after", v: "highlight" },
      { icon: "📋", text: "Do I need planning permission?", v: "default" },
      { icon: "📅", text: "How long will this project take?", v: "blue" },
      { icon: "⚠️", text: "What are the project risks?", v: "red" },
      { icon: "⚡", text: "How to improve EPC D → C?", v: "default" },
      { icon: "🧱", text: "Party wall requirements", v: "default" },
      { icon: "🎨", text: "Design concept from drawings", v: "purple" },
      { icon: "📝", text: "Check Slack, Calendar & Notion notes", v: "blue" },
    ],
    developer: [
      { icon: "📊", text: "Full development feasibility report", v: "green" },
      { icon: "🏢", text: "Can I build 7 units here?", v: "highlight" },
      { icon: "💷", text: "GDV + profit on cost analysis", v: "green" },
      { icon: "📋", text: "Planning risk assessment", v: "default" },
      { icon: "🏗️", text: "Construction cost per unit", v: "blue" },
      { icon: "📈", text: "Local market comparables & trends", v: "default" },
      { icon: "💰", text: "CIL & S106 obligations", v: "red" },
      { icon: "🏦", text: "Development finance structure", v: "purple" },
      { icon: "📅", text: "Development programme estimate", v: "blue" },
      { icon: "📝", text: "Check project notes & activity", v: "default" },
    ],
    professional: [
      { icon: "📐", text: "Building regs for loft conversion", v: "highlight" },
      { icon: "📊", text: "Generate client finance report", v: "green" },
      { icon: "🔥", text: "Fire safety + means of escape", v: "red" },
      { icon: "🧱", text: "Structural analysis from drawings", v: "blue" },
      { icon: "📋", text: "CDM 2015 requirements", v: "default" },
      { icon: "⚡", text: "Part L compliance strategy", v: "default" },
      { icon: "🏠", text: "Insurance rebuild cost (BCIS)", v: "green" },
      { icon: "📄", text: "Generate NBS specification", v: "purple" },
      { icon: "⚠️", text: "Full risk register", v: "red" },
      { icon: "📝", text: "Check project activity log", v: "default" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafaf8]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,400&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-5 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">✨</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">AI Project Intelligence</h1>
              <p className="text-[11px] text-gray-500">{project.name} · {project.address} · {project.client}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 text-[11px]">
              {[
                { id: "homeowner", label: "🏠 Homeowner" },
                { id: "developer", label: "🏢 Developer" },
                { id: "professional", label: "📐 Professional" },
              ].map((u) => (
                <button key={u.id} onClick={() => setUserType(u.id)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${userType === u.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {u.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {project.types.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] font-medium text-amber-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex gap-5 p-5" style={{ height: "calc(100vh - 56px)" }}>
        {/* LEFT: AI Chat */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} type={msg.type} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Smart Pills */}
          <div className="px-5 pb-3 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {userType === "homeowner" ? "🏠 Homeowner" : userType === "developer" ? "🏢 Developer" : "📐 Professional"} suggestions
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {userPills[userType].map((p, i) => (
                <Pill key={i} icon={p.icon} text={p.text} variant={p.v} onClick={() => askAI(p.text)} />
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-5 pb-4 pt-2">
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input.trim() && askAI(input.trim())}
                placeholder="Ask anything — finance, planning, costs, design, feasibility, reports, regulations..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-gray-50" />
              <button onClick={() => input.trim() && askAI(input.trim())}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm">
                Ask AI
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="w-[320px] flex flex-col gap-3 overflow-y-auto">
          {/* Sidebar tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 text-[11px]">
            {[
              { id: "intel", label: "📊 Intelligence" },
              { id: "finance", label: "💷 Finance" },
              { id: "notes", label: "📝 Notes" },
            ].map((t) => (
              <button key={t.id} onClick={() => setSideTab(t.id)}
                className={`flex-1 px-2 py-1.5 rounded-md font-medium transition-all text-center ${sideTab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Map - always visible */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 h-32 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-2xl mb-0.5">📍</div>
                <div className="text-[11px] font-medium text-gray-700">{project.address}</div>
              </div>
              <a href={`https://earth.google.com/web/@${project.lat},${project.lng},50a,500d,35y,0h,0t,0r`} target="_blank" rel="noopener"
                className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-medium text-gray-600 hover:text-amber-600 border border-gray-200">
                🌍 Google Earth
              </a>
            </div>
            <div className="p-2.5 grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="bg-gray-50 rounded-lg px-2 py-1.5"><span className="text-gray-400 text-[10px]">Quality</span><br/><span className="font-semibold">⚡ {project.quality}</span></div>
              <div className="bg-gray-50 rounded-lg px-2 py-1.5"><span className="text-gray-400 text-[10px]">Property</span><br/><span className="font-semibold">🏡 {project.propertyType}</span></div>
            </div>
          </div>

          {/* Intel Tab */}
          {sideTab === "intel" && (
            <div className="space-y-2">
              <MetricCard icon="📊" label="EPC" value={`Rating ${intel.epc.rating}`} sub={`${intel.epc.efficiency}/100 · ${intel.epc.area}m² · ${intel.epc.age}`} onClick={() => askAI("How can I improve my EPC from D to C?")} />
              <MetricCard icon="💷" label="Value" value={`£${intel.market.value.toLocaleString()}`} sub={`£${intel.market.sqm}/m² · ${intel.market.trend} YoY`} onClick={() => askAI("How much value will this add?")} />
              <MetricCard icon="☀️" label="Solar" value={`${intel.solar.panels} panels`} sub={`${intel.solar.roof}m² roof · ${intel.solar.hours} hrs/yr`} onClick={() => askAI("Is solar worth it for this property?")} />
              <MetricCard icon="🏛️" label="Heritage" value={`${intel.heritage.count} nearby`} sub={intel.heritage.note} onClick={() => askAI("How does heritage affect my planning?")} />
              <MetricCard icon="📋" label="Planning" value={intel.planning.status} sub={intel.planning.conservation ? "Conservation Area" : "Not in conservation"} onClick={() => askAI("Do I need planning permission?")} />
              <MetricCard icon="🌊" label="Flood" value={intel.flood.risk} sub={`EA ${intel.flood.zone}`} onClick={() => askAI("What's the flood risk assessment?")} />
            </div>
          )}

          {/* Finance Tab */}
          {sideTab === "finance" && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Value Uplift</div>
                <div className="space-y-3">
                  <ValueBar label="Extension (+24m²)" before={978500} after={1121500} />
                  <ValueBar label="Loft (+20m²)" before={978500} after={1097500} />
                  <ValueBar label="EPC D→C" before={978500} after={993500} />
                  <ValueBar label="Kitchen premium" before={978500} after={1009000} />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                  <span className="text-gray-500">Post-works estimate</span>
                  <span className="font-bold text-emerald-600">£1,285,000</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Investment Summary</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between"><span className="text-gray-500">Construction</span><span className="font-medium">£195,000</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Professional fees</span><span className="font-medium">£28,500</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Contingency (10%)</span><span className="font-medium">£19,500</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5"><span className="font-semibold">Total investment</span><span className="font-bold">£243,000</span></div>
                  <div className="flex justify-between"><span className="font-semibold text-emerald-600">Net profit</span><span className="font-bold text-emerald-600">£63,500</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">ROI</span><span className="font-bold text-amber-600">26%</span></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Mortgage Impact</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between"><span className="text-gray-500">Current LTV</span><span className="font-medium">65%</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Post-works LTV</span><span className="font-semibold text-emerald-600">52%</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Insurance rebuild</span><span className="font-medium">£425,000</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Equity release (75% LTV)</span><span className="font-semibold text-amber-600">Up to £280k</span></div>
                </div>
              </div>

              <button onClick={() => askAI("Generate finance report")} className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-xs font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm">
                📊 Generate Full Finance Report
              </button>
            </div>
          )}

          {/* Notes Tab */}
          {sideTab === "notes" && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">💬 Slack</div>
                <div className="space-y-2 text-[11px]">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400">Today 01:01</div>
                    <div className="text-gray-700">Cursor test — Slack MCP connected ✅</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400">Today 00:37</div>
                    <div className="text-gray-700">Sentry clean — SHA 39078926 ✅</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400">Today 00:29</div>
                    <div className="text-gray-700">Deploy succeeded — all connections verified ✅</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">📅 Calendar</div>
                <div className="space-y-2 text-[11px]">
                  <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                    <div className="font-semibold text-amber-800">Day 2 Sprint — 12 Apr</div>
                    <div className="text-amber-600 text-[10px]">Create → Upload → Extract → Scope → Test</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">📓 Notion</div>
                <div className="space-y-2 text-[11px]">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="font-semibold">SESSION — 11 Apr 2026</div>
                    <div className="text-gray-500 text-[10px]">26 pushes · Scope regen fixed · Shell filter deployed</div>
                  </div>
                </div>
              </div>

              <button onClick={() => askAI("Check Slack, Calendar & Notion notes")} className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xs font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                📝 Pull Latest Notes
              </button>
            </div>
          )}

          {/* Extraction Stats - always visible */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-3 mt-auto">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Extraction</div>
            <div className="grid grid-cols-3 gap-y-1 text-[10px]">
              <span className="text-gray-500">4 PDFs</span>
              <span className="text-gray-500">41 pages</span>
              <span className="text-gray-500">18 rooms</span>
              <span className="text-gray-500">12 structural</span>
              <span className="text-gray-500">6 electrical</span>
              <span className="text-gray-500">4 drainage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
