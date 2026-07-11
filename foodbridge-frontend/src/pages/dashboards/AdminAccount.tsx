import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminUsersList from "./AdminUsersList";
import AdminVerification from "./AdminVerification";
import AdminNotifications from "./AdminNotifications";
import AdminSettings from "./AdminSettings";
import AdminProfile from "./AdminProfile";

export default function AdminAccount() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/users')) setActiveTab('users');
    else if (path.includes('/approvals')) setActiveTab('approvals');
    else if (path.includes('/settings')) setActiveTab('settings');
    else if (path.includes('/analytics')) setActiveTab('analytics');
    else if (path.includes('/notifications')) setActiveTab('notifications');
    else if (path.includes('/profile')) setActiveTab('profile');
    else setActiveTab('users');
  }, [location.pathname]);



  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <AdminUsersList />;
      case 'approvals':
        return <AdminVerification />;
      case 'notifications':
        return <AdminNotifications />;
      case 'settings':
        return <AdminSettings />;
      case 'profile':
        return <AdminProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">

      {/* Render Dynamic Component */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>

    </div>
  );
}
