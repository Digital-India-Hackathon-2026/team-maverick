import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import React from 'react';
import { 
  LayoutDashboard, 
  PackagePlus, 
  MapPin, 
  History, 
  BarChart3, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
  Inbox,
  Package,
  Navigation,
  Trophy,
  FileText,
  HelpCircle,
  Activity
} from "lucide-react";


export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [customProfile, setCustomProfile] = useState<{ hotelName?: string; initials?: string } | null>(null);

  useEffect(() => {
    const handleProfileUpdate = () => {
      if (location.pathname.startsWith('/hotel')) {
        const data = localStorage.getItem('hotelProfileData');
        if (data) {
          try {
            const parsed = JSON.parse(data);
            if (parsed.hotelName) {
              setCustomProfile({
                hotelName: parsed.hotelName,
                initials: parsed.hotelName.substring(0, 2).toUpperCase()
              });
            }
          } catch (e) {}
        }
      }
    };
    handleProfileUpdate();
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, [location.pathname]);

  // Determine role based on URL path
  const role = location.pathname.startsWith('/hotel') ? 'hotel' :
               location.pathname.startsWith('/ngo') ? 'ngo' :
               location.pathname.startsWith('/volunteer') ? 'volunteer' : 
               location.pathname.startsWith('/admin') ? 'admin' : 'hotel';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const hotelMenu = [
    { label: 'Dashboard', href: '/hotel', icon: LayoutDashboard },
    { label: 'Donate Food', href: '/hotel/donate', icon: PackagePlus },
    { label: 'Active Donations', href: '/hotel/active', icon: MapPin },
    { label: 'Donation History', href: '/hotel/history', icon: History },
    { label: 'Analytics', href: '/hotel/analytics', icon: BarChart3 },
    { label: 'Notifications', href: '/hotel/notifications', icon: Bell },
    { label: 'Profile', href: '/hotel/profile', icon: User },
    { label: 'Settings', href: '/hotel/settings', icon: Settings },
    { label: 'Support', href: '/hotel/support', icon: HelpCircle },
  ];

  const ngoMenu = [
    { label: 'Dashboard', href: '/ngo', icon: LayoutDashboard },
    { label: 'Incoming Requests', href: '/ngo/requests', icon: Inbox },
    { label: 'Live Deliveries', href: '/ngo/live', icon: Navigation },
    { label: 'Storage Management', href: '/ngo/storage', icon: Package },
    { label: 'Delivery History', href: '/ngo/history', icon: History },
    { label: 'Analytics', href: '/ngo/analytics', icon: BarChart3 },
    { label: 'Notifications', href: '/ngo/notifications', icon: Bell },
    { label: 'Profile', href: '/ngo/profile', icon: User },
    { label: 'Settings', href: '/ngo/settings', icon: Settings },
    { label: 'Support', href: '/ngo/support', icon: HelpCircle },
  ];

  const volunteerMenu = [
    { label: 'Dashboard', href: '/volunteer', icon: LayoutDashboard },
    { label: 'Find Deliveries', href: '/volunteer/deliveries', icon: Navigation },
    { label: 'Active Delivery', href: '/volunteer/active', icon: MapPin },
    { label: 'History', href: '/volunteer/history', icon: History },
    { label: 'Performance', href: '/volunteer/performance', icon: Activity },
    { label: 'Achievements', href: '/volunteer/achievements', icon: Trophy },
    { label: 'Reports', href: '/volunteer/reports', icon: FileText },
    { label: 'Support', href: '/volunteer/support', icon: HelpCircle },
    { label: 'Profile', href: '/volunteer/profile', icon: User },
    { label: 'Settings', href: '/volunteer/settings', icon: Settings },
  ];

  const adminMenu = [
    { label: 'System Overview', href: '/admin', icon: ({className}: {className?: string}): React.ReactElement => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg> },
    { label: 'Users & Roles', href: '/admin/users', icon: ({className}: {className?: string}): React.ReactElement => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Approvals', href: '/admin/approvals', icon: ({className}: {className?: string}): React.ReactElement => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="m9 15-3 3-3-3M6 18V9"/></svg> },
    { label: 'Support', href: '/admin/support', icon: ({className}: {className?: string}): React.ReactElement => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 16-4-4V8"/></svg> },
    { label: 'Settings', href: '/admin/settings', icon: ({className}: {className?: string}): React.ReactElement => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ];

  let menuItems: any[] = hotelMenu;
  let roleTitle = 'Hotel Manager';
  let initials = customProfile?.initials || 'GR';
  let brandName = customProfile?.hotelName || 'Grand Regency';

  if (role === 'ngo') {
    menuItems = ngoMenu;
    roleTitle = 'NGO Admin';
    initials = 'HF';
    brandName = 'Hope Foundation';
  } else if (role === 'volunteer') {
    menuItems = volunteerMenu;
    roleTitle = 'Volunteer';
    initials = 'RS';
    brandName = 'Rahul Sharma';
  } else if (role === 'admin') {
    menuItems = adminMenu;
    roleTitle = 'System Admin';
    initials = 'AD';
    brandName = 'Platform Admin';
  }

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/auth');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const railWidth = collapsed && !isMobile ? '76px' : '260px';
  const showLabels = !collapsed || isMobile;

  const SidebarContent = () => (
    <>
      <div className={`flex items-center p-4 h-[68px] border-b border-gray-200 shrink-0 relative ${collapsed && !isMobile ? 'justify-center' : 'justify-start'}`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <svg width="28" height="28" viewBox="0 0 34 34" fill="none" className="shrink-0">
            <defs>
              <linearGradient id="fbDashGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#059669" /><stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <rect width="34" height="34" rx="10" fill="url(#fbDashGrad)" />
            <path d="M17 8.5C13 8.5 10 12 10 16.5C10 21 13 25.5 17 25.5C15.2 22.7 15 20.2 15 17.5C15 14 15.8 10.8 17 8.5Z" fill="white" fillOpacity="0.95" />
            <path d="M17 8.5C21 8.5 24 12 24 16.5C24 21 21 25.5 17 25.5C18.8 22.7 19 20.2 19 17.5C19 14 18.2 10.8 17 8.5Z" fill="white" fillOpacity="0.65" />
          </svg>
          {showLabels && <span className="text-[17px] font-bold tracking-tight text-gray-900 whitespace-nowrap">FoodBridge</span>}
        </div>
        {!isMobile && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-[22px] flex items-center justify-center w-6 h-6 rounded-full border border-gray-200 bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors z-20 shadow-sm"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === `/${role}`}
            title={collapsed && !isMobile ? item.label : ''}
            className={({ isActive }) => `
              flex items-center gap-3 p-2.5 rounded-xl text-[13.5px] font-semibold transition-all overflow-hidden
              ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}
              ${collapsed && !isMobile ? 'justify-center' : 'justify-start'}
            `}
          >
            <span className="flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5" />
            </span>
            {showLabels && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 shrink-0">
        <button 
          onClick={handleLogoutClick}
          className={`
            flex items-center gap-3 w-full p-2.5 rounded-xl text-[13.5px] font-semibold text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600
            ${collapsed && !isMobile ? 'justify-center' : 'justify-start'}
          `}
          title={collapsed && !isMobile ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {showLabels && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Mobile Sidebar Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-[60] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed top-0 left-0 bottom-0 z-[65] transform transition-transform duration-300' : 'sticky top-0 h-screen transition-all duration-300 z-10 shrink-0'}
          bg-white border-r border-gray-200 flex flex-col shadow-sm
        `}
        style={{ 
          width: isMobile ? '260px' : railWidth,
          transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none'
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-3.5 lg:px-7 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            {isMobile && (
              <button 
                onClick={() => setMobileOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white shrink-0 hover:bg-gray-50"
              >
                <Menu className="w-5 h-5 text-gray-900" />
              </button>
            )}
            <div className="min-w-0">
              <div className="text-[19px] font-extrabold tracking-tight text-gray-900 truncate tracking-tight">Dashboard</div>
              {!isMobile && <div className="text-[12.5px] font-medium text-gray-400">{brandName}</div>}
            </div>
          </div>

          {!isMobile && (
            <div className="flex-1 max-w-[380px] mx-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search donations, NGOs, volunteers..." 
                className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] outline-none transition-all focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    toast(`Searching for: ${e.currentTarget.value}`, 'info');
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          )}

          <div className="flex items-center gap-3.5 shrink-0">
            <button 
              onClick={() => navigate(`/${role}/notifications`)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4.5 h-4.5 text-gray-700" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600 border-2 border-white"></span>
            </button>
            <div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => navigate(`/${role}/profile`)}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600 text-white text-[13px] font-bold shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                {initials}
              </div>
              {!isMobile && (
                <div className="flex flex-col leading-tight group-hover:opacity-80 transition-opacity">
                  <span className="text-[13px] font-bold text-gray-900">{brandName}</span>
                  <span className="text-[11.5px] text-gray-400">{roleTitle}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Nested Route Content */}
        <main className="flex-1 p-4 lg:p-7 overflow-x-hidden">
          <Outlet />
        </main>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Are you sure you want to securely log out of your account? You will need to sign in again to access your dashboard.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
