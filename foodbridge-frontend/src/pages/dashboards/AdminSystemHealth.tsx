import { 
  Server, Database, Cloud, Users, Activity, CheckCircle2, AlertTriangle, RefreshCw
} from 'lucide-react';

export default function AdminSystemHealth() {
  
  const systemMetrics = [
    { label: 'API Gateway', status: 'Operational', icon: Cloud, color: 'text-emerald-600', ping: '24ms' },
    { label: 'Primary Database', status: 'Operational', icon: Database, color: 'text-emerald-600', ping: '12ms' },
    { label: 'Redis Cache', status: 'Degraded', icon: Activity, color: 'text-amber-600', ping: '145ms' },
    { label: 'Worker Nodes', status: 'Operational', icon: Server, color: 'text-emerald-600', ping: '18ms' },
    { label: 'Auth Service', status: 'Operational', icon: Users, color: 'text-emerald-600', ping: '45ms' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl">
      
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" /> System Health & Infrastructure
          </h2>
          <p className="text-sm text-gray-500">Monitor core services and platform uptime.</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="text-gray-500 font-semibold">Overall Status:</div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            All Systems Nominal
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Service Status</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {systemMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gray-50 border border-gray-100 ${metric.color}`}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{metric.label}</div>
                      <div className="text-xs text-gray-500 font-medium">Latency: {metric.ping}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {metric.status === 'Operational' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                    <span className={`text-xs font-bold ${metric.status === 'Operational' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uptime Graph Mock */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">90-Day Uptime History</h3>
            
            <div className="flex gap-1 h-12 items-end group cursor-pointer">
              {Array.from({length: 90}).map((_, i) => (
                <div key={i} className="flex-1 bg-emerald-400 rounded-sm hover:bg-emerald-500 transition-colors" style={{ height: i === 42 || i === 75 ? '40%' : '100%', backgroundColor: i === 42 || i === 75 ? '#fbbf24' : '' }}></div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs font-semibold text-gray-400">90 days ago</div>
              <div className="text-sm font-bold text-gray-900">99.98% Uptime</div>
              <div className="text-xs font-semibold text-gray-400">Today</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Active Sessions</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-gray-900">4,281</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Live Users</div>
                  </div>
                </div>
                {/* SVG overlay for stroke dash */}
                <svg className="absolute inset-0 w-32 h-32 -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="351" strokeDashoffset="80" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Volunteers Mobile App</span>
                <span className="font-bold text-gray-900">2,840</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Hotels Web Portal</span>
                <span className="font-bold text-gray-900">920</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">NGOs Web Portal</span>
                <span className="font-bold text-gray-900">512</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Admin Dashboard</span>
                <span className="font-bold text-gray-900">9</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Storage Usage</h3>
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span className="text-gray-700">Database</span>
              <span className="text-gray-900">45 GB / 100 GB</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `45%` }}></div>
            </div>

            <div className="mb-2 flex justify-between text-sm font-bold">
              <span className="text-gray-700">Document Store</span>
              <span className="text-gray-900">820 GB / 1 TB</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `82%` }}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
