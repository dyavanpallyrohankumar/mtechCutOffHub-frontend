import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BranchEntry {
  id: number;
  branchName: string;
  branchCode: string;
  collegeProgramCode: string;
  collegeId: number;
}

const demoBranches: BranchEntry[] = [
  { id: 1, branchName: "Computer Science & Engineering", branchCode: "CS", collegeProgramCode: "CS101", collegeId: 1 },
  { id: 2, branchName: "Artificial Intelligence & ML", branchCode: "AI", collegeProgramCode: "AI101", collegeId: 1 },
  { id: 3, branchName: "Electronics & Communication", branchCode: "EC", collegeProgramCode: "EC101", collegeId: 2 },
];

const ManageBranches = () => {
  const [branches, setBranches] = useState<BranchEntry[]>(demoBranches);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Omit<BranchEntry, "id">>();

  const onSubmit = (data: Omit<BranchEntry, "id">) => {
    setBranches((prev) => [...prev, { ...data, id: Date.now(), collegeId: Number(data.collegeId) }]);
    toast.success("Branch added");
    setModalOpen(false);
    reset({});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Branches</h1>
        <button onClick={() => { reset({}); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gradient text-sm">
          <Plus className="w-4 h-4" /> Add Branch
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Branch Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Program Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">College ID</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{b.branchName}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{b.branchCode}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{b.collegeProgramCode}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.collegeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="glass-card p-6 w-full max-w-md mx-4 animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Add Branch</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {[
                { name: "branchName", label: "Branch Name", placeholder: "Computer Science" },
                { name: "branchCode", label: "Branch Code", placeholder: "CS" },
                { name: "collegeProgramCode", label: "Program Code", placeholder: "CS101" },
                { name: "collegeId", label: "College ID", placeholder: "1", type: "number" },
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
              <button type="submit" className="w-full py-2.5 rounded-lg btn-gradient text-sm mt-2">Create Branch</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranches;
