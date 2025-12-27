import { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { LayoutGrid, Network, Plus, MoreHorizontal, Lock, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchMap, fetchRecentNotes } from '../lib/api';

export default function Dashboard() {
    const { t } = useTranslation();
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState({ nodes: [], edges: [] });
    const [notes, setNotes] = useState<any[]>([]);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [viewMode, setViewMode] = useState<'grid' | 'mindmap'>('grid');
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [mapRes, notesRes] = await Promise.all([
                    fetchMap(),
                    fetchRecentNotes()
                ]);
                setData(mapRes as any);
                setNotes(notesRes);
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
        handleResize();

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
            <div className="flex-1 min-h-0 relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                ) : notes.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                        <div className="w-20 h-20 bg-zinc-900 rounded-[30px] flex items-center justify-center mb-6 border border-zinc-800">
                            <Plus className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-xl font-bold">No notes yet</p>
                        <p className="text-sm font-medium mt-1">Start by creating your first note or completing onboarding.</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.filter(n => activeFilter === 'all' || n.category === activeFilter).map(note => (
                            <div key={note.id} className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group flex flex-col h-[320px]">
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

                                <h3 className="font-bold text-xl text-zinc-100 mb-4 group-hover:text-blue-400 transition-colors">{note.title || 'Untitled'}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4 flex-1">
                                    {note.content}
                                </p>

                                <div className="pt-6 border-t border-zinc-800/50 mt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                                            NN
                                        </div>
                                        <span className="text-xs font-bold text-zinc-300">You</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{new Date(note.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
                        <ForceGraph2D
                            ref={graphRef}
                            width={dimensions.w}
                            height={dimensions.h}
                            graphData={data}
                            nodeLabel="label"
                            nodeColor={() => "#3b82f6"}
                            nodeRelSize={6}
                            nodeVal={node => (node as any).radius / 2}
                            linkColor={() => "rgba(255,255,255,0.05)"}
                            backgroundColor="#09090b"
                            linkDirectionalParticles={2}
                            linkDirectionalParticleSpeed={() => 0.005}
                            linkDirectionalParticleWidth={2}
                            nodeCanvasObject={(node: any, ctx, globalScale) => {
                                const label = node.label;
                                const fontSize = 12 / globalScale;
                                ctx.font = `${fontSize}px Inter, sans-serif`;
                                ctx.beginPath();
                                ctx.arc(node.x, node.y, node.radius / 3, 0, 2 * Math.PI, false);
                                ctx.fillStyle = "#3b82f6";
                                ctx.fill();
                                if (globalScale > 1.2) {
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                                    ctx.fillText(label, node.x, node.y + (node.radius / 3) + 2.5);
                                }
                            }}
                            onNodeClick={node => {
                                graphRef.current?.centerAt(node.x, node.y, 800);
                                graphRef.current?.zoom(4, 800);
                            }}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}

