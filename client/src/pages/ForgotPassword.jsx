import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/forgotpassword', { email });
      toast.success('Reset link sent to your email!');
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] p-10 glass rounded-[2.5rem] relative z-10"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-semibold group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <Mail size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Forgot Password?</h1>
          <p className="text-slate-400 font-medium">
            {sent 
              ? "We've sent a recovery link to your inbox. Please check your email." 
              : "No worries! Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-slate-500" size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/5 rounded-2xl text-white outline-none focus:border-primary/50 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Reset Link</>}
            </button>
          </form>
        )}

        {sent && (
          <button 
            onClick={() => setSent(false)}
            className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            Try another email
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
