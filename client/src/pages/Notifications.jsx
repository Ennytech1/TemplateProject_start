import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, Trash2, Loader2, BellOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notifications', { withCredentials: true });
      setNotifications(data.data);
    } catch (err) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}`, {}, { withCredentials: true });
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      toast.error('Failed to update notification');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Syncing alerts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in">
      <div className="flex justify-between items-end mb-12 px-2">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">Notifications</h1>
          <p className="text-slate-400 font-medium">Keep track of your latest activities and system alerts</p>
        </div>
        <button className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest py-3 px-6 bg-red-500/10 rounded-2xl hover:bg-red-500/20 transition-all border border-red-500/10">
          <Trash2 size={16} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <motion.div
                key={notif._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => !notif.read && markAsRead(notif._id)}
                className={`flex gap-6 p-8 glass rounded-[2.5rem] relative transition-all group cursor-pointer ${
                  !notif.read ? 'border-l-4 border-l-primary bg-primary/5' : 'hover:bg-white/[0.02] border-white/5 opacity-80'
                }`}
              >
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                  notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
                  notif.type === 'info' ? 'bg-primary/10 text-primary' :
                  notif.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {notif.type === 'success' && <CheckCircle size={26} />}
                  {notif.type === 'info' && <Info size={26} />}
                  {notif.type === 'warning' && <AlertTriangle size={26} />}
                  {notif.type === 'error' && <BellOff size={26} />}
                </div>
                <div className="grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">{notif.title}</h3>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 glass rounded-[3rem] border-dashed border-2 border-white/5"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-600">
                <BellOff size={40} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No new alerts</p>
              <p className="text-slate-600 text-xs mt-2">We'll let you know when something happens</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
