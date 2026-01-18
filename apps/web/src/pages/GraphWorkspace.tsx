import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ZoomIn,
    ZoomOut,
    Maximize2,
    RefreshCw,
    Download,
    Filter,
    Layers,
    Brain,
    Search,
    X
} from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import { TREE_DATA, CATEGORIES_STATS, type TreeItem } from '../data/knowledge';
import './GraphWorkspace.css';

// Types
interface GraphNode {
    id: string;
    label: string;
    size: number;
    color: string;
    colorClass: string;
    val: number;
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;
}

interface GraphLink {
    source: string;
    target: string;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

// Control Button Component
interface ControlButtonProps {
    onClick: () => void;
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
    label: string;
    isActive?: boolean;
}

const ControlButton = React.memo(({ onClick, icon: Icon, label, isActive }: ControlButtonProps) => (
    <button
        onClick={onClick}
        className={`
            p-3 rounded-xl transition-all duration-200
            ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white'
            }
        `}
        aria-label={label}
        title={label}
    >
        <Icon size={18} />
    </button>
));
ControlButton.displayName = 'ControlButton';

// Build graph data from tree structure
const buildGraphData = (treeData: TreeItem[]): GraphData => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const rootId = 'neuro-map-root';

    // Add root node
    nodes.push({
        id: rootId,
        label: 'Neuro Map',
        size: 35,
        color: '#3b82f6',
        colorClass: 'bg-blue-500',
        val: 35,
        fx: 0,
        fy: 0
    });

    // Recursive function to add nodes
    const addNode = (item: TreeItem, parentId: string, depth: number = 0) => {
        const baseSize = Math.max(12, 22 - depth * 4);

        const statsEntry = CATEGORIES_STATS[depth % CATEGORIES_STATS.length];
        nodes.push({
            id: item.id,
            label: item.label,
            size: baseSize + (item.count || 0) * 0.5,
            color: item.color || statsEntry?.color || '#64748b',
            colorClass: statsEntry?.colorClass || 'bg-slate-500',
            val: baseSize
        });

        links.push({
            source: parentId,
            target: item.id
        });

        if (item.children) {
            item.children.forEach((child) => addNode(child, item.id, depth + 1));
        }
    };

    // Build graph from tree data
    treeData.forEach((category) => addNode(category, rootId, 0));

    return { nodes, links };
};

