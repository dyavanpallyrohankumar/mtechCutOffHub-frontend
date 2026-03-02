import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { collegeApi, College } from "@/api/collegeApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

// Demo data for display without backend
const demoColleges: College[] = [
  { id: 1, collegeCode: "E001", collegeName: "University Visvesvaraya College of Engineering", collegeType: "Government", universityName: "Bangalore University", collegeAddress: "bg" },
  { id: 2, collegeCode: "E002", collegeName: "BMS College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "bg" },
  { id: 3, collegeCode: "E003", collegeName: "RV College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "bg" },
  { id: 4, collegeCode: "E004", collegeName: "PES University", collegeType: "Private", universityName: "PES University", collegeAddress: "bg" },
  { id: 5, collegeCode: "E005", collegeName: "MS Ramaiah Institute of Technology", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "bg" },
  { id: 6, collegeCode: "E006", collegeName: "National Institute of Technology Karnataka", collegeType: "Government", universityName: "NITK", collegeAddress: "bg" },
  { id: 7, collegeCode: "E007", collegeName: "JSS Science and Technology University", collegeType: "Private", universityName: "JSSSTU", collegeAddress: "bg" },
  { id: 8, collegeCode: "E008", collegeName: "Siddaganga Institute of Technology", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "bg" },
];

const CollegesPage = () => {
  const [colleges, setColleges] = useState<College[]>(demoColleges);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchColleges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await collegeApi.getAll({
        page,
        size: 12,
        search: search || undefined,
      });

      setColleges(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      setColleges(demoColleges);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, search]);


  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // const filtered = colleges.filter((c) =>
  //   c.collegeName.toLowerCase().includes(search.toLowerCase()) ||
  //   c.universityName.toLowerCase().includes(search.toLowerCase())
  // );
  const filtered = colleges;
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Explore <span className="gradient-text">Colleges</span>
          </h1>
          <p className="text-muted-foreground">Browse engineering colleges and view branch-wise cutoffs</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search colleges or universities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSkeleton rows={6} columns={1} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchColleges} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No colleges found" description="Try a different search term" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map((college) => (
              <div key={college.collegeCode} className="glass-card-hover p-5 flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-2">
                      {college.collegeName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {college.collegeCode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
                    {college.collegeType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">
                    {college.universityName}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-4 line-clamp-1">
                  {college.collegeAddress}
                </p>

                <Link
                  to={`/colleges/${college.collegeCode}/branches`}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View Branches
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;
