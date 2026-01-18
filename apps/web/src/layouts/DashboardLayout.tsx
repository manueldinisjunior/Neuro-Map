import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Brain, Search, Bell, ChevronLeft, Plus, Minus, Focus,
    ChevronDown, ChevronRight, LayoutDashboard, FileText, Share2
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TREE_DATA, type TreeItem } from '../data/knowledge';
import { useTopics } from '../context/TopicContext';

// Extended tree data with progress for UI
const SIDEBAR_DATA = [
    { id: 'wissenschaft', label: 'Wissenschaft', icon: '🔬', count: 8, progress: null, children: [] },
    {
        id: 'technologie', label: 'Technologie', icon: '💻', count: null, progress: 40, expanded: true,
        children: [
            { id: 'frontend', label: 'Frontend', count: 13 },
            { id: 'sicherheit', label: 'Sicherheit', count: 3 },
            { id: 'data', label: 'Data', count: 5 }
        ]
    },
    {
        id: 'sprache', label: 'Sprache', icon: '🗣️', count: null, progress: 40,
        children: [
            { id: 'frontend-2', label: 'Frontend', count: 13 }
        ]
    },
    { id: 'kultur', label: 'Kultur', icon: '🎭', count: 3, progress: null, children: [] },
    { id: 'beruf', label: 'Beruf', icon: '💼', count: 1, progress: null, children: [] },
    { id: 'ausbildung', label: 'Ausbildung', icon: '🎓', count: 9, progress: null, children: [] },
    { id: 'gesundheit', label: 'Gesundheit', icon: '❤️', count: null, progress: 2, children: [] },
    { id: 'kreativitat', label: 'Kreativität', icon: '✨', count: null, progress: 7, children: [] }
];

const PROJECTS_DATA = [
    { id: 'startup', label: 'Startup Ideen' }
];

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { setIsCreateModalOpen } = useTopics();

    return (
        <div className="h-screen w-full bg-[#f1f5f9] flex flex-col overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Single Row Header */}
            <header className="flex-shrink-0 z-50 bg-white border-b border-slate-200/80 h-16 px-4 flex items-center justify-between">
                {/* Left: Logo & Collapse */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Brain size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-800 tracking-tight hidden sm:block">Neuro Map</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors ml-2"
                        aria-label="Toggle sidebar"
                        title="Toggle sidebar"
                    >
                        <ChevronLeft size={18} className={`transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Center: Navigation Tabs */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl gap-0.5">
                        {[
                            { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                            { id: 'notes', label: 'Notes', path: '/dashboard/notes', icon: FileText },
                            { id: 'graph', label: 'Graph View', path: '/dashboard/mind-map', icon: Share2 }
                        ].map(tab => {
                            const isActive = location.pathname === tab.path;
                            const Icon = tab.icon;
                            return (
                                <Link
                                    key={tab.id}
                                    to={tab.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="hidden md:inline">{tab.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Notifications & Profile */}
                <div className="flex items-center gap-3">
                    <button
                        title="Notifications"
                        aria-label="View notifications"
                        className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                    >
                        <Bell size={18} />
                    </button>

                    <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800 leading-tight">Alex Chen</p>
                            <p className="text-xs text-slate-400 font-medium">Pro Plan</p>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-amber-300 to-amber-500 shadow-md ring-2 ring-white cursor-pointer">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffd5dc" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area with Sidebar */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 260, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 z-30"
                        >
                            {/* Search */}
                            <div className="p-4 border-b border-slate-100">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search topics..."
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Topic Tree */}
                            <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 px-3 py-3">
                                <div className="space-y-0.5">
                                    {SIDEBAR_DATA.map(item => (
                                        <SidebarTopicItem key={item.id} item={item} />
                                    ))}
                                </div>

                                {/* Projects Section */}
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Projects</p>
                                    {PROJECTS_DATA.map(project => (
                                        <div
                                            key={project.id}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-600 text-sm font-medium transition-colors"
                                        >
                                            <ChevronRight size={14} className="text-slate-400" />
                                            {project.label}
                                        </div>
                                    ))}
                                </div>
                            </nav>

                            {/* Bottom: Zoom Controls & New Topic */}
                            <div className="p-4 border-t border-slate-100 space-y-3">
                                {/* Zoom Controls - Only show on Graph View */}
                                {location.pathname === '/dashboard/mind-map' && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                                            title="Zoom In"
                                            aria-label="Zoom In"
                                        >
                                            <Plus size={18} />
                                        </button>
                                        <button
                                            className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                                            title="Zoom Out"
                                            aria-label="Zoom Out"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <button
                                            className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                                            title="Center View"
                                            aria-label="Center View"
                                        >
                                            <Focus size={18} />
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsCreateModalOpen(true);
                                    }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                                >
                                    <Plus size={18} />
                                    New Topic
                                </button>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main View */}
                <main className="flex-1 flex flex-col relative overflow-hidden">
                    <div className="flex-1 overflow-hidden relative">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

interface SidebarItem {
    id: string;
    label: string;
    icon?: string;
    count?: number | null;
    progress?: number | null;
    expanded?: boolean;
    children?: { id: string; label: string; count?: number }[];
}

function SidebarTopicItem({ item }: { item: SidebarItem }) {
    const [isExpanded, setIsExpanded] = useState(item.expanded || false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div>
            {/* Main Item */}
            <div
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer hover:bg-slate-50`}
            >
                <div className="flex items-center gap-2.5 overflow-hidden">
                    {hasChildren ? (
                        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ duration: 0.15 }}>
                            <ChevronDown size={14} className="text-slate-400" />
                        </motion.div>
                    ) : (
                        <div className="w-3.5" />
                    )}
                    {item.icon && <span className="text-base">{item.icon}</span>}
                    <span className="text-sm font-medium text-slate-700 truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Progress Badge or Count */}
                    {item.progress !== null && item.progress !== undefined && (
                        <>
                            <span className="text-xs text-slate-400 font-medium">{item.progress}%</span>
                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                                {item.progress}%
                            </span>
                        </>
                    )}
                    {item.count !== null && item.count !== undefined && !item.progress && (
                        <span className="text-xs text-slate-400 font-medium">{item.count}</span>
                    )}
                </div>
            </div>

            {/* Children */}
            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden ml-5 border-l border-slate-100"
                    >
                        {item.children!.map(child => (
                            <div
                                key={child.id}
                                className="flex items-center justify-between px-3 py-1.5 ml-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronRight size={12} className="text-slate-300" />
                                    <span className="text-sm text-slate-600">{child.label}</span>
                                </div>
                                {child.count && (
                                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                        {child.count}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
