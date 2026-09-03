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
  Settings,
  FileSpreadsheet,
  Database,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

/* =========================================================
   TYPES
========================================================= */

interface SidebarLink {
  label: string;
  path: string;
  icon: React.ElementType;
}

/* =========================================================
   MAIN LINKS
========================================================= */

const mainLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

/* =========================================================
   DATA MANAGEMENT LINKS
========================================================= */

const dataLinks: SidebarLink[] = [
  {
    label: "Colleges",
    path: "/admin/colleges",
    icon: Building2,
  },
  {
    label: "Branches",
    path: "/admin/branches",
    icon: GitBranch,
  },
  {
    label: "Allotments",
    path: "/admin/allotments",
    icon: Users,
  },
  {
    label: "Excel Import",
    path: "/admin/import",
    icon: FileSpreadsheet,
  },
];

/* =========================================================
   SYSTEM LINKS
========================================================= */

const systemLinks: SidebarLink[] = [
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const AdminLayout = () => {
  const { username, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  const [dataMenuOpen, setDataMenuOpen] = useState(true);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  /* =========================================================
     LINK RENDERER
  ========================================================= */

  const renderLink = (link: SidebarLink) => {
    const Icon = link.icon;
    const active = isActive(link.path);

    return (
      <Link
        key={link.path}
        to={link.path}
        onClick={() => setSidebarOpen(false)}
        className={`
          relative
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-lg
          text-sm
          font-medium
          transition-all

          ${
            active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }
        `}
      >
        {/* Active indicator */}

        {active && (
          <span
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-1
              bg-primary
              rounded-r-md
            "
          />
        )}

        <Icon
          className="
            w-4
            h-4
            flex-shrink-0
          "
        />

        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  };

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const getPageTitle = () => {
    const path = location.pathname.replace("/admin", "").replace(/^\/+/, "");

    if (!path) {
      return "ADMIN";
    }

    const firstSegment = path.split("/")[0];

    return firstSegment.replace(/-/g, " ").toUpperCase();
  };

  return (
    <div
      className="
        min-h-screen
        bg-background
        flex
      "
    >
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-background/60
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-50
          h-screen

          ${collapsed ? "w-20" : "w-64"}

          border-r
          border-border
          bg-card/80
          backdrop-blur-xl

          flex
          flex-col

          transition-all
          duration-300

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <div
          className="
            h-16
            flex
            items-center
            gap-2
            px-4
            border-b
            border-border/50
          "
        >
          <div
            className="
              w-8
              h-8
              rounded-lg
              btn-gradient
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <GraduationCap
              className="
                w-4
                h-4
                text-primary-foreground
              "
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div
                className="
                  text-sm
                  font-bold
                  text-foreground
                  truncate
                "
              >
                CutoffHub
              </div>

              <div
                className="
                  text-[10px]
                  text-muted-foreground
                "
              >
                Admin Panel
              </div>
            </div>
          )}

          {/* Desktop collapse */}

          <button
            className="
              hidden
              lg:block
              ml-auto
              text-muted-foreground
              hover:text-foreground
            "
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={`
                w-4
                h-4
                transition-transform

                ${collapsed ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* Mobile close */}

          <button
            className="
              lg:hidden
              ml-auto
              text-muted-foreground
            "
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            p-2
            overflow-y-auto
          "
        >
          {/* ===============================
              MAIN
          =============================== */}

          <div className="space-y-1">
            {!collapsed && (
              <div
                className="
                  px-3
                  pt-2
                  pb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-muted-foreground/60
                "
              >
                Overview
              </div>
            )}

            {mainLinks.map(renderLink)}
          </div>

          {/* ===============================
              DATA MANAGEMENT
          =============================== */}

          <div className="mt-5">
            {!collapsed ? (
              <button
                onClick={() => setDataMenuOpen(!dataMenuOpen)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-muted-foreground/60
                  hover:text-foreground
                "
              >
                <span>Data Management</span>

                <ChevronDown
                  className={`
                    w-3
                    h-3
                    transition-transform

                    ${dataMenuOpen ? "" : "-rotate-90"}
                  `}
                />
              </button>
            ) : (
              <div
                className="
                  flex
                  justify-center
                  py-2
                  text-muted-foreground/50
                "
              >
                <Database className="w-4 h-4" />
              </div>
            )}

            {(dataMenuOpen || collapsed) && (
              <div className="space-y-1">{dataLinks.map(renderLink)}</div>
            )}
          </div>

          {/* ===============================
              SYSTEM
          =============================== */}

          <div className="mt-5">
            {!collapsed && (
              <div
                className="
                  px-3
                  pt-2
                  pb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-muted-foreground/60
                "
              >
                System
              </div>
            )}

            <div className="space-y-1">{systemLinks.map(renderLink)}</div>
          </div>
        </nav>

        {/* =================================================
            BOTTOM SECTION
        ================================================= */}

        <div
          className="
            p-3
            border-t
            border-border/50
          "
        >
          {!collapsed && (
            <div
              className="
                px-3
                py-2
                mb-1
                text-xs
                text-muted-foreground
                truncate
              "
              title={username ?? ""}
            >
              Logged in as{" "}
              <span className="font-medium text-foreground">{username}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              w-full
              px-3
              py-2.5
              rounded-lg
              text-sm
              font-medium
              text-destructive
              hover:bg-destructive/10
              transition-colors
            "
          >
            <LogOut
              className="
                w-4
                h-4
                flex-shrink-0
              "
            />

            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div
        className="
          flex-1
          flex
          flex-col
          min-w-0
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            h-16
            flex
            items-center
            px-4
            border-b
            border-border/50
            bg-card/40
            backdrop-blur-sm
            sticky
            top-0
            z-30
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            {/* Mobile menu */}

            <button
              className="
                lg:hidden
                p-2
                text-muted-foreground
                hover:text-foreground
              "
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page title */}

            <div>
              <h1
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                {getPageTitle()}
              </h1>

              <p
                className="
                  hidden
                  md:block
                  text-[10px]
                  text-muted-foreground
                "
              >
                CutoffHub Administration
              </p>
            </div>
          </div>

          {/* =================================================
              SYSTEM STATUS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
              text-xs
            "
          >
            <span
              className="
                flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                bg-green-500/10
                text-green-500
                font-medium
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-green-500
                "
              />
              System Healthy
            </span>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            flex-1
            p-4
            md:p-6
            overflow-auto
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
