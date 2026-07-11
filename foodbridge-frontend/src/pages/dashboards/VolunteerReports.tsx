import { useState } from 'react';
import { FileText, Calendar, Activity, Heart, ArrowDownToLine, Loader2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function VolunteerReports() {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (reportName: string, format: string) => {
    setDownloading(`${reportName}-${format}`);
    toast(`Preparing ${reportName} in ${format} format...`, 'info');
    
    // Simulate download
    setTimeout(() => {
      setDownloading(null);
      toast(`${reportName} downloaded successfully!`, 'success');
    }, 2000);
  };

  const reports = [
    {
      id: 'monthly',
      title: 'Monthly Summary Report',
      description: 'Comprehensive overview of your deliveries, hours active, and earnings (if applicable) for the selected month.',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 'delivery',
      title: 'Detailed Delivery Log',
      description: 'A line-by-line record of every delivery completed, including timestamps, locations, and OTP verifications.',
      icon: Activity,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 'impact',
      title: 'Community Impact Report',
      description: 'Visual report showing the total food volume rescued and estimated CO2 emissions prevented by your efforts.',
      icon: Heart,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Exports</h1>
        <p className="text-sm text-gray-500 mt-1">Generate and download official records of your volunteer activities.</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Select Date Range</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">From Date</label>
            <input 
              type="date" 
              defaultValue="2026-10-01"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium outline-none transition-all focus:border-emerald-600 focus:bg-white" 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">To Date</label>
            <input 
              type="date" 
              defaultValue="2026-10-31"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium outline-none transition-all focus:border-emerald-600 focus:bg-white" 
            />
          </div>
          <div className="hidden sm:block text-gray-400 pb-3">OR</div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Quick Select</label>
            <select className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium outline-none transition-all focus:border-emerald-600 focus:bg-white appearance-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${report.bg} ${report.color}`}>
              <report.icon className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">
              {report.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button 
                onClick={() => handleDownload(report.title, 'PDF')}
                disabled={downloading !== null}
                className="flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {downloading === `${report.title}-PDF` ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <FileText className="w-4 h-4" /> PDF
                  </>
                )}
              </button>
              
              <button 
                onClick={() => handleDownload(report.title, 'CSV')}
                disabled={downloading !== null}
                className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {downloading === `${report.title}-CSV` ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ArrowDownToLine className="w-4 h-4" /> CSV
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
