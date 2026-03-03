import { useEffect, useMemo, useState } from "react";
import { Plus, X, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import { branchApi, Branch } from "@/api/branchApi";

type BranchForm = Omit<Branch, "id">;

const ManageBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { register, handleSubmit, reset } = useForm<BranchForm>();

  /* ================= Fetch ================= */

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await branchApi.getAll();
        setBranches(res.data);
      } catch {
        toast.error("Failed to load branches");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  /* ================= Create ================= */

  const onSubmit = async (data: BranchForm) => {
    try {
      const res = await branchApi.create(data);

      setBranches((prev) => [...prev, res.data]);
      toast.success("Branch created successfully");
      setModalOpen(false);
      reset();
    } catch {
      toast.error("Failed to create branch");
    }
  };

  /* ================= Combined Search ================= */

  const filteredBranches = useMemo(() => {
    const query = search.toLowerCase();

    return branches.filter(
      (b) =>
        b.branchName.toLowerCase().includes(query) ||
        b.collegeProgramCode.toLowerCase().includes(query)
    );
  }, [branches, search]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Manage Branches
        </h1>

        <button
          onClick={() => {
            reset();
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gradient text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Branch
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by branch name or program code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="glass-card p-6 text-center text-muted-foreground">
          Loading branches...
        </div>
      ) : filteredBranches.length === 0 ? (
        <EmptyState title="No branches found" />
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                    Branch Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                    Program Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-foreground font-medium">
                      {b.branchName}
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {b.collegeProgramCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-card p-6 w-full max-w-md mx-4 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Add Branch
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Branch Name
                </label>
                <input
                  {...register("branchName", { required: true })}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Program Code
                </label>
                <input
                  {...register("collegeProgramCode", { required: true })}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg btn-gradient text-sm mt-2"
              >
                Create Branch
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranches;