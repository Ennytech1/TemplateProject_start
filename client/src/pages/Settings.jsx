import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Loader2, 
  Shield, 
  Bell, 
  Briefcase,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  XCircle,
  QrCode
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateProfile, loading } = useAuth();
  
  // States
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    businessName: 'FlowDo Pro Ltd',
    location: 'London, UK'
  });

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailAlerts: true,
    pushNotifications: true,
    whatsappUpdates: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name: formData.name, email: formData.email });
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Profile & Settings</h1>
          <p className="text-slate-400 font-medium tracking-wide">Manage your personal details, business profile, and preferences.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-white/5 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/10 uppercase text-xs tracking-widest">
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-[#004d00] hover:bg-[#006600] text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-green-900/20 disabled:opacity-70 disabled:cursor-not-allowed uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Save All Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Information Card */}
          <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute left-0 top-0 w-1 h-full bg-green-800 opacity-80" />
            <div className="flex items-center gap-3 mb-8">
              <User size={20} className="text-green-500" />
              <h2 className="text-xl font-bold tracking-tight">Personal Information</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white border-2 border-white/10 overflow-hidden shadow-2xl">
                   {/* In a real app we'd use user.avatar */}
                   <span className="group-hover:scale-110 transition-transform duration-500">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-[#004d00] text-white rounded-full border-4 border-[#0f172a] hover:scale-110 transition-all group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{formData.name}</h3>
                <p className="text-slate-500 font-medium flex items-center gap-2">
                  <Mail size={16} />
                  {formData.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:border-green-800 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:border-green-800 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Business Profile Card */}
          <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute left-0 top-0 w-1 h-full bg-[#5d1641] opacity-70" />
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={20} className="text-purple-400" />
              <h2 className="text-xl font-bold tracking-tight">Business Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Business Name</label>
                <input 
                  type="text" 
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:border-purple-800 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:border-purple-800 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Connected Services Card */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h2 className="text-xl font-bold tracking-tight mb-8">Connected Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-green-800/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">WhatsApp Business</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Connected</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Disconnect</button>
              </div>

              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-800/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Fintech Sync</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Connected</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Disconnect</button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          
          {/* Security Card */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <Shield size={20} className="text-green-500" />
              <h2 className="text-xl font-bold tracking-tight">Security</h2>
            </div>
            
            <div className="bg-white/5 p-6 rounded-2xl mb-6 relative overflow-hidden">
               <div className="flex justify-between items-start mb-2">
                 <p className="font-bold text-sm leading-tight max-w-[140px]">Two-Factor Authentication</p>
                 <button 
                  onClick={() => handleToggle('twoFactor')}
                  className={`w-11 h-6 rounded-full relative transition-all duration-300 ${toggles.twoFactor ? 'bg-green-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${toggles.twoFactor ? 'left-[23px]' : 'left-1'}`} />
                </button>
               </div>
               <p className="text-[11px] text-slate-500 leading-normal">Add an extra layer of security to your account.</p>
            </div>

            <button className="w-full py-4 bg-white/5 border border-white/5 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-300 flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Lock size={14} />
              Change Password
            </button>
          </div>

          {/* Notification Preferences Card */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <Bell size={20} className="text-green-500" />
              <h2 className="text-xl font-bold tracking-tight">Notification Preferences</h2>
            </div>
            
            <div className="space-y-8">
               {[
                 { id: 'emailAlerts', label: 'Email Alerts', sub: 'RSVP updates and event summaries', value: toggles.emailAlerts },
                 { id: 'pushNotifications', label: 'Push Notifications', sub: 'Real-time guest check-in alerts', value: toggles.pushNotifications },
                 { id: 'whatsappUpdates', label: 'WhatsApp Notifications', sub: 'Daily guest list updates', value: toggles.whatsappUpdates },
               ].map(item => (
                 <div key={item.id} className="flex justify-between items-center gap-4">
                   <div className="grow">
                     <p className="font-bold text-sm mb-0.5">{item.label}</p>
                     <p className="text-[10px] text-slate-500 leading-normal">{item.sub}</p>
                   </div>
                   <button 
                    onClick={() => handleToggle(item.id)}
                    className={`w-11 h-6 rounded-full relative transition-all duration-300 shrink-0 ${item.value ? 'bg-green-600' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${item.value ? 'left-[23px]' : 'left-1'}`} />
                  </button>
                 </div>
               ))}
            </div>
          </div>

          {/* Digital Business Card Promo */}
          <div className="bg-gradient-to-br from-[#003300] to-[#001a00] p-8 rounded-3xl relative overflow-hidden border border-white/10 group cursor-pointer shadow-2xl shadow-green-900/20">
             <div className="flex items-center gap-6 relative z-10">
               <div className="w-16 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0">
                  <QrCode size={24} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                  <h4 className="font-bold text-sm mb-1">Digital Business Card</h4>
                  <p className="text-[10px] text-green-300 opacity-80 leading-normal">Share your profile with collaborators instantly.</p>
               </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500 opacity-5 blur-[40px]" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
