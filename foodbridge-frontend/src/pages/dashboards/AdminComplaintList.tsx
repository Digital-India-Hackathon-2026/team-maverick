import { useState, useEffect } from 'react';
import { 
  Search, Filter, ChevronRight, X, 
  Clock, CheckCircle, Navigation, User, Image as ImageIcon,
  Edit3
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

// Mock Data
const mockComplaints = [
  { 
    id: 'CMP-8991', raisedBy: 'Volunteer', name: 'Rahul Sharma', category: 'Food Quality', priority: 'High', status: 'Open', date: '2026-10-25 14:30', assigned: 'Unassigned',
    description: 'The food picked up from Grand Regency Hotel for delivery DEL-8812 was emitting a foul odor. I refused to deliver it as it seemed spoiled.',
    deliveryRef: 'DEL-8812',
    parties: { hotel: 'Grand Regency Hotel', ngo: 'Smile Foundation', volunteer: 'Rahul Sharma' },
    timeline: [
      { event: 'Complaint Raised', time: 'Oct 25, 14:30' },
      { event: 'Delivery Suspended', time: 'Oct 25, 14:32' }
    ],
    documents: [{ name: 'food_photo_1.jpg', type: 'image' }],
    adminNotes: ''
  },
  { 
    id: 'CMP-8990', raisedBy: 'NGO', name: 'Smile Foundation', category: 'Delayed Delivery', priority: 'Medium', status: 'In Progress', date: '2026-10-24 18:15', assigned: 'Admin Sarah',
    description: 'The volunteer arrived 45 minutes late. The food was cold and some containers were slightly damaged.',
    deliveryRef: 'DEL-8799',
    parties: { hotel: 'The Leela Palace', ngo: 'Smile Foundation', volunteer: 'Amit Kumar' },
    timeline: [
      { event: 'Complaint Raised', time: 'Oct 24, 18:15' },
      { event: 'Admin Sarah Assigned', time: 'Oct 24, 18:30' },
      { event: 'Contacted Volunteer', time: 'Oct 25, 09:00' }
    ],
    documents: [],
    adminNotes: 'Volunteer stated traffic was exceptionally bad. Need to issue a warning regarding communication.'
  },
  { 
    id: 'CMP-8989', raisedBy: 'Hotel', name: 'City Inn', category: 'No Show', priority: 'High', status: 'Resolved', date: '2026-10-23 21:00', assigned: 'Admin David',
    description: 'The volunteer never arrived to pick up the 50 meals scheduled for 20:00.',
    deliveryRef: 'DEL-8750',
    parties: { hotel: 'City Inn', ngo: 'City Hospital Trust', volunteer: 'Priya Patel' },
    timeline: [
      { event: 'Complaint Raised', time: 'Oct 23, 21:00' },
      { event: 'Emergency Re-assignment', time: 'Oct 23, 21:15' },
      { event: 'Resolved', time: 'Oct 24, 10:00' }
    ],
    documents: [],
    adminNotes: 'Original volunteer Priya had a flat tire but failed to use the app to cancel. Volunteer suspended for 2 days.'
  },
];

export default function AdminComplaintList() {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<any[]>(mockComplaints);

  useEffect(() => {
    const loadComplaints = () => {
      let currentComplaints = mockComplaints;
      const stored = localStorage.getItem('adminComplaints');
      if (stored) {
        currentComplaints = JSON.parse(stored);
      } else {
        localStorage.setItem('adminComplaints', JSON.stringify(mockComplaints));
      }
      
      const newC = localStorage.getItem('newComplaint');
      if (newC) {
        const parsed = JSON.parse(newC);
        currentComplaints = [parsed, ...currentComplaints];
        localStorage.setItem('adminComplaints', JSON.stringify(currentComplaints));
        localStorage.removeItem('newComplaint');
      }
      
      setComplaints(currentComplaints);
    };

    loadComplaints();
    const interval = setInterval(loadComplaints, 2000);
    return () => clearInterval(interval);
  }, []);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);

  // Form states for drawer
  const [newNote, setNewNote] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  const filteredComplaints = complaints.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const handleAddNote = () => {
    if(!newNote.trim()) return;
    const updated = {
      ...selectedComplaint,
      adminNotes: selectedComplaint.adminNotes ? `${selectedComplaint.adminNotes}\n---\n${newNote}` : newNote,
      timeline: [...selectedComplaint.timeline, { event: 'Internal Note Added', time: 'Just now' }]
    };
    setSelectedComplaint(updated);
    updateComplaintInList(updated);
    setNewNote('');
    toast('Internal note added.', 'success');
  };

  const handleStatusChange = (newStatus: string) => {
    const updated = {
      ...selectedComplaint,
      status: newStatus,
      timeline: [...selectedComplaint.timeline, { event: `Status changed to ${newStatus}`, time: 'Just now' }]
    };
    setSelectedComplaint(updated);
    updateComplaintInList(updated);
    toast(`Complaint status updated to ${newStatus}.`, 'success');
  };

  const handleAssignAdmin = () => {
    const updated = {
      ...selectedComplaint,
      assigned: 'You (Current Admin)',
      timeline: [...selectedComplaint.timeline, { event: 'Assigned to You', time: 'Just now' }]
    };
    setSelectedComplaint(updated);
    updateComplaintInList(updated);
    toast('You are now assigned to this complaint.', 'info');
  };

  const updateComplaintInList = (updated: any) => {
    setComplaints(prev => {
      const newList = prev.map(c => c.id === updated.id ? updated : c);
      localStorage.setItem('adminComplaints', JSON.stringify(newList));
      return newList;
    });
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'High': return 'text-red-700 bg-red-50';
      case 'Medium': return 'text-amber-700 bg-amber-50';
      default: return 'text-emerald-700 bg-emerald-50';
    }
  };

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Open': return 'text-blue-700 bg-blue-50';
      case 'In Progress': return 'text-purple-700 bg-purple-50';
      case 'Resolved': return 'text-emerald-700 bg-emerald-50';
      case 'Closed': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Complaint ID or User Name..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Complaint ID</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Raised By</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned</th>
                <th className="p-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedComplaint(c)}>
                  <td className="p-4">
                    <div className="text-sm font-bold text-gray-900">{c.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.raisedBy}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-700">{c.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${getPriorityColor(c.priority)}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-medium text-gray-600">{c.date}</td>
                  <td className="p-4 text-xs font-medium text-gray-600">{c.assigned}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500 font-medium">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaint Details Drawer */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedComplaint(null)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedComplaint.id}</h3>
                <p className="text-xs font-medium text-gray-500">{selectedComplaint.category} • {selectedComplaint.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
                <button onClick={() => setSelectedComplaint(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Description */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Issue Description</h4>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 leading-relaxed">
                  {selectedComplaint.description}
                </div>
              </section>

              {/* Involved Parties & Ref */}
              <section className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Ref</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                    <Navigation className="w-4 h-4" /> {selectedComplaint.deliveryRef}
                  </div>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Assigned Admin</div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <User className="w-4 h-4 text-gray-400" /> {selectedComplaint.assigned}
                  </div>
                  {selectedComplaint.assigned === 'Unassigned' && (
                    <button onClick={handleAssignAdmin} className="mt-2 text-xs font-bold text-emerald-600 hover:underline">
                      Assign to me
                    </button>
                  )}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Involved Parties</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-white border border-gray-100 rounded-xl text-sm">
                    <span className="text-gray-500">Hotel</span>
                    <span className="font-semibold text-gray-900">{selectedComplaint.parties.hotel}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white border border-gray-100 rounded-xl text-sm">
                    <span className="text-gray-500">NGO</span>
                    <span className="font-semibold text-gray-900">{selectedComplaint.parties.ngo}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white border border-gray-100 rounded-xl text-sm">
                    <span className="text-gray-500">Volunteer</span>
                    <span className="font-semibold text-gray-900">{selectedComplaint.parties.volunteer}</span>
                  </div>
                </div>
              </section>

              {/* Attached Evidence */}
              {selectedComplaint.documents.length > 0 && (
                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Attached Evidence</h4>
                  <div className="flex gap-3">
                    {selectedComplaint.documents.map((doc: any, i: number) => (
                      <div key={i} className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer group">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-100" />
                        <span className="text-[10px] font-semibold truncate w-20 text-center">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Timeline */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Resolution Timeline</h4>
                <div className="relative border-l-2 border-gray-100 ml-3 pl-5 space-y-6">
                  {selectedComplaint.timeline.map((item: any, idx: number) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-100 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-emerald-500" />
                      </span>
                      <div className="text-sm font-semibold text-gray-800">{item.event}</div>
                      <div className="text-[11px] font-medium text-gray-400 mt-1">{item.time}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Internal Notes */}
              <section className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Internal Admin Notes
                </h4>
                {selectedComplaint.adminNotes ? (
                  <div className="text-sm text-amber-900 whitespace-pre-wrap mb-4">
                    {selectedComplaint.adminNotes}
                  </div>
                ) : (
                  <div className="text-sm text-amber-700/60 italic mb-4">No internal notes added yet.</div>
                )}
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add a new note..." 
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-amber-200 focus:outline-none focus:border-amber-500 bg-white"
                  />
                  <button onClick={handleAddNote} className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 transition-colors">
                    Add
                  </button>
                </div>
              </section>

            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
              <select 
                value={statusUpdate}
                onChange={e => {
                  if(e.target.value) handleStatusChange(e.target.value);
                  setStatusUpdate('');
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold focus:outline-none focus:border-emerald-500 flex-1"
              >
                <option value="">Change Status...</option>
                <option value="Open">Mark as Open</option>
                <option value="In Progress">Mark as In Progress</option>
                <option value="Resolved">Mark as Resolved</option>
                <option value="Closed">Mark as Closed</option>
              </select>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleStatusChange('Resolved')}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
