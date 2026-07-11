import { Mail, Phone, ShieldCheck, MapPin, Building2, Calendar } from "lucide-react";

export default function AdminProfile() {
  const profileDetails = [
    { label: "Role", value: "Super Administrator", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Email Address", value: "admin@foodbridge.org", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Phone Number", value: "+91 98765 43210", icon: Phone, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Location", value: "Bengaluru, India", icon: MapPin, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Department", value: "Central Operations", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Member Since", value: "March 2024", icon: Calendar, color: "text-rose-600", bg: "bg-rose-50" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-lg shrink-0">
            AD
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">System Administrator</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active
              </span>
              <span className="text-sm font-medium text-gray-500">Last login: 10 mins ago</span>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-gray-800 hover:-translate-y-0.5 transition-all">
                Edit Profile
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                Change Avatar
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {profileDetails.map((detail, idx) => {
              const Icon = detail.icon;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${detail.bg} ${detail.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{detail.label}</span>
                    <span className="text-[15px] font-semibold text-gray-900 mt-0.5">{detail.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
