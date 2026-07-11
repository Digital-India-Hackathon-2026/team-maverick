import { useState, useEffect } from 'react';
import { ArrowRight, Clock, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VolunteerDeliveries() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-8824',
      hotel: 'Taj West End',
      ngo: 'Akshaya Patra',
      distance: '2.4 km',
      timeWindow: '2:00 PM - 3:30 PM',
      items: '45 Cooked Meals',
      priority: 'High',
      status: 'Available',
    },
    {
      id: 'DEL-8825',
      hotel: 'ITC Gardenia',
      ngo: 'Goonj',
      distance: '3.1 km',
      timeWindow: '3:00 PM - 4:00 PM',
      items: '20 kg Raw Vegetables',
      priority: 'Medium',
      status: 'Available',
    },
    {
      id: 'DEL-8826',
      hotel: 'The Leela Palace',
      ngo: 'Smile Foundation',
      distance: '1.8 km',
      timeWindow: '4:30 PM - 5:30 PM',
      items: '30 Bakery Items',
      priority: 'Low',
      status: 'Available',
    }
  ]);

  useEffect(() => {
    try {
      const accepted = JSON.parse(localStorage.getItem('volunteerAcceptedDeliveries') || '[]');
      const acceptedIds = accepted.map((a: any) => a.id);
      setDeliveries(prev => prev.filter(d => !acceptedIds.includes(d.id)));
    } catch {}
  }, []);

  const handleAccept = (delivery: any) => {
    try {
      const accepted = JSON.parse(localStorage.getItem('volunteerAcceptedDeliveries') || '[]');
      accepted.push(delivery);
      localStorage.setItem('volunteerAcceptedDeliveries', JSON.stringify(accepted));
    } catch {}
    navigate('/volunteer/active');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Available Deliveries</h1>
        <p className="text-sm text-gray-500 mt-1">Accept deliveries nearby to start your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveries.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
            <div className="text-gray-400 mb-2">No available deliveries nearby right now.</div>
            <div className="text-sm text-gray-500">Check back later or expand your work preferences.</div>
          </div>
        ) : deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500">{delivery.id}</span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                delivery.priority === 'High' ? 'bg-red-50 text-red-600' :
                delivery.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {delivery.priority} Priority
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{delivery.hotel}</div>
                  <div className="text-gray-500 text-xs mt-0.5">to {delivery.ngo}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600">{delivery.items}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600">{delivery.timeWindow}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <div className="text-sm font-medium text-gray-900">{delivery.distance} away</div>
              <button onClick={() => handleAccept(delivery)} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group bg-transparent border-none cursor-pointer">
                Accept 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
