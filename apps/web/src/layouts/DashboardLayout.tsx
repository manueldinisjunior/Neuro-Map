import React, { useState, useCallback, useMemo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Network,
    Settings,
    ChevronLeft,
    ChevronRight,
    Search,
    Bell,
    Plus,
    Moon,
    Sun,
    LogOut,
    User,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { useTheme } from '../context/ThemeContext';
import { useTopics } from '../context/TopicContext';
import { TREE_DATA, TreeItem, CATEGORIES_STATS } from '../data/knowledge';

// Navigation items configuration
const NAV_ITEMS = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/notes', icon: FileText, label: 'Notes' },
    { path: '/dashboard/mind-map', icon: Network, label: 'Mind Map' },
] as const;

// Sidebar Navigation Link Component
interface NavItemProps {
    path: string;
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
    label: string;
    isCollapsed: boolean;
}

const NavItem = React.memo(({ path, icon: Icon, label, isCollapsed }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <NavLink
            to={path}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }
                ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? label : undefined}
            aria-label={label}
        >
            <Icon size={20} className="flex-shrink-0" />
            <AnimatePresence mode="wait">
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-semibold text-sm whitespace-nowrap overflow-hidden"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </NavLink>
    );
});
NavItem.displayName = 'NavItem';

// Knowledge Tree Item Component
interface TreeNodeProps {
    item: TreeItem;
    depth?: number;
    isCollapsed: boolean;
}

