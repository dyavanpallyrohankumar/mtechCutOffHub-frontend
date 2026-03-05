import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Landmark,
  FlaskConical,
  MapPin,
  Building2,
  Hash,
  BookOpen,
} from "lucide-react";

import { collegeApi, College } from "@/api/collegeApi";

const PAGE_SIZE = 9;

/* -------------------------------------------------- */
/* College Type Styles — using design system palette  */
/* -------------------------------------------------- */

const TYPE_STYLE: Record<string, { bg: string; color: string; border: string; icon: React.ReactNode }> = {
  Government: {
    bg: "rgba(16,185,129,0.10)",
    color: "#065f46",
    border: "rgba(16,185,129,0.25)",
    icon: <Landmark size={11} />,
  },
  "Private Aided": {
    bg: "rgba(79,70,229,0.10)",
    color: "#3730A3",
    border: "rgba(79,70,229,0.25)",
    icon: <GraduationCap size={11} />,
  },
  Private: {
    bg: "rgba(245,158,11,0.10)",
    color: "#92400e",
    border: "rgba(245,158,11,0.25)",
    icon: <FlaskConical size={11} />,
  },
};

function typeMeta(type: string) {
  return (
    TYPE_STYLE[type] ?? {
      bg: "rgba(148,163,184,0.10)",
      color: "#475569",
      border: "rgba(148,163,184,0.25)",
      icon: <Building2 size={11} />,
    }
  );
}

/* Avatar gradient by type */
const TYPE_AVATAR: Record<string, string> = {
  Government: "linear-gradient(135deg,#10b981,#059669)",
  "Private Aided": "linear-gradient(135deg,#4F46E5,#6366f1)",
  Private: "linear-gradient(135deg,#f59e0b,#f97316)",
};
function avatarGrad(type: string) {
  return TYPE_AVATAR[type] ?? "linear-gradient(135deg,#94a3b8,#64748b)";
}

/* -------------------------------------------------- */
/* Skeleton                                           */
/* -------------------------------------------------- */

function SkeletonCard() {
  return (
    <div className="cp-card">
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--cp-shimmer)", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 10, width: "80%", borderRadius: 6, background: "var(--cp-shimmer)", marginBottom: 8 }} />
          <div style={{ height: 8, width: "50%", borderRadius: 6, background: "var(--cp-shimmer)" }} />
        </div>
      </div>
      {[90, 70, 60].map((w, i) => (
        <div key={i} style={{ height: 8, width: `${w}%`, borderRadius: 6, background: "var(--cp-shimmer)", marginBottom: 9 }} />
      ))}
      <div style={{ height: 38, borderRadius: 10, background: "var(--cp-shimmer)", marginTop: 16 }} />
    </div>
  );
}

/* -------------------------------------------------- */
/* Stat Badge in header                               */
/* -------------------------------------------------- */
function StatChip({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="cp-stat-chip" style={{ borderColor: `${color}25` }}>
      <span className="cp-stat-val" style={{ color }}>{value}</span>
      <span className="cp-stat-lbl">{label}</span>
    </div>
  );
}

/* -------------------------------------------------- */
/* Page                                               */
/* -------------------------------------------------- */

