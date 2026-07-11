import { TrendingDown, Clock, AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';

export default function AdminSupportAnalytics() {
  
  const commonIssues = [
    { issue: 'Food Spoilage / Bad Quality', count: 42, trend: '+5%' },
    { issue: 'Delayed Pickup by Volunteer', count: 38, trend: '-2%' },
    { issue: 'No Show (Volunteer)', count: 24, trend: '+12%' },
    { issue: 'App Technical Glitch', count: 15, trend: '-10%' },
    { issue: 'Rude Behavior (NGO/Hotel)', count: 8, trend: '0%' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI: Avg Resolution Time */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> 14%
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">4.2 Hrs</div>
            <div className="text-sm font-semibold text-gray-500 mt-1">Avg Resolution Time</div>
          </div>
        </div>

        {/* KPI: Escalations */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-600 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 2%
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">12</div>
            <div className="text-sm font-semibold text-gray-500 mt-1">Escalated Cases (30d)</div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Trend Mock Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Complaint Volume (Last 6 Months)</h2>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold outline-none appearance-none">
              <option>All Categories</option>
              <option>Food Quality</option>
              <option>Logistics</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 35, 80, 55, 40].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end justify-center group-hover:bg-gray-200 transition-colors" style={{ height: '100%' }}>
                  <div className="w-full bg-amber-400 rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 2} Complaints
                  </div>
                </div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Common Issues */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" /> Top Issues (30 Days)
          </h2>
          
          <div className="space-y-5">
            {commonIssues.map((issue, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-gray-700">{issue.issue}</span>
                  <span className="text-gray-900">{issue.count}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${(issue.count / 50) * 100}%` }}></div>
                  </div>
                  <span className={`text-[10px] font-bold ${issue.trend.startsWith('-') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {issue.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
