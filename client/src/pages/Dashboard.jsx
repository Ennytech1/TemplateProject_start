import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  MoreVertical,
  Trash2,
  Loader2,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
      setTasks(data.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/tasks', newTask, { withCredentials: true });
      setTasks([data.data, ...tasks]);
      setShowAddModal(false);
      setNewTask({ title: '', description: '', priority: 'medium' });
      toast.success('Task created!');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus }, { withCredentials: true });
      setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { withCredentials: true });
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in relative pb-20">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 glass rounded-[2.5rem] relative overflow-hidden group"
      >
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Productivity Overview</span>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Main Workspace</h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Manage your daily targets and flow with ease. You currently have <strong className="text-white">{tasks.filter(t => t.status !== 'completed').length} active tasks</strong> remaining for today.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Tasks', value: tasks.length, icon: <LayoutDashboard />, color: 'text-primary' },
          { label: 'Pending', value: tasks.filter(t => t.status !== 'completed').length, icon: <Clock />, color: 'text-orange-500' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: <CheckCircle2 />, color: 'text-green-500' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass rounded-3xl border border-white/5 flex items-center gap-6 group hover:translate-y-[-4px] transition-all"
          >
            <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${stat.color} shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tasks Section Header */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold tracking-tight">Daily Tasks</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={18} />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Retrieving items...</p>
          </div>
        ) : tasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-6 glass rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-all ${task.status === 'completed' && 'grayscale opacity-60'}`}
              >
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleTaskStatus(task._id, task.status)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 border-dashed ${
                      task.status === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white/5 border-white/20 text-white/40 hover:border-primary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <CheckCircle2 size={24} />
                  </button>
                  <div>
                    <h3 className={`font-bold text-lg ${task.status === 'completed' && 'line-through text-slate-500'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                        task.priority === 'medium' ? 'bg-orange-500/20 text-orange-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {task.priority}
                      </span>
                      {task.description && <span className="text-xs text-slate-500 font-medium truncate max-w-[300px]">{task.description}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deleteTask(task._id)} className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                  <button className="p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 glass rounded-[3rem] border-dashed border-2 border-white/5 text-slate-500">
             <AlertCircle size={48} className="mb-4 opacity-20" />
             <p className="font-bold text-sm uppercase tracking-widest">No tasks yet</p>
             <p className="text-xs mt-2 italic font-medium">Click "Quick Add" to start your flow</p>
          </div>
        )}
      </div>

      {/* Add Task Modal overlay */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass p-10 rounded-[2.5rem] border border-white/10 z-[101] shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight text-white">Create Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Task Title</label>
                  <input 
                    autoFocus
                    required
                    value={newTask.title}
                    onChange={e => setNewTask({...newTask, title: e.target.value})}
                    placeholder="e.g. Design Dashboard Prototypes"
                    className="w-full px-5 py-4 bg-white/5 border border-white/5 focus:border-primary/50 transition-all rounded-2xl text-white outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Priority Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setNewTask({...newTask, priority: p})}
                        className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                          newTask.priority === p ? 'bg-primary text-white scale-105 shadow-xl shadow-primary/20' : 'bg-white/5 text-slate-400 border border-white/5'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 bg-white/5 text-slate-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/5 uppercase text-xs tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
