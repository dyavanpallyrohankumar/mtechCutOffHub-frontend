import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Download, SlidersHorizontal,
  TrendingDown, TrendingUp, BarChart2, Sparkles, ChevronDown
} from "lucide-react";
import { BackendResponse, cutoffApi, CutoffData } from "@/api/cutoffApi";
import GoogleAd from "@/components/GoogleAd";

/* ─── Demo data ─────────────────────────── */
const DEMO: CutoffData[] = [
  { exam: "GATE", year: 2025, phase: "Phase I", gender: "General", category: "GM", startRank: 150, endRank: 890, startPercentile: 98.5, endPercentile: 92.1 },
  { exam: "GATE", year: 2025, phase: "Phase I", gender: "General", category: "SC", startRank: 1200, endRank: 3500, startPercentile: 88.0, endPercentile: 72.5 },
  { exam: "GATE", year: 2025, phase: "Phase II", gender: "General", category: "GM", startRank: 900, endRank: 1500, startPercentile: 92.0, endPercentile: 85.0 },
  { exam: "PGCET", year: 2025, phase: "Phase I", gender: "General", category: "GM", startRank: 50, endRank: 450, startPercentile: 99.0, endPercentile: 94.0 },
  { exam: "PGCET", year: 2025, phase: "Phase I", gender: "General", category: "OBC", startRank: 500, endRank: 2000, startPercentile: 94.0, endPercentile: 80.0 },
  { exam: "GATE", year: 2024, phase: "Phase I", gender: "General", category: "GM", startRank: 180, endRank: 950, startPercentile: 97.8, endPercentile: 91.0 },
  { exam: "GATE", year: 2024, phase: "Phase I", gender: "Female", category: "SC", startRank: 800, endRank: 2200, startPercentile: 91.2, endPercentile: 78.0 },
  { exam: "PGCET", year: 2024, phase: "Phase II", gender: "General", category: "BC-A", startRank: 300, endRank: 1800, startPercentile: 96.0, endPercentile: 82.0 },
];

const EXAM_OPTIONS = ["All", "GATE", "PGCET"];
const PHASE_OPTIONS = ["All", "PHASE I", "PHASE II"];
const CATEGORY_OPTIONS = ["All", "GM", "OC", "SC", "ST", "OBC", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E"];
const YEAR_OPTIONS = ["All", "2025", "2024", "2023", "2022"];

/* ─── Competition tier ────────────────── */
function tier(endRank: number) {
  if (endRank <= 500) return { label: "Very High", bg: "rgba(239,68,68,0.10)", text: "#dc2626", bar: "#ef4444", pct: 95 };
  if (endRank <= 1500) return { label: "High", bg: "rgba(249,115,22,0.10)", text: "#ea580c", bar: "#f97316", pct: 72 };
  if (endRank <= 3000) return { label: "Medium", bg: "rgba(234,179,8,0.10)", text: "#ca8a04", bar: "#eab308", pct: 50 };
  if (endRank <= 6000) return { label: "Moderate", bg: "rgba(34,197,94,0.10)", text: "#16a34a", bar: "#22c55e", pct: 30 };
  return { label: "Open", bg: "rgba(14,165,233,0.10)", text: "#0284c7", bar: "#0ea5e9", pct: 15 };
}

/* ─── Rank bar ────────────────────────── */
function RankBar({ endRank }: { endRank: number }) {
  const t = tier(endRank);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 99, background: "rgba(99,102,241,0.08)", overflow: "hidden", minWidth: 56 }}>
        <div style={{
          height: "100%", borderRadius: 99, width: `${t.pct}%`,
          background: `linear-gradient(90deg,${t.bar}99,${t.bar})`,
          animation: "ct-bar-in 0.9s cubic-bezier(0.34,1.56,0.64,1) both",
        }} />
      </div>
      <span style={{
        fontSize: "0.66rem", fontWeight: 800, color: t.text,
        background: t.bg, padding: "2px 8px", borderRadius: 5,
        whiteSpace: "nowrap",
      }}>{t.label}</span>
    </div>
  );
}

