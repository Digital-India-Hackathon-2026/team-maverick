import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import {
  Users, Building2, HeartHandshake, Package, Navigation, Utensils, 
  Leaf, Activity, ShieldCheck, AlertTriangle, FileText, BarChart3,
  CheckCircle2, Clock, MapPin, UserPlus, Eye
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('All');
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Verification', title: 'New Hotel Verification', message: 'The Metropole is awaiting approval.', time: '10 min ago', bg: 'bg-blue-50', color: 'text-blue-600', icon: ShieldCheck },
    { id: 2, type: 'Complaint', title: 'High Priority Complaint', message: 'Food spoilage reported in DEL-8812.', time: '45 min ago', bg: 'bg-red-50', color: 'text-red-600', icon: AlertTriangle },
    { id: 3, type: 'Delivery', title: 'Delivery SLA Breach', message: 'DEL-8809 is delayed by 30 mins.', time: '1 hr ago', bg: 'bg-amber-50', color: 'text-amber-600', icon: Clock },
    { id: 4, type: 'System', title: 'Server Load Alert', message: 'API response times are elevated.', time: '2 hrs ago', bg: 'bg-purple-50', color: 'text-purple-600', icon: Activity },
  ]);

  const overviewKpis = [
    { label: 'Total Hotels', value: '1,245', trend: '+12 this week', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total NGOs', value: '890', trend: '+5 this week', icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Volunteers', value: '3,420', trend: '+45 this week', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Donations', value: '84,500', trend: '+1,200 this week', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Deliveries', value: '128', trend: 'Live right now', icon: Navigation, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Meals Rescued', value: '4.2M', trend: '+12k this week', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Waste Prevented', value: '1.8k Tons', trend: '+20 Tons this week', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Health Score', value: '99.9%', trend: 'Operational', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { label: 'Verify Users', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => navigate('/admin/approvals') },
    { label: 'Complaints', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', action: () => navigate('/admin/users') },
    { label: 'Live Map', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50', action: () => toast('Opening live delivery map...', 'info') },
    { label: 'Analytics', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', action: () => navigate('/admin/analytics') },
    { label: 'Reports', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', action: () => navigate('/admin/analytics') },
  ];

  const liveActivity = [
    { text: 'New registration: Green Earth NGO', time: 'Just now', icon: UserPlus, color: 'text-emerald-500' },
    { text: 'Donation created: Taj Palace (50 meals)', time: '2 mins ago', icon: Package, color: 'text-blue-500' },
    { text: 'Volunteer assigned: Rahul to DEL-8814', time: '5 mins ago', icon: Navigation, color: 'text-indigo-500' },
    { text: 'Delivery completed: DEL-8810', time: '12 mins ago', icon: CheckCircle2, color: 'text-green-500' },
    { text: 'Complaint raised: Missing items in DEL-8811', time: '15 mins ago', icon: AlertTriangle, color: 'text-red-500' },
  ];

  const recentUsers = [
    { id: '#USR-1042', name: 'Grand Regency', type: 'Hotel', status: 'Pending', date: 'Today, 10:24 AM' },
    { id: '#USR-1041', name: 'Smile Foundation', type: 'NGO', status: 'Approved', date: 'Today, 09:15 AM' },
    { id: '#USR-1040', name: 'Amit Kumar', type: 'Volunteer', status: 'Pending', date: 'Yesterday, 04:30 PM' },
    { id: '#USR-1039', name: 'The Leela Palace', type: 'Hotel', status: 'Approved', date: 'Yesterday, 02:10 PM' },
    { id: '#USR-1038', name: 'City Hospital', type: 'NGO', status: 'Suspended', date: 'Yesterday, 11:00 AM' },
  ];

  const filteredUsers = recentUsers.filter(user => activeTab === 'All' || user.type === activeTab);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Command Center</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide overview, monitoring, and administration.</p>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {overviewKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
              <div className="text-[11px] font-semibold text-gray-500 mt-0.5">{kpi.label}</div>
            </div>
            <div className="text-[10px] font-medium text-emerald-600 mt-2 truncate">{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left/Main Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {quickActions.map((action, idx) => (
                <button 
                  key={idx}
                  onClick={action.action}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all text-center"
                >
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                  <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Live Monitoring Widget */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg text-white">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Live System Monitoring
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-medium text-gray-300">Active Deliveries</span>
                  </div>
                  <span className="text-xl font-bold text-white">128</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-medium text-gray-300">Online Volunteers</span>
                  </div>
                  <span className="text-xl font-bold text-white">412</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-medium text-gray-300">Pending Requests</span>
                  </div>
                  <span className="text-xl font-bold text-white">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-gray-300">Pending Verifications</span>
                  </div>
                  <span className="text-xl font-bold text-amber-400 animate-pulse">24</span>
                </div>
              </div>
            </div>

            {/* Mini Analytics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Mini Analytics</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>Weekly Donations</span>
                    <span className="text-emerald-600">+12%</span>
                  </div>
                  <div className="h-10 flex items-end gap-1">
                    {[30, 45, 25, 60, 80, 50, 75].map((h, i) => (
                      <div key={i} className="flex-1 bg-amber-100 rounded-t-sm" style={{ height: `${h}%` }}>
                        <div className="w-full bg-amber-500 rounded-t-sm transition-all" style={{ height: `${h * 0.8}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>Daily Meals Rescued</span>
                    <span className="text-emerald-600">+8%</span>
                  </div>
                  <div className="h-10 flex items-end gap-1">
                    {[50, 30, 70, 45, 80, 90, 65].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-100 rounded-t-sm" style={{ height: `${h}%` }}>
                        <div className="w-full bg-emerald-500 rounded-t-sm transition-all" style={{ height: `${h * 0.8}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Monthly Growth</div>
                    <div className="text-lg font-bold text-blue-700">24.5%</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Active Users</div>
                    <div className="text-lg font-bold text-indigo-700">14.2k</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Recent Users Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Registrations</h2>
              <div className="flex gap-2">
                {['All', 'Hotel', 'NGO', 'Volunteer'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Entity Type</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="text-sm font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{user.type}</span>
                      </td>
                      <td className="p-4 text-xs font-medium text-gray-600">{user.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          user.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                          user.status === 'Suspended' ? 'bg-red-50 text-red-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-sm font-semibold text-gray-500">No users found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column / Sidebar */}
        <div className="flex flex-col gap-6">
          
          {/* Notifications Panel */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              Notifications
              {notifications.length > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{notifications.length}</span>
              )}
            </h2>
            
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map(note => (
                  <div key={note.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex gap-3 relative group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${note.bg} ${note.color}`}>
                      <note.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-xs font-bold text-gray-900 truncate">{note.title}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{note.message}</div>
                      <div className="text-[10px] font-medium text-gray-400 mt-1">{note.time}</div>
                    </div>
                    <button 
                      onClick={() => removeNotification(note.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-sm font-medium text-gray-500">
                  All caught up!
                </div>
              )}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex-1">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" /> Live Activity Feed
            </h2>
            
            <div className="relative border-l-2 border-gray-100 ml-3 pl-5 space-y-6">
              {liveActivity.map((activity, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center">
                    <activity.icon className={`w-3 h-3 ${activity.color}`} />
                  </span>
                  <div className="text-sm font-semibold text-gray-800 leading-snug">{activity.text}</div>
                  <div className="text-xs font-medium text-gray-400 mt-1">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
