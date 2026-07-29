import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Hash, Search } from "lucide-react";
import { branchApi, BranchSummary } from "@/api/branchApi";

/* ---------- palettes ---------- */

const BRANCH_PALETTES = [
  {
    from: "#6366f1",
    to: "#8b5cf6",
    light: "rgba(99,102,241,0.10)",
    glow: "rgba(99,102,241,0.30)",
  },
  {
    from: "#0ea5e9",
    to: "#06b6d4",
    light: "rgba(14,165,233,0.10)",
    glow: "rgba(14,165,233,0.30)",
  },
  {
    from: "#10b981",
    to: "#059669",
    light: "rgba(16,185,129,0.10)",
    glow: "rgba(16,185,129,0.30)",
  },
  {
    from: "#f59e0b",
    to: "#ef4444",
    light: "rgba(245,158,11,0.10)",
    glow: "rgba(245,158,11,0.30)",
  },
];

/* ---------- emoji helper ---------- */

function branchEmoji(name: string) {
  const n = name.toLowerCase();

  if (n.includes("computer") || n.includes("cse")) return "💻";
  if (n.includes("electron") || n.includes("ece")) return "⚡";
  if (n.includes("mechanical")) return "⚙️";
  if (n.includes("civil")) return "🏗️";
  if (n.includes("chemical")) return "🧪";
  if (n.includes("data") || n.includes("ai")) return "🤖";

  return "📚";
}

/* ---------- demo fallback ---------- */

const demoBranches: BranchSummary[] = [
  {
    branchName: "Computer Science Engineering",
    branchCode: "CSE",
    count: 245,
    colleges: [],
  },
  {
    branchName: "Artificial Intelligence",
    branchCode: "AI",
    count: 190,
    colleges: [],
  },
  { branchName: "Data Science", branchCode: "DS", count: 170, colleges: [] },
  {
    branchName: "Electronics & Communication",
    branchCode: "ECE",
    count: 210,
    colleges: [],
  },
  { branchName: "VLSI Design", branchCode: "VLSI", count: 98, colleges: [] },
];

/* ---------- component ---------- */

