import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  GraduationCap,
  Hash,
  Award,
} from "lucide-react";

import { examApi } from "@/api/examApi";
import { ExamDetails, ExamSummary } from "@/types/exam";

const PROGRAM_COLORS = [
  {
    from: "#6366f1",
    to: "#8b5cf6",
    light: "rgba(99,102,241,.10)",
    glow: "rgba(99,102,241,.25)",
  },
  {
    from: "#0ea5e9",
    to: "#06b6d4",
    light: "rgba(14,165,233,.10)",
    glow: "rgba(14,165,233,.25)",
  },
  {
    from: "#10b981",
    to: "#059669",
    light: "rgba(16,185,129,.10)",
    glow: "rgba(16,185,129,.25)",
  },
  {
    from: "#f59e0b",
    to: "#ef4444",
    light: "rgba(245,158,11,.10)",
    glow: "rgba(245,158,11,.25)",
  },
  {
    from: "#ec4899",
    to: "#8b5cf6",
    light: "rgba(236,72,153,.10)",
    glow: "rgba(236,72,153,.25)",
  },
];

function courseEmoji(name: string) {
  const n = name.toLowerCase();

  if (n.includes("computer") || n.includes("cse")) return "💻";
  if (n.includes("artificial") || n.includes("ai")) return "🤖";
  if (n.includes("electronics") || n.includes("ece")) return "⚡";
  if (n.includes("mechanical")) return "⚙️";
  if (n.includes("civil")) return "🏗️";
  if (n.includes("chemical")) return "🧪";
  if (n.includes("biotech")) return "🧬";
  if (n.includes("data")) return "📊";
  if (n.includes("electrical")) return "🔋";

  return "📚";
}

