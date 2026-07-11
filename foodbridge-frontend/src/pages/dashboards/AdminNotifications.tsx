import { useState } from 'react';
import { 
  Bell, FileWarning, ShieldCheck, UserPlus, X
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function AdminNotifications() {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'complaint', title: 'High Priority Escalation', message: 'CMP-8991 (Food Quality) has been marked high priority and awaits assignment.', time: 'Just now', unread: true, icon: FileWarning, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 2, type: 'registration', title: 'New Registration Request', message: 'The Royal Inn (Hotel) has submitted a registration request and is awaiting verification.', time: '10 min ago', unread: true, icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 3, type: 'complaint', title: 'Complaint Resolved', message: 'Admin David resolved CMP-8989 (No Show). Volunteer has been suspended.', time: '45 min ago', unread: true, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 4, type: 'reupload', title: 'Document Re-upload', message: 'Helping Hands Trust has re-uploaded their NGO Certificate as requested.', time: '1 hr ago', unread: false, icon: FileWarning, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 5, type: 'verification', title: 'Verification Completed', message: 'System auto-verified FSSAI license for Grand Regency Hotel.', time: '3 hrs ago', unread: false, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    toast('All notifications marked as read', 'success');
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Alerts</h1>
          <p className="text-sm text-gray-500 mt-1">System updates, registration requests, and verification status.</p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-bold text-gray-900">Recent Alerts</span>
          {unreadCount > 0 && (
            <span className="ml-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} New</span>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {notifications.map((note) => (
            <div 
              key={note.id} 
              className={`p-5 flex gap-4 transition-colors relative group ${note.unread ? 'bg-emerald-50/20' : 'hover:bg-gray-50/50'}`}
            >
              {note.unread && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
              )}
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${note.bg} ${note.color}`}>
                <note.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className={`text-sm font-bold ${note.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {note.title}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                    {note.time}
                  </div>
                </div>
                <div className={`text-sm leading-relaxed ${note.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                  {note.message}
                </div>
              </div>

              <button 
                onClick={() => removeNotification(note.id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-bold mb-1">All clear!</h3>
              <p className="text-gray-500 text-sm">You have no new alerts or notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
