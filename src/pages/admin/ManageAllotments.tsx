import { useState, useEffect } from "react";
import { Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { allotmentApi, Allotment } from "@/api/allotmentApi";
import EmptyState from "@/components/EmptyState";






const ManageAllotments = () => {
  const [allotments, setAllotments] = useState<Allotment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchAllotments = async () => {
      try {
        const res = await allotmentApi.getAll();
        setAllotments(res.data);
      } catch {
        toast.error("Failed to load allotments");
      } finally {
        setLoading(false);
      }
    };

    fetchAllotments();
  }, []);

  /* ================= CSV UPLOAD ================= */






  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      const res = await allotmentApi.uploadCsv(formData);

      toast.success(
        `Saved: ${res.data.saved} | Failed: ${res.data.failed}`
      );

      // Refresh table after upload
      const refreshed = await allotmentApi.getAll();
      setAllotments(refreshed.data);

      setSelectedFile(null);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= SEARCH FILTER ================= */

  const filtered = allotments.filter((a) =>
    a.studentName.toLowerCase().includes(search.toLowerCase()) ||
    a.collegeProgramCode.toLowerCase().includes(search.toLowerCase()) ||
    a.exam.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= RENDER ================= */

  if (loading) {
    return <div className="text-muted-foreground">Loading allotments...</div>;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Manage Allotments
        </h1>

        <div className="flex gap-3">
          {/* CSV Upload */}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm cursor-pointer hover:bg-muted transition-colors">
            <Upload className="w-4 h-4" />
            Choose CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] || null)
              }
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded-lg btn-gradient text-sm disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* File Name */}
      {selectedFile && (
        <div className="text-sm text-muted-foreground">
          Selected: {selectedFile.name}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, program, or exam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No allotments found" />
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                {[
                  "Student",
                  "Rank",
                  "Score",
                  "Exam",
                  "Year",
                  "Phase",
                  "Program Code",
                  "Allotted Category",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    {a.studentName}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {a.rank}
                  </td>
                  <td className="px-4 py-3 font-mono text-accent">
                    {a.scoreOrPercentile}
                  </td>
                  <td className="px-4 py-3">
                    {a.exam}
                  </td>
                  <td className="px-4 py-3">
                    {a.year}
                  </td>
                  <td className="px-4 py-3">
                    {a.phase}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {a.collegeProgramCode}
                  </td>
                  <td className="px-4 py-3">
                    {a.allotedCategory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAllotments;