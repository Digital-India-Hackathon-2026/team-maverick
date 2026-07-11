import { 
  Navigation, Users, Building2, PackageCheck, PackageOpen, CheckCircle2,
  Activity, Clock
} from 'lucide-react';

export default function AdminLiveMonitoring() {
  
  const liveStats = [
    { label: 'Live Deliveries', value: '42', icon: Navigation, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Online Volunteers', value: '156', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active NGOs', value: '89', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Pickups', value: '18', icon: PackageOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Drop-offs', value: '24', icon: PackageCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Completed (Last 1hr)', value: '112', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const activityFeed = [
    { id: 1, type: 'delivery_completed', message: 'Volunteer Rahul Sharma completed delivery DEL-8921 to Smile Foundation.', time: 'Just now', dot: 'bg-emerald-500' },
    { id: 2, type: 'donation_created', message: 'Grand Regency Hotel posted a new donation of 120 Cooked Meals.', time: '2 mins ago', dot: 'bg-blue-500' },
    { id: 3, type: 'volunteer_assigned', message: 'Volunteer Priya Patel accepted pickup for DEL-8922.', time: '5 mins ago', dot: 'bg-indigo-500' },
    { id: 4, type: 'complaint_raised', message: 'Complaint CMP-9002 raised by City Hospital Trust (Delayed Delivery).', time: '8 mins ago', dot: 'bg-red-500' },
    { id: 5, type: 'pickup_completed', message: 'Volunteer Amit Kumar picked up food from The Leela Palace.', time: '12 mins ago', dot: 'bg-amber-500' },
    { id: 6, type: 'user_registered', message: 'New NGO "Helping Hands" submitted registration for verification.', time: '15 mins ago', dot: 'bg-purple-500' },
    { id: 7, type: 'delivery_completed', message: 'Volunteer Ananya Singh completed delivery DEL-8919 to Hope Shelter.', time: '18 mins ago', dot: 'bg-emerald-500' },
    { id: 8, type: 'donation_created', message: 'City Inn posted a new donation of 40 Packaged Meals.', time: '22 mins ago', dot: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl">
      
      {/* Live Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-red-50 rounded-xl">
            <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="relative w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">System Live Monitoring</h2>
            <p className="text-xs font-semibold text-gray-500">Real-time telemetry and operational tracking</p>
          </div>
        </div>
        <div className="text-sm font-bold text-gray-500 flex items-center gap-2">
          <Clock className="w-4 h-4" /> System Time: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Counters */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {liveStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            </div>
          ))}

          {/* Active Deliveries Mini-Map Placeholder */}
          <div className="sm:col-span-2 md:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" /> Active Delivery Pulse
              </h2>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Status: Optimal</span>
            </div>
            
            <div className="h-40 bg-gray-50 border border-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              {/* Animated pulse nodes representing deliveries */}
              <div className="absolute top-1/4 left-1/4">
                <span className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-20"></span>
                <span className="relative block w-2 h-2 bg-emerald-500 rounded-full shadow-lg"></span>
              </div>
              <div className="absolute top-2/3 left-1/2">
                <span className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-20"></span>
                <span className="relative block w-2 h-2 bg-emerald-500 rounded-full shadow-lg"></span>
              </div>
              <div className="absolute top-1/3 right-1/4">
                <span className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></span>
                <span className="relative block w-2 h-2 bg-emerald-500 rounded-full shadow-lg"></span>
              </div>
              <div className="absolute bottom-1/4 right-1/3">
                <span className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }}></span>
                <span className="relative block w-2 h-2 bg-blue-500 rounded-full shadow-lg"></span>
              </div>

              <div className="relative z-10 text-gray-400 font-semibold text-sm">Real-time geospatial tracking active</div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center z-10">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              Live Activity Stream
            </h2>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="relative border-l-2 border-gray-100 ml-2 space-y-6">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="relative pl-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <span className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${activity.dot}`}></span>
                  <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    {activity.message}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
            <span className="text-xs font-bold text-emerald-600">Connection Secure • WebSocket Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
