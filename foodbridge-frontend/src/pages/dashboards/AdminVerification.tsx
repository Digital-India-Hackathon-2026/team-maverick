import { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, FileText, Download, 
  ExternalLink, Clock, ShieldAlert, FileImage
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const pendingQueue = [
  { 
    id: 'REQ-1049', type: 'Hotel', name: 'The Royal Inn', date: 'Just now',
    documents: [
      { name: 'FSSAI License', status: 'Pending Review', type: 'PDF', url: '#' },
      { name: 'Business Registration', status: 'Pending Review', type: 'PDF', url: '#' }
    ],
    notes: 'High volume donor expecting to provide 100+ meals daily.'
  },
  { 
    id: 'REQ-1048', type: 'NGO', name: 'Helping Hands Trust', date: '2 hours ago',
    documents: [
      { name: 'NGO Certificate', status: 'Flagged', type: 'Image', url: '#' },
      { name: 'Government ID (Director)', status: 'Pending Review', type: 'Image', url: '#' }
    ],
    notes: 'Certificate image is slightly blurry.'
  },
  { 
    id: 'REQ-1047', type: 'Volunteer', name: 'Ananya Singh', date: 'Yesterday',
    documents: [
      { name: 'Government ID', status: 'Pending Review', type: 'PDF', url: '#' },
      { name: 'Driving License', status: 'Pending Review', type: 'Image', url: '#' },
      { name: 'Vehicle Registration', status: 'Pending Review', type: 'PDF', url: '#' }
    ],
    notes: 'Wants to do weekend deliveries.'
  }
];

export default function AdminVerification() {
  const { toast } = useToast();
  const [queue, setQueue] = useState(pendingQueue);
  const [selectedReq, setSelectedReq] = useState<any | null>(queue.length > 0 ? queue[0] : null);
  const [requestInfoModal, setRequestInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const processAction = (actionMessage: string, type: 'success' | 'error' | 'info') => {
    toast(actionMessage, type);
    
    // Remove from queue
    const updatedQueue = queue.filter(req => req.id !== selectedReq?.id);
    setQueue(updatedQueue);
    
    // Select next
    if (updatedQueue.length > 0) {
      setSelectedReq(updatedQueue[0]);
    } else {
      setSelectedReq(null);
    }
  };

  const handleApprove = () => {
    if (!selectedReq) return;
    processAction(`${selectedReq.name} has been verified and approved.`, 'success');
  };

  const handleReject = () => {
    if (!selectedReq) return;
    processAction(`${selectedReq.name}'s registration has been rejected.`, 'error');
  };

  const handleRequestInfoSubmit = () => {
    if(!selectedReq || !infoMessage.trim()) return;
    processAction(`Requested more information from ${selectedReq.name}.`, 'info');
    setRequestInfoModal(false);
    setInfoMessage('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: Queue */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center justify-between">
            Verification Queue
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{queue.length} Pending</span>
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {queue.length === 0 ? (
            <div className="p-8 text-center text-sm font-medium text-gray-400">Queue is empty</div>
          ) : (
            queue.map(req => (
              <button 
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`w-full text-left p-5 border-b border-gray-100 transition-all ${
                  selectedReq?.id === req.id ? 'bg-emerald-50/50 border-l-4 border-l-emerald-500' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{req.type}</span>
                <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {req.date}</span>
              </div>
              <div className="text-sm font-bold text-gray-900 mb-1">{req.name}</div>
              <div className="text-xs text-gray-500">{req.id} • {req.documents.length} Documents attached</div>
            </button>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Details & Document Viewer */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
        
        {selectedReq ? (
          <>
            {/* Header Actions */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{selectedReq.name}</h2>
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">{selectedReq.type}</span>
            </div>
            <p className="text-xs text-gray-500">Reviewing {selectedReq.id}</p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setRequestInfoModal(true)} className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-sm font-bold transition-colors">
              Request Info
            </button>
            <button onClick={handleReject} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors">
              Reject
            </button>
            <button onClick={handleApprove} className="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-colors shadow-sm">
              Approve Profile
            </button>
          </div>
        </div>

        {/* Document Workspace */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          
          {selectedReq.notes && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Registration Notes</h4>
                <p className="text-sm text-amber-700">{selectedReq.notes}</p>
              </div>
            </div>
          )}

          <h3 className="text-sm font-bold text-gray-900 mb-4">Submitted Documents</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {selectedReq.documents.map((doc, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    {doc.type === 'PDF' ? <FileText className="w-5 h-5 text-blue-500" /> : <FileImage className="w-5 h-5 text-purple-500" />}
                    <div>
                      <div className="text-sm font-bold text-gray-900">{doc.name}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${doc.status === 'Flagged' ? 'text-red-500' : 'text-amber-500'}`}>
                        {doc.status}
                      </div>
                    </div>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Mock Document Viewer */}
                <div className="h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400 group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <div className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-xs shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <ExternalLink className="w-4 h-4" /> View Fullscreen
                    </div>
                  </div>
                  {doc.type === 'PDF' ? <FileText className="w-12 h-12 mb-3 opacity-20" /> : <FileImage className="w-12 h-12 mb-3 opacity-20" />}
                  <span className="text-xs font-semibold">Click to expand document</span>
                </div>
                
                <div className="p-3 bg-white grid grid-cols-2 divide-x divide-gray-100">
                  <button className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 py-1 rounded-l-lg transition-colors">
                    <CheckCircle className="w-4 h-4" /> Mark Valid
                  </button>
                  <button className="flex items-center justify-center gap-2 text-xs font-bold text-red-600 hover:bg-red-50 py-1 rounded-r-lg transition-colors">
                    <AlertCircle className="w-4 h-4" /> Flag Issue
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
            <CheckCircle className="w-16 h-16 mb-4 text-emerald-200" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-sm">There are no more pending verification requests in the queue.</p>
          </div>
        )}
      </div>

      {/* Request Info Modal */}
      {requestInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setRequestInfoModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Request Information</h3>
              <button onClick={() => setRequestInfoModal(false)} className="text-gray-400 hover:text-gray-900"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message to {selectedReq?.name}</label>
              <textarea 
                rows={4}
                value={infoMessage}
                onChange={e => setInfoMessage(e.target.value)}
                placeholder="e.g. Please re-upload your FSSAI license as the previous one was blurry."
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none resize-none text-sm"
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">This will pause their verification until they respond.</p>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <button onClick={() => setRequestInfoModal(false)} className="px-4 py-2 font-bold text-sm text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleRequestInfoSubmit} disabled={!infoMessage.trim()} className="px-4 py-2 font-bold text-sm text-white bg-gray-900 disabled:opacity-50 hover:bg-gray-800 rounded-xl transition-colors">Send Request</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
