import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BrainCircuit, LogOut, Settings, Plus, Home,
    Calendar, CheckSquare, FileText, GraduationCap,
    CreditCard, HelpCircle, MessageSquare, Search,
    Bell, ChevronDown, MoreVertical
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('neuro_token');
        navigate('/');
    };

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: 1 },
        { icon: FileText, label: 'Notes', path: '/notes' },
        { icon: GraduationCap, label: 'Courses', path: '/courses' },
        { icon: CreditCard, label: 'Banking', path: '/banking' },
    ];

    const bottomNavItems = [
        { icon: HelpCircle, label: 'Support', path: '/support' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden font-sans text-slate-100">
            {/* Left Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 text-slate-400 flex flex-col flex-shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <BrainCircuit size={20} />
                    </div>
                    <span className="font-bold text-xl text-white">Neuro Notes</span>
                </div>

                <div className="px-4 mb-6">
                    <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-green-500/50 overflow-hidden shadow-lg">
                                <img src="https://ui-avatars.com/api/?name=Vladimir+Raksha&background=f97316&color=fff" alt="User" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-white truncate w-24">Vladimir Raksha</p>
                                <p className="text-xs text-slate-500 font-medium">Pro Plan</p>
                            </div>
                        </div>
                        <ChevronDown size={16} className="text-slate-500 group-hover:text-slate-300" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-white/10 text-white'
                                : 'hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    <div className="pt-8 pb-4">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Support</p>
                        {bottomNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 hover:text-white transition-all"
                            >
                                <item.icon size={20} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Type to search..."
                                aria-label="Search notes"
                                className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/5 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 rounded-xl outline-none transition-all placeholder:text-slate-500 text-slate-200"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative"
                            aria-label="Notifications"
                            title="Notifications"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                            aria-label="Messages"
                            title="Messages"
                        >
                            <MessageSquare size={20} />
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-2" />
                        <button
                            className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-xl transition-all"
                            aria-label="User menu"
                        >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                ME
                            </div>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Scrollable Body */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-8">
                        <Outlet />
                    </div>
                </main>

                {/* Footer with Rights */}
                <footer className="h-10 bg-slate-950 border-t border-white/5 px-8 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-widest flex-shrink-0 font-bold">
                    <span>&copy; {new Date().getFullYear()} Neuro Notes</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                        <span className="text-blue-500/80">All Rights Reserved</span>
                    </div>
                </footer>
            </div>

            {/* Right Sidebar - Activity Feed */}
            <aside className="w-80 bg-slate-900 border-l border-white/5 hidden xl:flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-100 uppercase tracking-wider text-xs">Activity</h3>
                        <button
                            className="text-slate-500 hover:text-slate-300 transition-colors"
                            aria-label="More activity options"
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="relative pl-6 pb-6 border-l-2 border-white/5 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-sm"></div>
                            <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Today, July 30, 2019</p>
                            <div className="flex items-center gap-3">
                                <img src="https://ui-avatars.com/api/?name=Tillie+Benson&background=3b82f6&color=fff" className="w-8 h-8 rounded-full" alt="" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">Tillie Benson</p>
                                    <p className="text-xs text-slate-400">Fixed issue on dashboard</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-6 pb-6 border-l-2 border-white/5 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-slate-900 shadow-sm"></div>
                            <div className="flex items-center gap-3">
                                <img src="https://ui-avatars.com/api/?name=Jim+Miller&background=f97316&color=fff" className="w-8 h-8 rounded-full" alt="" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">Jim Miller</p>
                                    <p className="text-xs text-slate-400">Uploaded 4 attachments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6">
                    {/* Additional widgets can go here */}
                </div>
            </aside>
        </div>
    );
}
