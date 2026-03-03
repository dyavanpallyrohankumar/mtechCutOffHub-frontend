import { useEffect, useState } from "react";
import { Building2, GitBranch, Users, Database, AlertTriangle, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "@/api/axiosInstance";
import {
  dashboardSummaryMock,
  yearlyTrendMock,
  recentActivityMock,
  dataHealthMock
} from "@/mocks/dashboardMock";

/* ================= TYPES ================= */

interface DashboardSummary {
  totalColleges: number;
  totalBranches: number;
  totalAllotments: number;
  activeYears: number;
  lastImportDate: string;
  systemVersion: string;
}

interface YearlyTrend {
  year: number;
  count: number;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  createdAt: string;
}

interface DataHealth {
  missingCategories: number;
  duplicateRecords: number;
  unmappedBranches: number;
  unverifiedAllotments: number;
}

/* ================= COMPONENT ================= */

const AdminDashboard = () => {
  const { username } = useAuth();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [trend, setTrend] = useState<YearlyTrend[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [health, setHealth] = useState<DataHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSummary(dashboardSummaryMock);
      setTrend(yearlyTrendMock);
      setActivity(recentActivityMock);
      setHealth(dataHealthMock);
      setLoading(false);
    }, 800);
  }, []);



  // useEffect(() => {
  //   const fetchDashboard = async () => {
  //     try {
  //       const [summaryRes, trendRes, activityRes, healthRes] =
  //         await Promise.all([
  //           axiosInstance.get("/api/admin/dashboard/summary"),
  //           axiosInstance.get("/api/admin/dashboard/yearly-allotments"),
  //           axiosInstance.get("/api/admin/dashboard/recent-activity"),
  //           axiosInstance.get("/api/admin/dashboard/data-health"),
  //         ]);

  //       setSummary(summaryRes.data);
  //       setTrend(trendRes.data);
  //       setActivity(activityRes.data);
  //       setHealth(healthRes.data);
  //     } catch (error) {
  //       console.error("Dashboard load failed", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboard();
  // }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, {username}
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Colleges"
          value={summary?.totalColleges}
          icon={Building2}
        />
        <KpiCard
          label="Total Branches"
          value={summary?.totalBranches}
          icon={GitBranch}
        />
        <KpiCard
          label="Total Allotments"
          value={summary?.totalAllotments}
          icon={Users}
        />
        <KpiCard
          label="Active Years"
          value={summary?.activeYears}
          icon={Database}
        />
      </div>

      {/* ACTIVITY + HEALTH */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="text-foreground">{a.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Data Health */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Data Health
          </h2>
          <div className="space-y-3 text-sm">
            <HealthItem
              label="Missing Categories"
              value={health?.missingCategories}
            />
            <HealthItem
              label="Duplicate Records"
              value={health?.duplicateRecords}
            />
            <HealthItem
              label="Unmapped Branches"
              value={health?.unmappedBranches}
            />
            <HealthItem
              label="Unverified Allotments"
              value={health?.unverifiedAllotments}
            />
          </div>
        </div>
      </div>

      {/* YEARLY TREND */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-6">
          Year-wise Allotment Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trend}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* QUICK ACTIONS */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <QuickAction
            label="Manage Colleges"
            to="/admin/colleges"
          />
          <QuickAction
            label="Manage Branches"
            to="/admin/branches"
          />
          <QuickAction
            label="Manage Allotments"
            to="/admin/allotments"
          />
        </div>
      </div>

    </div>
  );
};

/* ================= SUB COMPONENTS ================= */

const KpiCard = ({ label, value, icon: Icon }: any) => (
  <div className="glass-card p-5">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div className="text-2xl font-bold text-foreground">
      {value?.toLocaleString()}
    </div>
  </div>
);

const HealthItem = ({ label, value }: any) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <span
      className={`font-semibold ${value && value > 0
        ? "text-destructive"
        : "text-green-500"
        }`}
    >
      {value}
    </span>
  </div>
);

const QuickAction = ({ label, to }: any) => (
  <Link
    to={to}
    className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
  >
    {label}
  </Link>
);

export default AdminDashboard;