import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
