import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Brain, Search, Bell, Moon, Clock, Plus,
    ChevronDown, ChevronRight, User, CheckCircle2,
    BarChart3, Info, LayoutDashboard, FileText, Share2, PanelLeftClose
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TREE_DATA, CATEGORIES_STATS, type TreeItem } from '../data/knowledge';
import { useTopics } from '../context/TopicContext';

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Toggle for sidebar visibility if needed, defaulting to true
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { setIsCreateModalOpen } = useTopics();

    const handleLogout = () => {
        localStorage.removeItem('neuro_token');
        navigate('/');
    };

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Double-Decker Header */}
            <header className="flex-shrink-0 z-50 bg-white shadow-sm border-b border-slate-200 relative">
                {/* Top Row: Branding & Utilities */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
                            <Brain size={24} />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none uppercase">MAXMUS</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Cognitive OS</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
                            <div className="px-3 py-1.5 flex items-center gap-2 text-slate-400">
                                <Clock size={16} />
                                <span className="text-xs font-black">0</span>
                            </div>
                            <button
                                title="Toggle theme"
                                aria-label="Toggle theme"
                                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors shadow-sm"
                            >
                                <Moon size={16} />
                            </button>
                        </div>

                        <button
                            title="Notifications"
                            aria-label="View notifications"
                            className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
                        >
                            <Bell size={20} />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold">2</div>
                        </button>

                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Search & Navigation */}
                <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4 w-1/3">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className={`p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors ${isSidebarOpen ? 'bg-slate-100 text-slate-600' : ''}`}
                            aria-label="Toggle sidebar"
                            title="Toggle sidebar"
                        >
                            <PanelLeftClose size={20} />
                        </button>
                        <div className="relative group flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search your knowledge..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-white placeholder:text-slate-400 border-none rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:bg-slate-700 transition-all outline-none font-medium"
                            />
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                            {[
                                { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                                { id: 'notes', label: 'Notes', path: '/dashboard/notes', icon: FileText },
                                { id: 'graph', label: 'Graph View', path: '/dashboard/mind-map', icon: Share2 } // Updated label
                            ].map(tab => {
                                const isActive = location.pathname === tab.path;
                                const Icon = tab.icon;
                                return (
                                    <Link
                                        key={tab.id}
                                        to={tab.path}
                                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                                            }`}
                                    >
                                        <Icon size={14} />
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-1/3"></div> {/* Spacer to balance flex layout */}
                </div>
            </header>

            {/* Main Content Area with Sidebar */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Knowledge Navigation (Now simpler) */}
                <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-white border-r border-slate-100 flex flex-col flex-shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
                        >
                            <div className="p-6 border-b border-slate-50 bg-gradient-to-b from-slate-50/50">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <Brain size={14} className="text-blue-500" />
                                    Knowledge Tree
                                </p>
                            </div>

                            <nav className="flex-1 px-4 space-y-6 overflow-y-auto scrollbar-none py-4">
                                <div className="space-y-1">
                                    {TREE_DATA.map(item => (
                                        <SidebarTreeItem key={item.id} item={item} />
                                    ))}
                                </div>
                            </nav>

                            <div className="p-6 border-t border-slate-50 bg-slate-50/30">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsCreateModalOpen(true);
                                    }}
                                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-slate-900/10 active:scale-95"
                                >
                                    <Plus size={16} />
                                    New Topic
                                </button>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main View */}
                <main className="flex-1 flex flex-col bg-[#eff3f8] relative overflow-hidden">
                    <div className="flex-1 overflow-hidden relative flex">
                        <div className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                            <Outlet />
                            <div className="h-20"></div> {/* Bottom spacer */}
                        </div>

                        {/* Right Sidebar: Profile & Insights (Only on Dashboard) */}
                        {location.pathname === '/dashboard' && (
                            <aside className="w-80 border-l border-slate-200 flex flex-col bg-white overflow-y-auto scrollbar-none p-6 hidden xl:flex">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <User size={18} />
                                        </div>
                                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Profile & Insights</h2>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                                        <CheckCircle2 size={12} />
                                        <span>Ready</span>
                                    </div>
                                </div>

                                <section className="mb-10">
                                    <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center justify-between">
                                        Top Categories
                                        <BarChart3 size={14} className="text-slate-400" />
                                    </h3>
                                    <div className="space-y-4">
                                        {CATEGORIES_STATS.map((cat, idx) => (
                                            <div key={idx}>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold shadow-sm ${cat.colorClass}`}>
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
                                                        className={`h-full rounded-full opacity-80 ${cat.colorClass}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="mb-8 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Clock size={14} />
                                        Time on MAXMUS
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 font-medium">Member Since:</span>
                                            <span className="text-slate-800 font-bold tracking-tight">Apr 2024</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 font-medium">Days Active:</span>
                                            <span className="text-slate-800 font-bold tracking-tight">37</span>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl relative overflow-hidden shadow-xl shadow-blue-500/20">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Brain size={16} className="text-blue-200" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Analysis</span>
                                            </div>
                                            <p className="text-xs leading-relaxed font-medium mb-4 text-blue-50">
                                                Strong preference for <span className="text-white font-bold">analytical problem-solving</span> detected.
                                            </p>
                                            <button className="w-full py-2.5 bg-white/10 border border-white/20 text-white rounded-[10px] text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm">
                                                View Report
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </aside>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarTreeItem({ item }: { item: TreeItem }) {
    const [isExpanded, setIsExpanded] = useState(item.expanded || false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="space-y-0.5">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-500'}`}
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
                        className="overflow-hidden border-l border-slate-100 ml-5 pl-1"
                    >
                        {item.children!.map(child => (
                            <SidebarTreeItem key={child.id} item={child} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
