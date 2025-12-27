import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BrainCircuit, LogOut, Settings, Plus, Home,
    Calendar, CheckSquare, FileText, GraduationCap,
    CreditCard, HelpCircle, MessageSquare, Search,
    Bell, ChevronDown, MoreVertical, User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TranslationWidget } from '../components/TranslationWidget';

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('neuro_token');
        navigate('/');
    };

    const navItems = [
        { icon: Home, label: t('nav.dashboard'), path: '/dashboard' },
        { icon: Calendar, label: t('nav.calendar'), path: '/calendar' },
        { icon: CheckSquare, label: t('nav.tasks'), path: '/tasks', badge: 1 },
        { icon: FileText, label: t('nav.notes'), path: '/dashboard' },
        { icon: GraduationCap, label: t('nav.courses'), path: '/courses' },
        { icon: CreditCard, label: t('nav.banking'), path: '/banking' },
    ];

    const bottomNavItems = [
        { icon: HelpCircle, label: t('nav.support'), path: '/support' },
        { icon: Settings, label: t('nav.settings'), path: '/settings' },
    ];

    return (
        <div className="h-screen bg-zinc-950 flex overflow-hidden font-sans text-zinc-100">
            {/* Left Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-zinc-400 flex flex-col flex-shrink-0">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <BrainCircuit size={22} />
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">Neuro</span>
                </div>

                <div className="px-5 mb-8">
                    <button className="w-full flex items-center justify-between p-2.5 bg-zinc-800/50 rounded-2xl hover:bg-zinc-800 transition-all group border border-zinc-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-zinc-700 overflow-hidden border border-zinc-600">
                                <img src="https://ui-avatars.com/api/?name=Vladimir+Raksha&background=3f3f46&color=fff" alt="User" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-white truncate w-24">Vladimir R.</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Pro Plan</p>
                            </div>
                        </div>
                        <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400" />
                    </button>
                </div>

                <nav className="flex-1 px-5 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-zinc-800 text-white border border-zinc-700'
                                : 'hover:bg-zinc-800/50 hover:text-white border border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={location.pathname === item.path ? 'text-blue-400' : ''} />
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg shadow-lg shadow-blue-600/10">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    <div className="pt-10 pb-4">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-4">{t('nav.support')}</p>
                        {bottomNavItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 hover:text-white transition-all border border-transparent"
                            >
                                <item.icon size={18} />
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="p-5 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold"
                    >
                        <LogOut size={18} />
                        <span className="text-sm">{t('nav.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between px-10 flex-shrink-0">
                    <div className="flex-1 max-w-lg">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder={t('dashboard.search')}
                                aria-label="Search"
                                className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800/50 focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/30 rounded-2xl outline-none transition-all placeholder:text-zinc-600 text-zinc-200 text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <TranslationWidget />
                        <div className="h-6 w-px bg-zinc-800 mx-2" />
                        <button
                            className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all relative"
                            aria-label={t('common.notifications')}
                            title={t('common.notifications')}
                        >
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        </button>
                        <button
                            className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                            aria-label={t('common.profile')}
                            title={t('common.profile')}
                        >
                            <User size={18} />
                        </button>
                    </div>
                </header>

                {/* Dashboard Scrollable Body */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-950/50">
                    <div className="p-10 max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="h-12 bg-zinc-950 border-t border-zinc-900 px-10 flex items-center justify-between text-[11px] text-zinc-600 uppercase tracking-widest flex-shrink-0 font-bold">
                    <span>&copy; {new Date().getFullYear()} Neuro Notes</span>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-zinc-400 transition-colors">{t('footer.privacy')}</a>
                        <a href="#" className="hover:text-zinc-400 transition-colors">{t('footer.terms')}</a>
                        <span className="text-zinc-700">|</span>
                        <span className="text-blue-600/60">{t('footer.rights')}</span>
                    </div>
                </footer>
            </div>

            {/* Right Sidebar - Activity Feed */}
            <aside className="w-80 bg-zinc-900 border-l border-zinc-800 hidden 2xl:flex flex-col flex-shrink-0">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-zinc-500 uppercase tracking-[0.2em] text-[10px]">{t('dashboard.activity')}</h3>
                        <button
                            className="text-zinc-600 hover:text-zinc-400 transition-colors"
                            aria-label={t('common.more')}
                            title={t('common.more')}
                        >
                            <MoreVertical size={16} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="relative pl-6 pb-2 border-l border-zinc-800 last:pb-0">
                            <div className="absolute -left-[6.5px] top-0 w-3 h-3 rounded-full bg-blue-500 border border-zinc-950 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                            <p className="text-[10px] font-bold text-zinc-600 mb-3 uppercase tracking-wider">Today, July 30</p>
                            <div className="flex items-center gap-4 bg-zinc-950/30 p-3 rounded-2xl border border-zinc-800/50 hover:bg-zinc-950/50 transition-colors">
                                <img src="https://ui-avatars.com/api/?name=Tillie+Benson&background=3b82f6&color=fff" className="w-8 h-8 rounded-xl" alt="" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-200">Tillie Benson</p>
                                    <p className="text-[11px] text-zinc-500 font-medium">Updated 3 notes</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-6 pb-2 border-l border-zinc-800 last:pb-0">
                            <div className="absolute -left-[6.5px] top-0 w-3 h-3 rounded-full bg-emerald-500 border border-zinc-950"></div>
                            <div className="flex items-center gap-4 bg-zinc-950/30 p-3 rounded-2xl border border-zinc-800/50 hover:bg-zinc-950/50 transition-colors mt-6">
                                <img src="https://ui-avatars.com/api/?name=Jim+Miller&background=10b981&color=fff" className="w-8 h-8 rounded-xl" alt="" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-200">Jim Miller</p>
                                    <p className="text-[11px] text-zinc-500 font-medium">Added new mind map</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

