import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Filter } from "lucide-react";
import { cutoffApi, CutoffData } from "@/api/cutoffApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

const demoCutoffs: CutoffData[] = [
  { id: 1, exam: "GATE", year: 2025, phase: "Phase I", gender: "General", category: "GM", openingRank: 150, closingRank: 890, openingPercentile: 98.5, closingPercentile: 92.1 },
  { id: 2, exam: "GATE", year: 2025, phase: "Phase I", gender: "General", category: "SC", openingRank: 1200, closingRank: 3500, openingPercentile: 88.0, closingPercentile: 72.5 },
  { id: 3, exam: "GATE", year: 2025, phase: "Phase II", gender: "General", category: "GM", openingRank: 900, closingRank: 1500, openingPercentile: 92.0, closingPercentile: 85.0 },
  { id: 4, exam: "PGCET", year: 2025, phase: "Phase I", gender: "General", category: "GM", openingRank: 50, closingRank: 450, openingPercentile: 99.0, closingPercentile: 94.0 },
  { id: 5, exam: "PGCET", year: 2025, phase: "Phase I", gender: "General", category: "OBC", openingRank: 500, closingRank: 2000, openingPercentile: 94.0, closingPercentile: 80.0 },
  { id: 6, exam: "GATE", year: 2024, phase: "Phase I", gender: "General", category: "GM", openingRank: 180, closingRank: 950, openingPercentile: 97.8, closingPercentile: 91.0 },
];

const examOptions = ["All", "GATE", "PGCET"];
const phaseOptions = ["All", "Phase I", "Phase II"];
const categoryOptions = ["All", "GM", "SC", "ST", "OBC", "2A", "2B", "3A", "3B"];

const CutoffsPage = () => {
  const { collegeId, branchId } = useParams();
  const [cutoffs, setCutoffs] = useState<CutoffData[]>(demoCutoffs);
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState("All");
  const [phase, setPhase] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<keyof CutoffData | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!collegeId || !branchId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (exam !== "All") params.exam = exam;
        if (phase !== "All") params.phase = phase;
        if (category !== "All") params.category = category;
        const res = await cutoffApi.getCutoffs(Number(collegeId), Number(branchId), params);
        setCutoffs(res.data);
      } catch {
        setCutoffs(demoCutoffs);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [collegeId, branchId, exam, phase, category]);

  const filtered = cutoffs.filter((c) => {
    if (exam !== "All" && c.exam !== exam) return false;
    if (phase !== "All" && c.phase !== phase) return false;
    if (category !== "All" && c.category !== category) return false;
    return true;
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
        return 0;
      })
    : filtered;

  const handleSort = (key: keyof CutoffData) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const exportCSV = () => {
    const headers = ["Exam", "Year", "Phase", "Gender", "Category", "Opening Rank", "Closing Rank", "Opening %ile", "Closing %ile"];
    const rows = sorted.map((c) => [c.exam, c.year, c.phase, c.gender, c.category, c.openingRank, c.closingRank, c.openingPercentile, c.closingPercentile].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutoffs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const SelectFilter = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const SortHeader = ({ label, field }: { label: string; field: keyof CutoffData }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      {label} {sortKey === field && (sortAsc ? "↑" : "↓")}
    </th>
  );

  const getBadgeClass = (type: string) => {
    if (type === "GATE") return "bg-primary/10 text-primary";
    return "bg-accent/10 text-accent";
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to={`/colleges/${collegeId}/branches`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Branches
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Cutoff <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Opening & closing ranks across categories</p>
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors self-start">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
            <Filter className="w-4 h-4 text-primary" /> Filters
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SelectFilter label="Exam" value={exam} onChange={setExam} options={examOptions} />
            <SelectFilter label="Phase" value={phase} onChange={setPhase} options={phaseOptions} />
            <SelectFilter label="Category" value={category} onChange={setCategory} options={categoryOptions} />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <LoadingSkeleton rows={6} columns={5} />
        ) : sorted.length === 0 ? (
          <EmptyState title="No cutoff data" description="Try different filter combinations" />
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <SortHeader label="Exam" field="exam" />
                    <SortHeader label="Year" field="year" />
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phase</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                    <SortHeader label="Open Rank" field="openingRank" />
                    <SortHeader label="Close Rank" field="closingRank" />
                    <SortHeader label="Open %ile" field="openingPercentile" />
                    <SortHeader label="Close %ile" field="closingPercentile" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => (
                    <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getBadgeClass(c.exam)}`}>
                          {c.exam}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{c.year}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.phase}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground font-mono">{c.openingRank.toLocaleString()}</td>
                      <td className="px-4 py-3 text-foreground font-mono">{c.closingRank.toLocaleString()}</td>
                      <td className="px-4 py-3 text-accent font-mono font-medium">{c.openingPercentile.toFixed(1)}</td>
                      <td className="px-4 py-3 text-accent font-mono font-medium">{c.closingPercentile.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CutoffsPage;
