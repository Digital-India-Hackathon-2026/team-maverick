import { Link, useNavigate } from "react-router-dom";

export default function HotelDashboard() {

  const navigate = useNavigate();

  const kpiCards = [
    { label: 'Total Donations', value: '1,248', trend: '▲ 12.4%', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-blue-600', bg: 'bg-blue-50', icon: <path d="M3 11h18M9 7V4h6v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { label: 'Active Deliveries', value: '9', trend: '▲ 3', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-amber-600', bg: 'bg-amber-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Meals Rescued', value: '3,240', trend: '▲ 8.1%', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="currentColor" strokeWidth="2"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="2"/><line x1="6" y1="1" x2="6" y2="4" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="1" x2="14" y2="4" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'CSR Impact Score', value: '81 / 100', trend: '▲ 5 pts', trendColor: 'text-emerald-600', trendBg: 'bg-emerald-600/10', color: 'text-purple-600', bg: 'bg-purple-50', icon: <path d="M12 2l2.5 6.9L21 10l-5.5 4.6L17 22l-5-3.6L7 22l1.5-7.4L3 10l6.5-1.1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  ];

  const donations = [
    { id: '#DN-2291', foodType: 'Veg Buffet', quantity: '18 kg', ngo: 'Helping Hands', volunteer: 'Rahul Sharma', status: 'Picked Up', expiry: '1h 40m', statusBg: 'bg-purple-100', statusColor: 'text-purple-700' },
    { id: '#DN-2290', foodType: 'Bakery Items', quantity: '6 kg', ngo: 'Annapurna Trust', volunteer: 'Priya Nair', status: 'Delivered', expiry: '—', statusBg: 'bg-emerald-50', statusColor: 'text-emerald-600' },
    { id: '#DN-2289', foodType: 'Rice & Curry', quantity: '25 kg', ngo: 'Seva Kitchen', volunteer: 'Amit Verma', status: 'Assigned', expiry: '2h 10m', statusBg: 'bg-blue-50', statusColor: 'text-blue-600' },
    { id: '#DN-2288', foodType: 'Packaged Snacks', quantity: '10 kg', ngo: '—', volunteer: '—', status: 'Pending', expiry: '3h 05m', statusBg: 'bg-amber-100', statusColor: 'text-amber-700' },
    { id: '#DN-2287', foodType: 'Continental', quantity: '14 kg', ngo: 'Hope Foundation', volunteer: 'Sana Sheikh', status: 'Expired', expiry: '0m', statusBg: 'bg-red-50', statusColor: 'text-red-600' },
  ];

  const quickActions = [
    { label: 'Donate Food', href: '/hotel/donate', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
    { label: 'Active Deliveries', href: '/hotel/active', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Donation History', href: '/hotel/history', color: 'text-amber-600', bg: 'bg-amber-100', icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="12" width="3" height="6" stroke="currentColor" strokeWidth="2"/><rect x="12" y="8" width="3" height="10" stroke="currentColor" strokeWidth="2"/><rect x="17" y="5" width="3" height="13" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Download CSR Report', action: () => navigate('/hotel/account#reports'), color: 'text-purple-600', bg: 'bg-purple-50', icon: <><path d="M12 3v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
  ];

  const notifications = [
    { title: 'Volunteer Assigned', description: 'Rahul Sharma was assigned to Donation #DN-2289', time: '5 minutes ago', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
    { title: 'Donation Picked Up', description: 'Donation #DN-2291 has been picked up', time: '22 minutes ago', color: 'text-purple-600', bg: 'bg-purple-50', icon: <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { title: 'Donation Delivered', description: 'Donation #DN-2290 was delivered to Annapurna Trust', time: '1 hour ago', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { title: 'Complaint Raised', description: 'A complaint was raised on Donation #DN-2276', time: '3 hours ago', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
  ];

  const weeklyDefs = [
    { label: 'Mon', value: 0.5 }, { label: 'Tue', value: 0.7 }, { label: 'Wed', value: 0.4 },
    { label: 'Thu', value: 0.85 }, { label: 'Fri', value: 0.65 }, { label: 'Sat', value: 1 }, { label: 'Sun', value: 0.6 },
  ];

  return (
    <>
      <style>
        {`
          @keyframes fb-dash-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-dash-bar-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          @keyframes fb-dash-ring { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 42px; } }
          @keyframes fb-dash-pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        `}
      </style>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            style={{ animation: `fb-dash-fade-up 450ms ease ${i * 70}ms both` }}
            onClick={() => navigate(i === 0 ? '/hotel/history' : i === 1 ? '/hotel/active' : '/hotel/analytics')}
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
          
          {/* Active Delivery */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[15.5px] font-bold text-gray-900">Active Delivery</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-[fb-dash-pulse-dot_1.6s_ease-in-out_infinite]"></span>
                Live
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center justify-center w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white text-[17px] font-bold shrink-0">RS</div>
              <div className="flex-1 min-w-[160px]">
                <div className="text-[15px] font-bold text-gray-900">Rahul Sharma</div>
                <div className="flex items-center gap-1.5 mt-1 text-[12.5px] text-gray-500">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></svg>
                  Bike · #DEL-8823
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11.5px] font-semibold text-gray-400 uppercase tracking-wide">ETA</div>
                <div className="text-base font-bold text-gray-900">12 min</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Picked Up — En Route to NGO
              </span>
              <button 
                onClick={() => navigate('/hotel/active')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[12.5px] font-semibold transition-all hover:bg-emerald-600 hover:-translate-y-0.5"
              >
                Track Delivery
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>

          {/* Recent Donations Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <span className="text-[15.5px] font-bold text-gray-900">Recent Donations</span>
              <Link to="/hotel/history" className="text-[12.5px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">View All</Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[720px]">
                <thead>
                  <tr>
                    {['Donation ID', 'Food Type', 'Quantity', 'Assigned NGO', 'Assigned Volunteer', 'Status', 'Expiry Time', 'Action'].map(col => (
                      <th key={col} className="text-left py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wide border-y border-gray-100 bg-gray-50 whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {donations.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 text-[12.5px] font-semibold text-gray-900 border-b border-gray-100 whitespace-nowrap">{row.id}</td>
                      <td className="py-3.5 px-4 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.foodType}</td>
                      <td className="py-3.5 px-4 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.quantity}</td>
                      <td className="py-3.5 px-4 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.ngo}</td>
                      <td className="py-3.5 px-4 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.volunteer}</td>
                      <td className="py-3.5 px-4 border-b border-gray-100 whitespace-nowrap">
                        <span className={`text-[11.5px] font-bold px-3 py-1.5 rounded-full ${row.statusBg} ${row.statusColor}`}>{row.status}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.expiry}</td>
                      <td className="py-3.5 px-4 border-b border-gray-100 whitespace-nowrap">
                        <button 
                          onClick={() => navigate('/hotel/history')}
                          className="text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((qa, i) => (
              qa.action ? (
                <button 
                  key={i}
                  onClick={qa.action}
                  className="flex flex-col items-start p-5 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-100 text-left"
                >
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${qa.bg} ${qa.color}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{qa.icon}</svg>
                  </span>
                  <span className="text-[13.5px] font-bold text-gray-900">{qa.label}</span>
                </button>
              ) : (
                <Link 
                  key={i}
                  to={qa.href!}
                  className="flex flex-col items-start p-5 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-100"
                >
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${qa.bg} ${qa.color}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{qa.icon}</svg>
                  </span>
                  <span className="text-[13.5px] font-bold text-gray-900">{qa.label}</span>
                </Link>
              )
            ))}
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 min-w-0">
          
          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-4">Notifications</div>
            <div className="flex flex-col gap-1">
              {notifications.map((note, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 cursor-pointer group" onClick={() => navigate('/hotel/account#notifications')}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${note.bg} ${note.color} transition-transform group-hover:scale-105`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">{note.icon}</svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{note.title}</div>
                    <div className="mt-0.5 text-xs text-gray-500">{note.description}</div>
                    <div className="mt-0.5 text-[11px] text-gray-400">{note.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Donations */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-1">Weekly Donations</div>
            <div className="text-xs text-gray-400 mb-6">Meals rescued per day</div>
            
            <div className="flex items-end justify-between gap-2 h-[120px]">
              {weeklyDefs.map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full group cursor-pointer" onClick={() => navigate('/hotel/analytics')}>
                  <div className="w-full max-w-[22px] h-full flex items-end bg-gray-100 rounded-md overflow-hidden relative">
                    <div 
                      className="w-full rounded-md origin-bottom group-hover:opacity-80 transition-opacity"
                      style={{ 
                        height: `${bar.value * 100}%`,
                        background: bar.value === 1 ? 'linear-gradient(180deg, #059669, #047857)' : 'linear-gradient(180deg, #6EE7B7, #A7F3D0)',
                        animation: `fb-dash-bar-grow 700ms ease ${i * 60}ms both`
                      }}
                    />
                  </div>
                  <span className="text-[10.5px] font-semibold text-gray-400">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CSR Score */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center cursor-pointer transition-transform hover:-translate-y-1" onClick={() => navigate('/hotel/analytics')}>
            <div className="text-[15.5px] font-bold text-gray-900 mb-1 text-left">Monthly Impact</div>
            <div className="text-xs text-gray-400 mb-5 text-left">CSR Score this month</div>
            
            <div className="relative inline-flex items-center justify-center">
              <svg width="128" height="128" viewBox="0 0 80 80" className="-rotate-90">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                <circle 
                  cx="40" cy="40" r="35" fill="none" stroke="#059669" strokeWidth="7" 
                  strokeLinecap="round" strokeDasharray="220" 
                  className="animate-[fb-dash-ring_1.2s_ease_forwards]"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-extrabold text-gray-900">81</span>
                <span className="text-[11px] font-semibold text-gray-400">/ 100</span>
              </div>
            </div>

            <div className="flex justify-around mt-5 text-center">
              <div>
                <div className="text-[15px] font-bold text-gray-900">3,240</div>
                <div className="text-[11px] font-medium text-gray-400">Meals</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900">4.6t</div>
                <div className="text-[11px] font-medium text-gray-400">CO₂ Saved</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900">18</div>
                <div className="text-[11px] font-medium text-gray-400">NGOs</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
