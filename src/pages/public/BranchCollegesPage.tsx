import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Hash,
  Users,
  Calendar,
} from "lucide-react";

import { programApi } from "@/api/programApi";
import { CourseSummary } from "@/types/program";

const PAGE_SIZE = 9;

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
function SkeletonCard() {
  return (
    <div className="cp-card">
      <div style={{ height: 4 }} />
      <div className="cp-card-body">
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: "var(--cp-shimmer)",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 10,
                width: "70%",
                background: "var(--cp-shimmer)",
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const BranchCollegesPage = () => {
  const { examCode, courseCode } = useParams();
  const [course, setCourse] = useState<CourseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    if (!examCode || !courseCode) return;

    let cancelled = false;

    const fetch = async () => {
      try {
        setLoading(true);

        const res = await programApi.getCourseColleges(examCode, courseCode);

        if (!cancelled) {
          setCourse(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [examCode, courseCode]);

  const totalPages = Math.max(
    1,
    Math.ceil((course?.colleges?.length ?? 0) / PAGE_SIZE),
  );

  const paginated = useMemo(() => {
    return (course?.colleges ?? []).slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE,
    );
  }, [course, page]);

  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
    if (page < 3) return [0, 1, 2, 3, 4];
    if (page > totalPages - 4)
      return [
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  return (
    <div className="cp-root">
      <style>{css}</style>

      <div className="cp-page">
        {/* HEADER */}

        <div className="cp-header">
          <div className="cp-header-inner">
            <div className="cp-breadcrumb">
              <Link to="/">Home</Link>
              <span className="cp-breadcrumb-sep">›</span>

              <Link to="/exams">Exams</Link>
              <span className="cp-breadcrumb-sep">›</span>

              <span>{course?.courseName}</span>
            </div>

            <h1 className="cp-title">
              Colleges Offering <span>{course?.courseName}</span>
            </h1>

            <p className="cp-sub">{course?.collegeCount ?? 0} Colleges Found</p>
          </div>
        </div>

        <div className="cp-inner">
          {/* GRID */}

          <div className="cp-grid">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : paginated.map((c) => {
                  const initials = c.collegeName
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <div key={c.collegeCode} className="cp-card">
                      <div className="cp-card-top" />

                      <div className="cp-card-body">
                        {/* HEAD */}

                        <div className="cp-card-head">
                          <div
                            className="cp-avatar"
                            style={{
                              background:
                                "linear-gradient(135deg,#4F46E5,#6366f1)",
                            }}
                          >
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

                        {/* INFO */}

                        <div className="cp-info-list">
                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <MapPin size={13} />
                            </div>

                            <div className="cp-info-content">
                              <div className="cp-info-label">District</div>
                              <div className="cp-info-value">{c.district}</div>
                            </div>
                          </div>

                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <MapPin size={13} />
                            </div>

                            <div className="cp-info-content">
                              <div className="cp-info-label">Address</div>
                              <div className="cp-info-value">{c.address}</div>
                            </div>
                          </div>

                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <Calendar size={13} />
                            </div>

                            <div className="cp-info-content">
                              <div className="cp-info-label">Established</div>
                              <div className="cp-info-value">
                                {c.establishmentYear}
                              </div>
                            </div>
                          </div>

                          <div className="cp-info-row">
                            <div className="cp-info-icon">
                              <Users size={13} />
                            </div>

                            <div className="cp-info-content">
                              <div className="cp-info-label">Co-Education</div>
                              <div className="cp-info-value">
                                {c.coEducationType}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER */}

                      <div className="cp-card-footer">
                        <Link
                          to={`/colleges/${c.collegeCode}/branches`}
                          className="cp-btn"
                        >
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

          {/* PAGINATION */}

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
                Page {page + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchCollegesPage;
