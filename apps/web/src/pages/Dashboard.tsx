import { motion } from 'framer-motion';
import {
    Clock,
    Zap,
    Target,
    TrendingUp,
    ArrowRight,
    Plus,
    FileText,
    Brain,
    Calendar
} from 'lucide-react';
import { CATEGORIES_STATS } from '../data/knowledge';

export default function Dashboard() {
    return (
        <div className="flex-1 h-full overflow-y-auto scrollbar-none p-10 bg-[#eff3f8]">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">
                        Good evening, Manuel
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">
                        You're on a <span className="text-blue-600 font-bold">14 day learning streak</span>. Keep up the momentum!
                    </p>
                </motion.header>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Notes', value: '1,284', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Connections', value: '3,892', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Daily Goal', value: '85%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { label: 'Brain Score', value: '942', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all border border-slate-100 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-wider group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                    +12%
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-1">{stat.value}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Recent Activity & Quick Actions */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Actions (Banner style) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl shadow-blue-500/30"
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight mb-2">Capture a new thought?</h2>
                                    <p className="text-blue-100 font-medium mb-6 max-w-md">
                                        Expand your Neuro Map by adding new nodes. The AI will automatically suggest connections.
                                    </p>
                                    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
                                        <Plus size={16} />
                                        Create Smart Note
                                    </button>
                                </div>
                                <div className="hidden sm:block opacity-20 transform rotate-12 scale-150 translate-x-10 translate-y-10">
                                    <Brain size={200} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Activity List */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                    <Clock size={20} className="text-slate-400" />
                                    Recent Activity
                                </h3>
                                <button className="text-xs font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest flex items-center gap-1">
                                    View All <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: 'The Ethics of AI Consciousness', category: 'Philosophy', time: '2 mins ago', type: 'Note Added' },
                                    { title: 'React Server Components', category: 'Web Development', time: '1 hour ago', type: 'Node Linked' },
                                    { title: 'Dopamine Fasting Protocols', category: 'Neuroscience', time: '4 hours ago', type: 'Note Edited' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-medium text-slate-400">{item.time}</span>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {item.type}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Suggested & Focus */}
                    <div className="space-y-8">

                        {/* Daily Focus Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Calendar size={20} />
                                </div>
                                <h3 className="font-black text-slate-800">Daily Focus</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-600">
                                        <span>System Design</span>
                                        <span>3/5 Tasks</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[60%] rounded-full" />
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 min-w-[16px] w-4 h-4 rounded-full border-2 border-slate-300" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-700 line-through opacity-50">Review Microservices Architecture</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 mt-3">
                                        <div className="mt-0.5 min-w-[16px] w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">Study CAP Theorem tradeoffs</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 mt-3">
                                        <div className="mt-0.5 min-w-[16px] w-4 h-4 rounded-full border-2 border-slate-300" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-400">Database Sharding Strategies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Top Categories Progress */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-100"
                        >
                            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500" />
                                Trending Topics
                            </h3>
                            <div className="space-y-5">
                                {CATEGORIES_STATS.slice(0, 4).map((cat, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-xs shadow-md dynamic-bg" style={{ '--bg-color': cat.color } as React.CSSProperties}>
                                            {cat.label.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between mb-1.5">
                                                <h4 className="text-xs font-bold text-slate-700 truncate">{cat.label}</h4>
                                                <span className="text-[10px] font-black text-slate-400">{cat.value} Notes</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full dynamic-bg dynamic-width opacity-80"
                                                    style={{
                                                        '--bg-color': cat.color,
                                                        '--width-value': `${(cat.value / 25) * 100}%`
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
