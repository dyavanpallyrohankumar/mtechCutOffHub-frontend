import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GitBranch, ArrowRight, ArrowLeft } from "lucide-react";
import { cutoffApi, Branch } from "@/api/cutoffApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

const demoBranches: Branch[] = [
  { id: 1, branchName: "Computer Science & Engineering", branchCode: "CS", collegeProgramCode: "CS101" },
  { id: 2, branchName: "Artificial Intelligence & ML", branchCode: "AI", collegeProgramCode: "AI101" },
  { id: 3, branchName: "Data Science", branchCode: "DS", collegeProgramCode: "DS101" },
  { id: 4, branchName: "Electronics & Communication", branchCode: "EC", collegeProgramCode: "EC101" },
  { id: 5, branchName: "VLSI Design", branchCode: "VL", collegeProgramCode: "VL101" },
  { id: 6, branchName: "Structural Engineering", branchCode: "SE", collegeProgramCode: "SE101" },
];

const BranchesPage = () => {
  const { collegeId } = useParams();
  const [branches, setBranches] = useState<Branch[]>(demoBranches);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!collegeId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await cutoffApi.getBranches(Number(collegeId));
        setBranches(res.data);
      } catch {
        setBranches(demoBranches);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [collegeId]);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/colleges" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Colleges
        </Link>

        <h1 className="text-3xl font-bold mb-2">
          Available <span className="gradient-text">Branches</span>
        </h1>
        <p className="text-muted-foreground mb-8">Select a branch to view cutoff data</p>

        {loading ? (
          <LoadingSkeleton rows={4} columns={2} />
        ) : branches.length === 0 ? (
          <EmptyState title="No branches found" />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {branches.map((branch) => (
              <div key={branch.id} className="glass-card-hover p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{branch.branchName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Code: {branch.collegeProgramCode}</p>
                  </div>
                </div>
                <Link
                  to={`/colleges/${collegeId}/branches/${branch.id}/cutoffs`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View Cutoffs <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchesPage;
