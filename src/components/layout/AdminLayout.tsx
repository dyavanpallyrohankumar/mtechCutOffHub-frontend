import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap,
  LayoutDashboard,
  Building2,
  GitBranch,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Colleges", path: "/admin/colleges", icon: Building2 },
  { label: "Branches", path: "/admin/branches", icon: GitBranch },
  { label: "Allotments", path: "/admin/allotments", icon: Users },
];

const AdminLayout = () => {
  const { username, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen
        ${collapsed ? "w-20" : "w-64"}
        border-r border-border bg-card/80 backdrop-blur-xl
        flex flex-col transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>

          {!collapsed && (
            <span className="text-sm font-bold text-foreground">
              Admin Panel
            </span>
          )}

          <button
            className="hidden lg:block ml-auto text-muted-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""
                }`}
            />
          </button>

          <button
            className="lg:hidden ml-auto text-muted-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md" />
                )}

                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-border/50">
          {!collapsed && (
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              Logged in as {username}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 flex items-center px-4 border-b border-border/50 bg-card/40 backdrop-blur-sm sticky top-0 z-30 justify-between">

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 text-muted-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-sm font-semibold text-foreground">
              {location.pathname
                .replace("/admin/", "")
                .replace("-", " ")
                .toUpperCase()}
            </h1>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-medium">
              System Healthy
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;