function ProgramSkeleton() {
  return (
    <div
      style={{
        background: "var(--ed-card)",
        border: "1px solid var(--ed-border)",
        borderRadius: 20,
        padding: "1.5rem",
      }}
    >
      {[60, 80, 50, 100].map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}%`,
            height: i === 0 ? 28 : 10,
            marginBottom: 14,
            borderRadius: 8,
            background: "var(--ed-shimmer)",
            animation: "ed-shimmer 1.4s infinite",
          }}
        />
      ))}
    </div>
  );
}

const ExamDetailsPage = () => {
  const { examCode } = useParams();

  const navigate = useNavigate();

  const [exam, setExam] = useState<ExamDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!examCode) return;

    const fetchExamDetails = async () => {
      try {
        const res = await examApi.getDetails(examCode);
        setExam(res.data);
      } catch (err) {
        console.error("Failed to fetch exam details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examCode]);

  const handleViewColleges = (exam: ExamSummary) => {
    sessionStorage.setItem("examCode", exam.examCode);
    navigate("/colleges");
  };

  const filtered =
    exam?.collegeProgram.filter(
      (p) =>
        p.courseName.toLowerCase().includes(search.toLowerCase()) ||
        p.courseCode.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700&display=swap');

.ed-root *{
box-sizing:border-box;
margin:0;
padding:0;
}

.ed-root{
font-family:'Plus Jakarta Sans',sans-serif;

--ed-bg:#f6f4ff;
--ed-card:#fff;
--ed-border:rgba(99,102,241,.12);
--ed-text:#201942;
--ed-text2:#6b7280;
--ed-shimmer:rgba(99,102,241,.08);
}

@keyframes edFade{
from{
opacity:0;
transform:translateY(20px);
}
to{
opacity:1;
transform:none;
}
}

@keyframes ed-shimmer{
0%,100%{opacity:.45}
50%{opacity:1}
}

.ed-page{
min-height:100vh;
background:var(--ed-bg);
padding:2rem;
overflow:hidden;
position:relative;
}

.ed-blob{
position:fixed;
border-radius:50%;
filter:blur(100px);
pointer-events:none;
}

.ed-blob1{
width:500px;
height:500px;
background:rgba(139,92,246,.12);
top:-120px;
right:-120px;
}

.ed-blob2{
width:350px;
height:350px;
background:rgba(14,165,233,.10);
bottom:-80px;
left:-80px;
}

.ed-inner{
max-width:1100px;
margin:auto;
position:relative;
z-index:2;
}

.ed-back{
display:inline-flex;
align-items:center;
gap:8px;
margin-bottom:24px;
padding:10px 16px;
border-radius:12px;
background:white;
border:1px solid var(--ed-border);
text-decoration:none;
color:#4b5563;
font-weight:600;
transition:.25s;
}

.ed-back:hover{
transform:translateX(-4px);
}

.ed-title{
font-family:Fraunces,serif;
font-size:2.4rem;
color:var(--ed-text);
margin-bottom:.5rem;
}

.ed-subtitle{
color:var(--ed-text2);
margin-bottom:2rem;
}

.ed-toolbar{
display:flex;
justify-content:space-between;
align-items:center;
gap:1rem;
margin:2rem 0;
flex-wrap:wrap;
}

.ed-search{
position:relative;
flex:1;
max-width:420px;
}

.ed-search svg{
position:absolute;
left:14px;
top:50%;
transform:translateY(-50%);
color:#9ca3af;
}

.ed-search input{
width:100%;
padding:12px 14px 12px 42px;
border-radius:14px;
border:1px solid var(--ed-border);
outline:none;
font-size:.9rem;
background:white;
}

.ed-count{
padding:10px 18px;
border-radius:12px;
background:linear-gradient(135deg,#6366f1,#8b5cf6);
color:white;
font-weight:700;
box-shadow:0 10px 24px rgba(99,102,241,.22);
}

.ed-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
gap:1.5rem;
}
`;
  if (loading) {
    return (
      <div className="ed-root">
        <style>{css}</style>

        <div className="ed-page">
          <div className="ed-blob ed-blob1" />
          <div className="ed-blob ed-blob2" />

          <div className="ed-inner">
            <h1 className="ed-title">Loading Exam...</h1>

            <div className="ed-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProgramSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="ed-root">
        <style>{css}</style>

        <div className="ed-page">
          <div className="ed-inner">
            <Link to="/exams" className="ed-back">
              <ArrowLeft size={18} />
              Back to Exams
            </Link>

            <div
              style={{
                textAlign: "center",
                padding: "100px 20px",
              }}
            >
              <GraduationCap size={70} color="#8b5cf6" />

              <h1
                style={{
                  marginTop: 20,
                  fontFamily: "Fraunces",
                }}
              >
                Exam Not Found
              </h1>

              <p
                style={{
                  color: "#6b7280",
                  marginTop: 10,
                }}
              >
                We couldn't find the requested exam.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ed-root">
      <style>{css}</style>

      <div className="ed-page">
        <div className="ed-blob ed-blob1" />
        <div className="ed-blob ed-blob2" />

        <div className="ed-inner">
          <Link to="/exams" className="ed-back">
            <ArrowLeft size={18} />
            Back to Exams
          </Link>

          <div
            style={{
              background: "#fff",
              borderRadius: 28,
              padding: "2rem",
              boxShadow: "0 20px 50px rgba(0,0,0,.08)",
              position: "relative",
              overflow: "hidden",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(99,102,241,.08)",
                right: -70,
                top: -70,
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "center",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 24,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "2rem",
                  boxShadow: "0 16px 35px rgba(99,102,241,.3)",
                }}
              >
                🎓
              </div>

              <div style={{ flex: 1 }}>
                <h1 className="ed-title">{exam.examName}</h1>

                <p className="ed-subtitle">
                  Choose a program to view eligible colleges.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 16px",
                      borderRadius: 999,
                      background: "rgba(99,102,241,.08)",
                      color: "#6366f1",
                      fontWeight: 700,
                    }}
                  >
                    <Hash size={16} />
                    {exam.examCode}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 16px",
                      borderRadius: 999,
                      background: "rgba(16,185,129,.08)",
                      color: "#059669",
                      fontWeight: 700,
                    }}
                  >
                    <Award size={16} />
                    {exam.conductingAuthority}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ed-toolbar">
            <div className="ed-search">
              <Search size={18} />

              <input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="ed-count">
              {filtered.length} Program
              {filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                }}
              >
                📚
              </div>

              <h2
                style={{
                  fontFamily: "Fraunces",
                  color: "#201942",
                  marginBottom: ".5rem",
                }}
              >
                No Programs Found
              </h2>

              <p
                style={{
                  color: "#6b7280",
                }}
              >
                Try searching with another keyword.
              </p>
            </div>
          ) : (
            <div className="ed-grid">
              {filtered.map((program, index) => {
                const color = PROGRAM_COLORS[index % PROGRAM_COLORS.length];

                return (
                  <div
                    key={program.collegeProgramCode}
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 16px 35px rgba(0,0,0,.08)",
                      border: "1px solid rgba(99,102,241,.08)",
                      animation: "edFade .4s ease",
                    }}
                  >
                    <div
                      style={{
                        height: 5,
                        background: `linear-gradient(90deg,${color.from},${color.to})`,
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: color.light,
                        top: -30,
                        right: -30,
                      }}
                    />

                    <div
                      style={{
                        padding: "24px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 18,
                          background: `linear-gradient(135deg,${color.from},${color.to})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "1.7rem",
                          marginBottom: "20px",
                          boxShadow: `0 12px 30px ${color.glow}`,
                        }}
                      >
                        {courseEmoji(program.courseName)}
                      </div>

                      <h2
                        style={{
                          fontFamily: "Fraunces",
                          fontSize: "1.35rem",
                          color: "#201942",
                          marginBottom: "12px",
                        }}
                      >
                        {program.courseName}
                      </h2>

                      <div
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: 10,
                          background: color.light,
                          color: color.from,
                          fontWeight: 700,
                          marginBottom: "18px",
                        }}
                      >
                        {program.courseCode}
                      </div>

                      <button
                        onClick={() => handleViewColleges(exam)}
                        style={{
                          width: "100%",
                          border: "none",
                          cursor: "pointer",
                          padding: "14px",
                          borderRadius: 14,
                          fontWeight: 700,
                          fontSize: ".95rem",
                          color: "#fff",
                          background: `linear-gradient(135deg,${color.from},${color.to})`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 8,
                          transition: ".25s",
                        }}
                      >
                        View Colleges
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
