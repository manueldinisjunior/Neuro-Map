import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Brain, Search, Bell, Globe, Moon, Clock, Plus,
    ChevronDown, ChevronRight, User, CheckCircle2,
    BarChart3, Info, Maximize2, Menu
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TREE_DATA, CATEGORIES_STATS, type TreeItem } from '../data/knowledge';

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('neuro_token');
        navigate('/');
    };

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Left Sidebar: Knowledge Navigation (Premium Glassmorphic) */}
            <aside className="w-80 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none uppercase">MAXMUS</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cognitive OS</p>
                    </div>
                </div>

                <div className="px-6 pb-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search your knowledge..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/5 border-none rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-6 overflow-y-auto scrollbar-none py-4">
                    <div>
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Knowledge Navigation <span className="text-[9px] font-bold text-slate-300 ml-1">(Lawful)</span></p>
                        <div className="space-y-1">
                            {TREE_DATA.map(item => (
                                <SidebarTreeItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-50 bg-slate-50/30">
                    <button className="w-full bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 active:scale-95">
                        <Plus size={18} />
                        New Topic
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#eff3f8] relative overflow-hidden">
                {/* Global Top Bar */}
                <header className="h-20 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 border-b border-slate-100 flex-shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                            aria-label="Toggle menu"
                            title="Toggle menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex bg-slate-100/80 p-1.5 rounded-2xl gap-1 border border-white">
                        {['Dashboard', 'Notes', 'Mind Map'].map(tab => {
                            const path = tab === 'Dashboard' ? '/dashboard' :
                                tab === 'Notes' ? '/dashboard/notes' :
                                    '/dashboard/mind-map';
                            const isActive = location.pathname === path;

                            return (
                                <Link
                                    key={tab}
                                    to={path}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                                >
                                    {tab}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 pr-6 border-r border-slate-200">
                            <button title="History" className="text-slate-400 hover:text-blue-500 transition-colors"><Clock size={20} /></button>
                            <span className="text-xs font-black text-slate-400">0</span>
                            <button title="Dark Mode" className="text-slate-400 hover:text-indigo-500 transition-colors"><Moon size={20} /></button>
                        </div>
                        <button
                            title="Notifications"
                            aria-label="View notifications"
                            className="relative w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
                        >
                            <Bell size={20} />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold">2</div>
                        </button>
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 overflow-hidden relative">
                        <Outlet />
                    </div>

                    {/* Right Sidebar: Profile & Insights (Part of Dashboard view usually, but image shows it here) */}
                    {location.pathname === '/dashboard' && (
                        <aside className="w-96 border-l border-slate-200 flex flex-col bg-white overflow-y-auto scrollbar-none p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <User size={18} />
                                    </div>
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Profile & Insights</h2>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                                    <CheckCircle2 size={12} />
                                    <span>Insights Ready</span>
                                </div>
                            </div>

                            <section className="mb-10">
                                <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center justify-between">
                                    Top Knowledge Categories
                                    <BarChart3 size={14} className="text-slate-400" />
                                </h3>
                                <div className="space-y-4">
                                    {CATEGORIES_STATS.map((cat, idx) => (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold shadow-sm dynamic-bg" style={{ '--bg-color': cat.color } as React.CSSProperties}>
                                                        {String.fromCharCode(97 + idx).toUpperCase()}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600">{cat.label}</span>
                                                </div>
                                                <span className="text-xs font-black text-slate-800">{cat.value}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cat.value / 25) * 100}%` }}
                                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                                    className="h-full rounded-full dynamic-bg opacity-80"
                                                    style={{ '--bg-color': cat.color } as React.CSSProperties}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-10 p-6 bg-slate-50 border border-slate-100 rounded-[28px]">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Clock size={14} />
                                    Time on Neuro Map
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Member Since:</span>
                                        <span className="text-slate-800 font-bold tracking-tight">Apr 2024</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Days Active:</span>
                                        <span className="text-slate-800 font-bold tracking-tight">37 days</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Last Activity:</span>
                                        <span className="text-slate-800 font-bold tracking-tight">1 hour ago</span>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                        <Brain size={16} className="text-blue-500" />
                                        Behavioral Snapshot
                                        <span className="text-[9px] text-slate-400 normal-case font-medium ml-1">(Non-clinical)</span>
                                    </h3>
                                    <Info size={14} className="text-slate-300" />
                                </div>

                                <div className="p-6 bg-gradient-to-br from-blue-50/50 to-white border border-blue-100/50 rounded-[32px] relative overflow-hidden">
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                                        Your activity suggests a strong preference for <span className="text-blue-600 font-bold">structured learning and analytical problem-solving</span>, with sustained attention in Tech & Digital Topics.
                                    </p>
                                    <div className="flex flex-col gap-2 p-3 bg-white/80 rounded-xl border border-blue-50 mb-4 shadow-sm">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tendency Hypothesis</p>
                                        <p className="text-[11px] text-slate-800 font-black">Convergent Thinker / Intellectual Depth</p>
                                    </div>
                                    <button className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-sm">
                                        Take Big Five Assessment
                                    </button>
                                </div>
                            </section>
                        </aside>
                    )}
                </main>
            </div>
        </div>
    );
}

function SidebarTreeItem({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
    const [isExpanded, setIsExpanded] = useState(item.expanded || false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="space-y-0.5">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer dynamic-ml ${item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-500'}`}
                style={{ '--ml-value': `${depth * 4}px` } as React.CSSProperties}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {hasChildren ? (
                        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
                            <ChevronDown size={14} className={item.active ? 'text-blue-500' : 'text-slate-300'} />
                        </motion.div>
                    ) : (
                        <ChevronRight size={14} className="text-blue-300 opacity-0 group-hover:opacity-100" />
                    )}
                    <span className={`text-xs font-bold truncate ${item.active ? 'text-blue-600' : 'text-slate-600'}`}>{item.label}</span>
                </div>
                {item.count && (
                    <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-lg shadow-blue-500/20">
                        {item.count}
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-l border-slate-100 ml-4 pl-1"
                    >
                        {item.children!.map(child => (
                            <SidebarTreeItem key={child.id} item={child} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
