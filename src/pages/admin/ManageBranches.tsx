import { useEffect, useMemo, useState } from "react";
import { Plus, X, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import EmptyState from "@/components/EmptyState";
import { branchApi, Branch } from "@/api/branchApi";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BranchForm = Omit<Branch, "id">;

const ManageBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const form = useForm<BranchForm>({
    defaultValues: {
      branchName: "",
      collegeProgramCode: "",
    },
  });

  /* ================= Fetch Branches ================= */

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

  /* ================= Create Branch ================= */

  const onSubmit = async (data: BranchForm) => {
    try {
      const res = await branchApi.create(data);

      setBranches((prev) => [...prev, res.data]);
      toast.success("Branch created successfully");

      setModalOpen(false);
      form.reset();
    } catch {
      toast.error("Failed to create branch");
    }
  };

  /* ================= Search ================= */

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

        <Button
          onClick={() => {
            form.reset();
            setModalOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Branch
        </Button>
      </div>

      {/* Search */}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search by branch name or program code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
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
            {/* Modal Header */}

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

            {/* Form */}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="branchName"
                  rules={{
                    required: "Branch name is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Computer Science"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collegeProgramCode"
                  rules={{
                    required: "Program code is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Code</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="CS101"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Branch
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranches;