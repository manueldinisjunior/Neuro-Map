import { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { generateMockData } from '../lib/mockData';
import { LayoutGrid, Network, Plus, MoreHorizontal, User, Lock } from 'lucide-react';

export default function Dashboard() {
    const graphRef = useRef<any>(null);
    const [data] = useState(generateMockData(80));
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [viewMode, setViewMode] = useState<'grid' | 'mindmap'>('grid');
    const containerRef = useRef<HTMLDivElement>(null);

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

    const filters = ['All', 'Global', 'Management', 'Ideas', 'Planning'];
    const [activeFilter, setActiveFilter] = useState('All');

    const notes = [
        { id: 1, title: 'Delivery Process', category: 'Management', color: 'red', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut felis, varius elementum tincidunt ut vitae eros de...', author: 'Tillie Benson', date: 'Jul 30, 2019' },
        { id: 2, title: 'Conferences in 2019', category: 'Global', color: 'purple', snippet: 'Blanditi mansa enim nec dui nure mattis. Nulla elementum, varius elementum phasellus dui nure nure de...', author: 'Jim Miller', date: 'Jul 30, 2019' },
        { id: 3, title: 'Design Ideas for Q4', category: 'Ideas', color: 'orange', snippet: 'Eleifend quun adipiscing vitae proin sagittis nure rhoncus mattis rhoncus. Eleifend quun nure sit amet facilisis...', author: 'Brett Tucker', date: 'Jul 30, 2019' },
        { id: 4, title: 'Brainstorming Sessions', category: 'Global', color: 'purple', snippet: 'Aliquam etiam erat scelerisque in. Volutpat vitae. Netus id. Nam nulla rhoncus phasellus de ...', author: 'Harriet Perkins', date: 'Jul 30, 2019' },
        { id: 5, title: 'Plan for 2019', category: 'Global', color: 'purple', snippet: 'In tincidunt tortor aliquam nulla facilisi. Eu tincidunt nure placerat. Massa tincidunt dui ut ornare nure de...', author: 'Nora Hanson', date: 'Jun 13, 2019' },
        { id: 6, title: 'HR Management', category: 'Management', color: 'red', snippet: 'Tincidunt egestas nure. Aliquam elementum mi in. Proin cursus vitae lorem et. Aliquam et de...', author: 'Glenn Silva', date: 'Jun 13, 2019', locked: true },
    ];

    return (
        <div className="h-full flex flex-col" ref={containerRef}>
            {/* Breadcrumbs & Header */}
            <div className="mb-6">
                <nav className="text-xs text-slate-400 font-medium mb-4">
                    Pages <span className="mx-1">›</span> Company Notes
                </nav>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">Notes <span className="text-slate-500 font-normal">({notes.length})</span></h1>
                        <div className="flex gap-1 ml-4 bg-white/5 p-1 rounded-lg border border-white/5">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeFilter === f
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                                aria-label="Grid view"
                                title="Grid view"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('mindmap')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'mindmap' ? 'bg-white/10 text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                                aria-label="Mind map view"
                                title="Mind map view"
                            >
                                <Network size={18} />
                            </button>
                        </div>
                        <button
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-500 transition-all font-semibold text-sm shadow-lg shadow-blue-600/20 active:scale-95"
                            aria-label="Add new note"
                            title="Add new note"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 relative">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => (
                            <div key={note.id} className="bg-slate-900 rounded-3xl p-7 border border-white/5 shadow-xl hover:shadow-blue-500/5 hover:border-white/10 transition-all flex flex-col group h-[300px] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                                <div className="flex items-start justify-between mb-5 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full border border-white/20`} style={{ backgroundColor: note.color, boxShadow: `0 0 12px ${note.color}` }}></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{note.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {note.locked && <Lock size={14} className="text-slate-600" />}
                                        <button
                                            className="text-slate-600 hover:text-slate-400 transition-colors"
                                            aria-label="More options"
                                            title="More options"
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-slate-100 mb-3 group-hover:text-blue-400 transition-colors relative z-10">{note.title}</h3>
                                <p className="text-sm text-slate-400 line-clamp-4 leading-relaxed flex-1 relative z-10">
                                    {note.snippet}
                                </p>

                                <div className="pt-5 border-t border-white/5 mt-5 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative">
                                            <img src={`https://ui-avatars.com/?name=${note.author}&background=random&size=32`} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-300">{note.author}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{note.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-[#0f172a] rounded-3xl overflow-hidden">
                        <ForceGraph2D
                            ref={graphRef}
                            width={dimensions.w}
                            height={dimensions.h}
                            graphData={data}
                            nodeLabel="name"
                            nodeColor={(node: any) => node.color}
                            nodeRelSize={6}
                            linkColor={() => "rgba(255,255,255,0.1)"}
                            backgroundColor="#0f172a"
                            linkDirectionalParticles={2}
                            linkDirectionalParticleSpeed={() => 0.005}
                            linkDirectionalParticleWidth={2}
                            nodeCanvasObject={(node: any, ctx, globalScale) => {
                                const label = node.name;
                                const fontSize = 12 / globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                ctx.beginPath();
                                ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
                                ctx.fillStyle = node.color;
                                ctx.fill();
                                ctx.shadowBlur = 15;
                                ctx.shadowColor = node.color;
                                if (globalScale > 1.5) {
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                    ctx.fillText(label, node.x, node.y + node.val + 2);
                                }
                                ctx.shadowBlur = 0;
                            }}
                            onNodeClick={node => {
                                graphRef.current?.centerAt(node.x, node.y, 1000);
                                graphRef.current?.zoom(4, 1000);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
