import { useState, useRef, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    Search, Bell, ChevronRight, ChevronDown, Plus,
    X, MoreHorizontal, MessageSquare, Tag, Maximize2,
    Minus, ZoomIn, ZoomOut, User, LayoutGrid, Brain, Clock, 
    Sparkles, ShieldAlert, BarChart3, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data based on the image
const TREE_DATA = [
    {
        id: 'kb',
        label: 'KNOWLEDGE BASE',
        children: [
            { id: 'cs', label: 'Computer Science', count: 12 },
            {
                id: 'wd',
                label: 'Web Development',
                count: 8,
                expanded: true,
                children: [
                    { id: 'fe', label: 'Frontend' },
                    { id: 're', label: 'React Ecosystem', active: true },
                    { id: 'be', label: 'Backend API' }
                ]
            }
        ]
    },
    {
        id: 'prj',
        label: 'PROJECTS',
        children: [
            { id: 'si', label: 'Startup Ideas', count: 3 }
        ]
    }
];

const GRAPH_DATA = {
    nodes: [
        { id: 'root', label: 'React Ecosystem', color: '#00D8FF', size: 30, x: 0, y: 0 },
        { id: 'hooks', label: 'Hooks', color: '#FFB800', size: 24, x: 150, y: -50 },
        { id: 'state', label: 'State Mgmt', color: '#9D50BB', size: 22, x: -100, y: -80 },
        { id: 'testing', label: 'Testing', color: '#FF4B2B', size: 18, x: -80, y: 100 },
        { id: 'router', label: 'Router', color: '#00C9FF', size: 20, x: 120, y: 120 }
    ],
    links: [
        { source: 'root', target: 'hooks' },
        { source: 'root', target: 'state' },
        { source: 'root', target: 'testing' },
        { source: 'root', target: 'router' }
    ]
};

const STATS = [
    { label: 'DEPTH', value: '4' },
    { label: 'NOTES', value: '12' },
    { label: 'MASTERY', value: '85%' }
];

const RECENT_NOTES = [
    {
        title: 'useEffect Dependencies',
        excerpt: 'Important to remember that primitive values vs object references affect re-...',
        time: '2 hours ago'
    },
    {
        title: 'Custom Hooks Pattern',
        excerpt: 'Abstracting logic into useFetch or useForm creates cleaner components.',
        time: '1 day ago'
    }
];

const TAGS = ['frontend', 'javascript', 'architecture'];

const USER_DATA = {
    createdAt: '2024-04-15T10:00:00Z',
    lastActiveAt: new Date().toISOString(),
    daysActiveCount: 37,
    categoriesCount: 12,
    subcategoriesCount: 8
};

const CATEGORIES_DATA = [
    { id: 'tech', label: 'Technology & Digital Topics', notesCount: 24, wordsSum: 1250, color: '#3b82f6', icon: 'zap', lastActive: '2025-12-30T10:00:00Z' },
    { id: 'prof', label: 'Professional Skills', notesCount: 18, wordsSum: 900, color: '#8b5cf6', icon: 'briefcase', lastActive: '2025-12-29T15:00:00Z' },
    { id: 'sci', label: 'Science & Research', notesCount: 15, wordsSum: 750, color: '#ec4899', icon: 'microscope', lastActive: '2025-12-28T09:00:00Z' },
    { id: 'prod', label: 'Productivity & Methods', notesCount: 13, wordsSum: 400, color: '#f59e0b', icon: 'check-circle', lastActive: '2025-12-27T18:00:00Z' },
    { id: 'edu', label: 'Education & Learning', notesCount: 12, wordsSum: 600, color: '#10b981', icon: 'book', lastActive: '2025-12-26T14:00:00Z' },
    { id: 'lang', label: 'Languages & Communication', notesCount: 10, wordsSum: 500, color: '#f43f5e', icon: 'languages', lastActive: '2025-12-25T11:00:00Z' },
    { id: 'proj', label: 'Projects & Work', notesCount: 9, wordsSum: 450, color: '#06b6d4', icon: 'folder', lastActive: '2025-12-24T16:00:00Z' },
    { id: 'crea', label: 'Creativity & Culture', notesCount: 9, wordsSum: 300, color: '#6366f1', icon: 'palette', lastActive: '2025-12-23T10:00:00Z' },
    { id: 'health', label: 'Health & Wellness', notesCount: 5, wordsSum: 200, color: '#10b981', icon: 'heart', lastActive: '2025-12-22T08:00:00Z' }
];

const BUBBLES = [
    { label: 'Philosophy', size: 140, color: 'from-emerald-400 to-teal-500', top: '15%', left: '45%', count: null },
    { label: 'Psychology', size: 120, color: 'from-indigo-500 to-purple-600', top: '40%', left: '70%', count: 12 },
    { label: 'Nietzsche', size: 90, color: 'from-rose-400 to-pink-600', top: '42%', left: '15%', count: 8 },
    { label: 'Productivity', size: 85, color: 'from-orange-400 to-amber-500', top: '55%', left: '40%', count: 4 },
    { label: 'Mindfulness', size: 70, color: 'from-teal-300 to-cyan-500', top: '65%', left: '60%', count: 2 },
    { label: 'Books', size: 60, color: 'from-blue-400 to-indigo-500', top: '22%', left: '75%', count: null },
    { label: 'AI', size: 55, color: 'from-cyan-400 to-blue-500', top: '65%', left: '25%', count: null },
    { label: 'Health', size: 50, color: 'from-blue-300 to-blue-500', top: '78%', left: '55%', count: null },
    { label: 'Creativity', size: 40, color: 'from-orange-300 to-rose-400', top: '75%', left: '38%', count: null },
];

export default function GraphWorkspace() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 400);
    const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() * 0.7, 400);
    const handleCenter = () => graphRef.current?.centerAt(0, 0, 400);

    // Profile & Insights Data Processing
    const rankedCategories = useMemo(() => {
        return [...CATEGORIES_DATA]
            .map(cat => {
                const recencyBonus = (new Date().getTime() - new Date(cat.lastActive).getTime()) < 2 * 24 * 60 * 60 * 1000 ? 5 : 0;
                const activityScore = cat.notesCount + Math.floor(cat.wordsSum / 50) + recencyBonus;
                return { ...cat, activityScore };
            })
            .sort((a, b) => b.activityScore - a.activityScore)
            .slice(0, 8);
    }, []);

    const timeMetrics = useMemo(() => {
        const signupDate = new Date(USER_DATA.createdAt);
        const lastActive = new Date(USER_DATA.lastActiveAt);
        const diffTime = Math.abs(new Date().getTime() - signupDate.getTime());
        const daysSinceSignup = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            memberSince: signupDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            daysActive: `${USER_DATA.daysActiveCount} days`,
            lastActivity: '1 hour ago' // Relative time simplified for mock
        };
    }, []);

    const isInsightsReady = USER_DATA.categoriesCount >= 10 && USER_DATA.subcategoriesCount >= 5;

    return (
        <div className="flex h-screen w-full bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
            {/* Sidebar Left */}
            <aside className="w-72 border-r border-slate-200 flex flex-col bg-white">
                {/* Search */}
                <div className="p-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Tree View */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-none">
                    {TREE_DATA.map(section => (
                        <div key={section.id}>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">{section.label}</h3>
                            <div className="space-y-1">
                                {section.children?.map(item => (
                                    <div key={item.id}>
                                        <button className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-lg group transition-colors text-sm font-medium text-slate-600">
                                            <div className="flex items-center gap-2">
                                                {item.children ? <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" /> : <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />}
                                                <span>{item.label}</span>
                                            </div>
                                            {item.count && <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-bold">{item.count}</span>}
                                        </button>
                                        {item.expanded && item.children && (
                                            <div className="ml-4 mt-1 border-l border-slate-100 pl-2 space-y-1">
                                                {item.children.map(child => (
                                                    <button
                                                        key={child.id}
                                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${child.active ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm shadow-blue-500/5 border border-blue-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                                    >
                                                        {child.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <button className="w-full bg-[#1e293b] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0f172a] transition-all shadow-lg shadow-slate-200 active:scale-95 font-bold text-sm">
                        <Plus size={18} />
                        New Topic
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-8 absolute top-0 left-0 right-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <LayoutGrid size={20} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-slate-800">Neuro Map</span>
                    </div>

                    <nav className="flex items-center gap-8">
                        <button className="text-blue-500 font-bold text-sm hover:translate-y-[-1px] transition-transform">Dashboard</button>
                        <button className="text-slate-500 font-medium text-sm hover:text-slate-800 transition-colors">Notes</button>
                        <button className="text-slate-500 font-medium text-sm hover:text-slate-800 transition-colors">Graph View</button>
                    </nav>

                    <div className="flex items-center gap-6">
                        <button
                            title="Notifications"
                            aria-label="Notifications"
                            className="relative text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <Bell size={20} aria-hidden="true" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></div>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800 leading-none mb-0.5">Alex Chen</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro Plan</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center overflow-hidden shadow-sm">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 pt-16 flex flex-col relative" ref={containerRef}>
                    {/* Breadcrumbs */}
                    <div className="px-8 py-4 flex items-center text-sm">
                        <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-slate-100 shadow-sm border-slate-200/50">
                            <span className="text-slate-400">Knowledge Base</span>
                            <ChevronRight size={14} className="text-slate-300" />
                            <span className="text-slate-400">Web Dev</span>
                            <ChevronRight size={14} className="text-slate-300" />
                            <span className="text-blue-500 font-bold">React Ecosystem</span>
                        </div>
                    </div>

                    {/* Graph Canvas */}
                    <div className="flex-1 relative overflow-hidden graph-background">
                        <ForceGraph2D
                            ref={graphRef}
                            width={dimensions.width}
                            height={dimensions.height}
                            graphData={GRAPH_DATA}
                            nodeRelSize={6}
                            nodeVal={node => (node as any).size}
                            nodeColor={node => (node as any).color}
                            linkColor={() => '#e2e8f0'}
                            linkWidth={2}
                            backgroundColor="transparent"
                            onNodeClick={(node) => setSelectedTopic((node as any).label === 'React Ecosystem' ? 'React Hooks' : (node as any).label)}
                            nodeCanvasObject={(node: any, ctx, globalScale) => {
                                const label = node.label;
                                const size = node.size || 20;

                                // Shadow/Glow effect
                                ctx.shadowBlur = 15 / globalScale;
                                ctx.shadowColor = node.color;

                                // Draw sphere gradient
                                const gradient = ctx.createRadialGradient(
                                    node.x - size / 4,
                                    node.y - size / 4,
                                    size / 10,
                                    node.x,
                                    node.y,
                                    size
                                );
                                gradient.addColorStop(0, '#fff');
                                gradient.addColorStop(0.2, node.color);
                                gradient.addColorStop(1, '#000'); // Shadow side

                                ctx.beginPath();
                                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                                ctx.fillStyle = gradient;
                                ctx.fill();

                                // Label background
                                if (globalScale > 0.6) {
                                    const fontSize = 12 / globalScale;
                                    ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                                    const textWidth = ctx.measureText(label).width;
                                    const padding = 6 / globalScale;

                                    ctx.shadowBlur = 0;
                                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

                                    // Draw rounded rect for label
                                    const bx = node.x - textWidth / 2 - padding;
                                    const by = node.y + size + 8 / globalScale;
                                    const bw = textWidth + padding * 2;
                                    const bh = fontSize + padding * 2;
                                    const r = 6 / globalScale;

                                    ctx.beginPath();
                                    ctx.moveTo(bx + r, by);
                                    ctx.lineTo(bx + bw - r, by);
                                    ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
                                    ctx.lineTo(bx + bw, by + bh - r);
                                    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
                                    ctx.lineTo(bx + r, by + bh);
                                    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
                                    ctx.lineTo(bx, by + r);
                                    ctx.quadraticCurveTo(bx, by, bx + r, by);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Border for label
                                    ctx.strokeStyle = '#e2e8f0';
                                    ctx.lineWidth = 1 / globalScale;
                                    ctx.stroke();

                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillStyle = '#475569';
                                    ctx.fillText(label, node.x, by + bh / 2);
                                }
                            }}
                        />

                        <div className="absolute bottom-10 left-8 flex flex-col gap-2">
                            <button
                                onClick={handleZoomIn}
                                title="Zoom In"
                                aria-label="Zoom In"
                                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 transition-all shadow-lg shadow-slate-200/50 active:scale-95"
                            >
                                <Plus size={20} aria-hidden="true" />
                            </button>
                            <button
                                onClick={handleZoomOut}
                                title="Zoom Out"
                                aria-label="Zoom Out"
                                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 transition-all shadow-lg shadow-slate-200/50 active:scale-95"
                            >
                                <Minus size={20} aria-hidden="true" />
                            </button>
                            <button
                                onClick={handleCenter}
                                title="Reset View"
                                aria-label="Reset View"
                                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 transition-all shadow-lg shadow-slate-200/50 active:scale-95 mt-2"
                            >
                                <Maximize2 size={18} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sidebar Right */}
            <aside className="w-96 border-l border-slate-200 flex flex-col bg-white">
                <div className="p-8 flex flex-col h-full overflow-y-auto scrollbar-none">
                    {!selectedTopic ? (
                        <>
                            {/* Profile & Insights Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <User size={18} />
                                    </div>
                                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile & Insights</h2>
                                </div>
                                {isInsightsReady && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                                        <Sparkles size={12} />
                                        <span>Insights Ready</span>
                                    </div>
                                )}
                            </div>

                            {/* Top Categories */}
                            <section className="mb-10">
                                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between">
                                    Top Knowledge Categories
                                    <BarChart3 size={14} className="text-slate-400" />
                                </h3>
                                <div className="space-y-6">
                                    {rankedCategories.map((cat, idx) => (
                                        <div key={cat.id} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: cat.color }}>
                                                        {idx + 1}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{cat.label}</span>
                                                </div>
                                                <span className="text-xs font-black text-slate-800">{cat.notesCount}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cat.notesCount / rankedCategories[0].notesCount) * 100}%` }}
                                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: cat.color, opacity: 0.6 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Time on App */}
                            <section className="mb-10 p-6 bg-slate-50 border border-slate-100 rounded-[24px]">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Clock size={14} />
                                    Time on Neuro Map
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Member Since:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.memberSince}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Days Active:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.daysActive}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Last Activity:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.lastActivity}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Behavioral Snapshot */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                        <Brain size={16} className="text-blue-500" />
                                        Behavioral Snapshot
                                        <span className="text-[9px] text-slate-400 normal-case font-medium ml-1">(Non-clinical)</span>
                                    </h3>
                                    {!isInsightsReady && <Info size={14} className="text-slate-300" />}
                                </div>

                                {isInsightsReady ? (
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[24px] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Sparkles size={40} className="text-blue-600" />
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4 relative z-10">
                                            Your activity suggests a strong preference for <span className="text-blue-600 font-bold">structured learning and analytical problem-solving</span>, with sustained attention in Tech & Digital Topics. You also show consistent self-improvement orientation through Productivity & Education modules.
                                        </p>
                                        <div className="flex flex-col gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 mb-4">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tendency Hypothesis</p>
                                            <p className="text-[11px] text-slate-700 font-bold">Convergent Thinker / Intellectual Depth</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2 text-[10px] text-slate-400 italic">
                                                <ShieldAlert size={12} className="shrink-0 mt-0.5" />
                                                <p>This is not a diagnosis. For higher accuracy, consider taking a validated personality assessment like the Big Five (IPIP).</p>
                                            </div>
                                            <button className="w-full py-2.5 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-bold hover:bg-blue-50 transition-colors shadow-sm">
                                                Take Big Five Assessment
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-slate-50 border border-slate-100 border-dashed rounded-[24px]">
                                        <p className="text-xs font-bold text-slate-500 mb-4">Not enough data yet for a snapshot</p>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                                                    <span>Categories</span>
                                                    <span>{USER_DATA.categoriesCount}/10</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-slate-400 rounded-full" 
                                                        style={{ width: `${(USER_DATA.categoriesCount / 10) * 100}%` }} 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                                                    <span>Subcategories</span>
                                                    <span>{USER_DATA.subcategoriesCount}/5</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-slate-400 rounded-full" 
                                                        style={{ width: `${(USER_DATA.subcategoriesCount / 5) * 100}%` }} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                                            Continue organizing your knowledge to unlock behavioral tendencies and cognitive breadth insights.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Selected Topic</span>
                                <button
                                    onClick={() => setSelectedTopic(null)}
                                    title="Close Details"
                                    aria-label="Close Details"
                                    className="text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-slate-800 mb-1">{selectedTopic}</h2>
                            <p className="text-sm text-slate-400 font-medium mb-10">Part of <span className="text-blue-500 font-bold">React Ecosystem</span></p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-10">
                                {STATS.map(stat => (
                                    <div key={stat.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                                        <p className="text-xl font-black text-slate-800">{stat.value}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Summary</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.
                                </p>
                            </div>

                            {/* Recent Notes */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Notes</h3>
                                    <button className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">View All</button>
                                </div>
                                <div className="space-y-3">
                                    {RECENT_NOTES.map(note => (
                                        <div key={note.title} className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group cursor-pointer">
                                            <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{note.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{note.excerpt}</p>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <MessageSquare size={12} />
                                                <span className="text-[10px] font-bold">{note.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Linked Tags */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Linked Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {TAGS.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-lg border border-purple-100">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-6 flex gap-3">
                                <button
                                    onClick={() => setIsNoteModalOpen(true)}
                                    className="flex-1 bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 font-bold text-sm"
                                >
                                    <Plus size={18} />
                                    Add Note
                                </button>
                                <button
                                    title="More Actions"
                                    aria-label="More Actions"
                                    className="w-14 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-95"
                                >
                                    <MoreHorizontal size={20} aria-hidden="true" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>

            {/* Create Note Modal */}
            <AnimatePresence>
                {isNoteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={() => setIsNoteModalOpen(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl bg-[#f1f5f9] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white"
                        >
                            {/* Modal Header */}
                            <div className="h-20 px-10 flex items-center justify-between bg-white/50 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                        <LayoutGrid size={24} />
                                    </div>
                                    <span className="font-extrabold text-2xl tracking-tight text-[#1e293b]">Neuro Notes</span>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="hidden md:flex items-center gap-8">
                                        <button className="text-slate-400 font-bold text-sm tracking-wide">My Notes</button>
                                        <button className="text-blue-500 font-bold text-sm tracking-wide border-b-2 border-blue-500 pb-1">Neuro Map</button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">Demo User</span>
                                        <ChevronDown size={16} className="text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 flex flex-col md:flex-row p-10 gap-10 min-h-0 overflow-y-auto">
                                {/* Left Side: Form */}
                                <div className="w-full md:w-[380px] flex flex-col gap-8 bg-white rounded-[32px] p-10 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-black text-[#1e293b] mb-2 uppercase tracking-tight">Create a Note</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Topic</label>
                                            <input
                                                type="text"
                                                placeholder="Enter a topic..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Title <span className="text-slate-400 font-medium">(Optional)</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter a title..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Content</label>
                                            <textarea
                                                rows={6}
                                                placeholder="Write your thoughts here..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium resize-none"
                                            />
                                        </div>

                                        <button className="w-full bg-[#3b82f6] text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-[#2563eb] transition-all shadow-xl shadow-blue-500/20 active:scale-95 mt-4">
                                            Save Note
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side: Visual Map */}
                                <div className="flex-1 bg-[#1e293b] rounded-[32px] p-12 relative overflow-hidden shadow-2xl flex flex-col">
                                    {/* Visual Header */}
                                    <div className="relative z-10 mb-8">
                                        <h3 className="text-4xl font-black text-white mb-2 tracking-tight">Neuro Map</h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your Knowledge Network</p>
                                    </div>

                                    {/* Bubbles Container */}
                                    <div className="flex-1 relative">
                                        {/* Subtle Connecting Lines (Background Effect) */}
                                        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M20,40 Q50,20 80,40" stroke="white" strokeWidth="0.2" fill="none" />
                                            <path d="M15,45 Q45,70 75,45" stroke="white" strokeWidth="0.2" fill="none" />
                                            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" />
                                        </svg>

                                        {BUBBLES.map((bubble, i) => (
                                            <motion.div
                                                key={bubble.label}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.05 + 0.3, type: 'spring', stiffness: 100 }}
                                                className={`absolute rounded-full bg-gradient-to-br ${bubble.color} flex flex-col items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer group p-4 border border-white/20 bubble-node`}
                                                style={{
                                                    '--bubble-size': `${bubble.size}px`,
                                                    '--bubble-top': bubble.top,
                                                    '--bubble-left': bubble.left
                                                } as React.CSSProperties}
                                            >
                                                <span className="bubble-label">
                                                    {bubble.label}
                                                </span>
                                                {bubble.count && (
                                                    <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full mt-1 font-bold backdrop-blur-sm">
                                                        ({bubble.count})
                                                    </span>
                                                )}

                                                {/* Glow effect */}
                                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
                                            </motion.div>
                                        ))}

                                        {/* Floating smaller dots */}
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-2 h-2 bg-blue-400/30 rounded-full blur-[1px] floating-dot"
                                                style={{
                                                    '--dot-top': `${Math.random() * 100}%`,
                                                    '--dot-left': `${Math.random() * 100}%`
                                                } as React.CSSProperties}
                                            />
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="relative z-10 mt-auto flex items-center justify-center gap-4">
                                        <div className="h-px bg-slate-700 flex-1"></div>
                                        <p className="legend-text whitespace-nowrap">
                                            Larger bubbles mean more notes & words.
                                        </p>
                                        <div className="h-px bg-slate-700 flex-1"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button Mobile */}
                            <button
                                onClick={() => setIsNoteModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 md:hidden"
                                aria-label="Close Modal"
                                title="Close Modal"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
