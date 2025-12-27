import { useRef, useState, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    LayoutGrid, Network, Plus, MoreHorizontal, Lock, Loader2, Sparkles,
    User, Lightbulb, Map as MapIcon, Quote, Trash2, Edit2, Archive,
    X, Check, BookOpen, Cpu, FlaskConical, Briefcase, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchMap, fetchRecentNotes } from '../lib/api';
import { useTopics } from '../context/TopicContext';

const CATEGORY_ICONS: Record<string, any> = {
    management: Briefcase,
    global: MapIcon,
    ideas: Lightbulb,
    planning: LayoutGrid,
    science: FlaskConical,
    tech: Cpu,
    learning: BookOpen,
    creative: Palette
};

const CATEGORY_COLORS: Record<string, string> = {
    management: '#3b82f6',
    global: '#8b5cf6',
    ideas: '#f59e0b',
    planning: '#10b981',
    science: '#ec4899',
    tech: '#06b6d4',
    learning: '#6366f1',
    creative: '#f43f5e'
};

export default function Dashboard() {
    const { t } = useTranslation();
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<any>({ nodes: [], links: [] });
    const [notes, setNotes] = useState<any[]>([]);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [viewMode, setViewMode] = useState<'grid' | 'mindmap'>('mindmap');
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userProfile, setUserProfile] = useState<any>(null);
    const [showProfile, setShowProfile] = useState(false);

    // Global Topic State
    const { isCreateModalOpen, setIsCreateModalOpen, triggerRefresh, refreshGraph } = useTopics();
    const [newTopic, setNewTopic] = useState({ label: '', category: 'ideas', mentions: 1 });

    // Node Action State
    const [selectedNode, setSelectedNode] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const onboardingRaw = localStorage.getItem('onboarding_data');
                const onboardingData = onboardingRaw ? JSON.parse(onboardingRaw) : null;
                const profileRaw = localStorage.getItem('user_profile');
                const profileData = profileRaw ? JSON.parse(profileRaw) : null;
                const savedTopicsRaw = localStorage.getItem('custom_topics');
                const savedTopics = savedTopicsRaw ? JSON.parse(savedTopicsRaw) : [];

                setUserProfile(profileData);
                if (profileData) setShowProfile(true);

                const [mapRes, notesRes] = await Promise.all([
                    fetchMap().catch(() => null),
                    fetchRecentNotes().catch(() => [])
                ]);

                if (onboardingData || savedTopics.length > 0) {
                    const nodes: any[] = [
                        { id: 'root', label: onboardingData?.name || 'My Neuro Map', val: 25, color: 'var(--text-primary)', x: 0, y: 0, fx: 0, fy: 0, type: 'root' },
                    ];
                    const links: any[] = [];

                    const addNode = (id: string, label: string, category: string, mentions: number = 1, isArchived: boolean = false) => {
                        if (isArchived) return;
                        const val = 8 + (mentions * 2);
                        nodes.push({ id, label, category, val, color: CATEGORY_COLORS[category] || '#a0a0a0', mentions });
                        links.push({ source: 'root', target: id });
                    };

                    if (onboardingData?.profession) addNode('prof', onboardingData.profession, 'management', 3);
                    if (onboardingData?.experience) addNode('exp', onboardingData.experience, 'global', 2);

                    if (onboardingData?.skills) {
                        onboardingData.skills.split(',').forEach((s: string, i: number) => addNode(`skill_${i}`, s.trim(), 'tech', 1));
                    }

                    if (onboardingData?.interests) {
                        onboardingData.interests.forEach((s: string, i: number) => addNode(`interest_${i}`, s, 'ideas', 1));
                    }

                    savedTopics.forEach((topic: any, i: number) => {
                        addNode(`custom_${i}`, topic.label, topic.category, topic.mentions, topic.archived);
                    });

                    setData({ nodes, links });
                } else if (mapRes) {
                    setData(mapRes);
                }

                setNotes(notesRes || []);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [triggerRefresh]);

    const handleCreateTopic = () => {
        const savedTopicsRaw = localStorage.getItem('custom_topics');
        const savedTopics = savedTopicsRaw ? JSON.parse(savedTopicsRaw) : [];
        const updatedTopics = [...savedTopics, { ...newTopic, archived: false }];
        localStorage.setItem('custom_topics', JSON.stringify(updatedTopics));
        setIsCreateModalOpen(false);
        setNewTopic({ label: '', category: 'ideas', mentions: 1 });
        refreshGraph();
    };

    const handleNodeAction = (action: 'delete' | 'archive' | 'mention') => {
        if (!selectedNode) return;
        const savedTopicsRaw = localStorage.getItem('custom_topics');
        let savedTopics = savedTopicsRaw ? JSON.parse(savedTopicsRaw) : [];

        if (selectedNode.id.startsWith('custom_')) {
            const index = parseInt(selectedNode.id.split('_')[1]);
            if (action === 'delete') {
                savedTopics.splice(index, 1);
            } else if (action === 'archive') {
                savedTopics[index].archived = true;
            } else if (action === 'mention') {
                savedTopics[index].mentions = (savedTopics[index].mentions || 1) + 1;
            }
            localStorage.setItem('custom_topics', JSON.stringify(savedTopics));
            refreshGraph();
        }
        setSelectedNode(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    w: containerRef.current.clientWidth,
                    h: containerRef.current.clientHeight
                });
            }
        };
        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 100);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewMode, showProfile]);

    const filters = useMemo(() => [
        { id: 'all', key: 'dashboard.filters.all' },
        ...Object.keys(CATEGORY_COLORS).map(cat => ({ id: cat, key: `dashboard.filters.${cat}` }))
    ], []);

    return (
        <div className="h-full flex flex-col p-6" ref={containerRef}>
            {/* Header section */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase">
                            {t('dashboard.title')} <span className="text-[var(--text-secondary)] font-medium ml-2 text-xl">({notes.length})</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-1 text-sm font-bold uppercase tracking-widest">{t('dashboard.subtitle')}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border-color)]">
                            {[
                                { mode: 'grid', icon: LayoutGrid, label: 'dashboard.view.grid' },
                                { mode: 'mindmap', icon: Network, label: 'dashboard.view.mindmap' }
                            ].map(({ mode, icon: Icon, label }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as any)}
                                    className={`p-2 rounded-lg transition-all ${viewMode === mode ? 'bg-[var(--bg-primary)] text-[var(--accent-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                    aria-label={t(label)}
                                    title={t(label)}
                                >
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className={`p-2.5 rounded-xl border transition-all ${showProfile ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-lg' : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            aria-label={t('common.profile')}
                            title={t('common.profile')}
                        >
                            <User size={20} />
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[var(--accent-primary)] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[var(--accent-hover)] transition-all font-black uppercase text-xs shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                            <Plus size={18} />
                            <span>New Topic</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap transition-all border ${activeFilter === f.id
                                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-lg'
                                : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                                }`}
                        >
                            {t(f.key)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 relative flex gap-6">
                <div className="flex-1 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-12 h-12 text-[var(--accent-primary)] animate-spin" />
                        </div>
                    ) : viewMode === 'grid' && notes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar h-full">
                            {notes.filter(n => activeFilter === 'all' || n.category === activeFilter).map(note => (
                                <div key={note.id} className="bg-[var(--bg-secondary)]/50 rounded-3xl p-8 border border-[var(--border-color)] hover:border-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all group flex flex-col min-h-[320px]">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-2 h-2 rounded-full category-indicator" 
                                                data-category={note.category || 'default'}
                                            ></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                                                {note.category ? t(`dashboard.filters.${note.category}`) : 'Note'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {note.locked && <Lock size={16} className="text-[var(--text-secondary)]" />}
                                            <button
                                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                                aria-label={t('common.more')}
                                                title={t('common.more')}
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-black text-xl text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors uppercase tracking-tight leading-tight">{note.title || 'Untitled'}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed line-clamp-4 flex-1">{note.content}</p>
                                    <div className="pt-6 border-t border-[var(--border-color)] mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[10px] font-black text-[var(--text-secondary)]">NN</div>
                                            <span className="text-xs font-black text-[var(--text-primary)]">You</span>
                                        </div>
                                        <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider">{new Date(note.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
                            <ForceGraph2D
                                ref={graphRef}
                                width={dimensions.w - (showProfile ? 400 : 0)}
                                height={dimensions.h}
                                graphData={data}
                                onNodeClick={(node) => setSelectedNode(node)}
                                nodeLabel="label"
                                linkColor={() => "rgba(100,100,100,0.1)"}
                                backgroundColor="transparent"
                                linkDirectionalParticles={2}
                                nodeCanvasObject={(node: any, ctx, globalScale) => {
                                    const label = node.label;
                                    const fontSize = 12 / globalScale;
                                    ctx.font = `800 ${fontSize}px Inter, sans-serif`;

                                    // Pulse effect for mentions
                                    const pulse = node.mentions ? Math.sin(Date.now() / 500) * 2 : 0;

                                    ctx.beginPath();
                                    ctx.arc(node.x, node.y, (node.val / 2) + pulse, 0, 2 * Math.PI, false);
                                    ctx.fillStyle = node.color || "var(--text-secondary)";
                                    ctx.fill();

                                    if (globalScale > 0.4) {
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillStyle = 'white';
                                        const icon = CATEGORY_ICONS[node.category];
                                        if (icon && globalScale > 1) {
                                            // Draw icon placeholder or symbol
                                            ctx.fillText('•', node.x, node.y);
                                        }

                                        ctx.fillStyle = node.color || "var(--text-primary)";
                                        ctx.fillText(label.toUpperCase(), node.x, node.y + node.val / 2 + 8 / globalScale);
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {showProfile && userProfile && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="w-[380px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar"
                        >
                            <div className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                                            <Sparkles size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tighter">Your Profile</h2>
                                            <p className="text-blue-100/60 text-xs font-bold uppercase tracking-widest leading-none">AI Generated Insights</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-black leading-tight mb-4">{userProfile.personalizedGreeting}</p>
                                    <p className="text-sm text-blue-100/80 font-medium leading-relaxed">{userProfile.summary}</p>
                                </div>
                            </div>
                            {/* ... more profile sections ... */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Create Topic Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsCreateModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-[var(--text-primary)]">New Topic</h2>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    aria-label={t('common.close')}
                                    title={t('common.close')}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2">Topic Name</label>
                                    <input
                                        type="text"
                                        value={newTopic.label}
                                        onChange={(e) => setNewTopic({ ...newTopic, label: e.target.value })}
                                        placeholder="e.g. Quantum Computing"
                                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-5 py-4 text-[var(--text-primary)] font-bold focus:outline-none focus:border-[var(--accent-primary)] transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2">Category</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.keys(CATEGORY_COLORS).map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setNewTopic({ ...newTopic, category: cat })}
                                                className={`flex items-center gap-2 p-3 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all ${newTopic.category === cat ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white' : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}`}
                                            >
                                                <div className="w-2 h-2 rounded-full category-indicator" data-category={cat}></div>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleCreateTopic}
                                    disabled={!newTopic.label}
                                    className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                >
                                    Create Topic
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Node Context Menu */}
            <AnimatePresence>
                {selectedNode && (
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                            onClick={() => setSelectedNode(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 shadow-2xl w-full max-w-xs"
                        >
                            <h3 className="font-black text-center text-lg uppercase tracking-tight mb-6 text-[var(--text-primary)]">{selectedNode.label}</h3>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => handleNodeAction('mention')}
                                    className="flex items-center gap-3 w-full p-4 rounded-2xl bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all font-black uppercase text-xs"
                                >
                                    <Plus size={18} /> Mention Topic
                                </button>
                                <button
                                    onClick={() => handleNodeAction('archive')}
                                    className="flex items-center gap-3 w-full p-4 rounded-2xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all font-black uppercase text-xs"
                                >
                                    <Archive size={18} /> Archive Topic
                                </button>
                                <button
                                    onClick={() => handleNodeAction('delete')}
                                    className="flex items-center gap-3 w-full p-4 rounded-2xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-black uppercase text-xs"
                                >
                                    <Trash2 size={18} /> Delete Permanently
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

