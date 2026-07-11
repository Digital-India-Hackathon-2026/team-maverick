import { useState, useRef, useEffect } from 'react';
import { 
  Search, Filter, Download, UserCheck, UserX, 
  ChevronRight, X, Mail, Phone, Calendar, ShieldCheck, MapPin, 
  FileText, MoreVertical, Eye
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

// Mock Data
const initialMockUsers = [
  { id: 'USR-1042', type: 'Hotel', name: 'Grand Regency Hotel', email: 'contact@grandregency.com', phone: '+91 98765 43210', date: '2026-10-24', verifyStatus: 'Verified', accStatus: 'Active', avatar: 'GH', location: 'Connaught Place, New Delhi', documents: ['FSSAI License', 'Business Registration'], activity: { donations: 142, meals: 4500 } },
  { id: 'USR-1043', type: 'Hotel', name: 'The Leela Palace', email: 'admin@theleela.com', phone: '+91 98765 43211', date: '2026-10-23', verifyStatus: 'Pending', accStatus: 'Active', avatar: 'TL', location: 'Chanakyapuri, New Delhi', documents: ['FSSAI License'], activity: { donations: 0, meals: 0 } },
  { id: 'USR-1044', type: 'NGO', name: 'Smile Foundation', email: 'hello@smilefoundation.org', phone: '+91 98765 43212', date: '2026-10-22', verifyStatus: 'Verified', accStatus: 'Active', avatar: 'SF', location: 'Green Park, New Delhi', documents: ['NGO Certificate', '80G Certificate'], activity: { received: 85, distributed: 2500 } },
  { id: 'USR-1045', type: 'NGO', name: 'City Hospital Trust', email: 'trust@cityhospital.in', phone: '+91 98765 43213', date: '2026-10-20', verifyStatus: 'Rejected', accStatus: 'Suspended', avatar: 'CH', location: 'Lajpat Nagar, New Delhi', documents: ['Invalid Document'], activity: { received: 0, distributed: 0 } },
  { id: 'USR-1046', type: 'Volunteer', name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '+91 98765 43214', date: '2026-10-25', verifyStatus: 'Verified', accStatus: 'Active', avatar: 'RS', location: 'Dwarka, New Delhi', documents: ['Government ID', 'Driving License', 'Vehicle Reg'], activity: { deliveries: 45, distance: '120 km' } },
  { id: 'USR-1047', type: 'Volunteer', name: 'Priya Patel', email: 'priya.p@example.com', phone: '+91 98765 43215', date: '2026-10-24', verifyStatus: 'Pending', accStatus: 'Active', avatar: 'PP', location: 'Vasant Kunj, New Delhi', documents: ['Government ID'], activity: { deliveries: 0, distance: '0 km' } },
];

export default function AdminUsersList() {
  const { toast } = useToast();
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('admin_mock_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialMockUsers;
      }
    }
    return initialMockUsers;
  });

  useEffect(() => {
    localStorage.setItem('admin_mock_users', JSON.stringify(users));
  }, [users]);
  const [activeTab, setActiveTab] = useState('Hotel');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filters
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesTab = user.type === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                          user.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || user.verifyStatus === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) setSelectedUsers([]);
    else setSelectedUsers(filteredUsers.map(u => u.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedUsers.includes(id)) setSelectedUsers(selectedUsers.filter(uid => uid !== id));
    else setSelectedUsers([...selectedUsers, id]);
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;
    toast(`Successfully applied ${action} to ${selectedUsers.length} users.`, 'success');
    setSelectedUsers([]);
  };

  const handleUserAction = (id: string, action: 'verify' | 'suspend') => {
    setUsers(users.map(user => {
      if (user.id === id) {
        if (action === 'verify') return { ...user, verifyStatus: 'Verified', accStatus: 'Active' };
        if (action === 'suspend') return { ...user, accStatus: 'Suspended', verifyStatus: 'Rejected' };
      }
      return user;
    }));
    toast(`User ${action === 'verify' ? 'verified' : 'suspended'} successfully.`, 'success');
    setOpenDropdownId(null);
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null);
    }
  };

  const exportData = () => {
    toast(`Exporting ${filteredUsers.length} users to CSV...`, 'info');
  };

  return (
    <>
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500">View, filter, and manage all platform participants.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['Hotel', 'NGO', 'Volunteer'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedUsers([]); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <button onClick={exportData} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
        
        {/* Bulk Action Bar */}
        {selectedUsers.length > 0 && (
          <div className="absolute top-0 left-0 right-0 h-14 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between px-6 z-10 animate-in fade-in slide-in-from-top-2">
            <span className="text-sm font-bold text-emerald-800">{selectedUsers.length} users selected</span>
            <div className="flex gap-2">
              <button onClick={() => handleBulkAction('Bulk Approve')} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700">
                <UserCheck className="w-3.5 h-3.5" /> Approve
              </button>
              <button onClick={() => handleBulkAction('Bulk Reject')} className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200">
                <UserX className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 w-12">
                  <input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={toggleSelectAll} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                </th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Registered</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Verification</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</th>
                <th className="p-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelect(user.id)} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700 flex items-center gap-2"><Mail className="w-3 h-3 text-gray-400" /> {user.email}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1"><Phone className="w-3 h-3 text-gray-400" /> {user.phone}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-700 font-medium">
                    {user.date}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.verifyStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                      user.verifyStatus === 'Rejected' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {user.verifyStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold ${user.accStatus === 'Active' ? 'text-gray-900' : 'text-red-600'}`}>
                      {user.accStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                        user.verifyStatus === 'Pending' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {user.verifyStatus === 'Pending' ? <><UserCheck className="w-3.5 h-3.5" /> Verify</> : <><Eye className="w-3.5 h-3.5" /> Review</>}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 font-medium">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* User Details Modal Overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedUser(null)}></div>
          
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 text-lg font-bold flex items-center justify-center shrink-0">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-xs font-medium text-gray-500">{selectedUser.type} • {selectedUser.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Profile Details */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact & Location</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedUser.email}</div>
                      <div className="text-xs text-gray-500">Primary Email</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedUser.phone}</div>
                      <div className="text-xs text-gray-500">Mobile Number</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedUser.location}</div>
                      <div className="text-xs text-gray-500">Registered Address</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Activity Summary */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Activity Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedUser.activity).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{key}</div>
                      <div className="text-lg font-extrabold text-gray-900">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Verification & Documents */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Verification Info</h4>
                
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900">Current Status</span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      selectedUser.verifyStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                      selectedUser.verifyStatus === 'Rejected' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {selectedUser.verifyStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" /> Registered on {selectedUser.date}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Uploaded Documents</div>
                  {selectedUser.documents.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">{doc}</span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Modal Footer / Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
               {selectedUser.accStatus !== 'Suspended' && (
                 <button 
                   onClick={() => handleUserAction(selectedUser.id, 'suspend')}
                   className="py-2.5 px-6 bg-white border border-gray-200 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors"
                 >
                   Suspend Account
                 </button>
               )}
               {selectedUser.verifyStatus !== 'Verified' ? (
                 <button 
                   onClick={() => handleUserAction(selectedUser.id, 'verify')}
                   className="py-2.5 px-8 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-colors flex items-center gap-2"
                 >
                   <UserCheck className="w-4 h-4" /> Agree & Approve
                 </button>
               ) : (
                 <button 
                   onClick={() => setSelectedUser(null)}
                   className="py-2.5 px-8 bg-gray-900 rounded-xl text-sm font-bold text-white hover:bg-gray-800 transition-colors"
                 >
                   Close
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