/* ─── Skeleton row ────────────────────── */
function SkeletonRow({ i }: { i: number }) {
  return (
    <tr style={{ animation: "ct-fade-up 0.4s ease both", animationDelay: `${i * 0.05}s` }}>
      {[72, 44, 66, 54, 50, 64, 64, 56, 56, 110].map((w, j) => (
        <td key={j} style={{ padding: "13px 16px" }}>
          <div style={{
            height: 9, width: w, borderRadius: 5,
            background: "rgba(99,102,241,0.09)",
            animation: "ct-shimmer 1.4s ease infinite",
            animationDelay: `${j * 0.07}s`,
          }} />
        </td>
      ))}
    </tr>
  );
}

/* ─── Main ────────────────────────────── */
const CutoffsPage = () => {
  const { collegeId, branchId } = useParams();
  const [cutoffs, setCutoffs] = useState<CutoffData[]>(DEMO);
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState("All");
  const [phase, setPhase] = useState("All");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [sortKey, setSortKey] = useState<keyof CutoffData | null>("year");
  const [sortAsc, setSortAsc] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  useEffect(() => {
    if (!collegeId || !branchId) return;
    setLoading(true);
    const params: Record<string, string> = {};
    if (exam !== "All") params.exam = exam;
    if (phase !== "All") params.phase = phase;
    if (category !== "All") params.category = category;

    cutoffApi.getCutoffs(String(collegeId), String(branchId), params)
      .then((res) => {
        const data = res.data as BackendResponse;
        if (!data?.years) { setCutoffs([]); return; }
        const flat: CutoffData[] = [];
        data.years.forEach((yb: any) => {
          yb.phases?.forEach((pb: any) => {
            pb.categories?.forEach((cb: any) => {
              cb.exams?.forEach((eb: any) => {
                eb.genders?.forEach((gb: any) => {
                  flat.push({
                    year: yb.year, phase: pb.phase, category: cb.category,
                    exam: eb.exam, gender: gb.gender,
                    startRank: gb.startRank, endRank: gb.endRank,
                    startPercentile: gb.startPercentile, endPercentile: gb.endPercentile,
                  });
                });
              });
            });
          });
        });
        setCutoffs(flat);
      })
      .catch(() => setCutoffs(DEMO))
      .finally(() => setLoading(false));
  }, [collegeId, branchId, exam, phase, category]);

  const filtered = useMemo(() => cutoffs.filter(c =>
    (exam === "All" || c.exam === exam) &&
    (phase === "All" || c.phase === phase) &&
    (category === "All" || c.category === category) &&
    (year === "All" || String(c.year) === year)
  ), [cutoffs, exam, phase, category, year]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
      if (typeof av === "string" && typeof bv === "string") return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      return 0;
    });
  }, [filtered, sortKey, sortAsc]);

  function handleSort(k: keyof CutoffData) {
    if (sortKey === k) setSortAsc(s => !s);
    else { setSortKey(k); setSortAsc(true); }
  }

  function exportCSV() {
    const hdr = ["Exam", "Year", "Phase", "Gender", "Category", "Opening Rank", "Closing Rank", "Opening %ile", "Closing %ile"];
    const rows = sorted.map(c => [c.exam, c.year, c.phase, c.gender, c.category, c.startRank, c.endRank, c.startPercentile ?? "-", c.endPercentile ?? "-"].join(","));
    const blob = new Blob([[hdr.join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "cutoffs.csv"; a.click();
  }

  const activeFilters = [exam, phase, category, year].filter(v => v !== "All").length;
  const minRank = filtered.length ? Math.min(...filtered.map(c => c.startRank)) : 0;
  const maxRank = filtered.length ? Math.max(...filtered.map(c => c.endRank)) : 0;
  const avgPct = filtered.length && filtered.some(c => c.startPercentile != null)
    ? (filtered.reduce((s, c) => s + (c.startPercentile ?? 0), 0) / filtered.length).toFixed(1)
    : "–";

  /* ── Styles ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,600&display=swap');

    .ct-root * { box-sizing: border-box; margin: 0; padding: 0; }
    .ct-root { font-family: 'Plus Jakarta Sans', sans-serif; }

    /* ── Theme tokens (light default) ── */
    .ct-root {
      --ct-bg:      #f6f4ff;
      --ct-bg2:     #eeeaff;
      --ct-card:    #ffffff;
      --ct-border:  rgba(99,102,241,0.12);
      --ct-border2: rgba(99,102,241,0.30);
      --ct-text:    #1a1040;
      --ct-text2:   #5a5480;
      --ct-text3:   #a09cb8;
      --ct-surface: rgba(99,102,241,0.05);
      --ct-shimmer: rgba(99,102,241,0.09);
      --ct-primary: #6366f1;
      --ct-primary2:#8b5cf6;
      --ct-glow:    rgba(99,102,241,0.20);
      --ct-ease:    cubic-bezier(0.34,1.56,0.64,1);
    }
    [data-theme="dark"] .ct-root {
      --ct-bg:      #0c0a1a;
      --ct-bg2:     #100d22;
      --ct-card:    #13102a;
      --ct-border:  rgba(139,92,246,0.15);
      --ct-border2: rgba(139,92,246,0.35);
      --ct-text:    #ede8ff;
      --ct-text2:   #9b94c2;
      --ct-text3:   #5a5480;
      --ct-surface: rgba(139,92,246,0.07);
      --ct-shimmer: rgba(139,92,246,0.10);
      --ct-primary: #818cf8;
      --ct-primary2:#a78bfa;
      --ct-glow:    rgba(139,92,246,0.25);
    }

    /* ── Keyframes ── */
    @keyframes ct-shimmer  { 0%,100%{opacity:.45} 50%{opacity:1} }
    @keyframes ct-fade-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ct-fade-in  { from{opacity:0} to{opacity:1} }
    @keyframes ct-bar-in   { from{width:0} }
    @keyframes ct-slide    { 0%{background-position:0%} 100%{background-position:200%} }
    @keyframes ct-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

    /* ── Page shell ── */
    .ct-page {
      min-height: 100vh;
      background: var(--ct-bg);
      padding: 2rem 1.5rem 6rem;
      position: relative; overflow: hidden;
    }
    .ct-blob {
      position: fixed; border-radius: 50%;
      filter: blur(90px); pointer-events: none; z-index: 0;
    }
    .ct-blob-1 { width:500px;height:500px;top:-120px;right:-100px;background:rgba(139,92,246,0.10); }
    .ct-blob-2 { width:400px;height:400px;bottom:-80px;left:-80px;background:rgba(14,165,233,0.08); }
    .ct-blob-3 { width:300px;height:300px;top:45%;left:55%;background:rgba(236,72,153,0.06); }
    .ct-inner  { max-width:1160px;margin:0 auto;position:relative;z-index:1; }

    /* ── Back link ── */
    .ct-back {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: .82rem; font-weight: 600; color: var(--ct-text2);
      text-decoration: none; margin-bottom: 1.75rem;
      padding: 7px 14px; border-radius: 10px;
      background: var(--ct-card); border: 1.5px solid var(--ct-border);
      transition: all .2s var(--ct-ease);
      animation: ct-fade-in .4s ease both;
    }
    .ct-back:hover { color:var(--ct-text); border-color:var(--ct-border2); transform:translateX(-3px); }

    /* ── Hero ── */
    .ct-hero {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 1.5rem; flex-wrap: wrap;
      margin-bottom: 1.75rem;
      animation: ct-fade-up .5s ease both;
    }
    .ct-eyebrow {
      font-size: .72rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: .1em; color: var(--ct-primary);
      margin-bottom: .5rem;
      display: flex; align-items: center; gap: 6px;
    }
    .ct-eyebrow::before {
      content: ''; display: block; width: 16px; height: 2px;
      background: linear-gradient(90deg, #6366f1, #ec4899); border-radius: 2px;
    }
    .ct-title {
      font-family: 'Fraunces', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 700; color: var(--ct-text); line-height: 1.1;
    }
    .ct-title-hl {
      font-style: italic;
      background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #0ea5e9 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .ct-sub { font-size: .85rem; color: var(--ct-text2); margin-top: .4rem; }

    /* ── Export btn ── */
    .ct-export {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 10px 22px; border-radius: 12px;
      background: var(--ct-card);
      border: 1.5px solid var(--ct-border);
      color: var(--ct-text2); font-size: .82rem; font-weight: 700;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all .2s var(--ct-ease);
    }
    .ct-export:hover {
      border-color: var(--ct-primary); color: var(--ct-primary);
      background: rgba(99,102,241,.06);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px var(--ct-glow);
    }

    /* ── Stat cards ── */
    .ct-stats {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 1rem; margin-bottom: 1.5rem;
      animation: ct-fade-up .5s .06s ease both;
    }
    .ct-stat {
      background: var(--ct-card);
      border: 1.5px solid var(--ct-border);
      border-radius: 20px; padding: 1.25rem 1.5rem;
      position: relative; overflow: hidden;
      transition: border-color .2s, box-shadow .2s;
      box-shadow: 0 4px 20px var(--ct-glow);
    }
    .ct-stat:hover { border-color: var(--ct-border2); box-shadow: 0 8px 30px var(--ct-glow); }
    .ct-stat::before { content:''; position:absolute;top:0;left:0;right:0;height:3px; }
    .ct-stat:nth-child(1)::before { background: linear-gradient(90deg, #10b981, #059669); }
    .ct-stat:nth-child(2)::before { background: linear-gradient(90deg, #f97316, #ef4444); }
    .ct-stat:nth-child(3)::before { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
    .ct-stat-label {
      font-size: .7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: var(--ct-text2);
      margin-bottom: .35rem; display: flex; align-items: center; gap: 5px;
    }
    .ct-stat-val {
      font-family: 'Fraunces', serif;
      font-size: 2rem; font-weight: 700; line-height: 1;
      color: var(--ct-text);
    }
    .ct-stat-sub { font-size: .7rem; color: var(--ct-text3); margin-top: .25rem; }

    /* ── Filter panel ── */
    .ct-filters {
      background: var(--ct-card);
      border: 1.5px solid var(--ct-border);
      border-radius: 20px; margin-bottom: 1.5rem; overflow: hidden;
      animation: ct-fade-up .5s .1s ease both;
      box-shadow: 0 4px 20px var(--ct-glow);
    }
    .ct-filters-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 1.5rem; cursor: pointer;
      border-bottom: 1.5px solid var(--ct-border);
      transition: background .15s;
    }
    .ct-filters-header:hover { background: var(--ct-surface); }
    .ct-filters-title {
      display: flex; align-items: center; gap: 8px;
      font-size: .88rem; font-weight: 700; color: var(--ct-text);
    }
    .ct-filters-badge {
      padding: 2px 9px; border-radius: 100px;
      background: linear-gradient(135deg, var(--ct-primary), var(--ct-primary2));
      color: #fff; font-size: .65rem; font-weight: 800;
    }
    .ct-chevron {
      color: var(--ct-text3); transition: transform .25s var(--ct-ease);
    }
    .ct-chevron.open { transform: rotate(180deg); }
    .ct-filters-body {
      padding: 1.25rem 1.5rem;
      display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
    }
    .ct-fg label {
      display: block; font-size: .68rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em;
      color: var(--ct-text2); margin-bottom: .5rem;
    }
    .ct-select {
      width: 100%; padding: 9px 30px 9px 12px;
      border-radius: 10px;
      background: var(--ct-bg);
      border: 1.5px solid var(--ct-border);
      color: var(--ct-text); font-size: .82rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      outline: none; cursor: pointer; appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a09cb8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 10px center;
      transition: border-color .2s, box-shadow .2s;
    }
    .ct-select:focus {
      border-color: var(--ct-primary);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    }
    .ct-select option { background: var(--ct-card); }

    /* ── Table card ── */
    .ct-table-card {
      background: var(--ct-card);
      border: 1.5px solid var(--ct-border);
      border-radius: 24px; overflow: hidden;
      animation: ct-fade-up .5s .15s ease both;
      box-shadow: 0 4px 20px var(--ct-glow);
    }
    .ct-table-card::before {
      content:''; display:block; height:4px;
      background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#0ea5e9);
      background-size: 200% 100%;
      animation: ct-slide 4s linear infinite;
    }

    /* Top bar */
    .ct-topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: .9rem 1.5rem; border-bottom: 1.5px solid var(--ct-border);
      flex-wrap: wrap; gap: 8px;
    }
    .ct-count {
      font-size: .8rem; font-weight: 600; color: var(--ct-text2);
    }
    .ct-count strong { color: var(--ct-primary); font-size: .88rem; }
    .ct-legend { display: flex; gap: 1rem; flex-wrap: wrap; }
    .ct-legend-item {
      display: flex; align-items: center; gap: 5px;
      font-size: .7rem; font-weight: 600; color: var(--ct-text3);
    }
    .ct-legend-dot { width: 8px; height: 8px; border-radius: 3px; }

    /* Table */
    .ct-scroll  { overflow-x: auto; }
    .ct-table   { width: 100%; border-collapse: collapse; min-width: 900px; }
    .ct-th {
      padding: 11px 16px; text-align: left;
      font-size: .66rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: .08em; color: var(--ct-text3);
      background: var(--ct-bg); border-bottom: 1.5px solid var(--ct-border);
      white-space: nowrap; user-select: none;
    }
    .ct-th.sort { cursor: pointer; transition: color .15s; }
    .ct-th.sort:hover { color: var(--ct-text2); }
    .ct-th.active { color: var(--ct-primary); }
    .ct-sort-ic { margin-left: 3px; opacity: .65; }

    .ct-tr {
      border-bottom: 1px solid var(--ct-border);
      transition: background .15s;
      animation: ct-fade-up .35s ease both;
    }
    .ct-tr:last-child { border-bottom: none; }
    .ct-tr:hover { background: var(--ct-surface); }

    .ct-td { padding: 13px 16px; vertical-align: middle; }

    /* Exam badge */
    .ct-badge-exam {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 11px; border-radius: 8px;
      font-size: .72rem; font-weight: 800;
    }
    .ct-gate  { background:rgba(16,185,129,.10); color:#059669; border:1.5px solid rgba(16,185,129,.20); }
    .ct-pgcet { background:rgba(99,102,241,.10); color:#4f46e5; border:1.5px solid rgba(99,102,241,.20); }
    [data-theme="dark"] .ct-gate  { background:rgba(110,231,183,.10); color:#6ee7b7; border-color:rgba(110,231,183,.20); }
    [data-theme="dark"] .ct-pgcet { background:rgba(165,180,252,.10); color:#a5b4fc; border-color:rgba(165,180,252,.20); }

    /* Year */
    .ct-year {
      font-family: 'Fraunces', serif;
      font-size: .88rem; font-weight: 700; color: var(--ct-text);
    }
    /* Phase / gender */
    .ct-muted { font-size: .78rem; color: var(--ct-text2); }

    /* Category */
    .ct-cat {
      display: inline-block; padding: 3px 10px; border-radius: 7px;
      font-size: .7rem; font-weight: 800; letter-spacing: .02em;
      background: rgba(99,102,241,.09);
      color: var(--ct-primary);
      border: 1px solid rgba(99,102,241,.18);
    }

    /* Rank */
    .ct-rank {
      font-family: 'Fraunces', serif;
      font-size: .9rem; font-weight: 700;
    }
    .ct-rank-open  { color: #059669; }
    .ct-rank-close { color: #ea580c; }
    [data-theme="dark"] .ct-rank-open  { color: #6ee7b7; }
    [data-theme="dark"] .ct-rank-close { color: #fb923c; }

    /* Percentile */
    .ct-pct { font-size: .8rem; color: var(--ct-text2); font-weight: 600; }

    /* ── Empty ── */
    .ct-empty {
      text-align: center; padding: 5rem 2rem;
      animation: ct-fade-up .4s ease both;
    }
    .ct-empty-icon { font-size: 3rem; margin-bottom: 1rem; display: block; animation: ct-float 3s ease-in-out infinite; }
    .ct-empty-title {
      font-family: 'Fraunces', serif;
      font-size: 1.2rem; font-weight: 700; color: var(--ct-text); margin-bottom: .4rem;
    }
    .ct-empty-sub { font-size: .875rem; color: var(--ct-text2); }

    /* ── Responsive ── */
    @media(max-width:768px){
      .ct-stats { grid-template-columns: 1fr 1fr; }
      .ct-filters-body { grid-template-columns: 1fr 1fr; }
      .ct-hero { flex-direction: column; }
    }
    @media(max-width:520px){
      .ct-stats { grid-template-columns: 1fr; }
      .ct-filters-body { grid-template-columns: 1fr; }
    }
  `;

  /* Sort header helper */
  const SortTh = ({ label, field, right }: { label: string; field: keyof CutoffData; right?: boolean }) => (
    <th
      className={`ct-th sort${sortKey === field ? " active" : ""}`}
      onClick={() => handleSort(field)}
      style={{ textAlign: right ? "right" : "left" }}
    >
      {label}
      <span className="ct-sort-ic">{sortKey === field ? (sortAsc ? "↑" : "↓") : "⇅"}</span>
    </th>
  );

  return (
    <div className="ct-root">
      <style>{css}</style>
      <div className="ct-page">

        {/* Atmosphere */}
        <div className="ct-blob ct-blob-1" />
        <div className="ct-blob ct-blob-2" />
        <div className="ct-blob ct-blob-3" />

        <div className="ct-inner">

          {/* Back */}
          <Link to={`/colleges/${collegeId}/branches`} className="ct-back">
            <ArrowLeft size={13} /> Back to Branches
          </Link>

          {/* Hero */}
          <div className="ct-hero">
            <div>
              <div className="ct-eyebrow">
                <Sparkles size={11} /> Admission Intelligence
              </div>
              <h1 className="ct-title">
                Cutoff <span className="ct-title-hl">Analytics</span>
              </h1>
              <p className="ct-sub">
                Opening &amp; closing ranks · category-wise · phase-wise · year-wise
              </p>
            </div>
            <button className="ct-export" onClick={exportCSV}>
              <Download size={14} /> Export CSV
            </button>
          </div>

          {/* Stat cards */}
          <div className="ct-stats">
            <div className="ct-stat">
              <div className="ct-stat-label"><TrendingDown size={11} /> Best Opening</div>
              <div className="ct-stat-val" style={{ color: "#059669" }}>
                {filtered.length ? minRank.toLocaleString() : "–"}
              </div>
              <div className="ct-stat-sub">lowest opening rank</div>
            </div>
            <div className="ct-stat">
              <div className="ct-stat-label"><TrendingUp size={11} /> Closing Range</div>
              <div className="ct-stat-val" style={{ color: "#ea580c" }}>
                {filtered.length ? maxRank.toLocaleString() : "–"}
              </div>
              <div className="ct-stat-sub">highest closing rank</div>
            </div>
            <div className="ct-stat">
              <div className="ct-stat-label"><BarChart2 size={11} /> Avg Percentile</div>
              <div className="ct-stat-val" style={{ color: "#6366f1" }}>
                {avgPct}{avgPct !== "–" && <span style={{ fontSize: "1.1rem" }}>%</span>}
              </div>
              <div className="ct-stat-sub">avg opening percentile</div>
            </div>
          </div>

          {/* Filters */}
          <div className="ct-filters">
            <div className="ct-filters-header" onClick={() => setFiltersOpen(o => !o)}>
              <div className="ct-filters-title">
                <SlidersHorizontal size={14} />
                Filters
                {activeFilters > 0 && (
                  <span className="ct-filters-badge">{activeFilters} active</span>
                )}
              </div>
              <ChevronDown size={16} className={`ct-chevron${filtersOpen ? " open" : ""}`} />
            </div>
            {filtersOpen && (
              <div className="ct-filters-body">
                {[
                  { label: "Exam", val: exam, set: setExam, opts: EXAM_OPTIONS },
                  { label: "Phase", val: phase, set: setPhase, opts: PHASE_OPTIONS },
                  { label: "Category", val: category, set: setCategory, opts: CATEGORY_OPTIONS },
                  { label: "Year", val: year, set: setYear, opts: YEAR_OPTIONS },
                ].map(({ label, val, set, opts }) => (
                  <div className="ct-fg" key={label}>
                    <label>{label}</label>
                    <select className="ct-select" value={val} onChange={e => set(e.target.value)}>
                      {opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ad */}
          <GoogleAd slot="4444444444" className="mb-6" />

          {/* Table */}
          <div className="ct-table-card">
            <div className="ct-topbar">
              <p className="ct-count">
                <strong>{sorted.length}</strong> records
                {activeFilters > 0 && (
                  <span style={{ marginLeft: 6, color: "var(--ct-text3)", fontWeight: 500 }}>
                    · filtered
                  </span>
                )}
              </p>
              <div className="ct-legend">
                <div className="ct-legend-item">
                  <div className="ct-legend-dot" style={{ background: "#059669" }} /> Opening rank
                </div>
                <div className="ct-legend-item">
                  <div className="ct-legend-dot" style={{ background: "#ea580c" }} /> Closing rank
                </div>
              </div>
            </div>

            {loading ? (
              <div className="ct-scroll">
                <table className="ct-table">
                  <tbody>{Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} i={i} />)}</tbody>
                </table>
              </div>
            ) : sorted.length === 0 ? (
              <div className="ct-empty">
                <span className="ct-empty-icon">🔍</span>
                <div className="ct-empty-title">No cutoff data found</div>
                <div className="ct-empty-sub">Try adjusting your filter combinations</div>
              </div>
            ) : (
              <div className="ct-scroll">
                <table className="ct-table">
                  <thead>
                    <tr>
                      <SortTh label="Exam" field="exam" />
                      <SortTh label="Year" field="year" />
                      <th className="ct-th">Phase</th>
                      <th className="ct-th">Gender</th>
                      <SortTh label="Category" field="category" />
                      <SortTh label="Open Rank" field="startRank" right />
                      <SortTh label="Close Rank" field="endRank" right />
                      <SortTh label="Open %ile" field="startPercentile" right />
                      <SortTh label="Close %ile" field="endPercentile" right />
                      <th className="ct-th">Competition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((c, i) => (
                      <tr
                        className="ct-tr"
                        key={i}
                        style={{ animationDelay: `${Math.min(i, 14) * 0.028}s` }}
                      >
                        {/* Exam */}
                        <td className="ct-td">
                          <span className={`ct-badge-exam ${c.exam === "GATE" ? "ct-gate" : "ct-pgcet"}`}>
                            {c.exam === "GATE" ? "⚡" : "📘"} {c.exam}
                          </span>
                        </td>
                        {/* Year */}
                        <td className="ct-td">
                          <span className="ct-year">{c.year}</span>
                        </td>
                        {/* Phase */}
                        <td className="ct-td">
                          <span className="ct-muted">{c.phase}</span>
                        </td>
                        {/* Gender */}
                        <td className="ct-td">
                          <span className="ct-muted">{c.gender}</span>
                        </td>
                        {/* Category */}
                        <td className="ct-td">
                          <span className="ct-cat">{c.category}</span>
                        </td>
                        {/* Open rank */}
                        <td className="ct-td" style={{ textAlign: "right" }}>
                          <span className="ct-rank ct-rank-open">
                            {c.startRank != null ? c.startRank.toLocaleString() : "–"}
                          </span>
                        </td>
                        {/* Close rank */}
                        <td className="ct-td" style={{ textAlign: "right" }}>
                          <span className="ct-rank ct-rank-close">
                            {c.endRank != null ? c.endRank.toLocaleString() : "–"}
                          </span>
                        </td>
                        {/* Open %ile */}
                        <td className="ct-td" style={{ textAlign: "right" }}>
                          <span className="ct-pct">
                            {c.startPercentile != null ? c.startPercentile.toFixed(1) : "–"}
                          </span>
                        </td>
                        {/* Close %ile */}
                        <td className="ct-td" style={{ textAlign: "right" }}>
                          <span className="ct-pct">
                            {c.endPercentile != null ? c.endPercentile.toFixed(1) : "–"}
                          </span>
                        </td>
                        {/* Competition bar */}
                        <td className="ct-td" style={{ minWidth: 170 }}>
                          <RankBar endRank={c.endRank} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CutoffsPage;