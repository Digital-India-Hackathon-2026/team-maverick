import { useState } from 'react';
import { 
  BarChart3, Activity, Map as MapIcon, FileText, Server
} from 'lucide-react';
import AdminAnalyticsOverview from './AdminAnalyticsOverview';
import AdminLiveMonitoring from './AdminLiveMonitoring';
import AdminGeographicInsights from './AdminGeographicInsights';
import AdminReportsCenter from './AdminReportsCenter';
import AdminSystemHealth from './AdminSystemHealth';

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
    { id: 'live', label: 'Live Monitoring', icon: Activity },
    { id: 'geo', label: 'Geographic Insights', icon: MapIcon },
    { id: 'reports', label: 'Reports Center', icon: FileText },
    { id: 'health', label: 'System Health', icon: Server }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <AdminAnalyticsOverview />;
      case 'live': return <AdminLiveMonitoring />;
      case 'geo': return <AdminGeographicInsights />;
      case 'reports': return <AdminReportsCenter />;
      case 'health': return <AdminSystemHealth />;
      default: return <AdminAnalyticsOverview />;
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics & Monitoring</h1>
        <p className="text-sm text-gray-500 mt-1">Deep insights, real-time tracking, and system infrastructure health.</p>
      </div>

      {/* Navigation Tabs */}

      {/* Dynamic Content */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>

    </div>
  );
}
