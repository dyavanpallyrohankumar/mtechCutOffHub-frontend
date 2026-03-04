import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { College } from "@/api/collegeApi";
import { useEffect } from "react";
import { collegeApi } from "@/api/collegeApi";
const initialColleges: College[] = [
  { id: 1, collegeCode: "E001", collegeName: "UVCE", collegeType: "Government", universityName: "Bangalore University", collegeAddress: "hi" },
  { id: 2, collegeCode: "E002", collegeName: "BMS College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "hi" },
  { id: 3, collegeCode: "E003", collegeName: "RV College of Engineering", collegeType: "Private Aided", universityName: "VTU", collegeAddress: "hi" },
];

const ManageColleges = () => {
  const [colleges, setColleges] = useState<College[]>(initialColleges);


  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await collegeApi.getAllColleges();
      setColleges(res.data);
    } catch (error) {
      toast.error("Failed to fetch colleges");
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<College | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Partial<College>>();

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (c: College) => {
    setEditing(c);
    Object.entries(c).forEach(([k, v]) => setValue(k as any, v));
    setModalOpen(true);
  };

  const onSubmit = async (data: Partial<College>) => {
    try {
      if (editing) {
        await collegeApi.update(data);
        toast.success("College updated");
      } else {
        await collegeApi.create(data);
        toast.success("College added");
      }

      fetchColleges(); // refresh list
      setModalOpen(false);
      reset({});
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await collegeApi.delete(deleteId);
        toast.success("College deleted");
        fetchColleges();
      } catch {
        toast.error("Delete failed");
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Colleges</h1>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-gradient text-sm">
          <Plus className="w-4 h-4" /> Add College
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">University</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((c) => (
                <tr key={`${c.collegeCode}-${c.id}`} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-foreground">{c.collegeCode}</td>
                  <td className="px-4 py-3 text-foreground">{c.collegeName}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">{c.collegeType}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{c.universityName}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteId(c.collegeCode)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="glass-card p-6 w-full max-w-md mx-4 animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">{editing ? "Edit College" : "Add College"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {[
                { name: "collegeCode", label: "College Code", placeholder: "E001" },
                { name: "collegeName", label: "College Name", placeholder: "Enter name" },
                { name: "collegeType", label: "Type", placeholder: "Government / Private" },
                { name: "universityName", label: "University", placeholder: "VTU" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    {...register(f.name as any, { required: true })}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-2.5 rounded-lg btn-gradient text-sm mt-2">
                {editing ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="glass-card p-6 w-full max-w-sm mx-4 text-center animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <Trash2 className="w-10 h-10 text-destructive mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Delete College?</h3>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageColleges;
