import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Landmark, FlaskConical, X } from "lucide-react";
import { collegeApi, College } from "@/api/collegeApi";

/* ─── Demo fallback data ─────────────────────────── */
const DEMO: College[] = [
  { id: 1, collegeCode: "E001", collegeName: "University Visvesvaraya College of Engineering", collegeType: "Government", universityName: "Bangalore University", collegeAddress: "Bengaluru" },
  { id: 2, collegeCode: "E002", collegeName: "BMS College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
  { id: 3, collegeCode: "E003", collegeName: "RV College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
  { id: 4, collegeCode: "E004", collegeName: "PES University", collegeType: "Private", universityName: "PES University", collegeAddress: "Bengaluru" },
  { id: 5, collegeCode: "E005", collegeName: "MS Ramaiah Institute of Technology", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
  { id: 6, collegeCode: "E006", collegeName: "National Institute of Technology Telangana", collegeType: "Government", universityName: "NITK", collegeAddress: "Surathkal" },
  { id: 7, collegeCode: "E007", collegeName: "JSS Science and Technology University", collegeType: "Private", universityName: "JSSSTU", collegeAddress: "Mysuru" },
  { id: 8, collegeCode: "E008", collegeName: "Siddaganga Institute of Technology", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Tumkur" },
  { id: 9, collegeCode: "E009", collegeName: "Dayananda Sagar College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "Bengaluru" },
  { id: 10, collegeCode: "E010", collegeName: "New Horizon College of Engineering", collegeType: "Private", universityName: "VTU", collegeAddress: "Bengaluru" },
  { id: 11, collegeCode: "E011", collegeName: "KLE Technological University", collegeType: "Private", universityName: "KLE Tech", collegeAddress: "Hubballi" },
  { id: 12, collegeCode: "E012", collegeName: "Alliance University", collegeType: "Private", universityName: "Alliance University", collegeAddress: "Bengaluru" },
];

const PAGE_SIZE = 9;

/* ─── Type badge config ──────────────────────────── */
const TYPE_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  "Government": { bg: "rgba(16,185,129,0.12)", text: "#10b981", icon: <Landmark size={11} /> },
  "Private Aided": { bg: "rgba(99,102,241,0.12)", text: "#818cf8", icon: <GraduationCap size={11} /> },
  "Private": { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", icon: <FlaskConical size={11} /> },
};
function typeMeta(type: string) {
  return TYPE_CONFIG[type] ?? { bg: "rgba(148,163,184,0.12)", text: "#94a3b8", icon: null };
}

/* ─── Skeleton card ──────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: 20, padding: "1.5rem", display: "flex", flexDirection: "column", gap: 12,
    }}>
      {[100, 70, 50, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 14 : 10, width: `${w}%`,
          borderRadius: 6, background: "var(--shimmer)",
          animation: "shimmer 1.4s ease infinite",
          animationDelay: `${i * 0.12}s`,
        }} />
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────── */
const CollegesPage = () => {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  const [page, setPage] = useState(0);

  /* Single fetch — all data at once */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await collegeApi.getAll({ page: 0, size: 10000 });
        if (!cancelled) setAllColleges(res.data.content);
      } catch {
        if (!cancelled) {
          setAllColleges(DEMO);
          setError(null); // silently use demo data
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* Unique types for filter pills */
  const types = useMemo(() => {
    const set = new Set(allColleges.map((c) => c.collegeType));
    return ["All", ...Array.from(set)];
  }, [allColleges]);

  /* Client-side filter */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allColleges.filter((c) => {
      const matchSearch =
        !q ||
        c.collegeName.toLowerCase().includes(q) ||
        c.universityName.toLowerCase().includes(q) ||
        c.collegeCode.toLowerCase().includes(q) ||
        c.collegeAddress.toLowerCase().includes(q);
      const matchType = activeType === "All" || c.collegeType === activeType;
      return matchSearch && matchType;
    });
  }, [allColleges, search, activeType]);

  /* Reset page when filters change */
  useEffect(() => { setPage(0); }, [search, activeType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

    .cp-root { font-family:'Outfit',sans-serif; }

    .cp-root * { box-sizing:border-box; }

    /* Use existing theme vars or fallback */
    .cp-root {
      --card: var(--bg3, #ffffff);
      --border: rgba(0,0,0,0.08);
      --text: var(--text, #0f1629);
      --text2: var(--text2, #4a5568);
      --text3: var(--text3, #a0aec0);
      --primary: var(--primary, #4f46e5);
      --primary-glow: var(--primary-glow, rgba(79,70,229,0.25));
      --surface: rgba(0,0,0,0.03);
      --surface-hover: rgba(0,0,0,0.055);
      --shimmer: rgba(0,0,0,0.07);
      --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    }

    .cp-root {
  --primary: #2563eb;
  --primary-glow: rgba(37,99,235,0.25);
  --accent: #06b6d4;

  --card: #ffffff;
  --border: rgba(15,23,42,0.08);
  --text: #0f172a;
  --text2: #334155;
  --text3: #64748b;
  --surface: #f1f5f9;
}

    [data-theme="dark"] .cp-root {
      --card: #111827;
      --border: rgba(255,255,255,0.08);
      --shimmer: rgba(255,255,255,0.07);
      --surface: rgba(255,255,255,0.04);
      --surface-hover: rgba(255,255,255,0.08);
    }

    @keyframes shimmer {
      0%,100%{opacity:0.5} 50%{opacity:1}
    }
    @keyframes fadeUp {
      from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)}
    }
    @keyframes fadeIn {
      from{opacity:0} to{opacity:1}
    }

    /* ── Header ── */
    .cp-header { margin-bottom:2.5rem; animation:fadeUp 0.5s ease both; }
    .cp-eyebrow {
      display:inline-flex; align-items:center; gap:6px;
      font-size:0.72rem; font-weight:700; text-transform:uppercase;
      letter-spacing:0.1em; color:var(--primary);
      background:var(--primary-glow); padding:4px 12px;
      border-radius:100px; margin-bottom:1rem;
    }
    .cp-title {
      font-family:'DM Serif Display',serif;
      font-size:clamp(2rem,4vw,2.8rem); line-height:1.1;
      color:var(--text); margin-bottom:0.5rem;
    }
    .cp-title em {
      font-style:italic;
      background:linear-gradient(135deg,var(--primary) 0%,#0ea5e9 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
    }
    .cp-sub { font-size:0.95rem; color:var(--text2); line-height:1.6; }

    /* ── Controls ── */
    .cp-controls { display:flex; flex-direction:column; gap:1rem; margin-bottom:2rem; animation:fadeUp 0.5s 0.08s ease both; }

    .cp-search-wrap {
      position:relative; max-width:480px;
    }
    .cp-search-icon {
      position:absolute; left:14px; top:50%; transform:translateY(-50%);
      color:var(--text3); pointer-events:none;
    }
    .cp-search {
      width:100%; padding:12px 40px 12px 42px;
      border-radius:14px;
      background:var(--card); border:1.5px solid var(--border);
      color:var(--text); font-size:0.9rem; font-family:'Outfit',sans-serif;
      outline:none; transition:border-color 0.2s, box-shadow 0.2s;
    }
    .cp-search::placeholder { color:var(--text3); }
    .cp-search:focus { border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-glow); }
    .cp-clear-btn {
      position:absolute; right:12px; top:50%; transform:translateY(-50%);
      background:none; border:none; cursor:pointer; color:var(--text3);
      display:flex; align-items:center; padding:2px;
      transition:color 0.15s;
    }
    .cp-clear-btn:hover { color:var(--text); }

    .cp-filters { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
    .cp-filter-label { font-size:0.78rem; font-weight:600; color:var(--text3); margin-right:4px; }
    .cp-pill {
      padding:6px 16px; border-radius:100px;
      font-size:0.8rem; font-weight:600; font-family:'Outfit',sans-serif;
      border:1.5px solid var(--border);
      background:var(--card); color:var(--text2);
      cursor:pointer; transition:all 0.18s var(--ease-spring);
    }
    .cp-pill:hover { border-color:var(--primary); color:var(--primary); transform:translateY(-1px); }
    .cp-pill.active { background:var(--primary); color:#fff; border-color:var(--primary); box-shadow:0 4px 14px var(--primary-glow); }

    /* ── Stats bar ── */
    .cp-stats-bar {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:1.5rem; flex-wrap:wrap; gap:8px;
    }
    .cp-result-count { font-size:0.85rem; color:var(--text2); }
    .cp-result-count strong { color:var(--text); font-weight:700; }

    /* ── Grid ── */
    .cp-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
      gap:1.25rem;
      animation:fadeIn 0.3s ease both;
    }

    /* ── College card ── */
    .cp-card {
      background:var(--card); border:1.5px solid var(--border);
      border-radius:20px; padding:1.4rem;
      display:flex; flex-direction:column;
      transition:transform 0.25s var(--ease-spring), border-color 0.2s, box-shadow 0.25s;
      position:relative; overflow:hidden;
      animation:fadeUp 0.4s ease both;
    }
    .cp-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg, var(--primary) 0%, #0ea5e9 100%);
      opacity:0; transition:opacity 0.2s;
    }
    .cp-card:hover { transform:translateY(-4px); border-color:var(--primary); box-shadow:0 16px 40px rgba(0,0,0,0.1); }
    .cp-card:hover::before { opacity:1; }

    .cp-card-top { display:flex; align-items:flex-start; gap:12px; margin-bottom:1rem; }
    .cp-college-icon {
      width:42px; height:42px; flex-shrink:0; border-radius:12px;
      background:linear-gradient(135deg, var(--primary) 0%, #0ea5e9 100%);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-weight:800; font-size:1rem;
      box-shadow:0 4px 14px var(--primary-glow);
    }
    .cp-college-name {
      font-size:0.9rem; font-weight:700; color:var(--text);
      line-height:1.4; display:-webkit-box;
      -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
    }
    .cp-college-code { font-size:0.72rem; color:var(--text3); margin-top:2px; font-weight:500; }

    .cp-badges { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:0.8rem; }
    .cp-type-badge {
      display:inline-flex; align-items:center; gap:4px;
      padding:3px 10px; border-radius:6px;
      font-size:0.7rem; font-weight:700; letter-spacing:0.02em;
    }
    .cp-uni-badge {
      padding:3px 10px; border-radius:6px;
      font-size:0.7rem; font-weight:600;
      background:var(--surface); color:var(--text2);
    }

    .cp-address {
      font-size:0.78rem; color:var(--text3);
      margin-bottom:1.1rem; display:flex; align-items:center; gap:5px;
    }

    .cp-card-footer { margin-top:auto; }
    .cp-view-btn {
      display:inline-flex; align-items:center; gap:6px;
      padding:9px 18px; border-radius:10px;
      font-size:0.82rem; font-weight:700; font-family:'Outfit',sans-serif;
      background:var(--surface); color:var(--primary);
      border:1.5px solid var(--border); text-decoration:none;
      transition:all 0.2s var(--ease-spring);
      width:100%; justify-content:center;
    }
    .cp-view-btn:hover {
      background:var(--primary); color:#fff;
      border-color:var(--primary);
      box-shadow:0 6px 20px var(--primary-glow);
      transform:translateY(-1px);
    }
    .cp-view-btn svg { transition:transform 0.2s var(--ease-spring); }
    .cp-view-btn:hover svg { transform:translateX(3px); }

    /* ── Pagination ── */
    .cp-pagination {
      display:flex; align-items:center; justify-content:center;
      gap:8px; margin-top:2.5rem; flex-wrap:wrap;
    }
    .cp-pg-btn {
      width:38px; height:38px; border-radius:10px;
      border:1.5px solid var(--border); background:var(--card);
      color:var(--text2); cursor:pointer; font-family:'Outfit',sans-serif;
      font-size:0.85rem; font-weight:600;
      display:flex; align-items:center; justify-content:center;
      transition:all 0.18s var(--ease-spring);
    }
    .cp-pg-btn:hover:not(:disabled) { border-color:var(--primary); color:var(--primary); transform:scale(1.08); }
    .cp-pg-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); box-shadow:0 4px 14px var(--primary-glow); }
    .cp-pg-btn:disabled { opacity:0.3; cursor:not-allowed; }
    .cp-pg-info { font-size:0.8rem; color:var(--text3); padding:0 8px; }

    /* ── Empty & Error ── */
    .cp-empty {
      text-align:center; padding:5rem 2rem;
      animation:fadeUp 0.4s ease both;
    }
    .cp-empty-icon { font-size:3rem; margin-bottom:1rem; }
    .cp-empty-title { font-size:1.1rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
    .cp-empty-sub { font-size:0.875rem; color:var(--text2); }

    .cp-error {
      text-align:center; padding:4rem 2rem;
      background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15);
      border-radius:16px; animation:fadeUp 0.4s ease both;
    }
    .cp-error-title { font-size:1rem; font-weight:700; color:#ef4444; margin-bottom:0.5rem; }
    .cp-error-sub { font-size:0.85rem; color:var(--text2); margin-bottom:1rem; }
    .cp-retry { padding:9px 22px; border-radius:10px; background:#ef4444; color:#fff; border:none; cursor:pointer; font-weight:600; font-size:0.85rem; font-family:'Outfit',sans-serif; transition:transform 0.2s; }
    .cp-retry:hover { transform:translateY(-2px); }

    @media(max-width:640px) {
      .cp-grid { grid-template-columns:1fr; }
      .cp-title { font-size:1.8rem; }
    }
  `;

  /* Page number pills — show max 5 */
  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
    if (page < 3) return [0, 1, 2, 3, 4];
    if (page > totalPages - 4) return [totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  return (
    <div className="cp-root min-h-screen py-10 px-4">
      <style>{css}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div className="cp-header">
          <div className="cp-eyebrow">
            <GraduationCap size={12} /> Telangana MTech Admissions
          </div>
          <h1 className="cp-title">
            Find Your <em>Dream College</em>
          </h1>
          <p className="cp-sub">
            Browse {allColleges.length || "200+"}  engineering colleges · Compare cutoffs · Plan your MTech journey
          </p>
        </div>

        {/* ── Controls ── */}
        <div className="cp-controls">
          <div className="cp-search-wrap">
            <Search className="cp-search-icon" size={16} />
            <input
              className="cp-search"
              type="text"
              placeholder="Search by college name, university, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="cp-clear-btn" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="cp-filters">
            <span className="cp-filter-label">Type:</span>
            {types.map((t) => (
              <button
                key={t}
                className={`cp-pill ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats bar ── */}
        {!loading && (
          <div className="cp-stats-bar">
            <p className="cp-result-count">
              Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> colleges
              {activeType !== "All" && <> · <span style={{ color: "var(--primary)", fontWeight: 600 }}>{activeType}</span></>}
            </p>
            {filtered.length < allColleges.length && (
              <button
                style={{ fontSize: "0.78rem", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}
                onClick={() => { setSearch(""); setActiveType("All"); }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="cp-grid">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="cp-error">
            <div className="cp-error-title">Failed to load colleges</div>
            <div className="cp-error-sub">{error}</div>
            <button className="cp-retry" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="cp-empty">
            <div className="cp-empty-icon">🔍</div>
            <div className="cp-empty-title">No colleges found</div>
            <div className="cp-empty-sub">Try adjusting your search or filter</div>
          </div>
        ) : (
          <div className="cp-grid">
            {paginated.map((college, i) => {
              const meta = typeMeta(college.collegeType);
              const initials = college.collegeName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
              return (
                <div className="cp-card" key={college.collegeCode} style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="cp-card-top">
                    <div className="cp-college-icon">{initials}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className="cp-college-name">{college.collegeName}</div>
                      <div className="cp-college-code">#{college.collegeCode}</div>
                    </div>
                  </div>

                  <div className="cp-badges">
                    <span className="cp-type-badge" style={{ background: meta.bg, color: meta.text }}>
                      {meta.icon}{college.collegeType}
                    </span>
                    <span className="cp-uni-badge">{college.universityName}</span>
                  </div>

                  <div className="cp-address">
                    <svg width="11" height="13" viewBox="0 0 12 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
                    </svg>
                    {college.collegeAddress}
                  </div>

                  <div className="cp-card-footer">
                    <Link to={`/colleges/${college.collegeCode}/branches`} className="cp-view-btn">
                      View Branches & Cutoffs
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="cp-pagination">
            <button className="cp-pg-btn" disabled={page === 0} onClick={() => setPage(0)}>«</button>
            <button className="cp-pg-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft size={15} />
            </button>
            {pageNums.map((n) => (
              <button
                key={n}
                className={`cp-pg-btn ${page === n ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n + 1}
              </button>
            ))}
            <button className="cp-pg-btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
              <ChevronRight size={15} />
            </button>
            <button className="cp-pg-btn" disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)}>»</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CollegesPage;