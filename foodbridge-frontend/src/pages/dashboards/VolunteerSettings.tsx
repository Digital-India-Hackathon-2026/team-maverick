import { useState } from 'react';
import { Bell, Clock, LogOut, ShieldAlert, Key } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function VolunteerSettings() {
  const { toast } = useToast();
  const [toggles, setToggles] = useState({
    pushNotifications: true,
    emailAlerts: false,
    smsAlerts: true,
    autoAccept: false,
    locationTracking: true,
    twoFactor: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    toast('Settings updated successfully.', 'success');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Password reset link sent to your email.', 'success');
  };

  const handleLogoutAll = () => {
    toast('Logged out from all other devices.', 'info');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto w-full">
      
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account security and preferences.</p>
      </div>

      {/* Password & Security */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Key className="w-5 h-5 text-gray-400" /> Password & Security
        </h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white" 
              />
            </div>
          </div>
          <div className="pt-2">
            <button 
              type="submit"
              className="py-2.5 px-6 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" /> Notifications
        </h2>
        <p className="text-sm text-gray-500 mb-5">Choose how you want to be notified.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">Push Notifications</div>
              <div className="text-xs text-gray-500">Delivery alerts on your device</div>
            </div>
            <button onClick={() => handleToggle('pushNotifications')} className={`relative w-12 h-6 rounded-full transition-colors ${toggles.pushNotifications ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles.pushNotifications ? 'left-7' : 'left-1'}`}></span>
            </button>
          </div>
          <div className="h-px w-full bg-gray-100"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">SMS Alerts</div>
              <div className="text-xs text-gray-500">OTP and critical updates</div>
            </div>
            <button onClick={() => handleToggle('smsAlerts')} className={`relative w-12 h-6 rounded-full transition-colors ${toggles.smsAlerts ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles.smsAlerts ? 'left-7' : 'left-1'}`}></span>
            </button>
          </div>
          <div className="h-px w-full bg-gray-100"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">Email Updates</div>
              <div className="text-xs text-gray-500">Weekly reports and news</div>
            </div>
            <button onClick={() => handleToggle('emailAlerts')} className={`relative w-12 h-6 rounded-full transition-colors ${toggles.emailAlerts ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles.emailAlerts ? 'left-7' : 'left-1'}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Availability & Tracking */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" /> Work Preferences
        </h2>
        <p className="text-sm text-gray-500 mb-5">Manage how you accept deliveries.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">Auto-Accept Deliveries</div>
              <div className="text-xs text-gray-500">Automatically accept nearby requests</div>
            </div>
            <button onClick={() => handleToggle('autoAccept')} className={`relative w-12 h-6 rounded-full transition-colors ${toggles.autoAccept ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles.autoAccept ? 'left-7' : 'left-1'}`}></span>
            </button>
          </div>
          <div className="h-px w-full bg-gray-100"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">Location Tracking</div>
              <div className="text-xs text-gray-500">Required for live assignments</div>
            </div>
            <button onClick={() => handleToggle('locationTracking')} className={`relative w-12 h-6 rounded-full transition-colors ${toggles.locationTracking ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles.locationTracking ? 'left-7' : 'left-1'}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-100 p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-red-900 mb-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" /> Danger Zone
        </h2>
        <p className="text-sm text-red-700/80 mb-4">Actions here can affect your account access.</p>
        
        <button 
          onClick={handleLogoutAll}
          className="flex items-center justify-center gap-2 py-2.5 px-6 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors w-fit"
        >
          <LogOut className="w-4 h-4" /> Logout of All Devices
        </button>
      </div>
    </div>
  );
}
