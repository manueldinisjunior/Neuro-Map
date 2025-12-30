import React, { useState, useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    Plus, Minus, Maximize2, X, BrainCircuit, Search, LayoutGrid, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TREE_DATA } from '../data/knowledge';

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

    // Initialize Graph Data with "Max Mus" as root
    useEffect(() => {
        const buildGraph = () => {
            const nodes: any[] = [];
            const links: any[] = [];

            // 1. The Big Neuron "Max Mus"
            const rootId = 'max-mus';
            nodes.push({
                id: rootId,
                label: 'Max Mus',
                size: 60,
                color: '#3b82f6', // Blue primary
                type: 'root',
                fx: 0,
                fy: 0 // Fix to center initially
            });

            // 2. Categories from TREE_DATA
            TREE_DATA.forEach((cat, idx) => {
                const catId = cat.id;
                nodes.push({
                    id: catId,
                    label: cat.label,
                    size: 30,
                    color: cat.color || '#10b981',
                    parentId: rootId
                });
                links.push({ source: rootId, target: catId });

                // 3. Subcategories
                if (cat.children) {
                    cat.children.forEach((sub, subIdx) => {
                        const subId = sub.id;
                        nodes.push({
                            id: subId,
                            label: sub.label,
                            size: 15,
                            color: cat.color || '#94a3b8',
                            parentId: catId
                        });
                        links.push({ source: catId, target: subId });

                        // 4. Deep subcategories (Leaves) - limit depth for performance/clarity if needed
                        if (sub.children) {
                            sub.children.forEach((leaf: any) => {
                                nodes.push({
                                    id: leaf.id,
                                    label: leaf.label,
                                    size: 8,
                                    color: cat.color ? cat.color + '80' : '#cbd5e1',
                                    parentId: subId
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
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        // Slight delay to ensure container is ready
        setTimeout(updateDimensions, 100);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

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
        const isRoot = node.id === 'max-mus';

        // Shadows / Glow
        ctx.shadowBlur = (isSelected || isRoot) ? 30 / globalScale : 10 / globalScale;
        ctx.shadowColor = node.color;

        // Draw Node (Sphere effect)
        const gradient = ctx.createRadialGradient(
            node.x - size / 3,
            node.y - size / 3,
            size / 10,
            node.x,
            node.y,
            size
        );

        if (isRoot) {
            // "Big Neuron" styling
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.2, '#60a5fa');
            gradient.addColorStop(1, '#1e3a8a');
        } else {
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.3, node.color);
            gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Label Rendering
        // Show label if root, category, selected, or zoomed in
        if (isRoot || globalScale > 1.2 || isSelected || node.size > 20) {
            const fontSize = isRoot ? 24 / globalScale : 12 / globalScale;
            ctx.font = `${(isRoot || isSelected) ? '900' : '600'} ${fontSize}px Inter, sans-serif`;
            const textWidth = ctx.measureText(label).width;

            ctx.shadowBlur = 0;
            ctx.fillStyle = isRoot ? '#1e293b' : '#475569';

            // Background pills for readability
            if (!isRoot) {
                const padding = 4 / globalScale;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.roundRect(
                    node.x - textWidth / 2 - padding,
                    node.y + size + padding,
                    textWidth + padding * 2,
                    fontSize + padding * 2,
                    4 / globalScale
                );
                ctx.fill();
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = node.color === '#ffffff' ? '#000' : '#1e293b';
            if (isRoot) ctx.fillStyle = '#1e3a8a'; // Dark blue for Max Mus text

            ctx.fillText(label, node.x, node.y + size + (5 / globalScale));
        }
    }, [selectedNode]);

    return (
        <div className="w-full h-full relative bg-slate-50" ref={containerRef}>
            {/* Graph Canvas */}
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeRelSize={1}
                linkColor={() => 'rgba(148, 163, 184, 0.3)'}
                linkWidth={1.5}
                backgroundColor="transparent"
                nodeCanvasObject={nodeCanvasObject}
                onNodeClick={(node) => {
                    setSelectedNode(node);
                    // Center on click
                    graphRef.current?.centerAt(node.x, node.y, 400);
                    graphRef.current?.zoom(2, 400);
                }}
                cooldownTicks={100}
                d3VelocityDecay={0.6} // More friction for stability
                d3AlphaDecay={0.02}
            />

            {/* Overlay UI - Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform mb-4"
                    title="Add Thought to Max Mus"
                >
                    <Plus size={28} />
                </button>

                <div className="bg-white/90 backdrop-blur shadow-lg border border-slate-100 rounded-2xl p-1 flex flex-col gap-1">
                    <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600" title="Zoom In" aria-label="Zoom In">
                        <Plus size={20} />
                    </button>
                    <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600" title="Zoom Out" aria-label="Zoom Out">
                        <Minus size={20} />
                    </button>
                    <button onClick={handleCenter} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600" title="Center Graph" aria-label="Center Graph">
                        <Maximize2 size={20} />
                    </button>
                </div>
            </div>

            {/* Node Creation Modal */}
            <AnimatePresence>
                {isNoteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 border border-white/50"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-lg">New Thought</h3>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Connecting to Max Mus</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsNoteModalOpen(false)} className="text-slate-400 hover:text-slate-600" title="Close" aria-label="Close">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Topic</label>
                                    <input
                                        value={formTopic}
                                        onChange={e => setFormTopic(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        placeholder="e.g. Quantum Computing"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Context</label>
                                    <textarea
                                        value={formContent}
                                        onChange={e => setFormContent(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none h-32"
                                        placeholder="Describe your thought..."
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        // Mock Save
                                        setFormTopic('');
                                        setFormContent('');
                                        setIsNoteModalOpen(false);
                                    }}
                                    className="w-full bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-xs"
                                >
                                    Connect to Mind Map
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Selected Node Details Floating Card */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute top-8 right-8 w-80 bg-white/90 backdrop-blur shadow-2xl rounded-3xl p-6 border border-slate-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-black text-xl text-slate-800 leading-tight">{selectedNode.label}</h3>
                            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600" title="Close" aria-label="Close">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-4">
                            Connected to <span className="text-blue-600 font-bold">{selectedNode.id === 'max-mus' ? 'Everything' : 'Max Mus'}</span>.
                        </p>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors">Expand</button>
                            <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors">Edit</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
