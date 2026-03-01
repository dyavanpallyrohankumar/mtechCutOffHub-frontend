import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import NotFound from "./pages/NotFound";

// Public pages
import HomePage from "./pages/public/HomePage";
import CollegesPage from "./pages/public/CollegesPage";
import BranchesPage from "./pages/public/BranchesPage";
import CutoffsPage from "./pages/public/CutoffsPage";

// Admin pages (lazy loaded)
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const OtpVerificationPage = lazy(() => import("./pages/admin/OtpVerificationPage"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageColleges = lazy(() => import("./pages/admin/ManageColleges"));
const ManageBranches = lazy(() => import("./pages/admin/ManageBranches"));
const ManageAllotments = lazy(() => import("./pages/admin/ManageAllotments"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/colleges" element={<CollegesPage />} />
                <Route path="/colleges/:collegeId/branches" element={<BranchesPage />} />
                <Route path="/colleges/:collegeId/branches/:branchId/cutoffs" element={<CutoffsPage />} />
              </Route>

              {/* Admin auth */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/verify-otp" element={<OtpVerificationPage />} />

              {/* Admin protected */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="colleges" element={<ManageColleges />} />
                <Route path="branches" element={<ManageBranches />} />
                <Route path="allotments" element={<ManageAllotments />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