const BranchesExplorerPage = () => {
  const [branches, setBranches] = useState<BranchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    branchApi
      .getAllBranches()
      .then((res) => {
        setBranches(res.data?.length ? res.data : demoBranches);
      })
      .catch(() => {
        setBranches(demoBranches);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return branches.filter(
      (b) =>
        !q ||
        b.branchName.toLowerCase().includes(q) ||
        b.branchCode.toLowerCase().includes(q),
    );
  }, [branches, search]);

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,600&display=swap');

.bp-root *{box-sizing:border-box;margin:0;padding:0}

.bp-root{
font-family:'Plus Jakarta Sans',sans-serif;
--bp-bg:#f6f4ff;
--bp-card:#ffffff;
--bp-border:rgba(99,102,241,0.12);
--bp-text:#1a1040;
--bp-text2:#5a5480;
--bp-text3:#a09cb8;
--bp-surface:rgba(99,102,241,0.05);
--bp-shimmer:rgba(99,102,241,0.09);
--bp-ease:cubic-bezier(0.34,1.56,0.64,1);
}

[data-theme="dark"] .bp-root{
--bp-bg:#0c0a1a;
--bp-card:#13102a;
--bp-border:rgba(139,92,246,0.15);
--bp-text:#ede8ff;
--bp-text2:#9b94c2;
--bp-text3:#5a5480;
--bp-surface:rgba(139,92,246,0.07);
--bp-shimmer:rgba(139,92,246,0.1)
}

@keyframes bp-fadeUp{
from{opacity:0;transform:translateY(20px)}
to{opacity:1;transform:translateY(0)}
}

.bp-page{
min-height:100vh;
background:var(--bp-bg);
padding:2rem 1.5rem 5rem;
position:relative;
overflow:hidden
}

.bp-inner{
max-width:1000px;
margin:auto;
position:relative;
z-index:1
}

/* blobs */

.bp-blob{
position:fixed;
border-radius:50%;
filter:blur(90px);
pointer-events:none;
z-index:0
}

.bp-blob-1{
width:500px;height:500px;
top:-120px;right:-100px;
background:rgba(139,92,246,0.12)
}

.bp-blob-2{
width:400px;height:400px;
bottom:-80px;left:-80px;
background:rgba(14,165,233,0.10)
}

.bp-blob-3{
width:300px;height:300px;
top:40%;left:50%;
background:rgba(16,185,129,0.07)
}

/* header */

.bp-section-head{
margin-bottom:1.5rem;
animation:bp-fadeUp .5s ease both
}

.bp-section-eyebrow{
font-size:.72rem;
font-weight:800;
text-transform:uppercase;
letter-spacing:.1em;
color:#8b5cf6;
margin-bottom:.5rem;
display:flex;
align-items:center;
gap:6px
}

.bp-section-title{
font-family:'Fraunces',serif;
font-size:clamp(1.5rem,3.5vw,2rem);
font-weight:700;
color:var(--bp-text)
}

.bp-section-title span{
font-style:italic;
background:linear-gradient(135deg,#6366f1,#ec4899,#0ea5e9);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent
}

/* back */

.bp-back{
display:inline-flex;
align-items:center;
gap:6px;
font-size:.82rem;
font-weight:600;
color:var(--bp-text2);
text-decoration:none;
margin-bottom:1.5rem;
padding:7px 14px;
border-radius:10px;
background:var(--bp-card);
border:1.5px solid var(--bp-border)
}

/* search row */

.bp-search-row{
display:flex;
gap:1rem;
align-items:center;
margin-bottom:1.5rem;
flex-wrap:wrap
}

.bp-search-wrap{
position:relative;
flex:1;
max-width:380px
}

.bp-search-icon{
position:absolute;
left:13px;
top:50%;
transform:translateY(-50%);
color:var(--bp-text3)
}

.bp-search{
width:100%;
padding:11px 14px 11px 38px;
border-radius:12px;
background:var(--bp-card);
border:1.5px solid var(--bp-border);
color:var(--bp-text);
font-size:.875rem
}

.bp-count-badge{
padding:8px 16px;
border-radius:12px;
background:linear-gradient(135deg,#6366f1,#8b5cf6);
color:#fff;
font-size:.8rem;
font-weight:700
}

/* grid */

.bp-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
gap:1.25rem
}

/* branch card */

.bp-branch-card{
border-radius:20px;
padding:1.5rem;
border:1.5px solid var(--bp-border);
background:var(--bp-card);
display:flex;
flex-direction:column;
position:relative;
overflow:hidden;
animation:bp-fadeUp .45s ease both;
text-decoration:none;
color:var(--bp-text)
}

.bp-card-strip{
position:absolute;
top:0;
left:0;
right:0;
height:5px;
background:linear-gradient(90deg,var(--c-from),var(--c-to))
}

.bp-card-blob{
position:absolute;
width:140px;
height:140px;
top:-30px;
right:-30px;
border-radius:50%;
background:var(--c-light)
}

.bp-emoji-wrap{
width:52px;
height:52px;
border-radius:14px;
background:linear-gradient(135deg,var(--c-from),var(--c-to));
display:flex;
align-items:center;
justify-content:center;
font-size:1.4rem;
margin-bottom:1rem;
box-shadow:0 6px 20px var(--c-glow)
}


.bp-branch-card{
  border-radius:20px;
  padding:1.5rem;
  border:1.5px solid var(--bp-border);
  background:var(--bp-card);
  display:flex;
  flex-direction:column;
  position:relative;
  overflow:hidden;
  transition:transform .28s var(--bp-ease), box-shadow .28s, border-color .2s;
}

.bp-branch-card:hover{
  transform:translateY(-6px) scale(1.01);
  box-shadow:0 10px 40px rgba(0,0,0,0.08);
}

.bp-card-blob{
  position:absolute;
  width:140px;
  height:140px;
  top:-30px;
  right:-30px;
  border-radius:50%;
  background:var(--c-light);
  transition:transform .3s;
}

.bp-branch-card:hover .bp-card-blob{
  transform:scale(1.3);
}

.bp-emoji-wrap{
  width:52px;
  height:52px;
  border-radius:14px;
  background:linear-gradient(135deg,var(--c-from),var(--c-to));
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1.4rem;
  margin-bottom:1rem;
  box-shadow:0 6px 20px var(--c-glow);
  transition:transform .3s var(--bp-ease);
}

.bp-branch-card:hover .bp-emoji-wrap{
  transform:scale(1.12) rotate(-4deg);
}
.bp-branch-name{
font-family:'Fraunces',serif;
font-size:1rem;
font-weight:700;
margin-bottom:.4rem
}

.bp-branch-code{
display:inline-flex;
align-items:center;
gap:4px;
font-size:.7rem;
font-weight:700;
color:var(--c-from);
background:var(--c-light);
padding:3px 10px;
border-radius:6px;
margin-bottom:1rem
}

.bp-count{
font-size:.8rem;
font-weight:700;
color:var(--bp-text2)
}


.bp-cutoff-btn{
  margin-top:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:11px 16px;
  border-radius:12px;
  background:linear-gradient(135deg,var(--c-from),var(--c-to));
  color:#fff;
  text-decoration:none;
  font-size:.82rem;
  font-weight:700;
  box-shadow:0 4px 16px var(--c-glow);
  transition:transform .22s var(--bp-ease), box-shadow .22s;
}

.bp-cutoff-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 24px var(--c-glow);
}

.bp-cutoff-btn-arrow{
  width:26px;
  height:26px;
  border-radius:8px;
  background:rgba(255,255,255,.22);
  display:flex;
  align-items:center;
  justify-content:center;
  transition:transform .2s var(--bp-ease);
}

.bp-cutoff-btn:hover .bp-cutoff-btn-arrow{
  transform:translateX(3px);
}
`;

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

          <div className="bp-section-head">
            <div className="bp-section-eyebrow">Programs</div>
            <h2 className="bp-section-title">
              Explore <span>MTech Branches</span>
            </h2>
          </div>

          {/* search */}

          <div className="bp-search-row">
            <div className="bp-search-wrap">
              <Search size={15} className="bp-search-icon" />

              <input
                className="bp-search"
                placeholder="Search branches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {!loading && (
              <div className="bp-count-badge">
                {filtered.length} Branch{filtered.length !== 1 ? "es" : ""}
              </div>
            )}
          </div>

          {/* grid */}

          <div className="bp-grid">
            {filtered.map((branch, i) => {
              const p = BRANCH_PALETTES[i % BRANCH_PALETTES.length];

              return (
                <Link
                  key={branch.branchCode}
                  to={`/branches/${branch.branchCode}`}
                  className="bp-branch-card"
                  style={
                    {
                      "--c-from": p.from,
                      "--c-to": p.to,
                      "--c-light": p.light,
                      "--c-glow": p.glow,
                    } as React.CSSProperties
                  }
                >
                  <div className="bp-card-strip" />
                  <div className="bp-card-blob" />

                  <div className="bp-emoji-wrap">
                    {branchEmoji(branch.branchName)}
                  </div>

                  <div className="bp-branch-name">{branch.branchName}</div>

                  <div className="bp-branch-code">
                    <Hash size={9} />
                    {branch.branchCode}
                  </div>

                  <Link
                    to={`/branches/${branch.branchCode}`}
                    className="bp-cutoff-btn"
                  >
                    <span>View {branch.count} Colleges</span>

                    <div className="bp-cutoff-btn-arrow">
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesExplorerPage;
