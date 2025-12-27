import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BrainCircuit, LogOut, Settings, Plus, Home,
    Calendar, CheckSquare, FileText, GraduationCap,
    CreditCard, HelpCircle, MessageSquare, Search,
    Bell, ChevronDown, MoreVertical, User, ArrowLeft, ArrowRight, Network, LayoutGrid
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
        { icon: Calendar, label: 'Diario', path: '/dashboard' },
        { icon: FileText, label: 'Whiteboards', path: '/whiteboards' },
        { icon: MessageSquare, label: 'Flashcards', path: '/flashcards', badge: 1 },
        { icon: Network, label: 'Vista del grafico', path: '/dashboard' },
        { icon: Home, label: 'Tutte le pagine', path: '/pages' },
    ];

    const favorites = [
        { label: 'language', path: '#' },
        { label: 'EasytoRead', path: '#' },
        { label: "@Let's put standardis...", path: '#' },
    ];

    return (
        <div className="h-screen bg-[#0d1b1e] flex overflow-hidden font-sans text-zinc-100">
            {/* Left Sidebar */}
            <aside className="w-64 bg-[#0d1b1e] border-r border-[#1a2e31] text-zinc-400 flex flex-col flex-shrink-0">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <BrainCircuit size={22} />
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight italic">Logseq <span className="text-[10px] align-top">▼</span></span>
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    <div className="space-y-1 mb-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${location.pathname === item.path && item.label === 'Vista del grafico'
                                    ? 'bg-[#1a2e31] text-white'
                                    : 'hover:bg-[#1a2e31]/50 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={16} className={location.pathname === item.path && item.label === 'Vista del grafico' ? 'text-[#50b4c8]' : 'text-zinc-500'} />
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
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2">PREFERITI</p>
                    </div>

                    <div className="mb-6">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="hover:text-zinc-300 cursor-pointer">🕓 RECENTI</span>
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

                <div className="p-4 border-t border-[#1a2e31]">
                    <button
                        className="w-full flex items-center gap-3 p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/30 rounded-xl transition-all font-bold text-xs"
                    >
                        <Plus size={16} />
                        <span>Create</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-2.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs mt-2"
                    >
                        <LogOut size={16} />
                        <span>{t('nav.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0d1b1e]">
                {/* Header - Transparent/Minimal as in the image */}
                <header className="h-12 bg-transparent flex items-center justify-end px-6 flex-shrink-0 gap-4">
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Home"><Home size={18} /></button>
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Back"><ArrowLeft size={18} /></button>
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Forward"><ArrowRight size={18} /></button>
                    <div className="h-4 w-px bg-zinc-800" />
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Split view"><LayoutGrid size={18} /></button>
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Search"><Search size={18} /></button>
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
                <div className="bg-[#1a2e31]/80 backdrop-blur-md border border-[#ffffff10] rounded-lg p-3 w-40 pointer-events-auto shadow-2xl">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-300 hover:text-white cursor-pointer group">
                            <span>Nodes</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-300 hover:text-white cursor-pointer group">
                            <span>Search</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-300 hover:text-white cursor-pointer group">
                            <span>Export</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

