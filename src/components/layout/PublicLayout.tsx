import { Link, Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="relative border-t border-border/50 py-4 px-4 overflow-hidden">

        {/* Animated Gradient Line */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary via-cyan-400 to-primary animate-gradient-move" />

        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">

          {/* Left */}
          <div>
            © {new Date().getFullYear()} MTech Cutoff Hub
          </div>

          {/* Center */}
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Privacy
            </Link>

            <Link
              to="/contact"
              className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Contact
            </Link>
          </div>

          {/* Right */}
          <a
            href="https://dyavanpallyrohankumar.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            <div>
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
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
