import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme"; // adjust path if needed

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Colleges", path: "/colleges" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy-policy" },
];

const PublicNavbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // theme hook
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  // close mobile menu when page changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 text-foreground backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            MTech <span className="text-primary">Cutoff Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                } `}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="ml-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/50 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${isActive(link.path)
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            className="w-full text-left px-6 py-3 text-sm text-muted-foreground hover:text-foreground"
          >
            Toggle Theme {dark ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
