import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      await updateProfile({ name, email, password });
      toast.success('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[800px] p-12 glass rounded-[2.5rem]"
      >
        <div className="text-center mb-12">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-primary/30 border-4 border-white/5">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 p-2.5 bg-[#1e293b] border-2 border-[#0f172a] text-white rounded-full hover:bg-primary transition-all transform hover:scale-110 shadow-lg">
              <Camera size={18} />
            </button>
          </div>
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Profile Settings</h2>
          <p className="text-slate-400">Manage your public information and security credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Full Name</label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-4 text-slate-500" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">New Password</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Confirm New Password</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-slate-500" />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              className="w-full max-w-[280px] py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Update Profile</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
