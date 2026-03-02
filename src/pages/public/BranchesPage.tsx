import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GitBranch, ArrowRight, ArrowLeft } from "lucide-react";
import { cutoffApi, Branch } from "@/api/cutoffApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

interface CollegeDetails {
  collegeName: string;
  collegeAddress: string;
  collegeCode: string;
  universityName: string;
  collegeType: string;
  branches: Branch[];
}

const BranchesPage = () => {
  const { collegeId } = useParams();

  const [college, setCollege] = useState<CollegeDetails | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!collegeId) return;

    const fetchBranches = async () => {
      setLoading(true);
      try {
        const res = await cutoffApi.getBranches(String(collegeId));

        const data: CollegeDetails = res.data;

        setCollege(data);
        setBranches(data.branches ?? []);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
        setCollege(null);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [collegeId]);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">

        <Link
          to="/colleges"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Colleges
        </Link>

        {loading ? (
          <LoadingSkeleton rows={4} columns={2} />
        ) : !college ? (
          <EmptyState title="College not found" />
        ) : (
          <>
            {/* College Details Card */}
            <div className="glass-card p-6 mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {college.collegeName}
              </h1>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium text-foreground">Code:</span>{" "}
                  {college.collegeCode}
                </p>
                <p>
                  <span className="font-medium text-foreground">Address:</span>{" "}
                  {college.collegeAddress}
                </p>
                <p>
                  <span className="font-medium text-foreground">University:</span>{" "}
                  {college.universityName}
                </p>
                <p>
                  <span className="font-medium text-foreground">Type:</span>{" "}
                  {college.collegeType}
                </p>
              </div>
            </div>

            {/* Branch Section */}
            <h2 className="text-2xl font-bold mb-2">
              Available <span className="gradient-text">Branches</span>
            </h2>

            <p className="text-muted-foreground mb-8">
              Select a branch to view cutoff data
            </p>

            {branches.length === 0 ? (
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
                        <h3 className="font-semibold text-foreground text-sm">
                          {branch.branchName}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Code: {branch.collegeProgramCode}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/colleges/${collegeId}/branches/${branch.collegeProgramCode}/cutoffs`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View Cutoffs <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BranchesPage;