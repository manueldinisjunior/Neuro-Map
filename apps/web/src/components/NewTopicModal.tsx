import React, { useState, useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Save, Brain } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from './ui/Modal';
import { TREE_DATA, NOTES_DATA, type TreeItem, type Note } from '../data/knowledge';
import { useTopics } from '../context/TopicContext';

interface NewTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Simulated API Call
const createNoteApi = async (data: { topic: string; title: string; content: string; categoryId?: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newId = `topic-${Date.now()}`;
    const newNoteId = `note-${Date.now()}`;

    // 1. Add to Tree (Knowledge Knowledge)
    // Find a category to add to or add as a new top-level category?
    // Request implies "New Topic" which usually fits under a category.
    // For simplicity, we'll suggest it adds to "Education & Learning" 
    // or creates a new top-level if we don't have a category selector.
    // The UI requirements didn't ask for a Category dropdown, so let's make it a new top-level node for now.

    const newTreeItem: TreeItem = {
        id: newId,
        label: data.topic,
        expanded: true,
        color: '#8b5cf6', // Purple/Violet for user created
        children: []
    };

    // Mutate the array (in-memory persistence for demo)
    if (data.categoryId) {
        // Add to existing category
        const parent = TREE_DATA.find(c => c.id === data.categoryId);
        if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(newTreeItem);

            // Should we expand the parent?
            parent.expanded = true;
        } else {
            // Fallback to root if not found
            TREE_DATA.push(newTreeItem);
        }
    } else {
        // Add as new top-level
        TREE_DATA.push(newTreeItem);
    }

    // 2. Add the Note content
    if (data.title || data.content) {
        const newNote: Note = {
            id: newNoteId,
            title: data.title || data.topic,
            content: data.content,
            // Use the category label if found, global lookup or passed down
            category: data.categoryId ? TREE_DATA.find(c => c.id === data.categoryId)?.label || data.topic : data.topic,
            tags: ['User Created'],
            createdAt: new Date().toISOString(),
            color: '#8b5cf6'
        };
        NOTES_DATA.push(newNote);
    }

    return { treeItem: newTreeItem };
};

export function NewTopicModal({ isOpen, onClose }: NewTopicModalProps) {
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const { refreshGraph } = useTopics();
    const queryClient = useQueryClient();

    // Reset form on open
    useEffect(() => {
        if (isOpen) {
            setTopic('');
            setTitle('');
            setContent('');
            setSelectedCategoryId('');
        }
    }, [isOpen]);

    const mutation = useMutation({
        mutationFn: createNoteApi,
        onSuccess: () => {
            refreshGraph();
            // Invalidate any real queries if we had them
            queryClient.invalidateQueries({ queryKey: ['knowledge-tree'] });
            onClose();
        }
    });

    const handleSave = () => {
        if (!topic.trim()) return; // Validation: Topic required
        // content is nominally required by "Goal" text but let's be flexible or strict? 
        // "Validate: topicName required, content required" -> OK strict.
        if (!content.trim()) return;

        mutation.mutate({ topic, title, content, categoryId: selectedCategoryId });
    };

    // --- Graph Preview Logic (Simplified from CreateNoteModal) ---
    const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    useEffect(() => {
        // Build a flatten graph for preview
        const nodes: any[] = [];
        const links: any[] = [];
        const rootId = 'preview-root';

        nodes.push({ id: rootId, label: 'Neuro Map', size: 30, color: '#3b82f6', fx: 0, fy: 0 });

        // Add some existing nodes for context
        TREE_DATA.slice(0, 5).forEach((cat, idx) => {
            nodes.push({
                id: cat.id,
                label: cat.label,
                size: 20,
                color: cat.color || '#10b981',
                val: 20
            });
            links.push({ source: rootId, target: cat.id });
        });

        setGraphData({ nodes, links });
    }, []);

    // Handle Resize
    useEffect(() => {
        if (!isOpen) return;
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };
        const t = setTimeout(updateDimensions, 100);
        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(t);
        };
    }, [isOpen]);

    const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.label;
        const size = node.size || 10;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);

        // Gradient (Glossy)
        const gradient = ctx.createRadialGradient(
            node.x - size / 3, node.y - size / 3, size / 10,
            node.x, node.y, size
        );
        gradient.addColorStop(0, '#ffffff40');
        gradient.addColorStop(1, node.color);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Label
        if (globalScale > 0.8) {
            ctx.font = `600 ${Math.min(size / 2, 10)}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label, node.x, node.y);
        }
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false} // We handle our own close logic if needed, or use the one in Modal. 
            // The design shows a specific close button in the top right of the whole modal, usually Modal component handles this.
            // But let's check exact layout requested: "X button (top-right)".
            // Modal component has it. We can confirm placement.
            className="max-w-5xl h-[650px] flex flex-col md:flex-row"
        >
            {/* Left Side: Creation Form */}
            <div className="w-full md:w-2/5 p-8 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Create a Note</h2>
                    <p className="text-xs text-slate-400">Add a new topic to your knowledge network.</p>
                </div>

                <div className="space-y-5 flex-1 overflow-y-auto scrollbar-none">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                        >
                            <option value="">Create New Category (Top Level)</option>
                            {TREE_DATA.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Topic <span className="text-red-400">*</span></label>
                        <input
                            type="text"
                            placeholder="Enter a topic..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:font-medium placeholder:text-slate-300"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title <span className="text-slate-300 font-medium normal-case">(Optional)</span></label>
                        <input
                            type="text"
                            placeholder="Enter a title..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:font-medium placeholder:text-slate-300"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 flex-1 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content <span className="text-red-400">*</span></label>
                        <textarea
                            placeholder="Write your thoughts here..."
                            className="w-full flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none min-h-[120px] placeholder:font-medium placeholder:text-slate-300"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSave}
                        disabled={!topic || !content || mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={18} />
                                Save Note
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Right Side: Neuro Map Preview */}
            <div className="hidden md:flex flex-1 bg-[#0f172a] relative overflow-hidden flex-col">
                <div className="absolute top-8 left-8 z-10 pointer-events-none">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center backdrop-blur-sm text-blue-400">
                            <Brain size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-none">Neuro Map</h3>
                            <p className="text-slate-400 text-xs font-medium mt-1">Your Knowledge Network</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full h-full" ref={containerRef}>
                    {isOpen && dimensions.width > 0 && (
                        <ForceGraph2D
                            ref={graphRef}
                            width={dimensions.width}
                            height={dimensions.height}
                            graphData={graphData}
                            nodeRelSize={6}
                            nodeCanvasObject={nodeCanvasObject}
                            linkColor={() => 'rgba(255,255,255,0.1)'}
                            backgroundColor="transparent"
                            d3VelocityDecay={0.4}
                            cooldownTicks={100}
                        />
                    )}
                </div>

                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-medium">Larger bubbles mean more notes & words.</p>
                </div>
            </div>
        </Modal>
    );
}
