import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPinned, Search } from "lucide-react";
import { stateApi } from "@/api/stateApi";
import { State } from "@/types/state";

const COLORS = [
  { from: "#6366f1", to: "#8b5cf6", light: "rgba(99,102,241,.08)" },
  { from: "#06b6d4", to: "#0ea5e9", light: "rgba(6,182,212,.08)" },
  { from: "#10b981", to: "#059669", light: "rgba(16,185,129,.08)" },
  { from: "#f59e0b", to: "#ef4444", light: "rgba(245,158,11,.08)" },
  { from: "#ec4899", to: "#8b5cf6", light: "rgba(236,72,153,.08)" },
];

const StatePage = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await stateApi.getAllStates();
        setStates(res.data);
      } catch (err) {
        console.error("Failed to fetch states", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateClick = (state: State) => {
    sessionStorage.setItem("stateCode", state.stateCode);
    navigate("/exams");
  };

  const filteredStates = states.filter((state) =>
    state.stateName.toLowerCase().includes(search.toLowerCase()),
  );

  const css = `
*{box-sizing:border-box}

.state-page{
min-height:100vh;
background:#f7f7fc;
padding:40px 20px;
font-family:Inter,sans-serif;
}

.state-container{
max-width:1200px;
margin:auto;
}

.state-header{
margin-bottom:30px;
}

.state-title{
font-size:40px;
font-weight:800;
color:#1e293b;
margin-bottom:8px;
}

.state-subtitle{
color:#64748b;
font-size:16px;
}

.toolbar{
display:flex;
justify-content:space-between;
align-items:center;
gap:20px;
margin-bottom:30px;
flex-wrap:wrap;
}

.search-box{
position:relative;
flex:1;
max-width:400px;
}

.search-box input{
width:100%;
padding:14px 16px 14px 45px;
border:none;
border-radius:14px;
background:white;
box-shadow:0 4px 16px rgba(0,0,0,.06);
font-size:15px;
outline:none;
}

.search-icon{
position:absolute;
left:14px;
top:50%;
transform:translateY(-50%);
color:#94a3b8;
}

.count{
padding:12px 20px;
border-radius:14px;
background:linear-gradient(135deg,#6366f1,#8b5cf6);
color:white;
font-weight:700;
}

.state-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
gap:24px;
}

.state-card{
background:white;
border-radius:22px;
overflow:hidden;
cursor:pointer;
position:relative;
transition:.3s;
box-shadow:0 8px 24px rgba(0,0,0,.06);
}

.state-card:hover{
transform:translateY(-8px);
box-shadow:0 18px 40px rgba(0,0,0,.12);
}

.state-strip{
height:6px;
background:linear-gradient(90deg,var(--from),var(--to));
}

.state-body{
padding:24px;
position:relative;
}

.state-bg{
position:absolute;
width:120px;
height:120px;
right:-30px;
top:-30px;
border-radius:50%;
background:var(--light);
}

.state-icon{
width:56px;
height:56px;
border-radius:16px;
display:flex;
align-items:center;
justify-content:center;
background:linear-gradient(135deg,var(--from),var(--to));
color:white;
margin-bottom:18px;
position:relative;
z-index:2;
}

.state-name{
font-size:22px;
font-weight:700;
color:#1e293b;
margin-bottom:10px;
position:relative;
z-index:2;
}

.state-code{
display:inline-block;
padding:6px 12px;
border-radius:8px;
background:var(--light);
color:var(--from);
font-weight:700;
margin-bottom:25px;
position:relative;
z-index:2;
}

.state-btn{
display:flex;
justify-content:space-between;
align-items:center;
padding:14px 18px;
border-radius:14px;
background:linear-gradient(135deg,var(--from),var(--to));
color:white;
font-weight:700;
position:relative;
z-index:2;
}

.loading{
text-align:center;
padding:80px;
font-size:20px;
}

.empty{
text-align:center;
padding:80px;
font-size:18px;
color:#64748b;
}
`;

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="loading">Loading States...</div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <div className="state-page">
        <div className="state-container">
          <div className="state-header">
            <h1 className="state-title">Select Your State</h1>
            <p className="state-subtitle">
              Choose a state to explore colleges and entrance exams.
            </p>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                placeholder="Search states..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="count">{filteredStates.length} States</div>
          </div>

          {filteredStates.length === 0 ? (
            <div className="empty">No states found.</div>
          ) : (
            <div className="state-grid">
              {filteredStates.map((state, index) => {
                const color = COLORS[index % COLORS.length];

                return (
                  <div
                    key={state.id}
                    className="state-card"
                    onClick={() => handleStateClick(state)}
                    style={
                      {
                        "--from": color.from,
                        "--to": color.to,
                        "--light": color.light,
                      } as React.CSSProperties
                    }
                  >
                    <div className="state-strip"></div>

                    <div className="state-body">
                      <div className="state-bg"></div>

                      <div className="state-icon">
                        <MapPinned size={28} />
                      </div>

                      <div className="state-name">{state.stateName}</div>

                      <div className="state-code">{state.stateCode}</div>

                      <div className="state-btn">
                        Continue
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatePage;