const TreeNode = React.memo(({ item, depth = 0, isCollapsed }: TreeNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(item.expanded ?? false);
    const hasChildren = item.children && item.children.length > 0;

    const marginClass = useMemo(() => {
        const margins = ['ml-0', 'ml-3', 'ml-6', 'ml-9', 'ml-12'];
        return margins[Math.min(depth, margins.length - 1)];
    }, [depth]);

    if (isCollapsed) return null;

    return (
        <div className="select-none">
            <button
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
                    text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all
                    ${marginClass}
                `}
                aria-expanded={hasChildren ? (isExpanded ? "true" : "false") : undefined}
                aria-controls={hasChildren ? `tree-node-${item.id}` : undefined}
            >
                {hasChildren && (
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                )}
                <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color || '#64748b' }}
                />
                <span className="truncate font-medium">{item.label}</span>
                {item.count && (
                    <span className="ml-auto text-xs text-slate-500 font-semibold">
                        {item.count}
                    </span>
                )}
            </button>
            <AnimatePresence>
                {hasChildren && isExpanded && (
                    <motion.div
                        id={`tree-node-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {item.children!.map((child) => (
                            <TreeNode
                                key={child.id}
                                item={child}
                                depth={depth + 1}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
TreeNode.displayName = 'TreeNode';

// Main Dashboard Layout
export function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, setTheme } = useTheme();
    const { openNewTopicModal } = useTopics();

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    // Memoized sidebar width
    const sidebarWidth = useMemo(() =>
        sidebarCollapsed ? 'w-20' : 'w-72',
        [sidebarCollapsed]
    );

    return (
        <div className="h-screen flex bg-slate-950 overflow-hidden">
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={closeMobileMenu}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                id="main-sidebar"
                role="complementary"
                aria-label="Sidebar navigation"
                initial={false}
                animate={{ width: sidebarCollapsed ? 80 : 288 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={`
                    fixed lg:relative z-50 h-full bg-slate-900 border-r border-slate-800
                    flex flex-col
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    transition-transform duration-300 lg:transition-none
                `}
            >
                {/* Logo Header */}
                <div className={`
                    flex items-center h-16 px-4 border-b border-slate-800
                    ${sidebarCollapsed ? 'justify-center' : 'justify-between'}
                `}>
                    <AnimatePresence mode="wait">
                        {!sidebarCollapsed ? (
                            <motion.div
                                key="full-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Logo className="w-8 h-8" />
                                <span className="font-bold text-white text-lg tracking-tight">
                                    Neuro<span className="text-blue-500">Map</span>
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="icon-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Logo className="w-8 h-8" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapse Button - Desktop Only */}
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg
                            text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-expanded={sidebarCollapsed ? "false" : "true"}
                        aria-controls="main-sidebar"
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>

                    {/* Close Button - Mobile Only */}
                    <button
                        onClick={closeMobileMenu}
                        className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg
                            text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* New Topic Button */}
                <div className={`p-4 ${sidebarCollapsed ? 'px-3' : ''}`}>
                    <button
                        onClick={openNewTopicModal}
                        className={`
                            w-full flex items-center justify-center gap-2 py-3 
                            bg-gradient-to-r from-blue-600 to-blue-500 text-white
                            rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25
                            hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400
                            active:scale-[0.98] transition-all
                            ${sidebarCollapsed ? 'px-0' : 'px-4'}
                        `}
                        title="New Topic"
                        aria-label="Create new topic"
                    >
                        <Plus size={18} />
                        {!sidebarCollapsed && <span>New Topic</span>}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-none">
                    <div className={`
                        text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3
                        ${sidebarCollapsed ? 'text-center' : 'px-4'}
                    `}>
                        {sidebarCollapsed ? '•••' : 'Navigation'}
                    </div>
                    {NAV_ITEMS.map((item) => (
                        <NavItem
                            key={item.path}
                            {...item}
                            isCollapsed={sidebarCollapsed}
                        />
                    ))}

                    {/* Knowledge Tree */}
                    {!sidebarCollapsed && (
                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">
                                Knowledge Tree
                            </div>
                            <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-none">
                                {TREE_DATA.map((item) => (
                                    <TreeNode
                                        key={item.id}
                                        item={item}
                                        isCollapsed={sidebarCollapsed}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Category Stats */}
                    {!sidebarCollapsed && (
                        <div className="mt-6 pt-6 border-t border-slate-800">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">
                                Top Categories
                            </div>
                            <div className="space-y-3 px-3">
                                {CATEGORIES_STATS.slice(0, 3).map((cat, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${cat.colorClass}`}
                                        />
                                        <span className="text-xs text-slate-400 truncate flex-1">
                                            {cat.label}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-500">
                                            {cat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>

                {/* User Footer */}
                <div className={`
                    p-4 border-t border-slate-800 
                    ${sidebarCollapsed ? 'flex flex-col items-center gap-2' : ''}
                `}>
                    {!sidebarCollapsed ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                                flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                M
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">Manuel Dinis</p>
                                <p className="text-xs text-slate-500 truncate">Pro Member</p>
                            </div>
                            <button
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Settings"
                                title="Settings"
                            >
                                <Settings size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                                flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                M
                            </div>
                            <button
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Settings"
                                title="Settings"
                            >
                                <Settings size={16} />
                            </button>
                        </>
                    )}
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header Bar */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 
                    flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-30">
                    {/* Left: Mobile Menu + Search */}
                    <div className="flex items-center gap-4 flex-1">
                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 
                                dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 
                                dark:hover:bg-white/10 transition-colors"
                            aria-expanded={mobileMenuOpen ? "true" : "false"}
                            aria-controls="main-sidebar"
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>

                        {/* Search Bar */}
                        <div className="relative hidden sm:block flex-1 max-w-md">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search notes, topics, tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 
                                    border border-slate-200 dark:border-slate-700 rounded-xl
                                    text-sm font-medium text-slate-700 dark:text-slate-200
                                    placeholder:text-slate-400 focus:outline-none focus:ring-2 
                                    focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 
                                px-2 py-0.5 text-[10px] font-bold text-slate-400 
                                bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 
                                dark:text-slate-400 dark:hover:text-white
                                hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Notifications */}
                        <button
                            className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-700 
                                dark:text-slate-400 dark:hover:text-white
                                hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="Notifications"
                            title="Notifications"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full 
                                ring-2 ring-white dark:ring-slate-900" />
                        </button>

                        {/* User Avatar - Desktop */}
                        <div className="hidden md:flex items-center gap-3 pl-3 ml-2 
                            border-l border-slate-200 dark:border-slate-700">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                                flex items-center justify-center text-white font-bold text-sm shadow-md
                                cursor-pointer hover:shadow-lg transition-shadow">
                                M
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
