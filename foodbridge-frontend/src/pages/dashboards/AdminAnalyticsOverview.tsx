import { 
  Utensils, Package, Heart, Building2, Users, Navigation, 
  TrendingUp, Activity, ArrowUpRight, PieChart, BarChart2 
} from 'lucide-react';

export default function AdminAnalyticsOverview() {

  const kpis = [
    { label: 'Meals Rescued', value: '142,850', trend: '+12%', icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Donations', value: '8,432', trend: '+8%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Waste Prevented (kg)', value: '56,400', trend: '+15%', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Platform Growth', value: '24%', trend: '+4%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Hotels Registered', value: '312', trend: '+2', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'NGOs Registered', value: '184', trend: '+5', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Volunteers', value: '1,205', trend: '+45', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Active Deliveries', value: '42', trend: 'Live', icon: Navigation, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl">
      
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                kpi.trend === 'Live' ? 'bg-orange-100 text-orange-700 animate-pulse' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {kpi.trend !== 'Live' && <ArrowUpRight className="w-3 h-3" />} {kpi.trend}
              </span>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Donation Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" /> Daily Donations (Last 7 Days)
            </h2>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold outline-none appearance-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[45, 60, 55, 80, 95, 70, 85].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group h-full">
                <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end justify-center group-hover:bg-gray-200 transition-colors h-full">
                  <div className="w-full bg-emerald-500 rounded-t-lg transition-all relative overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="absolute -top-8 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    {h * 12} Meals
                  </div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food Categories */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-500" /> Food Categories
          </h2>
          
          <div className="flex-1 flex flex-col justify-center gap-5">
            {[
              { label: 'Cooked Meals', percent: 65, color: 'bg-emerald-500' },
              { label: 'Packaged Goods', percent: 20, color: 'bg-blue-500' },
              { label: 'Raw Ingredients', percent: 10, color: 'bg-amber-500' },
              { label: 'Baked Items', percent: 5, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-gray-900">{item.percent}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Entity Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">User Distribution</h2>
          
          <div className="relative h-48 w-full flex items-center justify-center">
            {/* CSS mock donut chart */}
            <div className="w-40 h-40 rounded-full border-[12px] border-emerald-500 relative">
              <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-blue-500 border-r-blue-500 rotate-45"></div>
              <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-amber-500 rotate-[135deg]"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-1">
                <span className="text-xl font-extrabold text-gray-900">1.7k</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Total Users</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto mb-1"></div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">Volunteers</div>
              <div className="text-xs font-bold text-gray-900">1,205</div>
            </div>
            <div>
              <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">Hotels</div>
              <div className="text-xs font-bold text-gray-900">312</div>
            </div>
            <div>
              <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-1"></div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">NGOs</div>
              <div className="text-xs font-bold text-gray-900">184</div>
            </div>
          </div>
        </div>

        {/* Operational Metrics */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-500" /> Operational Metrics (Last 30 Days)
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700 text-sm">Delivery Success Rate</span>
                  <span className="text-emerald-600 text-sm">98.2%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `98.2%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium">Target: 95.0%</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700 text-sm">Pickup Time Compliance</span>
                  <span className="text-blue-600 text-sm">84.5%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `84.5%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium">Target: 90.0% (Action Required)</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700 text-sm">Volunteer Acceptance Rate</span>
                  <span className="text-amber-600 text-sm">76.3%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `76.3%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium">Of total notifications sent</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700 text-sm">Complaint Resolution SLA</span>
                  <span className="text-purple-600 text-sm">92.1%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `92.1%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium">Resolved within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
