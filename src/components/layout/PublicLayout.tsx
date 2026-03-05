import { Link, Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background hm-root">
      <PublicNavbar />
      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="relative border-t border-border/50 py-5 px-4 overflow-hidden">

        {/* Animated Gradient Line */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary via-cyan-400 to-primary animate-gradient-move" />

        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">

          {/* Left */}
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} MTech Cutoff Hub
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6">

            <Link
              to="/privacy-policy"
              className="relative hover:text-foreground transition-colors 
        after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 
        after:bg-primary after:transition-all hover:after:w-full"
            >
              Privacy
            </Link>

            <Link
              to="/contact"
              className="relative hover:text-foreground transition-colors 
        after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 
        after:bg-primary after:transition-all hover:after:w-full"
            >
              Contact
            </Link>

            <Link
              to="/admin/login"
              className="relative hover:text-foreground transition-colors 
        after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 
        after:bg-primary after:transition-all hover:after:w-full"
            >
              Admin
            </Link>

          </div>

          {/* Right */}
          <div className="text-center sm:text-right">
            Built by{" "}
            <a
              href="https://dyavanpallyrohankumar.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              Rohankumar D.
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default PublicLayout;
