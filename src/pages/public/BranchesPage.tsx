import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, MapPin, Award, BookOpen, Hash } from "lucide-react";
import { cutoffApi, Branch } from "@/api/cutoffApi";
import GoogleAd from "@/components/GoogleAd";

interface CollegeDetails {
  collegeName: string;
  collegeAddress: string;
  collegeCode: string;
  universityName: string;
  collegeType: string;
  branches: Branch[];
}

const BRANCH_PALETTES = [
  { from: "#6366f1", to: "#8b5cf6", light: "rgba(99,102,241,0.10)", glow: "rgba(99,102,241,0.30)" },
  { from: "#0ea5e9", to: "#06b6d4", light: "rgba(14,165,233,0.10)", glow: "rgba(14,165,233,0.30)" },
  { from: "#10b981", to: "#059669", light: "rgba(16,185,129,0.10)", glow: "rgba(16,185,129,0.30)" },
  { from: "#f59e0b", to: "#ef4444", light: "rgba(245,158,11,0.10)", glow: "rgba(245,158,11,0.30)" },
  { from: "#ec4899", to: "#8b5cf6", light: "rgba(236,72,153,0.10)", glow: "rgba(236,72,153,0.30)" },
  { from: "#14b8a6", to: "#0ea5e9", light: "rgba(20,184,166,0.10)", glow: "rgba(20,184,166,0.30)" },
  { from: "#f97316", to: "#eab308", light: "rgba(249,115,22,0.10)", glow: "rgba(249,115,22,0.30)" },
  { from: "#a855f7", to: "#ec4899", light: "rgba(168,85,247,0.10)", glow: "rgba(168,85,247,0.30)" },
];

function branchEmoji(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("computer") || n.includes("cse") || n.includes("software")) return "💻";
  if (n.includes("electron") || n.includes("ece") || n.includes("vlsi")) return "⚡";
  if (n.includes("mechanical") || n.includes("mech")) return "⚙️";
  if (n.includes("civil")) return "🏗️";
  if (n.includes("chemical")) return "🧪";
  if (n.includes("biotech") || n.includes("bio")) return "🧬";
  if (n.includes("data") || n.includes("ai") || n.includes("ml")) return "🤖";
  if (n.includes("telecom") || n.includes("comm")) return "📡";
  if (n.includes("power") || n.includes("energy")) return "🔋";
  if (n.includes("aerospace") || n.includes("aero")) return "🚀";
  if (n.includes("information") || n.includes("ise")) return "🗄️";
  return "📚";
}

