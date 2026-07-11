import { useState } from 'react';
import { 
  AlertTriangle, Inbox, Clock, CheckCircle2, AlertOctagon, LifeBuoy
} from 'lucide-react';
import AdminComplaintList from './AdminComplaintList';
import AdminSupportAnalytics from './AdminSupportAnalytics';

export default function AdminSupport() {
  const [activeTab, setActiveTab] = useState('list');

  const kpis = [
    { label: 'Total Complaints', value: '482', icon: Inbox, color: 'text-gray-600', bg: 'bg-gray-100' },
    { label: 'Open', value: '24', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'In Progress', value: '18', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolved', value: '440', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'High Priority', value: '6', icon: AlertOctagon, color: 'text-red-600', bg: 'bg-red-50' }
  ];

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <LifeBuoy className="w-6 h-6 text-emerald-600" />
          Support & Complaints
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage platform issues, volunteer disputes, and quality assurance.</p>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}

      {/* Content Rendering */}
      <div className="flex-1 min-h-0">
        {activeTab === 'list' ? <AdminComplaintList /> : <AdminSupportAnalytics />}
      </div>

    </div>
  );
}
