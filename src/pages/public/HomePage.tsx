import "@/styles/home.css";
import { useTheme } from "@/hooks/useTheme";
import Counter from "@/components/Counter";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { theme, toggle } = useTheme();
  // const dark = theme === "dark";

  const features = [
    {
      emoji: "🗺️",
      title: "Nationwide Coverage",
      desc: "Explore engineering admissions across multiple Indian states through a unified platform.",
      from: "#6366f1",
      to: "#8b5cf6",
    },
    {
      emoji: "🏛️",
      title: "College Explorer",
      desc: "Browse colleges, universities, campuses, and available postgraduate engineering programs with ease.",
      from: "#0ea5e9",
      to: "#06b6d4",
    },
    {
      emoji: "📊",
      title: "Admission Intelligence",
      desc: "Analyze historical opening and closing ranks across years, categories, rounds, and entrance examinations.",
      from: "#10b981",
      to: "#059669",
    },
    {
      emoji: "📈",
      title: "Trend Analysis",
      desc: "Compare cutoff movements over multiple years and identify admission opportunities before counseling begins.",
      from: "#f59e0b",
      to: "#ef4444",
    },
    {
      emoji: "🔍",
      title: "Smart Search",
      desc: "Quickly search colleges, entrance examinations, programs, and cutoff records from one place.",
      from: "#ec4899",
      to: "#8b5cf6",
    },
    {
      emoji: "✅",
      title: "Verified Public Data",
      desc: "Built using publicly available counseling information from official authorities and universities.",
      from: "#14b8a6",
      to: "#0ea5e9",
    },
  ];
  const steps = [
    {
      n: "01",
      title: "Choose Your State",
      body: "Select the state where you want to pursue your postgraduate engineering program.",
      color: "#6366f1",
    },
    {
      n: "02",
      title: "Select an Entrance Exam",
      body: "Choose the entrance examination accepted within the selected state.",
      color: "#ec4899",
    },
    {
      n: "03",
      title: "Browse Colleges",
      body: "Explore participating colleges along with complete institutional information.",
      color: "#10b981",
    },
    {
      n: "04",
      title: "Explore Programs",
      body: "View available M.Tech programs, intake, fees, and academic details.",
      color: "#0ea5e9",
    },
    {
      n: "05",
      title: "Analyze Cutoffs",
      body: "Compare historical opening and closing ranks across categories and counseling rounds.",
      color: "#f59e0b",
    },
  ];

  const stats = [
    { val: 200, suffix: "+", label: "Colleges", color: "#6366f1" },
    { val: 1000, suffix: "+", label: "Programs", color: "#ec4899" },
    { val: 50, suffix: "K+", label: "Records", color: "#f59e0b" },
    { val: 5, suffix: "+", label: "Years", color: "#10b981" },

    {
      val: 15,
      suffix: "+",
      label: "States",
      color: "#6366f1",
    },
    {
      val: 25,
      suffix: "+",
      label: "Entrance Exams",
      color: "#0ea5e9",
    },
    {
      val: 1200,
      suffix: "+",
      label: "Colleges",
      color: "#10b981",
    },
    {
      val: 8500,
      suffix: "+",
      label: "Programs",
      color: "#f59e0b",
    },
    {
      val: 500,
      suffix: "K+",
      label: "Cutoff Records",
      color: "#ec4899",
    },
  ];

  const categories = [
    {
      label: "TG PGECET",
      from: "#6366f1",
      to: "#8b5cf6",
    },
    {
      label: "AP PGECET",
      from: "#0ea5e9",
      to: "#06b6d4",
    },
    {
      label: "TG ECET",
      from: "#10b981",
      to: "#059669",
    },
    {
      label: "AP ECET",
      from: "#f59e0b",
      to: "#f97316",
    },
    {
      label: "GATE",
      from: "#ec4899",
      to: "#8b5cf6",
    },
    {
      label: "CUET PG",
      from: "#14b8a6",
      to: "#0ea5e9",
    },
    {
      label: "Coming Soon",
      from: "#64748b",
      to: "#94a3b8",
    },
  ];

  const tableRows = [
    {
      state: "Telangana",
      exam: "TG PGECET",
      college: "JNTUH",
      program: "Computer Science",
      open: 142,
      close: 926,
    },
    {
      state: "Karnataka",
      exam: "GATE",
      college: "RVCE",
      program: "AI & ML",
      open: 68,
      close: 381,
    },
    {
      state: "Andhra Pradesh",
      exam: "AP PGECET",
      college: "AUCE",
      program: "Data Science",
      open: 208,
      close: 1145,
    },
    {
      state: "Tamil Nadu",
      exam: "GATE",
      college: "Anna University",
      program: "Cyber Security",
      open: 55,
      close: 244,
    },
  ];

  return (
    <div data-theme={theme} className="hm-root">
      <div className="hm-page">
        {/* ── NAV ── */}
        {/* <nav className="hm-nav">
          <a href="/" className="hm-nav-logo">
            <div className="hm-logo-icon">🎓</div>
            <span>MTech<span className="hm-logo-accent">CutOffHub</span></span>
          </a>
          <div className="hm-nav-links">
            <Link to="/states" className="hm-nav-link">
              Explore
            </Link>      
            <a href="/privacy-policy" className="hm-nav-link">Privacy</a>
            <a href="/contact" className="hm-nav-link">Contact</a>
            <button className="hm-theme-btn" onClick={toggle} aria-label="Toggle theme">
              {dark ? "☀️" : "🌙"}
            </button>
            <a href="/admin/login" className="hm-nav-cta">Admin Portal</a>
          </div>
        </nav> */}

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
              🇮🇳 Nationwide Engineering Admission Intelligence Platform
            </div>

            {/* Headline */}
            <h1 className="hm-hero-title">
              Discover the Right
              <br />
              <span className="hm-hero-hl">College.</span>
              <br />
              <span className="hm-hero-hl2">Choose with</span>{" "}
              <span className="hm-hero-hl3">Confidence.</span>
            </h1>

            <p className="hm-hero-sub">
              CutoffHub brings together states, entrance examinations, colleges,
              postgraduate engineering programs, and historical admission
              cutoffs into one intelligent platform. Compare trends, analyze
              previous years' admissions, and make informed decisions before
              counseling begins.
            </p>

            <div className="hm-hero-actions">
              <Link to="/states" className="hm-btn-primary">
                Explore States →
              </Link>

              <a href="/contact" className="hm-btn-secondary">
                📬 Report an Issue
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
                  <span className="hm-preview-title">
                    CutoffHub Admission Intelligence Preview
                  </span>
                </div>
                <table className="hm-preview-table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Exam</th>
                      <th>College</th>
                      <th>Program</th>
                      <th>Opening</th>
                      <th>Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.state}</td>

                        <td className="hm-exam-cell">{r.exam}</td>

                        <td>{r.college}</td>

                        <td>{r.program}</td>

                        <td>
                          <span className="hm-rank-chip hm-rank-open">
                            {r.open}
                          </span>
                        </td>

                        <td>
                          <span className="hm-rank-chip hm-rank-close">
                            {r.close}
                          </span>
                        </td>
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
                <div
                  className="hm-stat-underline"
                  style={{ background: s.color }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="hm-features-section">
          <div className="hm-section-head">
            <p className="hm-eyebrow">Why CutoffHub?</p>

            <h2 className="hm-section-title">
              Everything you need
              <br />
              <span className="hm-section-hl">
                for smarter admission decisions
              </span>
            </h2>

            <p className="hm-section-sub">
              A unified platform that helps engineering aspirants explore
              states, entrance examinations, colleges, postgraduate programs,
              and historical admission trends across India.
            </p>
          </div>
          <div className="hm-features-grid">
            {features.map((f) => (
              <div
                className="hm-feature-card"
                key={f.title}
                style={
                  {
                    "--fc-from": f.from,
                    "--fc-to": f.to,
                  } as React.CSSProperties
                }
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
            <p className="hm-eyebrow" style={{ color: "#fff", opacity: 0.75 }}>
              Supported Entrance Examinations
            </p>

            <h2 className="hm-section-title" style={{ color: "#fff" }}>
              Multiple Entrance Exams
              <br />
              One Platform
            </h2>
            <div className="hm-cat-row">
              {categories.map((c) => (
                <button
                  key={c.label}
                  className="hm-cat-pill"
                  style={
                    {
                      "--cp-from": c.from,
                      "--cp-to": c.to,
                    } as React.CSSProperties
                  }
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
            <p className="hm-eyebrow">How CutoffHub Works</p>

            <h2 className="hm-section-title">
              Your admission journey
              <br />
              <span className="hm-section-hl">simplified</span>
            </h2>

            <p className="hm-section-sub">
              Find the right college and program through a guided, data-driven
              admission workflow.
            </p>
          </div>
          <div className="hm-steps">
            {steps.map((s) => (
              <div
                className="hm-step-card"
                key={s.n}
                style={{ "--sc": s.color } as React.CSSProperties}
              >
                <div className="hm-step-num" style={{ color: s.color }}>
                  {s.n}
                </div>
                <div
                  className="hm-step-connector"
                  style={{ background: s.color }}
                />
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
              <h2 className="hm-cta-title">Begin Your Admission Journey</h2>
              <p className="hm-cta-sub">
                Explore engineering admissions across India.
                <br />
                Compare colleges, analyze historical cutoff trends, discover
                postgraduate programs, and make informed admission decisions —
                all from one intelligent platform.
              </p>
              <Link to="/states" className="hm-btn-white">
                Explore CutoffHub →
              </Link>{" "}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
