import { useState } from 'react';
import { 
  FileText, Download, Eye, TableProperties, Filter, Calendar,
  PieChart, Building2, Users
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function AdminReportsCenter() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const reports = [
    { id: 1, name: 'Daily Operations Summary', type: 'Operations', icon: Calendar, description: 'Aggregated daily metrics covering total meals rescued, active deliveries, and unfulfilled pickups.' },
    { id: 2, name: 'Weekly Performance Report', type: 'Operations', icon: Calendar, description: 'Week-over-week comparison of platform growth, volume of food rescued, and top performing partners.' },
    { id: 3, name: 'Monthly Financial & Resource Ledger', type: 'Financial', icon: PieChart, description: 'Detailed accounting of estimated dollar value of food rescued and logistics costs saved.' },
    { id: 4, name: 'CSR Impact Report', type: 'External', icon: FileText, description: 'Client-facing report detailing carbon footprint reduction and waste prevention metrics.' },
    { id: 5, name: 'NGO Capacity & Utilization', type: 'Partner', icon: Building2, description: 'Analysis of NGO request volumes versus fulfillment rates and storage capacity utilization.' },
    { id: 6, name: 'Hotel Contribution Matrix', type: 'Partner', icon: Building2, description: 'Leaderboard and detailed breakdown of food volumes contributed by each registered hotel.' },
    { id: 7, name: 'Volunteer Fleet Analytics', type: 'Logistics', icon: Users, description: 'Metrics on average delivery times, active volunteer hours, and SLA compliance.' }
  ];

  const handleAction = (action: string, reportName: string) => {
    toast(`Initiating ${action} for ${reportName}`, 'info');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" /> Reports & Exports
          </h2>
          <p className="text-sm text-gray-500">Generate, view, and download platform analytics reports.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-700 outline-none appearance-none pr-4"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter Categories
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <report.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                  {report.type}
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-2 leading-tight">{report.name}</h3>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3">
              {report.description}
            </p>
            
            <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleAction('Preview', report.name)}
                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-bold">Preview</span>
              </button>
              
              <button 
                onClick={() => handleAction('PDF Download', report.name)}
                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-bold">PDF</span>
              </button>
              
              <button 
                onClick={() => handleAction('CSV Export', report.name)}
                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
              >
                <TableProperties className="w-4 h-4" />
                <span className="text-[10px] font-bold">CSV</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
