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
                        <h1 className="text-2xl font-bold text-slate-800">Notes <span className="text-slate-400 font-normal">({notes.length})</span></h1>
                        <div className="flex gap-1 ml-4">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeFilter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-200'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-slate-200 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('mindmap')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'mindmap' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Network size={18} />
                            </button>
                        </div>
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all font-semibold text-sm">
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
                            <div key={note.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group h-[280px]">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${note.color}-500 shadow-[0_0_8px] shadow-${note.color}-500/50`}></div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{note.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {note.locked && <Lock size={14} className="text-slate-300" />}
                                        <button className="text-slate-300 hover:text-slate-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{note.title}</h3>
                                <p className="text-xs text-slate-500 line-clamp-4 leading-relaxed flex-1">
                                    {note.snippet}
                                </p>

                                <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img src={`https://ui-avatars.com/?name=${note.author}&background=random&size=24`} className="w-6 h-6 rounded-full" alt="" />
                                        <span className="text-[10px] font-semibold text-slate-700">{note.author}</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400 uppercase">{note.date}</span>
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
