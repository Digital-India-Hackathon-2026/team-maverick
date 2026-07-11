import { TrendingUp, Clock, Heart, Star, Target, Zap, Activity } from 'lucide-react';

export default function VolunteerPerformance() {
  const kpiCards = [
    { label: 'Total Deliveries', value: '312', trend: '+12% this month', color: 'text-blue-600', bg: 'bg-blue-50', icon: Target },
    { label: 'Meals Delivered', value: '9,840', trend: '+8% this month', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Heart },
    { label: 'Avg Delivery Time', value: '27 min', trend: '-2 min faster', color: 'text-purple-600', bg: 'bg-purple-50', icon: Clock },
    { label: 'Volunteer Rating', value: '4.8 ★', trend: 'Top 5% volunteer', color: 'text-amber-600', bg: 'bg-amber-100', icon: Star },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Performance Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Track your impact and delivery statistics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" /> {kpi.trend}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
            <div className="text-sm font-medium text-gray-500 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" /> Deliveries Overview
            </h2>
            <select className="py-1.5 px-3 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-gray-50 outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* SVG Bar Chart Mockup */}
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[45, 60, 35, 80, 55, 90, 70].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="w-full flex justify-center">
                  <div 
                    className="w-full max-w-[40px] bg-emerald-100 rounded-t-lg group-hover:bg-emerald-200 transition-colors relative"
                    style={{ height: `${height}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg group-hover:bg-emerald-600 transition-colors"
                      style={{ height: `${height * 0.7}%` }}
                    ></div>
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
                      {height * 2} Deliveries
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 mt-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Impact & Streak */}
        <div className="flex flex-col gap-6">
          
          {/* Impact Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Heart className="w-32 h-32" />
            </div>
            <h2 className="text-lg font-bold mb-1 relative z-10">Community Impact</h2>
            <p className="text-sm text-gray-300 mb-6 relative z-10">Your contribution to fighting hunger.</p>
            
            <div className="space-y-4 relative z-10">
              <div>
                <div className="text-3xl font-extrabold text-emerald-400">9,840</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-1">Total Meals Saved</div>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div>
                <div className="text-2xl font-bold">1,250 kg</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-1">CO2 Emissions Prevented</div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Active Streak
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-extrabold text-gray-900">9 <span className="text-lg text-gray-400 font-bold">Days</span></div>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex gap-1 justify-between mt-6">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i < 5 ? 'bg-emerald-500 text-white shadow-sm' : 
                    i === 5 ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-center text-gray-500 mt-4">Deliver tomorrow to reach a 10-day streak!</p>
          </div>

        </div>
      </div>

    </div>
  );
}
