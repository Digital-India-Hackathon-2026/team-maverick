import { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle2, ChevronRight, X, Package, ShieldCheck, Calendar, FileText } from 'lucide-react';

export default function VolunteerHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  const deliveries = [
    {
      id: 'DEL-8823',
      date: 'Oct 24, 2026',
      hotel: 'Grand Regency Hotel',
      ngo: 'Helping Hands',
      status: 'Completed',
      duration: '45 mins',
      food: '45 Cooked Meals, 10kg Rice',
      pickupTime: '3:40 PM',
      deliveryTime: '4:25 PM',
      otp: 'Verified',
      timeline: [
        { status: 'Assigned', time: '3:20 PM', completed: true },
        { status: 'Picked Up', time: '3:40 PM', completed: true },
        { status: 'In Transit', time: '3:50 PM', completed: true },
        { status: 'Delivered', time: '4:25 PM', completed: true },
      ]
    },
    {
      id: 'DEL-8820',
      date: 'Oct 23, 2026',
      hotel: 'Taj West End',
      ngo: 'Akshaya Patra',
      status: 'Completed',
      duration: '38 mins',
      food: '20kg Raw Vegetables',
      pickupTime: '1:15 PM',
      deliveryTime: '1:53 PM',
      otp: 'Verified',
      timeline: [
        { status: 'Assigned', time: '1:00 PM', completed: true },
        { status: 'Picked Up', time: '1:15 PM', completed: true },
        { status: 'In Transit', time: '1:30 PM', completed: true },
        { status: 'Delivered', time: '1:53 PM', completed: true },
      ]
    },
    {
      id: 'DEL-8815',
      date: 'Oct 22, 2026',
      hotel: 'ITC Gardenia',
      ngo: 'Goonj',
      status: 'Cancelled',
      duration: '-',
      food: '30 Bakery Items',
      pickupTime: '-',
      deliveryTime: '-',
      otp: 'Failed',
      timeline: [
        { status: 'Assigned', time: '9:00 AM', completed: true },
        { status: 'Cancelled', time: '9:15 AM', completed: false },
      ]
    },
    {
      id: 'DEL-8810',
      date: 'Oct 20, 2026',
      hotel: 'The Leela Palace',
      ngo: 'Smile Foundation',
      status: 'Completed',
      duration: '52 mins',
      food: '50 Cooked Meals',
      pickupTime: '7:30 PM',
      deliveryTime: '8:22 PM',
      otp: 'Verified',
      timeline: [
        { status: 'Assigned', time: '7:15 PM', completed: true },
        { status: 'Picked Up', time: '7:30 PM', completed: true },
        { status: 'In Transit', time: '7:50 PM', completed: true },
        { status: 'Delivered', time: '8:22 PM', completed: true },
      ]
    }
  ];

  const filteredDeliveries = deliveries.filter(del => {
    const matchesSearch = del.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          del.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          del.ngo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || del.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Delivery History</h1>
          <p className="text-sm text-gray-500 mt-1">Review your past deliveries and download receipts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search deliveries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 py-2 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm outline-none transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
            />
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none transition-all focus:border-emerald-600 cursor-pointer appearance-none pr-8 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em 1em' }}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Delivery ID & Date</th>
                <th className="p-4">Route</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDeliveries.map((del) => (
                <tr key={del.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedDelivery(del)}>
                  <td className="p-4 pl-6">
                    <div className="font-bold text-gray-900">{del.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {del.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {del.hotel}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {del.ngo}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {del.duration}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      del.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {del.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {del.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDeliveries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No deliveries found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer Overlay */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={() => setSelectedDelivery(null)}></div>
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Delivery Details</div>
                <div className="text-xl font-extrabold text-gray-900">{selectedDelivery.id}</div>
              </div>
              <button 
                onClick={() => setSelectedDelivery(null)}
                className="p-2 rounded-xl text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Status Banner */}
              <div className={`p-4 rounded-xl flex items-center justify-between ${selectedDelivery.status === 'Completed' ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedDelivery.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {selectedDelivery.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className={`font-bold ${selectedDelivery.status === 'Completed' ? 'text-emerald-900' : 'text-red-900'}`}>
                      {selectedDelivery.status}
                    </div>
                    <div className={`text-xs ${selectedDelivery.status === 'Completed' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {selectedDelivery.date} • {selectedDelivery.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" /> Route Information
                </h3>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></span>
                    <div className="text-xs font-semibold text-gray-500 uppercase">Pickup</div>
                    <div className="font-bold text-gray-900">{selectedDelivery.hotel}</div>
                    <div className="text-sm text-gray-500">{selectedDelivery.pickupTime}</div>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
                    <div className="text-xs font-semibold text-gray-500 uppercase">Drop-off</div>
                    <div className="font-bold text-gray-900">{selectedDelivery.ngo}</div>
                    <div className="text-sm text-gray-500">{selectedDelivery.deliveryTime}</div>
                  </div>
                </div>
              </div>

              {/* Package & OTP */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <Package className="w-5 h-5 text-gray-400 mb-2" />
                  <div className="text-xs font-medium text-gray-500 mb-1">Items Delivered</div>
                  <div className="text-sm font-bold text-gray-900 leading-snug">{selectedDelivery.food}</div>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
                  <div className="text-xs font-medium text-gray-500 mb-1">Security</div>
                  <div className="text-sm font-bold text-gray-900">OTP {selectedDelivery.otp}</div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" /> Delivery Timeline
                </h3>
                <div className="space-y-4">
                  {selectedDelivery.timeline.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                        {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</div>
                        <div className="text-xs text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-gray-100 bg-white">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <FileText className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
