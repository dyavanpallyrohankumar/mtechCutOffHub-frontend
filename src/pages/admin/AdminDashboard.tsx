import { Building2, GitBranch, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { label: "Total Colleges", value: "200+", icon: Building2, color: "text-primary" },
  { label: "Total Branches", value: "1,200+", icon: GitBranch, color: "text-accent" },
  { label: "Allotments", value: "50K+", icon: Users, color: "text-primary" },
  { label: "Data Accuracy", value: "99.5%", icon: TrendingUp, color: "text-accent" },
];

const AdminDashboard = () => {
  const { email } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, {email}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Manage Colleges", href: "/admin/colleges", icon: Building2 },
            { label: "Manage Branches", href: "/admin/branches", icon: GitBranch },
            { label: "Manage Allotments", href: "/admin/allotments", icon: Users },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
