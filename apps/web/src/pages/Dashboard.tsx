import { useState, useRef, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Plus, Maximize2, Minus } from 'lucide-react';
import { TREE_DATA, type TreeItem } from '../data/knowledge';

// Helper to transform tree to graph
const generateGraphData = (data: TreeItem[]) => {
    const nodes: any[] = [];
    const links: any[] = [];

    const processItem = (item: TreeItem, parentId?: string, depth = 0) => {
        // Base size and color
        const baseSize = depth === 0 ? 35 : depth === 1 ? 25 : 15;
        const color = item.color || (depth === 0 ? '#14b8a6' : depth === 1 ? '#0ea5e9' : '#94a3b8');

        nodes.push({
            id: item.id,
            label: item.label,
            color: color,
            size: baseSize,
            depth: depth
        });

        if (parentId) {
            links.push({
                source: parentId,
                target: item.id
            });
        }

        if (item.children) {
            item.children.forEach(child => processItem(child, item.id, depth + 1));
        }
    };

    data.forEach(item => processItem(item));
    return { nodes, links };
};

export default function Dashboard() {
    const graphData = useMemo(() => generateGraphData(TREE_DATA), []);
    const [selectedNode, setSelectedNode] = useState<any>(null);
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
        // Trigger a second layout update to ensure correct size after parent finishes rendering
        const timer = setTimeout(updateDimensions, 100);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timer);
        };
    }, []);

    const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 400);
    const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() * 0.7, 400);

    return (
        <div className="w-full h-full relative" ref={containerRef}>
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeRelSize={12}
                nodeVal={node => (node as any).size}
                nodeColor={node => (node as any).color}
                linkColor={() => 'rgba(148, 163, 184, 0.2)'}
                linkWidth={2}
                backgroundColor="transparent"
                onNodeClick={(node) => setSelectedNode(node)}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.label;
                    const size = (node.size || 20);
                    const isSelected = selectedNode?.id === node.id;

                    // 3D Sphere Effect (Radial Gradient)
                    const gradient = ctx.createRadialGradient(
                        node.x - size / 3,
                        node.y - size / 3,
                        size / 10,
                        node.x,
                        node.y,
                        size
                    );
                    gradient.addColorStop(0, '#fff');
                    gradient.addColorStop(0.3, node.color);
                    gradient.addColorStop(1, 'rgba(0,0,0,0.8)');

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = gradient;
                    ctx.shadowBlur = isSelected ? 40 / globalScale : 20 / globalScale;
                    ctx.shadowColor = node.color;
                    ctx.fill();

                    // Inner shine
                    ctx.beginPath();
                    ctx.arc(node.x - size / 3, node.y - size / 3, size / 4, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                    ctx.fill();

                    // Label Callout
                    if (globalScale > 0.4) {
                        const fontSize = 14 / globalScale;
                        ctx.font = `${isSelected ? '800' : '600'} ${fontSize}px Inter, sans-serif`;
                        const textWidth = ctx.measureText(label).width;
                        const padding = 10 / globalScale;

                        const bx = node.x - textWidth / 2 - padding;
                        const by = node.y + size + 15 / globalScale;
                        const bw = textWidth + padding * 2;
                        const bh = fontSize + padding * 1.5;
                        const r = 12 / globalScale;

                        ctx.shadowBlur = 10 / globalScale;
                        ctx.shadowColor = 'rgba(0,0,0,0.1)';
                        ctx.fillStyle = isSelected ? '#3b82f6' : 'white';

                        // Triangle pointer
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y + size + 5 / globalScale);
                        ctx.lineTo(node.x - 6 / globalScale, by);
                        ctx.lineTo(node.x + 6 / globalScale, by);
                        ctx.fill();

                        // Bubble
                        ctx.beginPath();
                        ctx.roundRect(bx, by, bw, bh, r);
                        ctx.fill();

                        // Text
                        ctx.shadowBlur = 0;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = isSelected ? 'white' : '#1e293b';
                        ctx.fillText(label, node.x, by + bh / 2);

                        if (isSelected && node.id === 'programming') {
                            const subText = "11 Notes • Self-Learning Topics";
                            const subSize = 8 / globalScale;
                            ctx.font = `600 ${subSize}px Inter, sans-serif`;
                            ctx.fillStyle = isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(30,41,59,0.5)';
                            ctx.fillText(subText, node.x, by + bh + 12 / globalScale);
                        }
                    }
                }}
            />

            {/* Floating Action Button */}
            <div className="absolute bottom-10 left-10 flex gap-4">
                <button
                    className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Create New Note"
                    title="Create New Note"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-white shadow-2xl flex items-center gap-2">
                <button
                    onClick={handleZoomIn}
                    className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"
                    aria-label="Zoom In"
                    title="Zoom In"
                >
                    <Plus size={18} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button
                    onClick={handleZoomOut}
                    className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"
                    aria-label="Zoom Out"
                    title="Zoom Out"
                >
                    <Minus size={18} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button
                    onClick={() => graphRef.current?.centerAt(0, 0, 400)}
                    className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"
                    aria-label="Recenter Camera"
                    title="Recenter Camera"
                >
                    <Maximize2 size={18} />
                </button>
            </div>
        </div>
    );
}
