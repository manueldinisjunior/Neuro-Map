import React, { useState, useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    Plus, Minus, Maximize2, X, BrainCircuit, ChevronRight, Clock, Plus as PlusIcon,
    Camera, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TREE_DATA, NOTES_DATA } from '../data/knowledge';

// Mock breadcrumb path for demo
const BREADCRUMB_PATH = ['Knowledge Base', 'Technologie', 'Frontend', 'React Ecosystem', 'Hooks'];

export default function GraphWorkspace() {
    const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    // Form State
    const [formTopic, setFormTopic] = useState('');
    const [formContent, setFormContent] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    // Initialize Graph Data with "Neuro Map" as root
    useEffect(() => {
        const buildGraph = () => {
            const nodes: any[] = [];
            const links: any[] = [];

            // 1. The Root Node
            const rootId = 'neuro-map';
            nodes.push({
                id: rootId,
                label: 'Neuro Map',
                size: 50,
                color: '#3b82f6',
                type: 'root',
                fx: 0,
                fy: 0
            });

            // 2. Categories from TREE_DATA
            TREE_DATA.forEach((cat) => {
                const catId = cat.id;
                nodes.push({
                    id: catId,
                    label: cat.label,
                    size: 28,
                    color: cat.color || '#10b981',
                    parentId: rootId,
                    depth: 1,
                    notes: 5,
                    mastery: Math.floor(Math.random() * 40 + 60)
                });
                links.push({ source: rootId, target: catId });

                // 3. Subcategories
                if (cat.children) {
                    cat.children.forEach((sub) => {
                        const subId = sub.id;
                        nodes.push({
                            id: subId,
                            label: sub.label,
                            size: 18,
                            color: cat.color || '#94a3b8',
                            parentId: catId,
                            depth: 2,
                            notes: Math.floor(Math.random() * 10 + 1),
                            mastery: Math.floor(Math.random() * 30 + 50)
                        });
                        links.push({ source: catId, target: subId });

                        // 4. Deep subcategories
                        if (sub.children) {
                            sub.children.forEach((leaf: any) => {
                                nodes.push({
                                    id: leaf.id,
                                    label: leaf.label,
                                    size: 12,
                                    color: cat.color ? cat.color + '99' : '#cbd5e1',
                                    parentId: subId,
                                    depth: 3,
                                    notes: Math.floor(Math.random() * 5 + 1),
                                    mastery: Math.floor(Math.random() * 40 + 40)
                                });
                                links.push({ source: subId, target: leaf.id });
                            });
                        }
                    });
                }
            });

            setGraphData({ nodes, links });
        };

        buildGraph();
    }, []);

    // Handle Resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                // Account for right sidebar when node is selected
                const sidebarWidth = selectedNode ? 340 : 0;
                setDimensions({
                    width: containerRef.current.clientWidth - sidebarWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        setTimeout(updateDimensions, 100);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [selectedNode]);

    // Zoom Controls
    const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 400);
    const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() * 0.7, 400);
    const handleCenter = () => {
        graphRef.current?.centerAt(0, 0, 400);
        graphRef.current?.zoom(1, 400);
    };

    // Node Rendering
    const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.label;
        const size = node.size;
        const isSelected = selectedNode?.id === node.id;
        const isRoot = node.id === 'neuro-map';

        // Glow effect
        ctx.shadowBlur = isSelected ? 25 / globalScale : 8 / globalScale;
        ctx.shadowColor = isSelected ? '#3b82f6' : node.color;

        // Draw Node Circle
        const gradient = ctx.createRadialGradient(
            node.x - size / 3,
            node.y - size / 3,
            size / 10,
            node.x,
            node.y,
            size
        );

        if (isRoot) {
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#60a5fa');
            gradient.addColorStop(1, '#1e40af');
        } else if (isSelected) {
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#14b8a6');
            gradient.addColorStop(1, '#0d9488');
        } else {
            gradient.addColorStop(0, '#ffffff80');
            gradient.addColorStop(0.4, node.color);
            gradient.addColorStop(1, node.color + '80');
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient;
        ctx.fill();

        // White border
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2 / globalScale;
        ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        if (isRoot || globalScale > 0.8 || isSelected || node.size > 15) {
            const fontSize = isRoot ? 16 / globalScale : Math.max(10 / globalScale, 8);
            ctx.font = `${isRoot || isSelected ? '700' : '500'} ${fontSize}px Inter, system-ui, sans-serif`;
            const textWidth = ctx.measureText(label).width;

            // Label background pill
            const labelY = node.y + size + 8 / globalScale;
            const padding = 6 / globalScale;
            const pillHeight = fontSize + padding * 1.5;

            ctx.fillStyle = isSelected ? '#14b8a6' : 'rgba(255, 255, 255, 0.95)';
            ctx.beginPath();
            ctx.roundRect(
                node.x - textWidth / 2 - padding,
                labelY - padding / 2,
                textWidth + padding * 2,
                pillHeight,
                4 / globalScale
            );
            ctx.fill();

            if (!isSelected) {
                ctx.strokeStyle = 'rgba(0,0,0,0.08)';
                ctx.lineWidth = 1 / globalScale;
                ctx.stroke();
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isSelected ? '#ffffff' : '#374151';
            ctx.fillText(label, node.x, labelY + pillHeight / 2 - padding / 2);

            // Count badge for selected
            if (isSelected && node.notes) {
                const badgeX = node.x + textWidth / 2 + padding + 12 / globalScale;
                const badgeSize = 14 / globalScale;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(badgeX, labelY + pillHeight / 2 - padding / 2, badgeSize, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#14b8a6';
                ctx.font = `600 ${10 / globalScale}px Inter, sans-serif`;
                ctx.fillText(String(node.notes), badgeX, labelY + pillHeight / 2 - padding / 2);
            }
        }
    }, [selectedNode]);

    // Get recent notes for selected node (mock)
    const getRecentNotes = () => {
        return NOTES_DATA.slice(0, 2);
    };

    return (
        <div className="w-full h-full flex bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30" ref={containerRef}>
            {/* Main Graph Area */}
            <div className="flex-1 relative">
                {/* Breadcrumb Navigation */}
                <div className="absolute top-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
                        {BREADCRUMB_PATH.map((crumb, idx) => (
                            <React.Fragment key={idx}>
                                <button className="hover:text-blue-600 font-medium transition-colors">
                                    {crumb}
                                </button>
                                {idx < BREADCRUMB_PATH.length - 1 && (
                                    <ChevronRight size={14} className="text-slate-300" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Graph Canvas */}
                <ForceGraph2D
                    ref={graphRef}
                    width={selectedNode ? dimensions.width : dimensions.width}
                    height={dimensions.height}
                    graphData={graphData}
                    nodeRelSize={1}
                    linkColor={() => 'rgba(148, 163, 184, 0.25)'}
                    linkWidth={1.5}
                    backgroundColor="transparent"
                    nodeCanvasObject={nodeCanvasObject}
                    onNodeClick={(node) => {
                        setSelectedNode(node);
                        graphRef.current?.centerAt(node.x, node.y, 400);
                        graphRef.current?.zoom(1.8, 400);
                    }}
                    onBackgroundClick={() => setSelectedNode(null)}
                    cooldownTicks={100}
                    d3VelocityDecay={0.5}
                    d3AlphaDecay={0.02}
                />

                {/* Minimap Placeholder */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-white/80 backdrop-blur border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                        <Layers size={20} className="text-slate-300" />
                    </div>
                    <div className="absolute bottom-1 right-1 flex gap-0.5">
                        <button className="w-5 h-5 bg-slate-200/80 rounded text-slate-500 flex items-center justify-center hover:bg-slate-300 transition-colors" title="Screenshot" aria-label="Screenshot">
                            <Camera size={12} />
                        </button>
                    </div>
                </div>

                {/* Bottom Zoom Controls */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="bg-white/90 backdrop-blur shadow-lg border border-slate-200 rounded-xl p-1 flex flex-col gap-0.5">
                        <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Zoom In" aria-label="Zoom In">
                            <Plus size={18} />
                        </button>
                        <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Zoom Out" aria-label="Zoom Out">
                            <Minus size={18} />
                        </button>
                        <button onClick={handleCenter} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Center Graph" aria-label="Center Graph">
                            <Maximize2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Selected Topic Panel */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white border-l border-slate-200 flex flex-col overflow-hidden"
                    >
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Selected Topic</p>
                                    <h2 className="text-2xl font-bold text-slate-800 leading-tight">{selectedNode.label}</h2>
                                    <button className="text-sm text-slate-500 hover:text-blue-600 mt-1 flex items-center gap-1 transition-colors">
                                        Part of {selectedNode.parentId || 'Root'} <ChevronRight size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                                    title="Close"
                                    aria-label="Close panel"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                    <p className="text-2xl font-bold text-slate-800">{selectedNode.depth || 1}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Depth</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                    <p className="text-2xl font-bold text-slate-800">{selectedNode.notes || 5}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Notes</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                    <p className="text-2xl font-bold text-slate-800">{selectedNode.mastery || 75}%</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Mastery</p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-slate-800 mb-2">Summary</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {selectedNode.id === 'neuro-map'
                                        ? 'Your central knowledge hub connecting all topics and ideas.'
                                        : `${selectedNode.label} allows you to explore and understand concepts related to this topic. Linked notes and subtopics help build deeper knowledge.`}
                                </p>
                            </div>

                            {/* Recent Notes */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-bold text-slate-800">Recent Notes</h3>
                                    <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View all</button>
                                </div>
                                <div className="space-y-3">
                                    {getRecentNotes().map(note => (
                                        <div key={note.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
                                            <h4 className="text-sm font-semibold text-slate-800 mb-1">{note.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{note.content}</p>
                                            <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                                                <Clock size={12} />
                                                <span className="text-[10px] font-medium">2 hours ago</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {['#frontend', '#javascript', '#architecture'].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 cursor-pointer transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add Note Button */}
                        <div className="p-4 border-t border-slate-100">
                            <button
                                onClick={() => setIsNoteModalOpen(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                            >
                                <PlusIcon size={18} />
                                Add Note
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Node Creation Modal */}
            <AnimatePresence>
                {isNoteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200"
                        >
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">New Note</h3>
                                        <p className="text-xs text-slate-500">Add to {selectedNode?.label || 'Knowledge Base'}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsNoteModalOpen(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors" title="Close" aria-label="Close">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="note-topic" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Topic</label>
                                    <input
                                        id="note-topic"
                                        value={formTopic}
                                        onChange={e => setFormTopic(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 outline-none transition-all"
                                        placeholder="e.g. React Hooks"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="note-content" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Content</label>
                                    <textarea
                                        id="note-content"
                                        value={formContent}
                                        onChange={e => setFormContent(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 outline-none transition-all resize-none h-32"
                                        placeholder="Write your note..."
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setFormTopic('');
                                        setFormContent('');
                                        setIsNoteModalOpen(false);
                                    }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                                >
                                    Save Note
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
