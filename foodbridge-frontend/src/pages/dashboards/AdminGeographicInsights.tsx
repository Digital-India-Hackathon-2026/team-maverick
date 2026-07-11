import { Map, MapPin, Building2, Navigation, Layers, Filter } from 'lucide-react';

export default function AdminGeographicInsights() {
  
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl h-full">
      
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-600" /> Geographic Insights
          </h2>
          <p className="text-sm text-gray-500">Spatial analysis of food rescue operations</p>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Layers className="w-4 h-4 text-gray-400" />
            <select className="bg-transparent text-sm font-bold text-gray-700 outline-none appearance-none pr-4">
              <option>Default Map</option>
              <option>Heatmap (Donations)</option>
              <option>Heatmap (Waste)</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden min-h-[600px] flex">
        
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#e5e7eb] opacity-30" style={{ 
          backgroundImage: `
            linear-gradient(to right, #9ca3af 1px, transparent 1px),
            linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Fake roads / UI to simulate a map */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-4 bg-white/60 rotate-6"></div>
          <div className="absolute top-[60%] left-[-10%] w-[120%] h-6 bg-white/60 -rotate-12"></div>
          <div className="absolute top-[-10%] left-[30%] w-3 h-[120%] bg-white/60 rotate-12"></div>
          <div className="absolute top-[-10%] left-[70%] w-5 h-[120%] bg-white/60 -rotate-6"></div>
        </div>

        {/* Overlays / Markers */}
        <div className="absolute inset-0 p-8">
          
          {/* Legend */}
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-xl z-20">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Map Legend</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Partner Hotels (112)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Registered NGOs (84)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Active Deliveries (42)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-700">High Demand Hotspots</span>
              </div>
            </div>
          </div>

          {/* Markers (CSS Positioned) */}
          
          {/* Hotel 1 */}
          <div className="absolute top-[25%] left-[35%] group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white relative z-10 transition-transform group-hover:scale-110">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              Grand Regency Hotel<br/>
              <span className="text-blue-300">12 Pending Pickups</span>
            </div>
          </div>

          {/* NGO 1 */}
          <div className="absolute top-[65%] left-[45%] group cursor-pointer">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white relative z-10 transition-transform group-hover:scale-110">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
              Smile Foundation<br/>
              <span className="text-purple-300">Accepting 200 meals</span>
            </div>
          </div>

          {/* Active Route connecting Hotel 1 to NGO 1 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <line x1="35%" y1="25%" x2="45%" y2="65%" stroke="#10b981" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />
            <style>
              {`
                @keyframes dash {
                  to {
                    stroke-dashoffset: -12;
                  }
                }
              `}
            </style>
          </svg>

          {/* Active Delivery Marker on the route */}
          <div className="absolute top-[45%] left-[40%]">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white relative z-10 animate-bounce">
              <Navigation className="w-4 h-4" />
            </div>
          </div>

          {/* Hotspot */}
          <div className="absolute top-[40%] left-[75%]">
            <div className="w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute top-[calc(50%+16px)] left-1/2 -translate-x-1/2 bg-white/90 text-red-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
              High Waste Zone
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
