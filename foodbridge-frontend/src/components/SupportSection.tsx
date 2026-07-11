import { useState } from 'react';
import { HelpCircle, MessageCircle, AlertTriangle, PhoneCall, ChevronDown, Send } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function SupportSection({ userType = 'volunteer' }: { userType?: 'volunteer' | 'hotel' | 'ngo' }) {
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! How can we help you today?', sender: 'support', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [issueType, setIssueType] = useState('Hotel / Pickup Issue');
  const [relatedId, setRelatedId] = useState('');
  const [description, setDescription] = useState('');

  const faqs = userType === 'volunteer' ? [
    { question: 'What do I do if the hotel is closed?', answer: 'If the pickup location is closed upon arrival, attempt to contact the hotel manager using the provided phone number. If unreachable after 10 minutes, use the "Report Issue" button to cancel the delivery without penalty.' },
    { question: 'How is my delivery rating calculated?', answer: 'Your rating is a combined average of punctuality (arriving within the time window), condition of food upon delivery, and feedback from the receiving NGO.' },
    { question: 'Can I cancel an accepted delivery?', answer: 'You can cancel up to 30 minutes before the pickup window starts. Frequent late cancellations may temporarily suspend your ability to accept high-priority deliveries.' },
    { question: 'What should I do if the food is spoiled?', answer: 'Do not accept spoiled food. Take a photo if possible, politely inform the hotel staff, and use the "Report Issue" form to notify the administration immediately.' },
  ] : userType === 'hotel' ? [
    { question: 'How do I schedule a pickup?', answer: 'You can schedule a pickup by going to the Donations tab and creating a new donation entry. A volunteer will be assigned automatically.' },
    { question: 'What types of food can be donated?', answer: 'We accept freshly cooked meals, packaged foods, and raw ingredients that are well within their expiry date.' },
    { question: 'How can I update my hotel details?', answer: 'Go to the Profile tab to edit your hotel information, logo, and documents.' },
  ] : [
    { question: 'How do I receive donations?', answer: 'Donations are routed to your NGO based on your requirements and capacity. Ensure your capacity is correctly updated in the Profile section.' },
    { question: 'Can I reject a delivery?', answer: 'If the food does not meet quality standards, you can reject the delivery and use the "Report Issue" form.' },
    { question: 'How to update my organization details?', answer: 'Go to the Profile tab to edit your NGO information and verify documents.' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const userMsg = message.trim();
      setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
      
      setTimeout(() => {
        let reply = "I'm here to help! Could you provide more details?";
        const lowerMsg = userMsg.toLowerCase();
        
        if (lowerMsg.includes('closed') || lowerMsg.includes('hotel')) {
          reply = faqs[0]?.answer || "Please report the issue via the form.";
        } else if (lowerMsg.includes('rating') || lowerMsg.includes('capacity')) {
          reply = faqs[1]?.answer || "We have received your query.";
        } else if (lowerMsg.includes('cancel') || lowerMsg.includes('reject')) {
          reply = faqs[2]?.answer || "You can manage this in your dashboard.";
        } else if (lowerMsg.includes('spoiled') || lowerMsg.includes('bad food')) {
          reply = faqs[3]?.answer || "Please use the report issue form to log this.";
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
          reply = "Hello! How can I assist you today?";
        }

        setMessages(prev => [...prev, { id: Date.now().toString() + 1, text: reply, sender: 'support', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 1000);
    }
  };

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newComplaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      raisedBy: userType === 'hotel' ? 'Hotel' : userType === 'ngo' ? 'NGO' : 'Volunteer',
      name: 'Current User',
      category: issueType,
      priority: 'Medium',
      status: 'Open',
      date: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ''),
      assigned: 'Unassigned',
      description: description,
      deliveryRef: relatedId || 'N/A',
      parties: { hotel: 'N/A', ngo: 'N/A', volunteer: 'N/A' },
      timeline: [
        { event: 'Complaint Raised', time: 'Just now' }
      ],
      documents: [],
      adminNotes: ''
    };

    const existingStr = localStorage.getItem('adminComplaints');
    const existing = existingStr ? JSON.parse(existingStr) : null;
    if (existing && Array.isArray(existing)) {
      localStorage.setItem('adminComplaints', JSON.stringify([newComplaint, ...existing]));
    } else {
      localStorage.setItem('newComplaint', JSON.stringify(newComplaint)); // signaling AdminComplaintList to pick it up later if it mounts
    }

    // Clear form
    setIssueType('Hotel / Pickup Issue');
    setRelatedId('');
    setDescription('');
    
    toast('Issue reported successfully. Support team has been notified.', 'success');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Help & Support</h1>
        <p className="text-sm text-gray-500 mt-1">Get assistance with deliveries or report issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: FAQs & Emergency */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* FAQs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gray-400" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-colors hover:border-emerald-200">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left bg-white focus:outline-none"
                  >
                    <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-500' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Report Issue Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Report an Issue
            </h2>
            <p className="text-sm text-gray-500 mb-5">Encountered a problem? Let us know.</p>
            
            <form onSubmit={handleReportIssue} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Issue Type</label>
                  <select 
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-amber-500 focus:bg-white appearance-none"
                  >
                    <option>Hotel / Pickup Issue</option>
                    <option>NGO / Delivery Issue</option>
                    <option>App / Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Related ID (Optional)</label>
                  <input 
                    type="text" 
                    value={relatedId}
                    onChange={(e) => setRelatedId(e.target.value)}
                    placeholder="e.g. DEL-8823" 
                    className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-amber-500 focus:bg-white" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Description</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the issue in detail..." 
                  className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-amber-500 focus:bg-white resize-none" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="py-2.5 px-6 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
              >
                Submit Report
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Contact & Emergency */}
        <div className="flex flex-col gap-6">
          
          {/* Contact Support Chat */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-emerald-50 rounded-t-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Live Support</div>
                <div className="text-xs text-emerald-600 font-medium">Online • Typical reply &lt; 5m</div>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 flex flex-col gap-4">
              {messages.map(msg => (
                <div key={msg.id} className={`max-w-[80%] flex flex-col gap-1 ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-3 rounded-2xl shadow-sm text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium px-1">{msg.time}</div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="w-full py-2.5 pl-4 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-emerald-600 focus:bg-white" 
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 rounded-2xl border border-red-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-500" /> Emergency Contacts
            </h2>
            
            <div className="space-y-3">
              <a href="tel:100" className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-100 hover:border-red-300 transition-colors group">
                <div className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">Police / Emergency</div>
                <div className="text-sm font-bold text-red-600">100</div>
              </a>
              <a href="tel:+918000000000" className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-100 hover:border-red-300 transition-colors group">
                <div className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">FoodBridge Admin Hotline</div>
                <div className="text-sm font-bold text-red-600">+91 8000 000 000</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
