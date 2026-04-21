import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, Loader2, Save, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/users/resetpassword/${token}`, { password });
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-green-500/10 blur-[100px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] p-10 glass rounded-[2.5rem] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6 shadow-xl shadow-green-500/10">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Set New Password</h1>
          <p className="text-slate-400 font-medium tracking-wide">
            Create a fresh password to regain access to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">New Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-500" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/5 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
            <div className="relative flex items-center">
              <ShieldCheck className="absolute left-4 text-slate-500" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/5 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all font-medium"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#004d00] hover:bg-[#006600] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-2xl shadow-green-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Password</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
