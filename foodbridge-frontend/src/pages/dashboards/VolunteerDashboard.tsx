import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { Link, useNavigate } from "react-router-dom";

export default function VolunteerDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [lastStatusUpdate, setLastStatusUpdate] = useState('9:14 AM');

  const toggleAvailability = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setIsActive(!isActive);
    setLastStatusUpdate(time);
    toast(isActive ? 'You are now offline.' : 'You are now online and available for deliveries.', isActive ? 'info' : 'success');
  };

  const kpiCards = [
    { label: "Today's Deliveries", value: '4', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Completed Deliveries', value: '312', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { label: 'Meals Delivered', value: '9,840', color: 'text-amber-600', bg: 'bg-amber-100', icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="currentColor" strokeWidth="2"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Avg Delivery Time', value: '27 min', color: 'text-purple-600', bg: 'bg-purple-50', icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
    { label: 'Volunteer Rating', value: '4.8 ★', color: 'text-red-600', bg: 'bg-red-50', icon: <path d="M12 2l2.5 6.9L21 10l-5.5 4.6L17 22l-5-3.6L7 22l1.5-7.4L3 10l6.5-1.1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  ];

  const assignment = {
    deliveryId: '#DEL-8823', hotelName: 'Grand Regency Hotel', hotelInitial: 'GR', ngoName: 'Helping Hands', 
    pickupTime: '3:40 PM', deliveryTime: '4:15 PM', status: 'Picked Up',
    statusBg: 'bg-purple-100', statusColor: 'text-purple-700'
  };

  const quickActions = [
    { label: 'View Active Delivery', href: '/volunteer/active', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Delivery History', href: '/volunteer/history', color: 'text-purple-600', bg: 'bg-purple-50', icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="12" width="3" height="6" stroke="currentColor" strokeWidth="2"/><rect x="12" y="8" width="3" height="10" stroke="currentColor" strokeWidth="2"/><rect x="17" y="5" width="3" height="13" stroke="currentColor" strokeWidth="2"/></> },
    { label: 'Update Availability', action: toggleAvailability, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
    { label: 'Contact Support', action: () => toast('Opening support chat...', 'info'), color: 'text-amber-600', bg: 'bg-amber-100', icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
  ];

  const notifications = [
    { title: 'New Delivery Assigned — #DEL-8823', time: '10 minutes ago', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2"/></> },
    { title: 'Pickup OTP Ready', time: '9 minutes ago', color: 'text-purple-600', bg: 'bg-purple-50', icon: <><rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2"/></> },
    { title: 'Delivery OTP Ready', time: 'Just now', color: 'text-amber-600', bg: 'bg-amber-100', icon: <><rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2"/></> },
    { title: 'Delivery Completed — #DEL-8801', time: '2 hours ago', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { title: 'Complaint Update — #DEL-8790', time: '5 hours ago', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
  ];

  return (
    <>
      <style>
        {`
          @keyframes fb-vd-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-vd-pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
          @keyframes fb-vd-ring { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 55px; } }
        `}
      </style>

      {/* Availability Card */}
      <div 
        className={`relative p-6 lg:px-[30px] lg:py-7 rounded-[18px] mb-6 transition-all duration-400 shadow-lg
          ${isActive ? 'bg-gradient-to-br from-emerald-600 to-blue-600 shadow-emerald-600/20' : 'bg-gradient-to-br from-gray-500 to-gray-600 shadow-gray-500/20'}`}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-white/75">Availability Status</div>
            <div className="flex items-center gap-2.5 mt-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-white shrink-0 ${isActive ? 'animate-[fb-vd-pulse-dot_1.6s_ease-in-out_infinite]' : ''}`}></span>
              <span className="text-[26px] font-extrabold text-white tracking-tight">{isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="mt-2.5 text-[13px] leading-[1.55] text-white/85 max-w-[340px]">
              When Active, you become eligible for new delivery assignments.
            </p>
          </div>

          <button 
            type="button" 
            onClick={toggleAvailability}
            className="relative w-16 h-9 rounded-full bg-white/20 transition-colors shrink-0"
            aria-label="Toggle availability"
          >
            <span 
              className="absolute top-[3px] w-[30px] h-[30px] rounded-full bg-white shadow-md transition-all duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ left: isActive ? '31px' : '3px' }}
            ></span>
          </button>
        </div>

        <div className="flex gap-6 mt-6 flex-wrap">
          <div>
            <div className="text-[11px] font-semibold text-white/65 uppercase">Last Update</div>
            <div className="text-sm font-bold text-white mt-1">{lastStatusUpdate}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white/65 uppercase">Completed Today</div>
            <div className="text-sm font-bold text-white mt-1">4 deliveries</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-200 rounded-2xl p-[18px] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            style={{ animation: `fb-vd-fade-up 450ms ease ${i * 60}ms both` }}
            onClick={() => navigate('/volunteer/history')}
          >
            <span className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-xl ${kpi.bg} ${kpi.color}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{kpi.icon}</svg>
            </span>
            <div className="mt-4 text-[22px] font-extrabold tracking-tight text-gray-900">{kpi.value}</div>
            <div className="mt-1 text-xs font-medium text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-5 min-w-0">

          {/* Current Assignment */}
          {isActive ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm transition-all hover:border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15.5px] font-bold text-gray-900">Current Assignment</span>
                <span className={`text-[11.5px] font-bold px-[11px] py-[5px] rounded-full whitespace-nowrap ${assignment.statusBg} ${assignment.statusColor}`}>
                  {assignment.status}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[15px] font-bold shrink-0">
                  {assignment.hotelInitial}
                </div>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-bold text-gray-900">{assignment.hotelName}</div>
                  <div className="mt-0.5 text-xs text-gray-500">{assignment.deliveryId} · to {assignment.ngoName}</div>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-4.5 flex-wrap">
                <div>
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase">Est. Pickup</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-0.5">{assignment.pickupTime}</div>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase">Est. Delivery</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-0.5">{assignment.deliveryTime}</div>
                </div>
              </div>

              <div className="flex justify-end mt-4.5">
                <button 
                  onClick={() => navigate('/volunteer/active')}
                  className="inline-flex items-center gap-[7px] px-5 py-[11px] rounded-xl bg-gray-900 text-white text-[13px] font-semibold transition-all hover:bg-emerald-600 hover:-translate-y-0.5"
                >
                  Open Delivery
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-5 bg-white border border-dashed border-gray-200 rounded-2xl text-center">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></svg>
              <div className="mt-4 text-[15px] font-bold text-gray-900">No Current Assignment</div>
              <div className="mt-1 text-[13px] text-gray-400 max-w-[280px]">You're currently offline. Toggle availability to start accepting new deliveries.</div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {quickActions.map((qa, i) => (
              qa.action ? (
                <button 
                  key={i}
                  onClick={qa.action}
                  className="flex flex-col items-start p-[18px] bg-white border border-gray-200 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-100 text-left"
                >
                  <span className={`inline-flex items-center justify-center w-[42px] h-[42px] rounded-xl mb-3 ${qa.bg} ${qa.color}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{qa.icon}</svg>
                  </span>
                  <span className="text-[13.5px] font-bold text-gray-900">{qa.label}</span>
                </button>
              ) : (
                <Link 
                  key={i}
                  to={qa.href!}
                  className="flex flex-col items-start p-[18px] bg-white border border-gray-200 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
                >
                  <span className={`inline-flex items-center justify-center w-[42px] h-[42px] rounded-xl mb-3 ${qa.bg} ${qa.color}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{qa.icon}</svg>
                  </span>
                  <span className="text-[13.5px] font-bold text-gray-900">{qa.label}</span>
                </Link>
              )
            ))}
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5 min-w-0">
          
          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-4">Notifications</div>
            <div className="flex flex-col gap-1">
              {notifications.map((note, i) => (
                <div key={i} className="flex items-start gap-3 py-[11px] border-b border-gray-50 last:border-0 cursor-pointer group" onClick={() => navigate('/volunteer/notifications')}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-[10px] shrink-0 ${note.bg} ${note.color} transition-transform group-hover:scale-105`}>
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

          {/* Mini Stats */}
          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm text-center">
            <div className="text-[15.5px] font-bold text-gray-900 mb-1 text-left">This Week</div>
            <div className="text-xs text-gray-400 mb-4 text-left">Your delivery performance</div>
            
            <div className="relative inline-flex items-center justify-center">
              <svg width="118" height="118" viewBox="0 0 80 80" className="-rotate-90">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                <circle 
                  cx="40" cy="40" r="35" fill="none" stroke="#059669" strokeWidth="7" 
                  strokeLinecap="round" strokeDasharray="220" 
                  className="animate-[fb-vd-ring_1.2s_ease_forwards]"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[22px] font-extrabold text-gray-900">4.8</span>
                <span className="text-[10.5px] font-semibold text-gray-400">rating</span>
              </div>
            </div>

            <div className="flex justify-around mt-4.5 text-center">
              <div>
                <div className="text-[15px] font-bold text-gray-900">18</div>
                <div className="text-[11px] font-medium text-gray-400">Weekly Deliveries</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900">612</div>
                <div className="text-[11px] font-medium text-gray-400">Monthly Meals</div>
              </div>
              <div>
                <div className="text-[15px] font-bold text-emerald-600">9 days</div>
                <div className="text-[11px] font-medium text-gray-400">Streak</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
