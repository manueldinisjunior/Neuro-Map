import React, { useMemo } from 'react';
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
    Calendar,
    Sparkles
} from 'lucide-react';
import { CATEGORIES_STATS } from '../data/knowledge';
import { useTopics } from '../context/TopicContext';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Stat Card Component
interface StatCardProps {
    label: string;
    value: string;
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
    color: string;
    bg: string;
    change: string;
    index: number;
}

const StatCard = React.memo(({ label, value, icon: Icon, color, bg, change, index }: StatCardProps) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: index * 0.1 + 0.2 }}
        className="bg-white dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl 
            shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
            transition-all border border-slate-100 dark:border-slate-700/50 group"
    >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bg} ${color} rounded-xl sm:rounded-2xl 
                flex items-center justify-center transition-transform group-hover:scale-110`}>
                <Icon size={20} />
            </div>
            <span className="text-[10px] sm:text-xs font-black bg-slate-100 dark:bg-slate-700/50 
                text-slate-500 dark:text-slate-400 px-2 py-1 rounded-lg uppercase tracking-wider 
                group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                {change}
            </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1">
            {value}
        </h3>
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
            {label}
        </p>
    </motion.div>
));
StatCard.displayName = 'StatCard';

// Activity Item Component
interface ActivityItemProps {
    title: string;
    category: string;
    time: string;
    type: string;
    index: number;
}

const ActivityItem = React.memo(({ title, category, time, type, index }: ActivityItemProps) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 + index * 0.1 }}
        className="bg-white dark:bg-slate-800/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl 
            border border-slate-100 dark:border-slate-700/50 
            hover:border-blue-200 dark:hover:border-blue-500/30 
            hover:shadow-lg transition-all group cursor-pointer 
            flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
    >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 dark:bg-slate-700/50 
            flex items-center justify-center text-slate-400 flex-shrink-0
            group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <FileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1 
                group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {title}
            </h4>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {category}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 hidden sm:block" />
                <span className="text-[10px] font-medium text-slate-400">{time}</span>
            </div>
        </div>
        <div className="px-2 sm:px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-700/50 
            border border-slate-100 dark:border-slate-600 
            text-[10px] font-bold text-slate-500 dark:text-slate-400 
            uppercase tracking-widest whitespace-nowrap self-start sm:self-center">
            {type}
        </div>
    </motion.div>
));
ActivityItem.displayName = 'ActivityItem';

// Task Item Component
interface TaskItemProps {
    text: string;
    completed?: boolean;
    active?: boolean;
}

const TaskItem = React.memo(({ text, completed, active }: TaskItemProps) => (
    <div className="flex items-start gap-3">
        <div className={`mt-0.5 min-w-[16px] w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${active ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
            {active && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
        </div>
        <p className={`text-xs font-bold ${completed
            ? 'text-slate-700 dark:text-slate-400 line-through opacity-50'
            : active
                ? 'text-slate-800 dark:text-white'
                : 'text-slate-400 dark:text-slate-500'
            }`}>
            {text}
        </p>
    </div>
));
TaskItem.displayName = 'TaskItem';

