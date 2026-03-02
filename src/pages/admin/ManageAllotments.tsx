import { useState } from "react";
import { Plus, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";

interface Allotment {
  id: number;
  studentName: string;
  rank: number;
  percentile: number;
  collegeCode: string;
  branchCode: string;
  exam: string;
  year: number;
  category: string;
}




const demoAllotments: Allotment[] = [
  { id: 1, studentName: "Rahul Kumar", rank: 150, percentile: 98.5, collegeCode: "E001", branchCode: "CS", exam: "GATE", year: 2025, category: "GM" },
  { id: 2, studentName: "Priya Sharma", rank: 320, percentile: 96.2, collegeCode: "E002", branchCode: "AI", exam: "GATE", year: 2025, category: "OBC" },
  { id: 3, studentName: "Amit Patil", rank: 50, percentile: 99.1, collegeCode: "E001", branchCode: "CS", exam: "PGCET", year: 2025, category: "GM" },
];

const ManageAllotments = () => {
  const [allotments, setAllotments] = useState<Allotment[]>(demoAllotments);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { register, handleSubmit, reset } = useForm<Omit<Allotment, "id">>();

  const onSubmit = (data: Omit<Allotment, "id">) => {
    setAllotments((prev) => [...prev, { ...data, id: Date.now(), rank: Number(data.rank), percentile: Number(data.percentile), year: Number(data.year) }]);
    toast.success("Allotment added");
    setModalOpen(false);
    reset({});
  };

  const filtered = allotments.filter((a) =>
    a.studentName.toLowerCase().includes(search.toLowerCase()) ||
    a.collegeCode.toLowerCase().includes(search.toLowerCase()) ||
    a.branchCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Manage Allotments</h1>
        <button onClick={() => { reset({}); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gradient text-sm self-start">
          <Plus className="w-4 h-4" /> Add Allotment
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, college, or branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No allotments found" />
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {["Student", "Rank", "%ile", "College", "Branch", "Exam", "Year", "Category"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{a.studentName}</td>
                    <td className="px-4 py-3 font-mono text-foreground">{a.rank}</td>
                    <td className="px-4 py-3 font-mono text-accent">{a.percentile}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{a.collegeCode}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{a.branchCode}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${a.exam === "GATE" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{a.exam}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{a.year}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">{a.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="glass-card p-6 w-full max-w-md mx-4 animate-fade-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Add Allotment</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {[
                { name: "studentName", label: "Student Name", placeholder: "Rahul Kumar" },
                { name: "rank", label: "Rank", placeholder: "150", type: "number" },
                { name: "percentile", label: "Percentile", placeholder: "98.5", type: "number" },
                { name: "collegeCode", label: "College Code", placeholder: "E001" },
                { name: "branchCode", label: "Branch Code", placeholder: "CS" },
                { name: "exam", label: "Exam", placeholder: "GATE / PGCET" },
                { name: "year", label: "Year", placeholder: "2025", type: "number" },
                { name: "category", label: "Category", placeholder: "GM" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    {...register(f.name as any, { required: true })}
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-2.5 rounded-lg btn-gradient text-sm mt-2">Add Allotment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAllotments;
