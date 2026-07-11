import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ScrollToTop from "./components/layout/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastProvider } from "./contexts/ToastContext";
import { Loader2 } from "lucide-react";

// Lazy-loaded routes for performance optimization
const Landing = React.lazy(() => import("./pages/Landing"));
const Authentication = React.lazy(() => import("./pages/auth/Authentication"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Hotel Dashboards
const HotelDashboard = React.lazy(() => import("./pages/dashboards/HotelDashboard"));
const HotelDonate = React.lazy(() => import("./pages/dashboards/HotelDonate"));
const HotelDonations = React.lazy(() => import("./pages/dashboards/HotelDonations"));
const HotelAccount = React.lazy(() => import("./pages/dashboards/HotelAccount"));

// NGO Dashboards
const NGODashboard = React.lazy(() => import("./pages/dashboards/NGODashboard"));
const NGORequests = React.lazy(() => import("./pages/dashboards/NGORequests"));
const NGOLive = React.lazy(() => import("./pages/dashboards/NGOLive"));
const NGOAccount = React.lazy(() => import("./pages/dashboards/NGOAccount"));

// Volunteer Dashboards
const VolunteerDashboard = React.lazy(() => import("./pages/dashboards/VolunteerDashboard"));
const VolunteerDeliveries = React.lazy(() => import("./pages/dashboards/VolunteerDeliveries"));
const VolunteerActive = React.lazy(() => import("./pages/dashboards/VolunteerActive"));
const VolunteerHistory = React.lazy(() => import("./pages/dashboards/VolunteerHistory"));
const VolunteerPerformance = React.lazy(() => import("./pages/dashboards/VolunteerPerformance"));
const VolunteerAchievements = React.lazy(() => import("./pages/dashboards/VolunteerAchievements"));
const VolunteerProfile = React.lazy(() => import("./pages/dashboards/VolunteerProfile"));
const VolunteerNotifications = React.lazy(() => import("./pages/dashboards/VolunteerNotifications"));
const VolunteerSettings = React.lazy(() => import("./pages/dashboards/VolunteerSettings"));
const VolunteerReports = React.lazy(() => import("./pages/dashboards/VolunteerReports"));
const VolunteerSupport = React.lazy(() => import("./pages/dashboards/VolunteerSupport"));

// Admin Dashboards
const AdminDashboard = React.lazy(() => import("./pages/dashboards/AdminDashboard"));
const AdminAccount = React.lazy(() => import("./pages/dashboards/AdminAccount"));
const AdminSupport = React.lazy(() => import("./pages/dashboards/AdminSupport"));
const AdminAnalytics = React.lazy(() => import("./pages/dashboards/AdminAnalytics"));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Loading Module...</span>
    </div>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Landing />} />
            </Route>
            
            <Route path="/auth" element={<Authentication />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              
              {/* Hotel Hub */}
              <Route path="/hotel" element={<DashboardLayout />}>
                <Route index element={<HotelDashboard />} />
                <Route path="donate" element={<HotelDonate />} />
                <Route path="active" element={<HotelDonations />} />
                <Route path="history" element={<HotelDonations />} />
                <Route path="analytics" element={<HotelDonations />} />
                <Route path="account" element={<HotelAccount />} />
                <Route path="notifications" element={<HotelAccount />} />
                <Route path="profile" element={<HotelAccount />} />
                <Route path="settings" element={<HotelAccount />} />
                <Route path="support" element={<HotelAccount />} />
              </Route>

              {/* NGO Hub */}
              <Route path="/ngo" element={<DashboardLayout />}>
                <Route index element={<NGODashboard />} />
                <Route path="requests" element={<NGORequests />} />
                <Route path="live" element={<NGOLive />} />
                <Route path="storage" element={<NGOAccount />} />
                <Route path="history" element={<NGOAccount />} />
                <Route path="analytics" element={<NGOAccount />} />
                <Route path="account" element={<NGOAccount />} />
                <Route path="notifications" element={<NGOAccount />} />
                <Route path="profile" element={<NGOAccount />} />
                <Route path="settings" element={<NGOAccount />} />
                <Route path="support" element={<NGOAccount />} />
              </Route>

              {/* Volunteer Hub */}
              <Route path="/volunteer" element={<DashboardLayout />}>
                <Route index element={<VolunteerDashboard />} />
                <Route path="deliveries" element={<VolunteerDeliveries />} />
                <Route path="active" element={<VolunteerActive />} />
                <Route path="history" element={<VolunteerHistory />} />
                <Route path="performance" element={<VolunteerPerformance />} />
                <Route path="achievements" element={<VolunteerAchievements />} />
                <Route path="profile" element={<VolunteerProfile />} />
                <Route path="notifications" element={<VolunteerNotifications />} />
                <Route path="settings" element={<VolunteerSettings />} />
                <Route path="reports" element={<VolunteerReports />} />
                <Route path="support" element={<VolunteerSupport />} />
              </Route>

              {/* Admin Hub */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminAccount />} />
                <Route path="approvals" element={<AdminAccount />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="settings" element={<AdminAccount />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="notifications" element={<AdminAccount />} />
                <Route path="profile" element={<AdminAccount />} />
              </Route>
              
            </Route>

            {/* 404 Fallback Route */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </Router>
    </ToastProvider>
  );
}

export default App;
