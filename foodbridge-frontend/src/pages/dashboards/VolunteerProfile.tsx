import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Car, ShieldCheck, FileText, UploadCloud, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function VolunteerProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information and vehicle details.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            isEditing ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Photo & Status */}
        <div className="flex flex-col gap-6">
          
          {/* Profile Photo Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                RS
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Rahul Sharma</h2>
            <p className="text-sm text-gray-500 mt-1">Volunteer Partner Since 2024</p>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-400" /> Account Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Email Verified</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Phone Verified</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Govt ID Status</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Background Check</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase rounded">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Forms & Documents */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Rahul Sharma" 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="rahul.sharma@example.com" 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="+91 98765 43210" 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Address / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    defaultValue="Koramangala, Bangalore" 
                    disabled={!isEditing}
                    className="w-full py-2.5 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Vehicle Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Vehicle Type</label>
                <select 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed appearance-none"
                >
                  <option>Two Wheeler (Bike/Scooter)</option>
                  <option>Four Wheeler (Car)</option>
                  <option>Small Commercial Vehicle</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Vehicle Number</label>
                <input 
                  type="text" 
                  defaultValue="KA 01 AB 1234" 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed uppercase" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Driving License No.</label>
                <input 
                  type="text" 
                  defaultValue="DL-1420110012345" 
                  disabled={!isEditing}
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed uppercase" 
                />
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Document Center</h3>
            <p className="text-sm text-gray-500 mb-5">Upload necessary documents for compliance.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Aadhar Card</div>
                    <div className="text-xs text-emerald-600 font-medium">Uploaded & Verified</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </button>
              </div>

              <label className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between group hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer">
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { if (e.target.files?.length) toast('Document uploaded successfully.', 'success'); }} />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Police Clearance</div>
                    <div className="text-xs text-gray-500">Tap to upload PDF/JPG</div>
                  </div>
                </div>
              </label>

            </div>
            
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Your Police Clearance Certificate is pending. You cannot accept high-priority deliveries until this is uploaded and verified by the administration team.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
