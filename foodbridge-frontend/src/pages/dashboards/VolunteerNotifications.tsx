import { useState } from 'react';
import { Bell, Package, CheckCircle2, AlertTriangle, ShieldCheck, Settings, Check } from 'lucide-react';

export default function VolunteerNotifications() {
  const [filter, setFilter] = useState('All');
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'delivery', title: 'New Delivery Assigned — #DEL-8823', message: 'Pickup at Grand Regency Hotel within 15 minutes.', time: '10 mins ago', unread: true, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, type: 'otp', title: 'Pickup OTP Ready', message: 'Your pickup OTP is 4921. Share this with the hotel manager.', time: '20 mins ago', unread: true, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 3, type: 'delivery', title: 'Delivery Completed — #DEL-8801', message: 'Successfully delivered to Akshaya Patra. Great job!', time: '2 hours ago', unread: false, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 4, type: 'complaint', title: 'Complaint Update — #DEL-8790', message: 'The delay complaint has been reviewed and dismissed by admin.', time: '5 hours ago', unread: false, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 5, type: 'account', title: 'Account Verified', message: 'Your background check is complete and approved.', time: '1 day ago', unread: false, icon: Settings, color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 6, type: 'delivery', title: 'Missed Delivery', message: 'You missed the acceptance window for #DEL-8750.', time: '2 days ago', unread: false, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  ]);

  const filteredNotifications = notifications.filter(n => filter === 'All' || n.type === filter);
  
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            Notifications 
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated on your deliveries and account status.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'delivery', 'otp', 'complaint', 'account'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-gray-900 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'All' ? 'All Notifications' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((note) => (
              <div 
                key={note.id} 
                onClick={() => markAsRead(note.id)}
                className={`flex gap-4 p-5 cursor-pointer transition-colors ${
                  note.unread ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${note.bg} ${note.color}`}>
                  <note.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-[15px] truncate pr-4 ${note.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {note.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap shrink-0">{note.time}</span>
                  </div>
                  <p className={`text-sm mt-1 leading-snug ${note.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                    {note.message}
                  </p>
                </div>
                {note.unread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 self-center"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Bell className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No Notifications</h3>
            <p className="text-sm text-gray-500 max-w-sm mt-1">You're all caught up! Check back later for updates on your deliveries and account.</p>
          </div>
        )}
      </div>

    </div>
  );
}
