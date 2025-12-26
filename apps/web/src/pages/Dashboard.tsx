import { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { generateMockData } from '../lib/mockData';

export default function Dashboard() {
    const graphRef = useRef<any>(null);
    const [data] = useState(generateMockData(80));
    const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                w: window.innerWidth,
                h: window.innerHeight - 64 // Subtract header height
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full h-full bg-slate-900 relative overflow-hidden">
            {/* Graph Container */}
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.w}
                height={dimensions.h}
                graphData={data}
                nodeLabel="name"
                nodeColor={(node: any) => node.color}
                nodeRelSize={6}
                linkColor={() => "rgba(255,255,255,0.2)"}
                backgroundColor="#0f172a" // slate-900

                // Particles
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={d => 0.005}
                linkDirectionalParticleWidth={2}

                // Node Painting
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    // Draw Node
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
                    ctx.fillStyle = node.color;
                    ctx.fill();

                    // Glow effect
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = node.color;

                    // Draw Label
                    if (globalScale > 1.5) { // Only show labels when zoomed in slightly
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillText(label, node.x, node.y + node.val + 2);
                    }

                    // Reset shadow for next draw
                    ctx.shadowBlur = 0;
                }}

                onNodeClick={node => {
                    // Focus on node
                    graphRef.current?.centerAt(node.x, node.y, 1000);
                    graphRef.current?.zoom(4, 1000);
                }}
            />

            {/* Floating Controls / HUD */}
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 text-white max-w-xs">
                <h2 className="font-bold mb-2">My Mind Map</h2>
                <p className="text-sm text-slate-300">
                    80 active nodes <br />
                    5 categories
                </p>
            </div>
        </div>
    );
}
