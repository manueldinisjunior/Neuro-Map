import { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { LayoutGrid, Network, Plus, MoreHorizontal, Lock, Loader2, Sparkles, User, Lightbulb, Map as MapIcon, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchMap, fetchRecentNotes } from '../lib/api';

export default function Dashboard() {
    const { t } = useTranslation();
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<any>({ nodes: [], links: [] });
    const [notes, setNotes] = useState<any[]>([]);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [viewMode, setViewMode] = useState<'grid' | 'mindmap'>('mindmap'); // Default to mindmap as requested
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userProfile, setUserProfile] = useState<any>(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Try to get data from onboarding
                const onboardingRaw = localStorage.getItem('onboarding_data');
                const onboardingData = onboardingRaw ? JSON.parse(onboardingRaw) : null;
                const profileRaw = localStorage.getItem('user_profile');
                const profileData = profileRaw ? JSON.parse(profileRaw) : null;
                setUserProfile(profileData);
                if (profileData) setShowProfile(true);

                const [mapRes, notesRes] = await Promise.all([
                    fetchMap().catch(() => null),
                    fetchRecentNotes().catch(() => [])
                ]);

                if (onboardingData) {
                    // "Compile" information into the graph structure like the image
                    const nodes: any[] = [
                        { id: 'root', label: onboardingData.name || 'My Neuro Map', val: 20, color: '#e0e0e0', x: 0, y: 0, fx: 0, fy: 0 },
                    ];
                    const links: any[] = [];

                    // Add Profession
                    if (onboardingData.profession) {
                        nodes.push({ id: 'prof', label: onboardingData.profession, val: 12, color: '#a0a0a0' });
                        links.push({ source: 'root', target: 'prof' });
                    }

                    // Add Experience
                    if (onboardingData.experience) {
                        nodes.push({ id: 'exp', label: onboardingData.experience, val: 10, color: '#a0a0a0' });
                        links.push({ source: 'root', target: 'exp' });
                    }

                    // Add Bio
                    if (onboardingData.bio) {
                        nodes.push({ id: 'bio', label: onboardingData.bio.substring(0, 30) + '...', val: 10, color: '#a0a0a0' });
                        links.push({ source: 'root', target: 'bio' });
                    }

                    // Add Skills
                    if (onboardingData.skills) {
                        const skillsList = onboardingData.skills.split(',').map((s: string) => s.trim());
                        skillsList.forEach((skill: string, idx: number) => {
                            nodes.push({ id: `skill_${idx}`, label: skill, val: 8, color: '#a0a0a0' });
                            links.push({ source: 'root', target: `skill_${idx}` });
                        });
                    }

                    // Add Interests
                    if (onboardingData.interests) {
                        onboardingData.interests.forEach((interest: string, idx: number) => {
                            nodes.push({ id: `interest_${idx}`, label: interest, val: 8, color: '#a0a0a0' });
                            links.push({ source: 'root', target: `interest_${idx}` });
                        });
                    }

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
    }, []);

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
        setTimeout(handleResize, 100); // Small delay to ensure container is ready

        return () => window.removeEventListener('resize', handleResize);
    }, [viewMode]);

    const filters = [
        { id: 'all', key: 'dashboard.filters.all' },
        { id: 'global', key: 'dashboard.filters.global' },
        { id: 'management', key: 'dashboard.filters.management' },
        { id: 'ideas', key: 'dashboard.filters.ideas' },
        { id: 'planning', key: 'dashboard.filters.planning' },
    ];


    return (
        <div className="h-full flex flex-col" ref={containerRef}>
            {/* Header section */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {t('dashboard.title')} <span className="text-zinc-500 font-medium ml-2 text-xl">({notes.length})</span>
                        </h1>
                        <p className="text-zinc-400 mt-1 text-sm font-medium">{t('dashboard.subtitle')}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                            {[
                                { mode: 'grid', icon: LayoutGrid, label: 'dashboard.view.grid' },
                                { mode: 'mindmap', icon: Network, label: 'dashboard.view.mindmap' }
                            ].map(({ mode, icon: Icon, label }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as any)}
                                    className={`p-2 rounded-lg transition-all ${viewMode === mode ? 'bg-zinc-800 text-blue-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    aria-label={t(label)}
                                    title={t(label)}
                                >
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className={`p-2.5 rounded-xl border transition-all ${showProfile ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                            aria-label={t('common.profile')}
                            title={t('common.profile')}
                        >
                            <User size={20} />
                        </button>
                        <button
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold text-sm shadow-xl shadow-blue-600/20 active:scale-95"
                            aria-label={t('dashboard.newNote')}
                            title={t('dashboard.newNote')}
                        >
                            <Plus size={20} />
                            <span>{t('dashboard.newNote')}</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={`px-5 py-2 text-sm font-bold rounded-xl whitespace-nowrap transition-all border ${activeFilter === f.id
                                ? 'bg-white text-zinc-950 border-white shadow-lg'
                                : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900'
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
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        </div>
                    ) : viewMode === 'grid' && notes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar">
                            {notes.filter(n => activeFilter === 'all' || n.category === activeFilter).map(note => (
                                <div key={note.id} className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group flex flex-col min-h-[320px]">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${note.category === 'management' ? 'bg-blue-500' :
                                                note.category === 'global' ? 'bg-purple-500' :
                                                    note.category === 'ideas' ? 'bg-amber-500' : 'bg-zinc-500'
                                                }`}></div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                                {note.category ? t(`dashboard.filters.${note.category}`) : 'Note'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {note.locked && <Lock size={16} className="text-zinc-600" />}
                                            <button
                                                className="text-zinc-600 hover:text-zinc-300 transition-colors"
                                                aria-label={t('common.more')}
                                                title={t('common.more')}
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-xl text-zinc-100 mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{note.title || 'Untitled'}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4 flex-1">{note.content}</p>
                                    <div className="pt-6 border-t border-zinc-800/50 mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-500">NN</div>
                                            <span className="text-xs font-bold text-zinc-300">You</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{new Date(note.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-[#0d1b1e] rounded-3xl border border-[#1a2e31] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                            <ForceGraph2D
                                ref={graphRef}
                                width={dimensions.w - (showProfile ? 400 : 0)}
                                height={dimensions.h}
                                graphData={data}
                                nodeLabel="label"
                                linkColor={() => "rgba(80,180,200,0.15)"}
                                backgroundColor="#0d1b1e"
                                linkDirectionalParticles={1}
                                nodeCanvasObject={(node: any, ctx, globalScale) => {
                                    const label = node.label;
                                    const fontSize = 12 / globalScale;
                                    ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                                    ctx.beginPath();
                                    ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
                                    ctx.fillStyle = node.color || "#e0e0e0";
                                    ctx.fill();
                                    if (globalScale > 0.5) {
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                        ctx.fillText(label.length > 20 ? label.substring(0, 17) + '...' : label, node.x, node.y + node.val / 2 + 5 / globalScale);
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
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
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
                                    <p className="text-lg font-bold leading-tight mb-4">{userProfile.personalizedGreeting}</p>
                                    <p className="text-sm text-blue-100/80 font-medium leading-relaxed">{userProfile.summary}</p>
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <Lightbulb className="text-amber-500" size={20} />
                                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-zinc-500">Suggested Topics</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {userProfile.suggestedTopics.map((topic: string) => (
                                        <span key={topic} className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold text-zinc-300 border border-zinc-700/50 hover:border-blue-500/50 hover:text-white transition-all cursor-pointer">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <MapIcon className="text-emerald-500" size={20} />
                                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-zinc-500">Career Path Advice</h3>
                                </div>
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
                                    "{userProfile.careerPathAdvice}"
                                </p>
                            </div>

                            <div className="bg-blue-600/5 rounded-3xl p-8 border border-blue-600/10 relative overflow-hidden">
                                <Quote className="absolute -top-2 -left-2 text-blue-600/10" size={80} />
                                <p className="text-sm font-black text-blue-400 leading-relaxed text-center relative z-10 uppercase tracking-tight">
                                    {userProfile.mindsetQuote}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

