import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BrainCircuit, LogOut, Settings, Plus, Home,
    Calendar, CheckSquare, FileText, GraduationCap,
    CreditCard, HelpCircle, MessageSquare, Search,
    Bell, ChevronDown, MoreVertical, User, ArrowLeft, ArrowRight, Network, LayoutGrid
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TranslationWidget } from '../components/TranslationWidget';
import { useTopics } from '../context/TopicContext';

import { Logo } from '../components/Logo';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { setIsCreateModalOpen } = useTopics();

    const handleLogout = () => {
        localStorage.removeItem('neuro_token');
        navigate('/');
    };

    const navItems = [
        { icon: Calendar, label: t('dashboard.nav.journal') || 'Journal', path: '/dashboard' },
        { icon: FileText, label: t('dashboard.nav.whiteboards') || 'Whiteboards', path: '/whiteboards' },
        { icon: MessageSquare, label: t('dashboard.nav.flashcards') || 'Flashcards', path: '/flashcards', badge: 1 },
        { icon: Network, label: t('dashboard.nav.mindmap') || 'Graph View', path: '/dashboard' },
        { icon: Home, label: t('dashboard.nav.allPages') || 'All Pages', path: '/pages' },
    ];

    const favorites = [
        { label: 'language', path: '#' },
        { label: 'EasytoRead', path: '#' },
        { label: "@Let's put standardis...", path: '#' },
    ];

    return (
        <div className="h-screen bg-[var(--bg-primary)] flex overflow-hidden font-sans text-[var(--text-primary)]">
            {/* Left Sidebar */}
            <aside className="w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] text-[var(--text-secondary)] flex flex-col flex-shrink-0">
                <div className="p-8 flex items-center gap-3">
                    <Logo />
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    <div className="space-y-1 mb-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${location.pathname === item.path
                                    ? 'bg-[var(--bg-secondary)] text-[var(--accent-primary)]'
                                    : 'hover:bg-[var(--bg-secondary)]/50 hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={16} className={location.pathname === item.path ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'} />
                                    <span className="text-[13px] font-medium">{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="text-zinc-500 text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="mb-6">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2">{t('dashboard.favorites') || 'FAVORITES'}</p>
                    </div>

                    <div className="mb-6">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="hover:text-zinc-300 cursor-pointer">🕓 {t('dashboard.recent') || 'RECENT'}</span>
                        </p>
                        <div className="space-y-1">
                            {['language', 'EasytoRead', "@Let's put standardis...", 'Untitled', 'issue', 'Abstract', 'Estella Oncins'].map(item => (
                                <button key={item} className="w-full text-left px-3 py-1 text-[13px] font-medium text-zinc-500 hover:text-zinc-300 flex items-center gap-2 truncate">
                                    <FileText size={14} className="flex-shrink-0" />
                                    <span className="truncate">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="p-4 border-t border-[var(--border-color)]">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full flex items-center gap-3 p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all font-bold text-xs"
                    >
                        <Plus size={16} />
                        <span>Create</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-2.5 text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs mt-2"
                    >
                        <LogOut size={16} />
                        <span>{t('nav.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)]">
                {/* Header - Transparent/Minimal as in the image */}
                <header className="h-12 bg-transparent flex items-center justify-end px-6 flex-shrink-0 gap-4">
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Home"><Home size={18} /></button>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Back"><ArrowLeft size={18} /></button>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Forward"><ArrowRight size={18} /></button>
                    <div className="h-4 w-px bg-[var(--border-color)]" />
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Split view"><LayoutGrid size={18} /></button>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Search"><Search size={18} /></button>
                    <ThemeSwitcher />
                    <TranslationWidget />
                </header>

                {/* Dashboard Scrollable Body */}
                <main className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Top Right Context Menu - Similar to the small box in the image */}
            <div className="absolute top-4 right-6 pointer-events-none">
                <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-lg p-3 w-40 pointer-events-auto shadow-2xl">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer group">
                            <span>Nodes</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer group">
                            <span>Search</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer group">
                            <span>Export</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

