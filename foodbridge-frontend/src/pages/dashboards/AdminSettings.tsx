import { useState } from "react";
import { Shield, Bell, Database, Globe } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

export default function AdminSettings() {
  const { toast } = useToast();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    maintenanceMode: false,
    autoApproval: true,
    emailAlerts: true,
    smsAlerts: false,
    twoFactor: true,
    publicAPI: true
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    toast(`Setting updated successfully.`, 'success');
  };

  const sections = [
    {
      id: "platform",
      title: "Platform Controls",
      icon: Globe,
      description: "Manage core platform availability and rules.",
      settings: [
        { key: "maintenanceMode", label: "Maintenance Mode", description: "Disable public access while upgrading systems.", type: "toggle" },
        { key: "autoApproval", label: "Auto-Approve Verified Docs", description: "Automatically approve users if AI document verification succeeds.", type: "toggle" }
      ]
    },
    {
      id: "security",
      title: "Security Settings",
      icon: Shield,
      description: "Admin account and system security.",
      settings: [
        { key: "changePassword", label: "Administrator Password", description: "Update your master login password.", type: "button", buttonLabel: "Change Password" }
      ]
    },
    {
      id: "notifications",
      title: "System Alerts",
      icon: Bell,
      description: "Where critical system logs and alerts are sent.",
      settings: [
        { key: "emailAlerts", label: "Critical Email Alerts", description: "Send downtime and high-priority complaints to admin@foodbridge.org.", type: "toggle" },
        { key: "smsAlerts", label: "SMS Alerts", description: "Send texts for server outages to on-call engineers.", type: "toggle" }
      ]
    },
    {
      id: "data",
      title: "Data & Storage",
      icon: Database,
      description: "Manage retention policies and backups.",
      settings: [
        { key: "exportData", label: "Export Platform Data", description: "Download a full JSON dump of all public ledger donations.", type: "button", buttonLabel: "Export Data" },
        { key: "clearLogs", label: "Clear Activity Logs", description: "Delete system logs older than 90 days. This cannot be undone.", type: "button", buttonLabel: "Clear Logs", danger: true }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl flex flex-col gap-6">
      
      {sections.map(section => {
        const Icon = section.icon;
        return (
          <div key={section.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm shrink-0">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{section.title}</h3>
                <p className="text-[13.5px] font-medium text-gray-500 mt-0.5">{section.description}</p>
              </div>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              {section.settings.map(setting => (
                <div key={setting.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">{setting.label}</span>
                    <span className="text-[13.5px] text-gray-500 mt-0.5">{setting.description}</span>
                  </div>
                  
                  {setting.type === 'toggle' ? (
                    <button 
                      onClick={() => handleToggle(setting.key)}
                      className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        toggles[setting.key] ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        toggles[setting.key] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => (setting as any).danger ? toast("Logs cannot be cleared in demo mode.", "error") : toast("Action processed successfully.", "success")}
                      className={`px-4 py-2 text-[13px] font-bold rounded-xl transition-all shadow-sm shrink-0 ${
                        (setting as any).danger 
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {setting.buttonLabel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

    </div>
  );
}