// Main Dashboard Component
export default function Dashboard() {
    const { openNewTopicModal } = useTopics();

    // Memoized stats data
    const stats = useMemo(() => [
        { label: 'Total Notes', value: '1,284', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/20', change: '+12%' },
        { label: 'Connections', value: '3,892', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/20', change: '+8%' },
        { label: 'Daily Goal', value: '85%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/20', change: '+5%' },
        { label: 'Brain Score', value: '942', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-500/20', change: '+15%' }
    ], []);

    // Memoized recent activity data
    const recentActivity = useMemo(() => [
        { title: 'The Ethics of AI Consciousness', category: 'Philosophy', time: '2 mins ago', type: 'Note Added' },
        { title: 'React Server Components', category: 'Web Development', time: '1 hour ago', type: 'Node Linked' },
        { title: 'Dopamine Fasting Protocols', category: 'Neuroscience', time: '4 hours ago', type: 'Note Edited' },
    ], []);

    // Get time-based greeting
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }, []);

    return (
        <div className="flex-1 h-full overflow-y-auto scrollbar-none p-4 sm:p-6 md:p-10 
            bg-slate-50 dark:bg-slate-950">
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">

                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                >
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 dark:text-white 
                            tracking-tighter mb-1 sm:mb-2">
                            {greeting}, Manuel
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base md:text-lg">
                            You're on a <span className="text-blue-600 dark:text-blue-400 font-bold">14 day learning streak</span>.
                            Keep up the momentum!
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Sparkles size={14} className="text-amber-500" />
                        <span>Last sync: Just now</span>
                    </div>
                </motion.header>

                {/* Quick Stats Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                >
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} index={i} />
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Left Column: Recent Activity & Quick Actions */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Quick Actions Banner */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 
                                rounded-2xl sm:rounded-[32px] p-6 sm:p-8 text-white 
                                shadow-2xl shadow-blue-500/30"
                        >
                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                                        Capture a new thought?
                                    </h2>
                                    <p className="text-blue-100 font-medium mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                                        Expand your Neuro Map by adding new nodes.
                                        The AI will automatically suggest connections.
                                    </p>
                                    <button
                                        onClick={openNewTopicModal}
                                        className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl 
                                            font-black uppercase tracking-widest text-[10px] sm:text-xs 
                                            flex items-center gap-2 hover:bg-blue-50 transition-colors 
                                            shadow-lg active:scale-95"
                                    >
                                        <Plus size={16} />
                                        Create Smart Note
                                    </button>
                                </div>
                                <div className="hidden md:block opacity-20 absolute right-0 top-1/2 -translate-y-1/2 
                                    transform rotate-12 scale-150 translate-x-10">
                                    <Brain size={200} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Activity List */}
                        <div>
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white 
                                    flex items-center gap-2">
                                    <Clock size={18} className="text-slate-400" />
                                    Recent Activity
                                </h3>
                                <button className="text-[10px] sm:text-xs font-black text-blue-500 
                                    hover:text-blue-600 uppercase tracking-widest flex items-center gap-1">
                                    View All <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {recentActivity.map((item, i) => (
                                    <ActivityItem key={i} {...item} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Suggested & Focus */}
                    <div className="space-y-6 md:space-y-8">

                        {/* Daily Focus Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white dark:bg-slate-800/50 p-5 sm:p-6 rounded-2xl sm:rounded-[32px] 
                                border border-slate-100 dark:border-slate-700/50 
                                shadow-xl shadow-slate-200/50 dark:shadow-none"
                        >
                            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 
                                    text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <Calendar size={18} />
                                </div>
                                <h3 className="font-black text-slate-800 dark:text-white">Daily Focus</h3>
                            </div>

                            <div className="space-y-5 sm:space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                                        <span>System Design</span>
                                        <span>3/5 Tasks</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[60%] rounded-full" />
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl 
                                    border border-slate-100 dark:border-slate-700/50 space-y-3">
                                    <TaskItem text="Review Microservices Architecture" completed />
                                    <TaskItem text="Study CAP Theorem tradeoffs" active />
                                    <TaskItem text="Database Sharding Strategies" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Top Categories Progress */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white dark:bg-slate-800/50 p-5 sm:p-6 rounded-2xl sm:rounded-[32px] 
                                border border-slate-100 dark:border-slate-700/50"
                        >
                            <h3 className="font-black text-slate-800 dark:text-white mb-5 sm:mb-6 
                                flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500" />
                                Trending Topics
                            </h3>
                            <div className="space-y-4 sm:space-y-5">
                                {CATEGORIES_STATS.slice(0, 4).map((cat, i) => (
                                    <div key={i} className="flex items-center gap-3 sm:gap-4">
                                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 
                                            flex items-center justify-center font-bold text-white text-[10px] sm:text-xs 
                                            shadow-md ${cat.colorClass}`}>
                                            {cat.label.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between mb-1 sm:mb-1.5">
                                                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                                                    {cat.label}
                                                </h4>
                                                <span className="text-[10px] font-black text-slate-400 ml-2">
                                                    {cat.value} Notes
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full opacity-80 ${cat.colorClass} ${cat.widthClass}`} />
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