const CollegesPage = () => {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [page, setPage] = useState(0);

  const DEMO: College[] = [
    { id: 1, collegeCode: "E001", collegeName: "University Visvesvaraya College of Engineering", collegeType: "Government", universityName: "Bangalore University", collegeAddress: "Bengaluru" },
    { id: 2, collegeCode: "E002", collegeName: "BMS College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
    { id: 3, collegeCode: "E003", collegeName: "RV College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
  ];


  useEffect(() => { setPage(0); }, [search, activeType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await collegeApi.getAll({ page: 0, size: 10000 });
  //       setAllColleges(res.data.content);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchColleges = async () => {
      try {
        setLoading(true);

        const res = await collegeApi.getAll({ page: 0, size: 10000 });

        if (!cancelled) {
          setAllColleges(res.data.content);
        }
      } catch (err) {
        console.warn("API failed — using demo data");

        if (!cancelled) {
          setAllColleges(DEMO);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchColleges();

    return () => {
      cancelled = true;
    };
  }, []);

  const types = useMemo(() => {
    const s = new Set(allColleges.map((c) => c.collegeType));
    return ["All", ...Array.from(s)];
  }, [allColleges]);

  const typeCounts = useMemo(() => {
    const m: Record<string, number> = {};
    allColleges.forEach(c => { m[c.collegeType] = (m[c.collegeType] ?? 0) + 1; });
    return m;
  }, [allColleges]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allColleges.filter((c) => {
      const matchSearch =
        !q ||
        c.collegeName.toLowerCase().includes(q) ||
        c.collegeAddress.toLowerCase().includes(q) ||
        c.universityName.toLowerCase().includes(q) ||
        c.collegeCode.toLowerCase().includes(q);
      const matchType = activeType === "All" || c.collegeType === activeType;
      return matchSearch && matchType;
    });
  }, [allColleges, search, activeType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
    if (page < 3) return [0, 1, 2, 3, 4];
    if (page > totalPages - 4) return [totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  /* ---------------------------------------------------------------- */
  /* CSS                                                               */
  /* ---------------------------------------------------------------- */

  const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Sora:wght@600;700;800&display=swap');

/* ── Variables ── */
.cp-root {
  --primary:        #4F46E5;
  --primary-hover:  #4338CA;
  --primary-light:  #EEF2FF;
  --primary-deep:   #3730A3;
  --accent:         #06B6D4;
  --accent-light:   #ECFEFF;
  --bg-main:        #F8FAFC;
  --bg-card:        #FFFFFF;
  --bg-section:     #F1F5F9;
  --text-main:      #0F172A;
  --text-secondary: #475569;
  --text-muted:     #94A3B8;
  --border:         #E2E8F0;
  --success:        #10B981;
  --warning:        #F59E0B;
  --danger:         #EF4444;
  --info:           #3B82F6;
  --shadow-soft:    0 2px 12px rgba(0,0,0,0.05);
  --shadow-card:    0 8px 28px rgba(0,0,0,0.07);
  --shadow-hover:   0 16px 44px rgba(79,70,229,0.16);
  --cp-shimmer:     #E2E8F0;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-main);
  color: var(--text-main);
  min-height: 100vh;
}

[data-theme="dark"] .cp-root {

  --bg-main: #0b0f1a;
  --bg-card: #111827;
  --bg-section: #0f172a;

  --text-main: #f1f5f9;
  --text-secondary: #cbd5f5;
  --text-muted: #94a3b8;

  --border: #1f2937;

  --cp-shimmer: #1e293b;

}

/* ── Layout ── */
.cp-page {
  background: var(--bg-main);
  min-height: 100vh;
  padding: 0 0 5rem;
}

.cp-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── Page Header ── */
.cp-header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  padding: 40px 0 0;
  margin-bottom: 32px;
  box-shadow: var(--shadow-soft);
}

.cp-header-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.cp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.cp-breadcrumb a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.cp-breadcrumb-sep { color: var(--border); }

.cp-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.04em;
  margin-bottom: 6px;
  line-height: 1.1;
}

.cp-title span {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cp-sub {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.cp-stats-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 24px;
}

.cp-stat-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  background: var(--bg-section);
  border-radius: 10px;
  border: 1px solid;
  min-width: 90px;
}

.cp-stat-val {
  font-family: 'Sora', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.cp-stat-lbl {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 3px;
}

/* ── Toolbar ── */
.cp-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.cp-search-wrap {
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 420px;
}

.cp-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.cp-search {
  width: 100%;
  padding: 11px 36px 11px 38px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: var(--text-main);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.cp-search::placeholder { color: var(--text-muted); }

.cp-search:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79,70,229,0.12);
}

.cp-search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-section);
  border: none;
  border-radius: 6px;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: var(--text-muted);
  transition: background 0.15s, color 0.15s;
}
.cp-search-clear:hover { background: var(--border); color: var(--text-main); }

.cp-results-count {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
  white-space: nowrap;
}

/* ── Filters ── */
.cp-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.cp-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 15px;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.cp-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

.cp-pill.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 14px rgba(79,70,229,0.30);
}

.cp-pill-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
}

.cp-pill:not(.active) .cp-pill-count {
  background: var(--bg-section);
  color: var(--text-muted);
}

/* ── Grid ── */
.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

/* ── Card ── */
.cp-card {
  border-radius: 14px;
  padding: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s, border-color 0.22s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cp-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(79,70,229,0.22);
}

.cp-card-top {
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.cp-card-body {
  padding: 20px 20px 0;
  flex: 1;
}

.cp-card-head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 14px;
}

.cp-avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
  letter-spacing: -0.02em;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  font-family: 'Sora', sans-serif;
}

.cp-name-block { flex: 1; min-width: 0; }

.cp-name {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-main);
  line-height: 1.3;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cp-code-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

.cp-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid;
  letter-spacing: 0.02em;
  margin-bottom: 14px;
}

/* ── Info Rows ── */
.cp-info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 0;
  border-top: 1px solid var(--border);
}

.cp-info-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.cp-info-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--bg-section);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: var(--text-muted);
}

.cp-info-content { flex: 1; min-width: 0; }

.cp-info-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1;
  margin-bottom: 2px;
}

.cp-info-value {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Card Footer ── */
.cp-card-footer {
  padding: 14px 20px 20px;
}

.cp-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 11px 16px;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(79,70,229,0.30);
  transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
}

.cp-btn:hover {
  background: var(--primary-hover);
  box-shadow: 0 8px 22px rgba(79,70,229,0.40);
  transform: translateY(-1px);
}

.cp-btn-icon {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: rgba(255,255,255,0.18);
  display: grid; place-items: center;
  flex-shrink: 0;
}

/* ── Empty State ── */
.cp-empty {
  grid-column: 1/-1;
  text-align: center;
  padding: 72px 24px;
  color: var(--text-muted);
}
.cp-empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.cp-empty-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.cp-empty-sub { font-size: 0.85rem; }

/* ── Pagination ── */
.cp-pagination-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 2.5rem;
}

.cp-pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.cp-pg {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s;
}

