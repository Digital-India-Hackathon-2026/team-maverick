import { useToast } from "../../contexts/ToastContext";
import { Link, useNavigate } from "react-router-dom";

export default function NGODashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const kpiCards = [
    { label: 'Meals Received Today', value: '142', trend: '▲ 9.2%', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="currentColor" strokeWidth="2"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Active Deliveries', value: '3', trend: '▲ 1', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-amber-600', bg: 'bg-amber-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Storage Utilization', value: '62%', trend: '▲ 4%', trendColor: 'text-amber-600', trendBg: 'bg-amber-600/10', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 11h18M9 7V4h6v3" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Total Beneficiaries Served', value: '18,420', trend: '▲ 6.4%', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-purple-600', bg: 'bg-purple-50', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
  ];

  const liveDeliveries = [
    { id: '#DEL-8823', foodName: 'Vegetable Biryani', hotelName: 'Grand Regency Hotel', volunteerInitial: 'RS', volunteerName: 'Rahul Sharma', vehicleType: 'Bike', eta: '12 min', status: 'Picked Up', progress: 0.65, statusBg: 'bg-purple-100', statusColor: 'text-purple-700' },
    { id: '#DEL-8825', foodName: 'Rice & Curry Combo', hotelName: 'Palm Suites', volunteerInitial: 'AV', volunteerName: 'Amit Verma', vehicleType: 'Auto', eta: '20 min', status: 'En Route to Pickup', progress: 0.3, statusBg: 'bg-blue-100', statusColor: 'text-blue-700' },
    { id: '#DEL-8819', foodName: 'Bakery Assortment', hotelName: 'The Metropole', volunteerInitial: 'PN', volunteerName: 'Priya Nair', vehicleType: 'Bicycle', eta: '4 min', status: 'Arriving', progress: 0.9, statusBg: 'bg-emerald-100', statusColor: 'text-emerald-700' },
  ];

  const quickActions = [
    { label: 'Incoming Requests', href: '/ngo/requests', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
    { label: 'Live Deliveries', href: '/ngo/live', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Storage Management', href: '/ngo/storage', color: 'text-amber-600', bg: 'bg-amber-100', icon: <><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 11h18M9 7V4h6v3" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Delivery History', href: '/ngo/history', color: 'text-purple-600', bg: 'bg-purple-50', icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="12" width="3" height="6" stroke="currentColor" strokeWidth="2"/><rect x="12" y="8" width="3" height="10" stroke="currentColor" strokeWidth="2"/><rect x="17" y="5" width="3" height="13" stroke="currentColor" strokeWidth="2"/></> },
  ];

  const storageCategories = [
    { label: 'Refrigerated Storage', pct: 74, color: 'bg-blue-600' },
    { label: 'Dry Storage', pct: 55, color: 'bg-emerald-600' },
    { label: 'Frozen Storage', pct: 38, color: 'bg-purple-600' },
  ];

  const notifications = [
    { title: 'Volunteer Assigned to Delivery #DEL-8825', time: '4 minutes ago', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></> },
    { title: 'Delivery Started — #DEL-8823', time: '18 minutes ago', color: 'text-purple-600', bg: 'bg-purple-50', icon: <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { title: 'Delivery Delayed — #DEL-8819', time: '35 minutes ago', color: 'text-amber-600', bg: 'bg-amber-100', icon: <><circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2"/><path d="M12 9v4l2.5 1.5M9 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
    { title: 'Food Delivered — #DEL-8801', time: '1 hour ago', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { title: 'Complaint Update — #DEL-8790', time: '3 hours ago', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
  ];

  return (
    <>
      <style>
        {`
          @keyframes fb-ngo-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-ngo-progress-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes fb-ngo-pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
          @keyframes fb-ngo-ring { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 66px; } }
          @keyframes fb-ngo-route-dash { to { stroke-dashoffset: -20; } }
        `}
      </style>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            style={{ animation: `fb-ngo-fade-up 450ms ease ${i * 70}ms both` }}
            onClick={() => navigate('/ngo/analytics')}
          >
            <div className="flex items-start justify-between">
              <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{kpi.icon}</svg>
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trendColor} ${kpi.trendBg}`}>{kpi.trend}</span>
            </div>
            <div className="mt-4 text-[27px] font-extrabold tracking-tight text-gray-900">{kpi.value}</div>
            <div className="mt-1 text-[13px] font-medium text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6 min-w-0">

          {/* Live Delivery Tracker */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[15.5px] font-bold text-gray-900">Live Deliveries</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-[fb-ngo-pulse-dot_1.6s_ease-in-out_infinite]"></span>
                {liveDeliveries.length} in transit
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {liveDeliveries.map((d, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white text-[15px] font-bold shrink-0">{d.volunteerInitial}</div>
                      <div className="min-w-0">
                        <div className="text-[14.5px] font-bold text-gray-900 truncate">{d.foodName}</div>
                        <div className="mt-0.5 text-xs text-gray-500 truncate">{d.hotelName} · {d.id}</div>
                      </div>
                    </div>
                    <span className={`self-start sm:self-auto text-[11.5px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${d.statusBg} ${d.statusColor}`}>{d.status}</span>
                  </div>

                  <div className="flex items-center gap-5 mt-4 flex-wrap">
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase">Volunteer</div>
                      <div className="text-[12.5px] font-semibold text-gray-900 mt-0.5">{d.volunteerName}</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase">Vehicle</div>
                      <div className="text-[12.5px] font-semibold text-gray-900 mt-0.5">{d.vehicleType}</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase">ETA</div>
                      <div className="text-[12.5px] font-semibold text-gray-900 mt-0.5">{d.eta}</div>
                    </div>
                  </div>

                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mt-4">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full origin-left animate-[fb-ngo-progress-grow_800ms_ease_both]" 
                      style={{ width: `${d.progress * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => navigate('/ngo/live')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[12.5px] font-semibold transition-all hover:bg-emerald-600 hover:-translate-y-0.5"
                    >
                      Track Live Delivery
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Map Placeholder */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast('Opening full map view...', 'info')}>
            <div className="text-[15.5px] font-bold text-gray-900 mb-4">Live Map</div>
            <div className="relative h-[220px] rounded-[14px] bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="none" className="absolute inset-0">
                <path d="M40 130 Q 120 40 260 50" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="7 7" className="animate-[fb-ngo-route-dash_1.4s_linear_infinite]" />
              </svg>
              
              <div className="absolute left-[12%] bottom-[14%] flex flex-col items-center gap-1">
                <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-amber-600 text-white shadow-md">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/></svg>
                </span>
                <span className="text-[10px] font-bold text-blue-900 bg-white/85 px-2 py-0.5 rounded-full">Volunteer</span>
              </div>
              
              <div className="absolute right-[10%] top-[22%] flex flex-col items-center gap-1">
                <span className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-emerald-600 text-white shadow-md">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-.9a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
                </span>
                <span className="text-[10px] font-bold text-emerald-900 bg-white/85 px-2 py-0.5 rounded-full">Helping Hands NGO</span>
              </div>

              <span className="absolute bottom-3 right-3 text-[11px] font-bold text-blue-800 bg-white/85 px-2.5 py-1 rounded-full">ETA 12 min</span>
              <span className="absolute top-3 left-3 text-[10.5px] font-semibold text-gray-500 bg-white/70 px-2.5 py-1 rounded-full">Live Map Placeholder</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((qa, i) => (
              <Link 
                key={i}
                to={qa.href}
                className="flex flex-col items-start p-5 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
              >
                <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${qa.bg} ${qa.color}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{qa.icon}</svg>
                </span>
                <span className="text-[13.5px] font-bold text-gray-900">{qa.label}</span>
              </Link>
            ))}
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 min-w-0">
          
          {/* Storage Overview */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/ngo/storage')}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[15.5px] font-bold text-gray-900">Storage Overview</span>
              <span className="text-[12.5px] font-bold text-emerald-600">62% Used</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">248 kg of 400 kg capacity</div>
            
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="w-[62%] h-full bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full origin-left animate-[fb-ngo-progress-grow_900ms_ease_both]" 
              />
            </div>

            <div className="flex flex-col gap-3.5 mt-5">
              {storageCategories.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="font-semibold text-gray-700">{cat.label}</span>
                    <span className="font-bold text-gray-900">{cat.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full origin-left ${cat.color}`}
                      style={{ width: `${cat.pct}%`, animation: `fb-ngo-progress-grow 700ms ease ${i * 80}ms both` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-4">Notifications</div>
            <div className="flex flex-col gap-1">
              {notifications.map((note, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 cursor-pointer group" onClick={() => navigate('/ngo/notifications')}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${note.bg} ${note.color} transition-transform group-hover:scale-105`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">{note.icon}</svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{note.title}</div>
                    <div className="mt-0.5 text-xs text-gray-400">{note.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Analytics */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center cursor-pointer transition-transform hover:-translate-y-1" onClick={() => navigate('/ngo/analytics')}>
            <div className="text-[15.5px] font-bold text-gray-900 mb-1 text-left">Today's Meals</div>
            <div className="text-xs text-gray-400 mb-5 text-left">Received across all deliveries</div>
            
            <div className="relative inline-flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 80 80" className="-rotate-90">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                <circle 
                  cx="40" cy="40" r="35" fill="none" stroke="#059669" strokeWidth="7" 
                  strokeLinecap="round" strokeDasharray="220" 
                  className="animate-[fb-ngo-ring_1.2s_ease_forwards]"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[22px] font-extrabold text-gray-900">142</span>
                <span className="text-[10.5px] font-bold text-gray-400">meals</span>
              </div>
            </div>

            <div className="flex justify-around mt-5 text-center">
              <div>
                <div className="text-[15px] font-bold text-gray-900">+18%</div>
                <div className="text-[11px] font-medium text-gray-400">Weekly Trend</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900">2,940</div>
                <div className="text-[11px] font-medium text-gray-400">Monthly Impact</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-emerald-600">Good</div>
                <div className="text-[11px] font-medium text-gray-400">Storage Health</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
