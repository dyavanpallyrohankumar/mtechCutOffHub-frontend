import "@/styles/home.css";
import { useTheme } from "@/hooks/useTheme";
import Counter from "@/components/Counter";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  const features = [
    { emoji: "📊", title: "Cutoff Analytics", desc: "Opening & closing ranks across years, categories, phases — visualized cleanly.", from: "#6366f1", to: "#8b5cf6" },
    { emoji: "🔍", title: "Smart Search", desc: "Instant college and branch lookup with powerful multi-dimensional filters.", from: "#0ea5e9", to: "#06b6d4" },
    { emoji: "📈", title: "Trend Analysis", desc: "Watch how cutoffs shift year-over-year. Spot the right opportunity.", from: "#10b981", to: "#059669" },
    { emoji: "✅", title: "Verified Data", desc: "Sourced directly from official TSCHE allotment results. No guesswork.", from: "#f59e0b", to: "#ef4444" },
  ];

  const steps = [
    { n: "01", title: "Search Your College", body: "Browse 200+ Telangana engineering colleges by name, location, or university.", color: "#6366f1" },
    { n: "02", title: "Pick a Branch", body: "Select from 1000+ programs — CSE, ECE, Mechanical, Civil, and more.", color: "#ec4899" },
    { n: "03", title: "Analyze Cutoffs", body: "View historical opening/closing ranks filtered by category, gender, exam, and phase.", color: "#10b981" },
  ];

  const stats = [
    { val: 200, suffix: "+", label: "Colleges", color: "#6366f1" },
    { val: 1000, suffix: "+", label: "Programs", color: "#ec4899" },
    { val: 50, suffix: "K+", label: "Records", color: "#f59e0b" },
    { val: 5, suffix: "+", label: "Years", color: "#10b981" },
  ];

  const categories = [
    { label: "OC", from: "#6366f1", to: "#8b5cf6" },
    { label: "SC", from: "#0ea5e9", to: "#06b6d4" },
    { label: "ST", from: "#10b981", to: "#059669" },
    { label: "BC-A", from: "#f59e0b", to: "#f97316" },
    { label: "BC-B", from: "#ec4899", to: "#8b5cf6" },
    { label: "BC-C", from: "#14b8a6", to: "#0ea5e9" },
    { label: "BC-D", from: "#a855f7", to: "#ec4899" },
    { label: "BC-E", from: "#ef4444", to: "#f97316" },
  ];

  const tableRows = [
    { cat: "OC", color: "#6366f1", exam: "GATE", open: 148, close: 892, phase: "I" },
    { cat: "SC", color: "#0ea5e9", exam: "GATE", open: 312, close: 1840, phase: "I" },
    { cat: "BC-A", color: "#10b981", exam: "GATE", open: 224, close: 1230, phase: "II" },
    { cat: "OC", color: "#6366f1", exam: "PGCET", open: 520, close: 3200, phase: "I" },
  ];

  return (
    <div data-theme={theme} className="hm-root">
      <div className="hm-page">

        {/* ── NAV ── */}
        <nav className="hm-nav">
          <a href="/" className="hm-nav-logo">
            <div className="hm-logo-icon">🎓</div>
            <span>MTech<span className="hm-logo-accent">Hub</span></span>
          </a>
          <div className="hm-nav-links">
            <a href="/colleges" className="hm-nav-link">Colleges</a>
            <a href="/privacy-policy" className="hm-nav-link">Privacy</a>
            <a href="/contact" className="hm-nav-link">Contact</a>
            <button className="hm-theme-btn" onClick={toggle} aria-label="Toggle theme">
              {dark ? "☀️" : "🌙"}
            </button>
            <a href="/admin/login" className="hm-nav-cta">Admin Portal</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hm-hero">
          {/* Decorative blobs */}
          <div className="hm-blob hm-blob-1" />
          <div className="hm-blob hm-blob-2" />
          <div className="hm-blob hm-blob-3" />
          <div className="hm-blob hm-blob-4" />
          {/* Dot grid */}
          <div className="hm-dots" />

          <div className="hm-hero-inner">
            {/* Badge */}
            <div className="hm-badge">
              <span className="hm-badge-dot" />
              GATE &amp; PGCET Analytics · Telangana
            </div>

            {/* Headline */}
            <h1 className="hm-hero-title">
              Find Your<br />
              <span className="hm-hero-hl">MTech</span>{" "}
              <span className="hm-hero-hl2">Admission</span><br />
              <span className="hm-hero-hl3">Edge</span>
            </h1>

            <p className="hm-hero-sub">
              Explore <strong>50,000+</strong> cutoff records across <strong>200+</strong> colleges.
              Compare ranks category-wise, year-wise, phase-wise — all in one place.
            </p>

            <div className="hm-hero-actions">
              <Link to="/colleges" className="hm-btn-primary">
                Explore Colleges →
              </Link>
              <a href="/contact" className="hm-btn-secondary">
                📬 Report Data Issue
              </a>
            </div>

            {/* Preview table */}
            <div className="hm-preview-wrap">
              <div className="hm-preview-card">
                <div className="hm-preview-bar" />
                <div className="hm-preview-header">
                  <div className="hm-preview-dots">
                    <span style={{ background: "#ef4444" }} />
                    <span style={{ background: "#f59e0b" }} />
                    <span style={{ background: "#22c55e" }} />
                  </div>
                  <span className="hm-preview-title">RVCE · Computer Science · 2024</span>
                </div>
                <table className="hm-preview-table">
                  <thead>
                    <tr>
                      <th>Category</th><th>Exam</th>
                      <th>Opening Rank</th><th>Closing Rank</th><th>Phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <span className="hm-cat-badge" style={{ background: `${r.color}18`, color: r.color, borderColor: `${r.color}30` }}>
                            {r.cat}
                          </span>
                        </td>
                        <td className="hm-exam-cell">{r.exam}</td>
                        <td><span className="hm-rank-chip hm-rank-open">{r.open}</span></td>
                        <td><span className="hm-rank-chip hm-rank-close">{r.close}</span></td>
                        <td className="hm-phase-cell">Phase {r.phase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="hm-stats-section">
          <div className="hm-stats-inner">
            {stats.map((s) => (
              <div className="hm-stat-item" key={s.label}>
                <div className="hm-stat-value" style={{ color: s.color }}>
                  <Counter target={s.val} suffix={s.suffix} />
                </div>
                <div className="hm-stat-label">{s.label}</div>
                <div className="hm-stat-underline" style={{ background: s.color }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="hm-features-section">
          <div className="hm-section-head">
            <p className="hm-eyebrow">Platform Features</p>
            <h2 className="hm-section-title">
              Everything you need<br />
              <span className="hm-section-hl">to decide smarter</span>
            </h2>
            <p className="hm-section-sub">
              Built for Telangana MTech aspirants. Powered by official TSCHE allotment data.
            </p>
          </div>
          <div className="hm-features-grid">
            {features.map((f, i) => (
              <div
                className="hm-feature-card"
                key={f.title}
                style={{ "--fc-from": f.from, "--fc-to": f.to } as React.CSSProperties}
              >
                <div className="hm-feature-icon-wrap">
                  <span className="hm-feature-icon">{f.emoji}</span>
                </div>
                <div className="hm-feature-title">{f.title}</div>
                <div className="hm-feature-desc">{f.desc}</div>
                <div className="hm-feature-glow" />
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="hm-cat-section">
          <div className="hm-cat-bg" />
          <div className="hm-cat-inner">
            <p className="hm-eyebrow" style={{ color: "#fff", opacity: 0.75 }}>Filter by Category</p>
            <h2 className="hm-section-title" style={{ color: "#fff" }}>
              All reservation categories<br />covered
            </h2>
            <div className="hm-cat-row">
              {categories.map((c) => (
                <button
                  key={c.label}
                  className="hm-cat-pill"
                  style={{ "--cp-from": c.from, "--cp-to": c.to } as React.CSSProperties}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="hm-how-section">
          <div className="hm-section-head">
            <p className="hm-eyebrow">How It Works</p>
            <h2 className="hm-section-title">
              Three steps to <span className="hm-section-hl">clarity</span>
            </h2>
            <p className="hm-section-sub">From search to decision — takes under 60 seconds.</p>
          </div>
          <div className="hm-steps">
            {steps.map((s, i) => (
              <div className="hm-step-card" key={s.n} style={{ "--sc": s.color } as React.CSSProperties}>
                <div className="hm-step-num" style={{ color: s.color }}>{s.n}</div>
                <div className="hm-step-connector" style={{ background: s.color }} />
                <div className="hm-step-title">{s.title}</div>
                <div className="hm-step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hm-cta-section">
          <div className="hm-cta-card">
            <div className="hm-cta-shapes">
              <div className="hm-cta-shape hm-cta-shape-1" />
              <div className="hm-cta-shape hm-cta-shape-2" />
            </div>
            <div className="hm-cta-inner">
              <span className="hm-cta-emoji">🚀</span>
              <h2 className="hm-cta-title">Start exploring today</h2>
              <p className="hm-cta-sub">
                Your MTech journey begins with the right data.<br />
                Browse colleges, compare cutoffs, find your fit.
              </p>
              <a href="/colleges" className="hm-btn-white">Browse Colleges →</a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="hm-footer">
          <p className="hm-footer-text">© 2026 MTech Cutoff Hub · Built for students, by students.</p>
          <div className="hm-footer-links">
            <a href="/privacy-policy" className="hm-footer-link">Privacy Policy</a>
            <a href="/contact" className="hm-footer-link">Contact</a>
            <a href="/admin/login" className="hm-footer-link">Admin</a>
          </div>
        </footer>

      </div>
    </div>
  );
}