.cp-pg:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

.cp-pg.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(79,70,229,0.30);
}

.cp-pg:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.cp-pg-info {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* ── Shimmer animation ── */
@keyframes cp-shimmer {
  0%   { opacity: 0.5; }
  50%  { opacity: 1;   }
  100% { opacity: 0.5; }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .cp-stats-row { gap: 8px; }
  .cp-stat-chip { padding: 8px 14px; min-width: 76px; }
  .cp-grid { grid-template-columns: 1fr; }
  .cp-toolbar { flex-direction: column; align-items: stretch; }
  .cp-search-wrap { max-width: 100%; }
}
`;

  return (
    <div className="cp-root">
      <style>{css}</style>

      <div className="cp-page">

        {/* ── Header ── */}
        <div className="cp-header">
          <div className="cp-header-inner">
            <div className="cp-breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span>Colleges</span>
            </div>

            <h1 className="cp-title">
              Find Your <span>Dream College</span>
            </h1>
            <p className="cp-sub">
              Browse {allColleges.length}+ Telangana engineering colleges — filter by type, search by name or location.
            </p>

            <div className="cp-stats-row">
              <StatChip label="Colleges" value={allColleges.length} color="#4F46E5" />
              <StatChip label="Government" value={typeCounts["Government"] ?? 0} color="#10B981" />
              <StatChip label="Pvt Aided" value={typeCounts["Private Aided"] ?? 0} color="#4F46E5" />
              <StatChip label="Private" value={typeCounts["Private"] ?? 0} color="#F59E0B" />
              {filtered.length !== allColleges.length && (
                <StatChip label="Filtered" value={filtered.length} color="#06B6D4" />
              )}
            </div>
          </div>
        </div>

        <div className="cp-inner">

          {/* ── Toolbar ── */}
          <div className="cp-toolbar">
            <div className="cp-search-wrap">
              <Search size={15} className="cp-search-icon" />
              <input
                className="cp-search"
                placeholder="Search by name, code, university or city…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="cp-search-clear" onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>
            {!loading && (
              <span className="cp-results-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* ── Filters ── */}
          <div className="cp-filters">
            {types.map((t) => (
              <button
                key={t}
                className={`cp-pill ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                {t}
                <span className="cp-pill-count">
                  {t === "All" ? allColleges.length : (typeCounts[t] ?? 0)}
                </span>
              </button>
            ))}
          </div>

          {/* ── Grid ── */}
          <div className="cp-grid">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
              : paginated.length === 0
                ? (
                  <div className="cp-empty">
                    <div className="cp-empty-icon">🔍</div>
                    <div className="cp-empty-title">No colleges found</div>
                    <div className="cp-empty-sub">Try a different search term or filter.</div>
                  </div>
                )
                : paginated.map((c) => {
                  const meta = typeMeta(c.collegeType);
                  const grad = avatarGrad(c.collegeType);
                  const initials = c.collegeName
                    .split(" ")
                    .filter(w => w.length > 2)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase() || c.collegeName.slice(0, 2).toUpperCase();

                  return (
                    <div key={c.id} className="cp-card">
                      <div className="cp-card-top" />

                      <div className="cp-card-body">
                        {/* Head */}
                        <div className="cp-card-head">
                          <div className="cp-avatar" style={{ background: grad }}>
                            {initials}
                          </div>
                          <div className="cp-name-block">
                            <div className="cp-name">{c.collegeName}</div>
                            <div className="cp-code-row">
                              <Hash size={10} />
                              {c.collegeCode}
                            </div>
                          </div>
                        </div>

                        {/* Type badge */}
                        <div
                          className="cp-type-badge"
                          style={{ background: meta.bg, color: meta.color, borderColor: meta.border }}
                        >
                          {meta.icon}
                          {c.collegeType}
                        </div>

                        {/* Info rows */}
                        <div className="cp-info-list">
                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <BookOpen size={13} />
                            </div>
                            <div className="cp-info-content">
                              <div className="cp-info-label">University</div>
                              <div className="cp-info-value" title={c.universityName}>
                                {c.universityName}
                              </div>
                            </div>
                          </div>

                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <MapPin size={13} />
                            </div>
                            <div className="cp-info-content">
                              <div className="cp-info-label">Address</div>
                              <div className="cp-info-value" title={c.collegeAddress}>
                                {c.collegeAddress}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="cp-card-footer">
                        <Link to={`/colleges/${c.collegeCode}/branches`} className="cp-btn">
                          <span>View Branches</span>
                          <span className="cp-btn-icon">
                            <ArrowRight size={13} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* ── Pagination ── */}
          {!loading && totalPages > 1 && (
            <div className="cp-pagination-wrap">
              <div className="cp-pagination">
                <button
                  className="cp-pg"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft size={15} />
                </button>

                {pageNums.map((n) => (
                  <button
                    key={n}
                    className={`cp-pg ${page === n ? "active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n + 1}
                  </button>
                ))}

                <button
                  className="cp-pg"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
              <span className="cp-pg-info">
                Page {page + 1} of {totalPages} · {filtered.length} colleges
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CollegesPage;