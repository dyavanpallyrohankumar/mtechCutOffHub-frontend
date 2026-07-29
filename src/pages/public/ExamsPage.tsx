import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  GraduationCap,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

import { stateApi } from "@/api/stateApi";
import { ExamSummary } from "@/types/exam";

const CARD_COLORS = [
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

function ExamSkeleton() {
  return (
    <div
      style={{
        background: "var(--ep-card)",
        border: "1px solid var(--ep-border)",
        borderRadius: 22,
        padding: "1.5rem",
      }}
    >
      {[70, 45, 90, 100].map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}%`,
            height: i === 0 ? 28 : 12,
            borderRadius: 8,
            marginBottom: 14,
            background: "var(--ep-shimmer)",
            animation: "ep-shimmer 1.4s infinite",
          }}
        />
      ))}
    </div>
  );
}

const ExamPage = () => {
  const [exams, setExams] = useState<ExamSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stateCode = sessionStorage.getItem("stateCode");

    if (!stateCode) {
      alert("Please select a state first.");
      navigate("/states");
      return;
    }

    const fetchExams = async () => {
      try {
        const res = await stateApi.getExams(stateCode);
        setExams(res.data);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [navigate]);

  const handleViewDetails = (exam: ExamSummary) => {
    navigate(`/exams/${exam.examCode}`);
  };

  const handleViewColleges = (exam: ExamSummary) => {
    sessionStorage.setItem("examCode", exam.examCode);
    navigate("/colleges");
  };

  const filtered = exams.filter(
    (exam) =>
      exam.examName.toLowerCase().includes(search.toLowerCase()) ||
      exam.examCode.toLowerCase().includes(search.toLowerCase()) ||
      exam.conductingAuthority.toLowerCase().includes(search.toLowerCase()),
  );

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700&display=swap');

.ep-root *{
box-sizing:border-box;
margin:0;
padding:0;
}

.ep-root{
font-family:'Plus Jakarta Sans',sans-serif;

--ep-bg:#f6f4ff;
--ep-card:#fff;
--ep-border:rgba(99,102,241,.12);
--ep-text:#1f1b3d;
--ep-text2:#65607f;
--ep-shimmer:rgba(99,102,241,.08);
}

@keyframes epFade{
from{
opacity:0;
transform:translateY(18px);
}
to{
opacity:1;
transform:translateY(0);
}
}

@keyframes ep-shimmer{
0%,100%{
opacity:.5;
}
50%{
opacity:1;
}
}

.ep-page{
min-height:100vh;
background:var(--ep-bg);
padding:2rem;
position:relative;
overflow:hidden;
}

.ep-blob{
position:fixed;
border-radius:50%;
filter:blur(90px);
pointer-events:none;
}

.ep-blob1{
width:500px;
height:500px;
background:rgba(139,92,246,.12);
top:-150px;
right:-120px;
}

.ep-blob2{
width:350px;
height:350px;
background:rgba(14,165,233,.10);
bottom:-80px;
left:-100px;
}

.ep-inner{
max-width:1150px;
margin:auto;
position:relative;
z-index:2;
}

.ep-title{
font-family:Fraunces,serif;
font-size:2.3rem;
color:var(--ep-text);
margin-bottom:.4rem;
}

.ep-subtitle{
color:var(--ep-text2);
margin-bottom:2rem;
}

.ep-toolbar{
display:flex;
justify-content:space-between;
align-items:center;
gap:1rem;
margin-bottom:2rem;
flex-wrap:wrap;
}

.ep-search{
position:relative;
flex:1;
max-width:400px;
}

.ep-search input{
width:100%;
padding:12px 14px 12px 42px;
border-radius:14px;
border:1px solid var(--ep-border);
outline:none;
font-size:.9rem;
background:white;
}

.ep-search svg{
position:absolute;
left:14px;
top:50%;
transform:translateY(-50%);
color:#9ca3af;
}

.ep-count{
padding:10px 18px;
border-radius:12px;
background:linear-gradient(135deg,#6366f1,#8b5cf6);
color:white;
font-weight:700;
font-size:.82rem;
box-shadow:0 8px 18px rgba(99,102,241,.25);
}

.ep-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
gap:1.4rem;
}
`;

  if (loading) {
    return (
      <div className="ep-root">
        <style>{css}</style>

        <div className="ep-page">
          <div className="ep-blob ep-blob1" />
          <div className="ep-blob ep-blob2" />

          <div className="ep-inner">
            <h1 className="ep-title">Loading Exams...</h1>

            <div className="ep-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <ExamSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ep-root">
      <style>{css}</style>

      <div className="ep-page">
        <div className="ep-blob ep-blob1" />
        <div className="ep-blob ep-blob2" />

        <div className="ep-inner">
          <button
            onClick={() => navigate("/states")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
              border: "none",
              background: "#fff",
              padding: "10px 16px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(0,0,0,.06)",
            }}
          >
            <ArrowLeft size={16} />
            Back to States
          </button>

          <h1 className="ep-title">Select Your Exam</h1>

          <p className="ep-subtitle">
            Choose an entrance examination to explore colleges and cutoff
            details.
          </p>

          <div className="ep-toolbar">
            <div className="ep-search">
              <Search size={18} />

              <input
                placeholder="Search exams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="ep-count">
              {filtered.length} Exam{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px",
                color: "#666",
              }}
            >
              <BookOpen
                size={60}
                style={{
                  opacity: 0.3,
                  marginBottom: 20,
                }}
              />

              <h2>No Exams Found</h2>

              <p>Try another search keyword.</p>
            </div>
          ) : (
            <div className="ep-grid">
              {filtered.map((exam, index) => {
                const c = CARD_COLORS[index % CARD_COLORS.length];

                return (
                  <div
                    key={exam.id}
                    style={{
                      background: "white",
                      borderRadius: 24,
                      overflow: "hidden",
                      position: "relative",
                      animation: "epFade .4s ease",
                      boxShadow: "0 12px 35px rgba(0,0,0,.08)",
                      border: "1px solid rgba(99,102,241,.08)",
                    }}
                  >
                    <div
                      style={{
                        height: 5,
                        background: `linear-gradient(90deg,${c.from},${c.to})`,
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        width: 130,
                        height: 130,
                        borderRadius: "50%",
                        background: c.light,
                        top: -30,
                        right: -30,
                      }}
                    />

                    <div
                      style={{
                        padding: 24,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `linear-gradient(135deg,${c.from},${c.to})`,
                          color: "white",
                          marginBottom: 20,
                          boxShadow: `0 10px 24px ${c.glow}`,
                        }}
                      >
                        <GraduationCap size={30} />
                      </div>

                      <h2
                        style={{
                          fontFamily: "Fraunces",
                          color: "#231942",
                          marginBottom: 10,
                        }}
                      >
                        {exam.examName}
                      </h2>

                      <div
                        style={{
                          display: "inline-block",
                          padding: "5px 12px",
                          borderRadius: 8,
                          background: c.light,
                          color: c.from,
                          fontWeight: 700,
                          marginBottom: 18,
                        }}
                      >
                        {exam.examCode}
                      </div>

                      <div
                        style={{
                          color: "#666",
                          marginBottom: 25,
                          lineHeight: 1.6,
                        }}
                      >
                        <strong>Conducting Authority</strong>

                        <br />

                        {exam.conductingAuthority}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <button
                          onClick={() => handleViewDetails(exam)}
                          style={{
                            flex: 1,
                            border: "none",
                            padding: "12px",
                            borderRadius: 12,
                            cursor: "pointer",
                            fontWeight: 700,
                            background: "#f3f4f6",
                          }}
                        >
                          Details
                        </button>

                        <button
                          onClick={() => handleViewColleges(exam)}
                          style={{
                            flex: 1,
                            border: "none",
                            padding: "12px",
                            borderRadius: 12,
                            cursor: "pointer",
                            color: "white",
                            fontWeight: 700,
                            background: `linear-gradient(135deg,${c.from},${c.to})`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          Colleges
                          <ArrowRight size={16} />
                        </button>
                      </div>
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

export default ExamPage;