function BranchSkeleton() {
  return (
    <div style={{ background: "var(--bp-card)", border: "1.5px solid var(--bp-border)", borderRadius: 20, padding: "1.5rem", display: "flex", flexDirection: "column", gap: 12 }}>
      {[70, 90, 50, 40].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? 36 : 10, width: `${w}%`, borderRadius: 8, background: "var(--bp-shimmer)", animation: "bp-shimmer 1.4s ease infinite", animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

function CollegeSkeleton() {
  return (
    <div style={{ background: "var(--bp-card)", border: "1.5px solid var(--bp-border)", borderRadius: 24, padding: "2rem", marginBottom: "2rem" }}>
      {[60, 40, 50, 35].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? 28 : 12, width: `${w}%`, borderRadius: 6, background: "var(--bp-shimmer)", animation: "bp-shimmer 1.4s ease infinite", animationDelay: `${i * 0.12}s`, marginBottom: 14 }} />
      ))}
    </div>
  );
}

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  "Government": { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  "Private Aided": { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  "Private": { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
};

const BranchesPage = () => {
  const { collegeId } = useParams();
  const [college, setCollege] = useState<CollegeDetails | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  const demoBranches: Branch[] = [
    { id: 1, branchName: "Computer Science & Engineering", branchCode: "CS", collegeProgramCode: "CS101" },
    { id: 2, branchName: "Artificial Intelligence & ML", branchCode: "AI", collegeProgramCode: "AI101" },
    { id: 3, branchName: "Data Science", branchCode: "DS", collegeProgramCode: "DS101" },
    { id: 4, branchName: "Electronics & Communication", branchCode: "EC", collegeProgramCode: "EC101" },
    { id: 5, branchName: "VLSI Design", branchCode: "VL", collegeProgramCode: "VL101" },
    { id: 6, branchName: "Structural Engineering", branchCode: "SE", collegeProgramCode: "SE101" },];


  const demoCollege: CollegeDetails = {
    collegeName: "Demo Engineering College",
    collegeAddress: "Bengaluru",
    collegeCode: "DEMO01",
    universityName: "Demo University",
    collegeType: "Private",
    branches: demoBranches,
  };
  useEffect(() => {
    if (!collegeId) return;

    let cancelled = false;
    setLoading(true);

    cutoffApi.getBranches(String(collegeId))
      .then((res) => {
        if (cancelled) return;

        const data: CollegeDetails = res.data;

        setCollege(data);
        setBranches(data.branches?.length ? data.branches : demoBranches);
      })
      .catch(() => {
        if (cancelled) return;
        setCollege(demoCollege);
        setBranches(demoBranches);
        console.warn("Branches API failed — using demo branches");

      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  const filtered = branches.filter((b) =>
    !search ||
    b.branchName.toLowerCase().includes(search.toLowerCase()) ||
    b.collegeProgramCode.toLowerCase().includes(search.toLowerCase())
  );

  const typeStyle = college ? (TYPE_STYLE[college.collegeType] ?? { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" }) : null;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,600&display=swap');
    .bp-root *{box-sizing:border-box;margin:0;padding:0}
    .bp-root{font-family:'Plus Jakarta Sans',sans-serif}
    .bp-root{--bp-bg:#f6f4ff;--bp-card:#ffffff;--bp-border:rgba(99,102,241,0.12);--bp-text:#1a1040;--bp-text2:#5a5480;--bp-text3:#a09cb8;--bp-surface:rgba(99,102,241,0.05);--bp-shimmer:rgba(99,102,241,0.09);--bp-ease:cubic-bezier(0.34,1.56,0.64,1)}
    [data-theme="dark"] .bp-root{--bp-bg:#0c0a1a;--bp-card:#13102a;--bp-border:rgba(139,92,246,0.15);--bp-text:#ede8ff;--bp-text2:#9b94c2;--bp-text3:#5a5480;--bp-surface:rgba(139,92,246,0.07);--bp-shimmer:rgba(139,92,246,0.1)}
    @keyframes bp-shimmer{0%,100%{opacity:0.5}50%{opacity:1}}
    @keyframes bp-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bp-fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes bp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes bp-slide{0%{background-position:0%}100%{background-position:200%}}
    .bp-page{min-height:100vh;background:var(--bp-bg);padding:2rem 1.5rem 5rem;position:relative;overflow:hidden}
    .bp-blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
    .bp-blob-1{width:500px;height:500px;top:-120px;right:-100px;background:rgba(139,92,246,0.12)}
    .bp-blob-2{width:400px;height:400px;bottom:-80px;left:-80px;background:rgba(14,165,233,0.10)}
    .bp-blob-3{width:300px;height:300px;top:40%;left:50%;background:rgba(16,185,129,0.07)}
    .bp-inner{max-width:1000px;margin:0 auto;position:relative;z-index:1}
    .bp-back{display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:600;color:var(--bp-text2);text-decoration:none;margin-bottom:1.5rem;padding:7px 14px;border-radius:10px;background:var(--bp-card);border:1.5px solid var(--bp-border);transition:all 0.2s var(--bp-ease);animation:bp-fadeIn 0.4s ease both}
    .bp-back:hover{color:var(--bp-text);border-color:rgba(139,92,246,0.4);transform:translateX(-3px)}
    .bp-college-card{background:var(--bp-card);border:1.5px solid var(--bp-border);border-radius:24px;padding:2rem;margin-bottom:2rem;position:relative;overflow:hidden;animation:bp-fadeUp 0.5s ease both;box-shadow:0 8px 40px rgba(99,102,241,0.08)}
    .bp-college-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#0ea5e9);background-size:200% 100%;animation:bp-slide 4s linear infinite}
    .bp-college-top{display:flex;align-items:flex-start;gap:1.2rem}
    .bp-college-avatar{width:60px;height:60px;border-radius:16px;flex-shrink:0;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:#fff;box-shadow:0 8px 24px rgba(99,102,241,0.35)}
    .bp-college-name{font-family:'Fraunces',serif;font-size:clamp(1.2rem,3vw,1.65rem);font-weight:700;color:var(--bp-text);line-height:1.25;margin-bottom:0.5rem}
    .bp-college-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
    .bp-meta-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:8px;font-size:0.72rem;font-weight:600;background:var(--bp-surface);color:var(--bp-text2)}
    .bp-type-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:8px;font-size:0.72rem;font-weight:700}
    .bp-college-stats{display:flex;gap:1.5rem;margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--bp-border);flex-wrap:wrap}
    .bp-stat{display:flex;align-items:center;gap:6px}
    .bp-stat-dot{width:8px;height:8px;border-radius:50%}
    .bp-stat-text{font-size:0.8rem;color:var(--bp-text2);font-weight:500}
    .bp-stat-val{font-size:0.8rem;color:var(--bp-text);font-weight:700}
    .bp-section-head{margin-bottom:1.5rem;animation:bp-fadeUp 0.5s 0.1s ease both}
    .bp-section-eyebrow{font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#8b5cf6;margin-bottom:0.5rem;display:flex;align-items:center;gap:6px}
    .bp-section-eyebrow::before{content:'';display:block;width:16px;height:2px;background:linear-gradient(90deg,#6366f1,#ec4899);border-radius:2px}
    .bp-section-title{font-family:'Fraunces',serif;font-size:clamp(1.5rem,3.5vw,2rem);font-weight:700;color:var(--bp-text);line-height:1.2}
    .bp-section-title span{font-style:italic;background:linear-gradient(135deg,#6366f1 0%,#ec4899 50%,#0ea5e9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .bp-search-row{display:flex;gap:1rem;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;animation:bp-fadeUp 0.5s 0.15s ease both}
    .bp-search-wrap{position:relative;flex:1;max-width:380px}
    .bp-search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--bp-text3)}
    .bp-search{width:100%;padding:11px 14px 11px 38px;border-radius:12px;background:var(--bp-card);border:1.5px solid var(--bp-border);color:var(--bp-text);font-size:0.875rem;font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
    .bp-search::placeholder{color:var(--bp-text3)}
    .bp-search:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,0.15)}
    .bp-count-badge{padding:8px 16px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:0.8rem;font-weight:700;box-shadow:0 4px 14px rgba(99,102,241,0.3);white-space:nowrap}
    .bp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
    .bp-branch-card{border-radius:20px;padding:1.5rem;border:1.5px solid var(--bp-border);background:var(--bp-card);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform 0.28s var(--bp-ease),box-shadow 0.28s,border-color 0.2s;animation:bp-fadeUp 0.45s ease both;cursor:default}
    .bp-branch-card:hover{transform:translateY(-6px) scale(1.01)}
    .bp-card-strip{position:absolute;top:0;left:0;right:0;height:5px;border-radius:20px 20px 0 0;background:linear-gradient(90deg,var(--c-from),var(--c-to))}
    .bp-card-blob{position:absolute;width:140px;height:140px;top:-30px;right:-30px;border-radius:50%;background:var(--c-light);pointer-events:none;transition:transform 0.3s}
    .bp-branch-card:hover .bp-card-blob{transform:scale(1.3)}
    .bp-emoji-wrap{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,var(--c-from),var(--c-to));display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1rem;flex-shrink:0;box-shadow:0 6px 20px var(--c-glow);transition:transform 0.3s var(--bp-ease);position:relative;z-index:1}
    .bp-branch-card:hover .bp-emoji-wrap{transform:scale(1.12) rotate(-4deg)}
    .bp-branch-name{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;color:var(--bp-text);line-height:1.35;margin-bottom:0.4rem;position:relative;z-index:1}
    .bp-branch-code{display:inline-flex;align-items:center;gap:4px;font-size:0.7rem;font-weight:700;color:var(--c-from);background:var(--c-light);padding:3px 10px;border-radius:6px;margin-bottom:1rem;position:relative;z-index:1}
    .bp-cutoff-btn{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-radius:12px;background:linear-gradient(135deg,var(--c-from),var(--c-to));color:#fff;text-decoration:none;font-size:0.82rem;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 16px var(--c-glow);transition:transform 0.22s var(--bp-ease),box-shadow 0.22s;position:relative;z-index:1}
    .bp-cutoff-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--c-glow)}
    .bp-cutoff-btn-arrow{width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;transition:transform 0.2s var(--bp-ease)}
    .bp-cutoff-btn:hover .bp-cutoff-btn-arrow{transform:translateX(3px)}
    .bp-empty{text-align:center;padding:5rem 2rem;animation:bp-fadeUp 0.4s ease both}
    .bp-empty-icon{font-size:3.5rem;margin-bottom:1rem;animation:bp-float 3s ease-in-out infinite;display:block}
    .bp-empty-title{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;color:var(--bp-text);margin-bottom:0.4rem}
    .bp-empty-sub{font-size:0.875rem;color:var(--bp-text2)}
    @media(max-width:640px){.bp-grid{grid-template-columns:1fr}.bp-college-top{flex-direction:column}}
  `;

  const initials = college?.collegeName
    .split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join("").toUpperCase() ?? "MC";

  return (
    <div className="bp-root">
      <style>{css}</style>
      <div className="bp-page">
        <div className="bp-blob bp-blob-1" />
        <div className="bp-blob bp-blob-2" />
        <div className="bp-blob bp-blob-3" />

        <div className="bp-inner">
          <Link to="/colleges" className="bp-back">
            <ArrowLeft size={13} /> Back to Colleges
          </Link>

          {loading ? <CollegeSkeleton /> : !college ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.15)", borderRadius: 20 }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>😕</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#ef4444", marginBottom: 4 }}>College not found</div>
              <div style={{ fontSize: "0.85rem", color: "var(--bp-text2)" }}>Please check the college code and try again.</div>
            </div>
          ) : (
            <div className="bp-college-card">
              <div className="bp-college-top">
                <div className="bp-college-avatar">{initials}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h1 className="bp-college-name">{college.collegeName}</h1>
                  <div className="bp-college-meta">
                    {typeStyle && (
                      <span className="bp-type-chip" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                        <Award size={10} /> {college.collegeType}
                      </span>
                    )}
                    <span className="bp-meta-chip"><BookOpen size={10} />{college.universityName}</span>
                    <span className="bp-meta-chip"><MapPin size={10} />{college.collegeAddress}</span>
                  </div>
                </div>
              </div>
              <div className="bp-college-stats">
                <div className="bp-stat"><div className="bp-stat-dot" style={{ background: "#6366f1" }} /><span className="bp-stat-text">Code:&nbsp;</span><span className="bp-stat-val">{college.collegeCode}</span></div>
                <div className="bp-stat"><div className="bp-stat-dot" style={{ background: "#10b981" }} /><span className="bp-stat-text">Branches:&nbsp;</span><span className="bp-stat-val">{branches.length}</span></div>
                <div className="bp-stat"><div className="bp-stat-dot" style={{ background: "#f59e0b" }} /><span className="bp-stat-text">Exam:&nbsp;</span><span className="bp-stat-val">GATE &amp; PGCET</span></div>
              </div>
            </div>
          )}

          <GoogleAd slot="3333333333" className="mb-8" />

          {!loading && college && (
            <>
              <div className="bp-section-head">
                <div className="bp-section-eyebrow">Available Programs</div>
                <h2 className="bp-section-title">Choose a <span>Branch</span></h2>
              </div>

              <div className="bp-search-row">
                <div className="bp-search-wrap">
                  <svg className="bp-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                  <input className="bp-search" type="text" placeholder="Search branches..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="bp-count-badge">{filtered.length} Branch{filtered.length !== 1 ? "es" : ""}</div>
              </div>

              {filtered.length === 0 ? (
                <div className="bp-empty">
                  <span className="bp-empty-icon">🔍</span>
                  <div className="bp-empty-title">No branches found</div>
                  <div className="bp-empty-sub">Try a different search term</div>
                </div>
              ) : (
                <div className="bp-grid">
                  {filtered.map((branch, i) => {
                    const p = BRANCH_PALETTES[i % BRANCH_PALETTES.length];
                    return (
                      <div
                        className="bp-branch-card"
                        key={branch.id}
                        style={{ animationDelay: `${i * 0.045}s`, "--c-from": p.from, "--c-to": p.to, "--c-light": p.light, "--c-glow": p.glow } as React.CSSProperties}
                      >
                        <div className="bp-card-strip" />
                        <div className="bp-card-blob" />
                        <div className="bp-emoji-wrap">{branchEmoji(branch.branchName)}</div>
                        <div className="bp-branch-name">{branch.branchName}</div>
                        <div className="bp-branch-code"><Hash size={9} />{branch.collegeProgramCode}</div>
                        <Link to={`/colleges/${collegeId}/branches/${branch.collegeProgramCode}/cutoffs`} className="bp-cutoff-btn">
                          <span>View Cutoffs</span>
                          <div className="bp-cutoff-btn-arrow"><ArrowRight size={13} /></div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {loading && (
            <div className="bp-grid" style={{ marginTop: "2rem" }}>
              {Array.from({ length: 6 }).map((_, i) => <BranchSkeleton key={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;