export default function GraphWorkspace() {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Build graph data memoized
    const graphData = useMemo(() => buildGraphData(TREE_DATA), []);

    // Filtered nodes based on search
    const filteredGraphData = useMemo(() => {
        if (!searchQuery.trim()) return graphData;

        const query = searchQuery.toLowerCase();
        const matchingNodeIds = new Set<string>();

        // Find matching nodes
        graphData.nodes.forEach(node => {
            if (node.label.toLowerCase().includes(query)) {
                matchingNodeIds.add(node.id);
            }
        });

        // Include connected nodes
        graphData.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
            const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;

            if (matchingNodeIds.has(sourceId) || matchingNodeIds.has(targetId)) {
                matchingNodeIds.add(sourceId);
                matchingNodeIds.add(targetId);
            }
        });

        // Always include root
        matchingNodeIds.add('neuro-map-root');

        return {
            nodes: graphData.nodes.filter(n => matchingNodeIds.has(n.id)),
            links: graphData.links.filter(l => {
                const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
                const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
                return matchingNodeIds.has(sourceId) && matchingNodeIds.has(targetId);
            })
        };
    }, [graphData, searchQuery]);

    // Handle resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
                setIsLoading(false);
            }
        };

        // Initial measurement with delay for render
        const timer = setTimeout(updateDimensions, 100);
        window.addEventListener('resize', updateDimensions);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Graph controls
    const handleZoomIn = useCallback(() => {
        if (graphRef.current) {
            const currentZoom = graphRef.current.zoom();
            graphRef.current.zoom(currentZoom * 1.3, 400);
        }
    }, []);

    const handleZoomOut = useCallback(() => {
        if (graphRef.current) {
            const currentZoom = graphRef.current.zoom();
            graphRef.current.zoom(currentZoom * 0.7, 400);
        }
    }, []);

    const handleCenterGraph = useCallback(() => {
        if (graphRef.current) {
            graphRef.current.centerAt(0, 0, 500);
            graphRef.current.zoom(1, 500);
        }
    }, []);

    const handleRefresh = useCallback(() => {
        if (graphRef.current) {
            graphRef.current.d3ReheatSimulation();
        }
    }, []);

    // Node click handler
    const handleNodeClick = useCallback((node: GraphNode) => {
        setSelectedNode(node);
        if (graphRef.current) {
            graphRef.current.centerAt(node.x, node.y, 500);
            graphRef.current.zoom(2, 500);
        }
    }, []);

    // Custom node rendering
    const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.label;
        const size = node.size || 10;
        const isSelected = selectedNode?.id === node.id;

        // Glow effect for selected
        if (isSelected) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, size + 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = `${node.color}40`;
            ctx.fill();
        }

        // Main circle with gradient
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);

        const gradient = ctx.createRadialGradient(
            node.x - size / 3, node.y - size / 3, size / 10,
            node.x, node.y, size
        );
        gradient.addColorStop(0, '#ffffff50');
        gradient.addColorStop(1, node.color);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Border
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();

        // Label
        if (globalScale > 0.6 || isSelected) {
            const fontSize = Math.min(size / 2.5, 12);
            ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';

            // Text shadow for readability
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(label, node.x, node.y);
            ctx.shadowBlur = 0;
        }
    }, [selectedNode]);

    return (
        <div className="flex-1 h-full flex flex-col bg-slate-950 overflow-hidden relative">
            {/* Top Controls Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex items-start justify-between pointer-events-none">
                {/* Left: Title & Search */}
                <div className="pointer-events-auto space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 backdrop-blur-sm 
                            flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
                            <Brain size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                Mind Map
                            </h1>
                            <p className="text-sm text-slate-400 font-medium hidden sm:block">
                                {filteredGraphData.nodes.length} nodes • {filteredGraphData.links.length} connections
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search nodes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-white/10 backdrop-blur-sm
                                border border-white/10 rounded-xl text-sm font-medium text-white
                                placeholder:text-slate-400 focus:outline-none focus:ring-2 
                                focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: Control Buttons */}
                <div className="pointer-events-auto flex flex-col gap-2">
                    <ControlButton onClick={handleZoomIn} icon={ZoomIn} label="Zoom In" />
                    <ControlButton onClick={handleZoomOut} icon={ZoomOut} label="Zoom Out" />
                    <ControlButton onClick={handleCenterGraph} icon={Maximize2} label="Center Graph" />
                    <ControlButton onClick={handleRefresh} icon={RefreshCw} label="Refresh Layout" />
                    <div className="w-full h-px bg-white/10 my-1" />
                    <ControlButton
                        onClick={() => setShowFilters(!showFilters)}
                        icon={Filter}
                        label="Filters"
                        isActive={showFilters}
                    />
                </div>
            </div>

            {/* Selected Node Info Panel */}
            {selectedNode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20
                        bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl
                        px-6 py-4 min-w-[200px] max-w-[90vw] md:max-w-md"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-4 h-4 rounded-full flex-shrink-0 ${selectedNode.colorClass}`}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold truncate">{selectedNode.label}</h3>
                            <p className="text-slate-400 text-sm">
                                Size: {Math.round(selectedNode.size)} • ID: {selectedNode.id}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-10 hidden md:block pointer-events-none">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Layers size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Categories
                        </span>
                    </div>
                    <div className="space-y-2">
                        {CATEGORIES_STATS.slice(0, 5).map((cat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div
                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${cat.colorClass}`}
                                />
                                <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
                                    {cat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Graph Container */}
            <div ref={containerRef} className="flex-1 w-full h-full">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 
                                rounded-full animate-spin" />
                            <p className="text-slate-400 font-medium">Loading mind map...</p>
                        </div>
                    </div>
                ) : dimensions.width > 0 && (
                    <ForceGraph2D
                        ref={graphRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        graphData={filteredGraphData}
                        nodeRelSize={6}
                        nodeCanvasObject={nodeCanvasObject}
                        nodeCanvasObjectMode={() => 'replace'}
                        onNodeClick={handleNodeClick}
                        linkColor={() => 'rgba(255,255,255,0.08)'}
                        linkWidth={1.5}
                        backgroundColor="transparent"
                        d3VelocityDecay={0.3}
                        d3AlphaDecay={0.02}
                        cooldownTicks={150}
                        enableNodeDrag={true}
                        enableZoomInteraction={true}
                        enablePanInteraction={true}
                    />
                )}
            </div>

            {/* Hint Text */}
            <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium text-right">
                    Click nodes to focus • Drag to move • Scroll to zoom
                </p>
            </div>
        </div>
    );
}
