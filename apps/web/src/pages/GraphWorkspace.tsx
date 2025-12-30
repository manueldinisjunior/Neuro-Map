import { useState, useRef, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    Search, Bell, ChevronRight, ChevronDown, Plus,
    X, MoreHorizontal, MessageSquare, Tag, Maximize2,
    Minus, ZoomIn, ZoomOut, User, LayoutGrid, Brain, Clock,
    Sparkles, ShieldAlert, BarChart3, Info, Globe, Moon, Star,
    Edit2, Trash2, Settings, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeItem {
    id: string;
    label: string;
    expanded?: boolean;
    children?: TreeItem[];
    count?: number;
    active?: boolean;
}

const TREE_DATA: TreeItem[] = [
    {
        id: '1',
        label: 'EDUCATION & LEARNING',
        expanded: true,
        children: [
            {
                id: '1-1',
                label: 'Academic Subjects',
                children: [
                    { id: '1-1-1', label: 'Mathematics', children: [{ id: '1-1-1-1', label: 'Algebra' }, { id: '1-1-1-2', label: 'Calculus' }, { id: '1-1-1-3', label: 'Statistics' }] },
                    { id: '1-1-2', label: 'Computer Science', children: [{ id: '1-1-2-1', label: 'Data Structures' }, { id: '1-1-2-2', label: 'Algorithms' }, { id: '1-1-2-3', label: 'Operating Systems' }] },
                    { id: '1-1-3', label: 'Natural Sciences', children: [{ id: '1-1-3-1', label: 'Physics' }, { id: '1-1-3-2', label: 'Chemistry' }, { id: '1-1-3-3', label: 'Biology' }] }
                ]
            },
            {
                id: '1-2',
                label: 'Courses & Certifications',
                children: [
                    { id: '1-2-1', label: 'Online Courses', children: [{ id: '1-2-1-1', label: 'MOOCs' }, { id: '1-2-1-2', label: 'Bootcamps' }] },
                    { id: '1-2-2', label: 'Formal Education', children: [{ id: '1-2-2-1', label: 'Degrees' }, { id: '1-2-2-2', label: 'Diplomas' }] }
                ]
            },
            {
                id: '1-3',
                label: 'Learning Methods',
                children: [
                    { id: '1-3-1', label: 'Active Learning' },
                    { id: '1-3-2', label: 'Spaced Repetition' },
                    { id: '1-3-3', label: 'Note-Taking Systems' }
                ]
            }
        ]
    },
    {
        id: '2',
        label: 'PROFESSIONAL SKILLS',
        children: [
            {
                id: '2-1',
                label: 'Technical Skills',
                children: [
                    { id: '2-1-1', label: 'Programming', children: [{ id: '2-1-1-1', label: 'JavaScript' }, { id: '2-1-1-2', label: 'Python' }, { id: '2-1-1-3', label: 'Java' }] },
                    {
                        id: '2-1-2', label: 'Web Development', children: [
                            { id: '2-1-2-1', label: 'Frontend', children: [{ id: '2-1-2-1-1', label: 'HTML' }, { id: '2-1-2-1-2', label: 'CSS' }, { id: '2-1-2-1-3', label: 'React' }] },
                            { id: '2-1-2-2', label: 'Backend', children: [{ id: '2-1-2-2-1', label: 'APIs' }, { id: '2-1-2-2-2', label: 'Databases' }] }
                        ]
                    },
                    { id: '2-1-3', label: 'Data Skills', children: [{ id: '2-1-3-1', label: 'Data Analysis' }, { id: '2-1-3-2', label: 'Data Visualization' }] }
                ]
            },
            {
                id: '2-2',
                label: 'Soft Skills',
                children: [
                    { id: '2-2-1', label: 'Communication', children: [{ id: '2-2-1-1', label: 'Writing' }, { id: '2-2-1-2', label: 'Presentations' }] },
                    { id: '2-2-2', label: 'Collaboration', children: [{ id: '2-2-2-1', label: 'Teamwork' }, { id: '2-2-2-2', label: 'Leadership' }] }
                ]
            },
            { id: '2-3', label: 'Work Methods', children: [{ id: '2-3-1', label: 'Agile' }, { id: '2-3-2', label: 'Project Planning' }] }
        ]
    },
    {
        id: '3',
        label: 'PROJECTS & WORK',
        children: [
            { id: '3-1', label: 'Personal Projects', children: [{ id: '3-1-1', label: 'Side Projects' }, { id: '3-1-2', label: 'Learning Projects' }] },
            { id: '3-2', label: 'Professional Experience', children: [{ id: '3-2-1', label: 'Company Projects' }, { id: '3-2-2', label: 'Freelance Work' }] },
            { id: '3-3', label: 'Portfolio', children: [{ id: '3-3-1', label: 'Case Studies' }, { id: '3-3-2', label: 'Demonstrations' }] }
        ]
    },
    {
        id: '4',
        label: 'SCIENCE & RESEARCH',
        children: [
            {
                id: '4-1', label: 'Computer Science', children: [
                    { id: '4-1-1', label: 'Artificial Intelligence', children: [{ id: '4-1-1-1', label: 'Machine Learning' }, { id: '4-1-1-2', label: 'Neural Networks' }] },
                    { id: '4-1-2', label: 'Software Engineering' }
                ]
            },
            { id: '4-2', label: 'Psychology (Non-clinical)', children: [{ id: '4-2-1', label: 'Cognitive Psychology' }, { id: '4-2-2', label: 'Learning Theory' }] },
            { id: '4-3', label: 'Philosophy', children: [{ id: '4-3-1', label: 'Logic' }, { id: '4-3-2', label: 'Ethics' }] },
            { id: '4-4', label: 'Research Methods', children: [{ id: '4-4-1', label: 'Literature Review' }, { id: '4-4-2', label: 'Experimental Design' }] }
        ]
    },
    {
        id: '5',
        label: 'TECHNOLOGY & DIGITAL TOPICS',
        children: [
            { id: '5-1', label: 'Software Engineering', children: [{ id: '5-1-1', label: 'System Design' }, { id: '5-1-2', label: 'Testing' }] },
            { id: '5-2', label: 'Cloud & Infrastructure', children: [{ id: '5-2-1', label: 'Cloud Computing' }, { id: '5-2-2', label: 'DevOps' }] },
            { id: '5-3', label: 'Cybersecurity (Conceptual)', children: [{ id: '5-3-1', label: 'Security Principles' }, { id: '5-3-2', label: 'Privacy by Design' }] },
            { id: '5-4', label: 'Emerging Technologies', children: [{ id: '5-4-1', label: 'Blockchain' }, { id: '5-4-2', label: 'IoT' }] }
        ]
    },
    {
        id: '6',
        label: 'CREATIVITY & CULTURE',
        children: [
            { id: '6-1', label: 'Design', children: [{ id: '6-1-1', label: 'UI Design' }, { id: '6-1-2', label: 'UX Principles' }] },
            { id: '6-2', label: 'Writing', children: [{ id: '6-2-1', label: 'Technical Writing' }, { id: '6-2-2', label: 'Creative Writing' }] },
            { id: '6-3', label: 'Media & Art', children: [{ id: '6-3-1', label: 'Digital Art' }, { id: '6-3-2', label: 'Music Production' }] },
            { id: '6-4', label: 'Culture', children: [{ id: '6-4-1', label: 'Cultural Studies' }, { id: '6-4-2', label: 'Media Literacy' }] }
        ]
    },
    {
        id: '7',
        label: 'PRODUCTIVITY & METHODS',
        children: [
            { id: '7-1', label: 'Time Management', children: [{ id: '7-1-1', label: 'Task Planning' }, { id: '7-1-2', label: 'Prioritization' }] },
            { id: '7-2', label: 'Knowledge Management', children: [{ id: '7-2-1', label: 'Mind Mapping' }, { id: '7-2-2', label: 'Personal Knowledge Systems' }] },
            { id: '7-3', label: 'Problem Solving', children: [{ id: '7-3-1', label: 'Critical Thinking' }, { id: '7-3-2', label: 'Systems Thinking' }] }
        ]
    },
    {
        id: '8',
        label: 'LANGUAGES & COMMUNICATION',
        children: [
            { id: '8-1', label: 'Languages', children: [{ id: '8-1-1', label: 'English' }, { id: '8-1-2', label: 'German' }, { id: '8-1-3', label: 'Portuguese' }] },
            { id: '8-2', label: 'Communication Skills', children: [{ id: '8-2-1', label: 'Public Speaking' }, { id: '8-2-2', label: 'Professional Writing' }] },
            { id: '8-3', label: 'Linguistics', children: [{ id: '8-3-1', label: 'Semantics' }, { id: '8-3-2', label: 'Syntax' }] }
        ]
    },
    {
        id: '9',
        label: 'GENERAL INTERESTS',
        children: [
            { id: '9-1', label: 'Hobbies', children: [{ id: '9-1-1', label: 'Sports' }, { id: '9-1-2', label: 'Reading' }] },
            { id: '9-2', label: 'Public Topics', children: [{ id: '9-2-1', label: 'Technology Trends' }, { id: '9-2-2', label: 'Science News' }] },
            { id: '9-3', label: 'Lifestyle (Non-sensitive)', children: [{ id: '9-3-1', label: 'Healthy Routines' }, { id: '9-3-2', label: 'Learning Habits' }] }
        ]
    },
    {
        id: '10',
        label: 'CUSTOM (USER-DEFINED)',
        children: [
            { id: '10-1', label: 'User Topics', children: [{ id: '10-1-1', label: 'Filtered Topic' }] }
        ]
    }
];

const GRAPH_DATA = {
    nodes: [
        { id: 'root', label: 'React Ecosystem', color: '#00D8FF', size: 30, x: 0, y: 0 },
        { id: 'hooks', label: 'Hooks', color: '#FFB800', size: 24, x: 150, y: -50 },
        { id: 'state', label: 'State Mgmt', color: '#9D50BB', size: 22, x: -100, y: -80 },
        { id: 'testing', label: 'Testing', color: '#FF4B2B', size: 18, x: -80, y: 100 },
        { id: 'router', label: 'Router', color: '#00C9FF', size: 20, x: 120, y: 120 }
    ],
    links: [
        { source: 'root', target: 'hooks' },
        { source: 'root', target: 'state' },
        { source: 'root', target: 'testing' },
        { source: 'root', target: 'router' }
    ]
};

const STATS = [
    { label: 'DEPTH', value: '4' },
    { label: 'NOTES', value: '12' },
    { label: 'MASTERY', value: '85%' }
];

const RECENT_NOTES = [
    {
        title: 'useEffect Dependencies',
        excerpt: 'Important to remember that primitive values vs object references affect re-...',
        time: '2 hours ago'
    },
    {
        title: 'Custom Hooks Pattern',
        excerpt: 'Abstracting logic into useFetch or useForm creates cleaner components.',
        time: '1 day ago'
    }
];

const TAGS = ['frontend', 'javascript', 'architecture'];

const USER_DATA = {
    createdAt: '2024-04-15T10:00:00Z',
    lastActiveAt: new Date().toISOString(),
    daysActiveCount: 37,
    categoriesCount: 12,
    subcategoriesCount: 8
};

const DEFAULT_CATEGORIES = [
    { id: 'edu', label: 'Education & Learning', color: '#10b981', icon: 'book' },
    { id: 'prof', label: 'Professional Skills', color: '#8b5cf6', icon: 'briefcase' },
    { id: 'tech', label: 'Technology', color: '#3b82f6', icon: 'zap' }
];

const BUBBLES = [
    { label: 'Philosophy', size: 140, color: 'from-emerald-400 to-teal-500', top: '15%', left: '45%', count: null },
    { label: 'Psychology', size: 120, color: 'from-indigo-500 to-purple-600', top: '40%', left: '70%', count: 12 },
    { label: 'Nietzsche', size: 90, color: 'from-rose-400 to-pink-600', top: '42%', left: '15%', count: 8 },
    { label: 'Productivity', size: 85, color: 'from-orange-400 to-amber-500', top: '55%', left: '40%', count: 4 },
    { label: 'Mindfulness', size: 70, color: 'from-teal-300 to-cyan-500', top: '65%', left: '60%', count: 2 },
    { label: 'Books', size: 60, color: 'from-blue-400 to-indigo-500', top: '22%', left: '75%', count: null },
    { label: 'AI', size: 55, color: 'from-cyan-400 to-blue-500', top: '65%', left: '25%', count: null },
    { label: 'Health', size: 50, color: 'from-blue-300 to-blue-500', top: '78%', left: '55%', count: null },
    { label: 'Creativity', size: 40, color: 'from-orange-300 to-rose-400', top: '75%', left: '38%', count: null },
];

export default function GraphWorkspace() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0); // 0: Welcome, 1: Categories, 2: Topics
    const [onboardingCategories, setOnboardingCategories] = useState<{ label: string, color: string, topics: string[] }[]>([]);

    const [activeTab, setActiveTab] = useState('dashboard');
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [{ id: 'root', label: 'Neuro Map', color: '#3b82f6', size: 30 }], links: [] });

    // Form State
    const [formTopic, setFormTopic] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');
    const [formCategory, setFormCategory] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    useEffect(() => {
        // Mock onboarding check
        const hasCompletedOnboarding = localStorage.getItem('neuro_onboarded');
        if (hasCompletedOnboarding) setIsOnboarded(true);
    }, []);

    const completeOnboarding = () => {
        // Generate structure from onboarding categories
        const newTree: TreeItem[] = onboardingCategories.map((cat, idx) => ({
            id: `cat-${idx}`,
            label: cat.label.toUpperCase(),
            expanded: true,
            children: cat.topics.map((topic, tidx) => ({
                id: `topic-${idx}-${tidx}`,
                label: topic,
                count: 0
            }))
        }));

        const newNodes = [
            { id: 'root', label: 'Neuro Map', color: '#3b82f6', size: 30, x: 0, y: 0 },
            ...onboardingCategories.map((cat, idx) => ({
                id: `cat-${idx}`,
                label: cat.label,
                color: cat.color,
                size: 25,
                x: Math.cos((idx / onboardingCategories.length) * 2 * Math.PI) * 150,
                y: Math.sin((idx / onboardingCategories.length) * 2 * Math.PI) * 150
            })),
            ...onboardingCategories.flatMap((cat, idx) =>
                cat.topics.map((topic, tidx) => ({
                    id: `topic-${idx}-${tidx}`,
                    label: topic,
                    color: cat.color,
                    size: 15,
                    x: Math.cos((idx / onboardingCategories.length) * 2 * Math.PI) * 250 + (Math.random() - 0.5) * 50,
                    y: Math.sin((idx / onboardingCategories.length) * 2 * Math.PI) * 250 + (Math.random() - 0.5) * 50
                }))
            )
        ];

        const newLinks = [
            ...onboardingCategories.map((_, idx) => ({ source: 'root', target: `cat-${idx}` })),
            ...onboardingCategories.flatMap((cat, idx) =>
                cat.topics.map((_, tidx) => ({ source: `cat-${idx}`, target: `topic-${idx}-${tidx}` }))
            )
        ];

        setTreeData(newTree);
        setGraphData({ nodes: newNodes, links: newLinks });
        setFormCategory(newTree[0]?.id || '');

        setIsOnboarded(true);
        localStorage.setItem('neuro_onboarded', 'true');
        localStorage.setItem('neuro_data', JSON.stringify({ tree: newTree, graph: { nodes: newNodes, links: newLinks } }));
    };

    const handleAction = (id: string, type: 'topic' | 'category', action: 'delete' | 'archive' | 'rename', newLabel?: string) => {
        if (action === 'delete') {
            setGraphData(prev => ({
                ...prev,
                nodes: prev.nodes.filter(n => n.id !== id),
                links: prev.links.filter(l => l.source !== id && l.target !== id)
            }));

            const deleteFromTree = (items: TreeItem[]): TreeItem[] => {
                return items.filter(item => item.id !== id).map(item => ({
                    ...item,
                    children: item.children ? deleteFromTree(item.children) : undefined
                }));
            };
            setTreeData(prev => deleteFromTree(prev));
        } else if (action === 'archive') {
            const archiveInTree = (items: TreeItem[]): TreeItem[] => {
                return items.map(item => {
                    if (item.id === id) return { ...item, archived: !item.archived };
                    return {
                        ...item,
                        children: item.children ? archiveInTree(item.children) : undefined
                    };
                });
            };
            setTreeData(prev => archiveInTree(prev));
        } else if (action === 'rename' && newLabel) {
            setGraphData(prev => ({
                ...prev,
                nodes: prev.nodes.map(n => n.id === id ? { ...n, label: newLabel } : n)
            }));
            const renameInTree = (items: TreeItem[]): TreeItem[] => {
                return items.map(item => {
                    if (item.id === id) return { ...item, label: newLabel };
                    return {
                        ...item,
                        children: item.children ? renameInTree(item.children) : undefined
                    };
                });
            };
            setTreeData(prev => renameInTree(prev));
        }
    };

    const handleSaveNote = () => {
        if (!formTopic) return;

        const newNodeId = formTopic.toLowerCase().replace(/\s+/g, '-');
        const newNode = {
            id: newNodeId,
            label: formTopic,
            color: CATEGORIES_DATA.find(c => c.id === formCategory)?.color || '#3b82f6',
            size: 20,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100
        };

        setGraphData(prev => ({
            nodes: [...prev.nodes, newNode],
            links: [...prev.links, { source: 'root', target: newNodeId }]
        }));

        // Update tree data (simplified: add to first section for mock)
        setTreeData(prev => {
            const next = [...prev];
            if (next[0].children) {
                next[0].children = [...next[0].children, { id: newNodeId, label: formTopic, count: 1 }];
            }
            return next;
        });

        // Reset and close
        setFormTopic('');
        setFormTitle('');
        setFormContent('');
        setIsNoteModalOpen(false);

        // Optional: show some success feedback or focus the new node
        setTimeout(() => {
            graphRef.current?.centerAt(newNode.x, newNode.y, 1000);
            graphRef.current?.zoom(2, 1000);
            setSelectedTopic(formTopic);
        }, 500);
    };

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
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 400);
    const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() * 0.7, 400);
    const handleCenter = () => graphRef.current?.centerAt(0, 0, 400);

    // Profile & Insights Data Processing
    const rankedCategories = useMemo(() => {
        return [...CATEGORIES_DATA]
            .map(cat => {
                const recencyBonus = (new Date().getTime() - new Date(cat.lastActive).getTime()) < 2 * 24 * 60 * 60 * 1000 ? 5 : 0;
                const activityScore = cat.notesCount + Math.floor(cat.wordsSum / 50) + recencyBonus;
                return { ...cat, activityScore };
            })
            .sort((a, b) => b.activityScore - a.activityScore)
            .slice(0, 8);
    }, []);

    const timeMetrics = useMemo(() => {
        const signupDate = new Date(USER_DATA.createdAt);
        const lastActive = new Date(USER_DATA.lastActiveAt);
        const diffTime = Math.abs(new Date().getTime() - signupDate.getTime());
        const daysSinceSignup = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            memberSince: signupDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            daysActive: `${USER_DATA.daysActiveCount} days`,
            lastActivity: '1 hour ago' // Relative time simplified for mock
        };
    }, []);

    const isInsightsReady = USER_DATA.categoriesCount >= 10 && USER_DATA.subcategoriesCount >= 5;

    return (
        <div className="flex h-screen w-full bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
            {/* Sidebar Left */}
            <aside className="w-80 border-r border-slate-200 flex flex-col bg-white/80 backdrop-blur-xl z-20">
                {/* Search */}
                <div className="p-6">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search your knowledge..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                        />
                    </div>
                </div>

                {/* Tree View */}
                <div className="px-6 py-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-6 flex items-center justify-between">
                        KNOWLEDGE NAVIGATION <span className="text-[8px] font-bold text-slate-300">(LAWFUL)</span>
                    </h3>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 scrollbar-none pb-20">
                    <div className="space-y-4">
                        {treeData.map(section => (
                            <div key={section.id} className="space-y-1">
                                <div className="flex items-center justify-between px-2 mb-2">
                                    <span className="text-[10px] font-bold text-slate-400">{section.label}</span>
                                    <button title="Add Sub-category" aria-label="Add Sub-category" className="text-slate-300 hover:text-slate-500"><Plus size={12} /></button>
                                </div>
                                {section.children?.map(item => (
                                    <TreeItem key={item.id} item={item} depth={0} onDelete={handleDeleteNode} />
                                ))}
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Footer Sidebar */}
                <div className="p-4 bg-white/50 border-t border-slate-100">
                    <button
                        title="Create New Topic"
                        aria-label="Create New Topic"
                        onClick={() => setIsNoteModalOpen(true)}
                        className="w-full bg-blue-500 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 font-bold text-sm"
                    >
                        <Plus size={18} aria-hidden="true" />
                        New Topic
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#eff3f8]">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 border-b border-slate-100 z-30">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
                            <Globe size={24} />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-slate-800">Neuro Map</span>
                    </div>

                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                        {['Dashboard', 'Notes', 'Graph View'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                title={`Switch to ${tab}`}
                                aria-label={`Switch to ${tab}`}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.toLowerCase() ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 pr-6 border-r border-slate-200">
                            <button title="History" aria-label="History" className="text-slate-400 hover:text-blue-500 transition-colors"><Clock size={20} /></button>
                            <button title="Favorites" aria-label="Favorites" className="text-slate-400 hover:text-amber-500 transition-colors"><Star size={20} /></button>
                            <button title="Dark Mode" aria-label="Toggle Dark Mode" className="text-slate-400 hover:text-indigo-500 transition-colors"><Moon size={20} /></button>
                        </div>
                        <button
                            title="Notifications"
                            aria-label="Notifications"
                            className="relative w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors"
                        >
                            <Bell size={20} />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold">2</div>
                        </button>
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform overflow-hidden bg-slate-200">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`} alt="User" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 flex flex-col relative" ref={containerRef}>
                    {!isOnboarded ? (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-12 rounded-[40px] shadow-2xl max-w-lg text-center"
                            >
                                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-500/30">
                                    <Brain size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 mb-4">Welcome to Neuro Map</h2>
                                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                                    Let's build your knowledge network. Add your first topic to begin visualizing your intellectual growth.
                                </p>
                                <div className="space-y-4">
                                    <button
                                        onClick={completeOnboarding}
                                        title="Start Mapping"
                                        aria-label="Start Mapping"
                                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                                    >
                                        Start Mapping
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <>
                            {/* Breadcrumbs simplified away to match image centered tabs */}
                            {/* Graph Canvas */}
                            <div className="flex-1 relative overflow-hidden graph-background">
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
                                    onNodeClick={(node) => setSelectedTopic((node as any).label)}
                                    nodeCanvasObject={(node: any, ctx, globalScale) => {
                                        const label = node.label;
                                        const size = (node.size || 20) * (selectedTopic === label ? 1.2 : 1);
                                        const isSelected = selectedTopic === label;

                                        // Glow/Shadow side
                                        ctx.shadowBlur = isSelected ? 30 / globalScale : 15 / globalScale;
                                        ctx.shadowColor = node.color;

                                        // 3D Sphere Effect
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
                                        ctx.fill();

                                        // Inner light shine
                                        ctx.beginPath();
                                        ctx.arc(node.x - size / 3, node.y - size / 3, size / 4, 0, 2 * Math.PI, false);
                                        ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                        ctx.fill();

                                        // Label Callout (similar to image)
                                        if (globalScale > 0.4) {
                                            const fontSize = 14 / globalScale;
                                            ctx.font = `${isSelected ? '800' : '600'} ${fontSize}px Inter, sans-serif`;
                                            const textWidth = ctx.measureText(label).width;
                                            const padding = 10 / globalScale;

                                            // Callout box
                                            const bx = node.x - textWidth / 2 - padding;
                                            const by = node.y + size + 15 / globalScale;
                                            const bw = textWidth + padding * 2;
                                            const bh = fontSize + padding * 1.5;
                                            const r = 12 / globalScale;

                                            ctx.shadowBlur = 10 / globalScale;
                                            ctx.shadowColor = 'rgba(0,0,0,0.1)';
                                            ctx.fillStyle = isSelected ? '#3b82f6' : 'white';

                                            // Triangle tail
                                            ctx.beginPath();
                                            ctx.moveTo(node.x, node.y + size + 5 / globalScale);
                                            ctx.lineTo(node.x - 6 / globalScale, by);
                                            ctx.lineTo(node.x + 6 / globalScale, by);
                                            ctx.fill();

                                            // Rounded rect
                                            ctx.beginPath();
                                            ctx.roundRect(bx, by, bw, bh, r);
                                            ctx.fill();

                                            // Text
                                            ctx.shadowBlur = 0;
                                            ctx.textAlign = 'center';
                                            ctx.textBaseline = 'middle';
                                            ctx.fillStyle = isSelected ? 'white' : '#1e293b';
                                            ctx.fillText(label, node.x, by + bh / 2);

                                            if (isSelected) {
                                                const subText = "11 Notes • React Native";
                                                const subSize = 8 / globalScale;
                                                ctx.font = `600 ${subSize}px Inter, sans-serif`;
                                                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                                                ctx.fillText(subText, node.x, by + bh + 12 / globalScale);

                                                // Drawing small interactive icons for map-based edit/delete
                                                // Note: Actual logic would involve hit-testing in a real app, 
                                                // but for this visual mock we show the UI presence.
                                                const iconSize = 10 / globalScale;
                                                ctx.fillStyle = 'white';
                                                ctx.beginPath();
                                                ctx.roundRect(bx + bw + 10 / globalScale, by, bh, bh, r / 2);
                                                ctx.fill();
                                                ctx.fillStyle = '#ef4444'; // trash red
                                                ctx.fillText('×', bx + bw + 10 / globalScale + bh / 2, by + bh / 2);

                                                ctx.fillStyle = 'white';
                                                ctx.beginPath();
                                                ctx.roundRect(bx + bw + 10 / globalScale + bh + 5 / globalScale, by, bh, bh, r / 2);
                                                ctx.fill();
                                                ctx.fillStyle = '#3b82f6'; // edit blue
                                                ctx.fillText('✎', bx + bw + 10 / globalScale + bh + 5 / globalScale + bh / 2, by + bh / 2);
                                            }
                                        }
                                    }}
                                />

                                {/* Control Bar (Bottom Center) */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-white shadow-2xl flex items-center gap-2">
                                    <button title="Zoom In" aria-label="Zoom In" onClick={handleZoomIn} className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"><Plus size={18} aria-hidden="true" /></button>
                                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                    <button title="Zoom Out" aria-label="Zoom Out" onClick={handleZoomOut} className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"><Minus size={18} aria-hidden="true" /></button>
                                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                    <button title="Reset View" aria-label="Reset View" onClick={handleCenter} className="w-10 h-10 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all flex items-center justify-center"><Maximize2 size={18} aria-hidden="true" /></button>
                                </div>

                                <button
                                    title="Add New Topic"
                                    aria-label="Add New Topic"
                                    onClick={() => setIsNoteModalOpen(true)}
                                    className="absolute bottom-10 left-10 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all"
                                >
                                    <Plus size={24} aria-hidden="true" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Sidebar Right */}
            <aside className="w-96 border-l border-slate-200 flex flex-col bg-white">
                <div className="p-8 flex flex-col h-full overflow-y-auto scrollbar-none">
                    {!selectedTopic ? (
                        <>
                            {/* Profile & Insights Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <User size={18} />
                                    </div>
                                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile & Insights</h2>
                                </div>
                                {isInsightsReady && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                                        <Sparkles size={12} />
                                        <span>Insights Ready</span>
                                    </div>
                                )}
                            </div>

                            {/* Top Categories */}
                            <section className="mb-10">
                                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between">
                                    Top Knowledge Categories
                                    <BarChart3 size={14} className="text-slate-400" />
                                </h3>
                                <div className="space-y-6">
                                    {rankedCategories.map((cat, idx) => (
                                        <div key={cat.id} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: cat.color }}>
                                                        {idx + 1}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{cat.label}</span>
                                                </div>
                                                <span className="text-xs font-black text-slate-800">{cat.notesCount}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cat.notesCount / rankedCategories[0].notesCount) * 100}%` }}
                                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: cat.color, opacity: 0.6 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Time on App */}
                            <section className="mb-10 p-6 bg-slate-50 border border-slate-100 rounded-[24px]">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Clock size={14} />
                                    Time on Neuro Map
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Member Since:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.memberSince}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Days Active:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.daysActive}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Last Activity:</span>
                                        <span className="text-slate-800 font-bold">{timeMetrics.lastActivity}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Behavioral Snapshot */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                        <Brain size={16} className="text-blue-500" />
                                        Behavioral Snapshot
                                        <span className="text-[9px] text-slate-400 normal-case font-medium ml-1">(Non-clinical)</span>
                                    </h3>
                                    {!isInsightsReady && <Info size={14} className="text-slate-300" />}
                                </div>

                                {isInsightsReady ? (
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[24px] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Sparkles size={40} className="text-blue-600" />
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4 relative z-10">
                                            Your activity suggests a strong preference for <span className="text-blue-600 font-bold">structured learning and analytical problem-solving</span>, with sustained attention in Tech & Digital Topics. You also show consistent self-improvement orientation through Productivity & Education modules.
                                        </p>
                                        <div className="flex flex-col gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 mb-4">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tendency Hypothesis</p>
                                            <p className="text-[11px] text-slate-700 font-bold">Convergent Thinker / Intellectual Depth</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2 text-[10px] text-slate-400 italic">
                                                <ShieldAlert size={12} className="shrink-0 mt-0.5" />
                                                <p>This is not a diagnosis. For higher accuracy, consider taking a validated personality assessment like the Big Five (IPIP).</p>
                                            </div>
                                            <button title="Take Big Five Assessment" aria-label="Take Big Five Assessment" className="w-full py-2.5 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-bold hover:bg-blue-50 transition-colors shadow-sm">
                                                Take Big Five Assessment
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-slate-50 border border-slate-100 border-dashed rounded-[24px]">
                                        <p className="text-xs font-bold text-slate-500 mb-4">Not enough data yet for a snapshot</p>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                                                    <span>Categories</span>
                                                    <span>{USER_DATA.categoriesCount}/10</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-slate-400 rounded-full"
                                                        style={{ width: `${(USER_DATA.categoriesCount / 10) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                                                    <span>Subcategories</span>
                                                    <span>{USER_DATA.subcategoriesCount}/5</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-slate-400 rounded-full"
                                                        style={{ width: `${(USER_DATA.subcategoriesCount / 5) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                                            Continue organizing your knowledge to unlock behavioral tendencies and cognitive breadth insights.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Selected Topic</span>
                                <button
                                    onClick={() => setSelectedTopic(null)}
                                    title="Close Details"
                                    aria-label="Close Details"
                                    className="text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-slate-800 mb-1">{selectedTopic}</h2>
                            <p className="text-sm text-slate-400 font-medium mb-10">Part of <span className="text-blue-500 font-bold">React Ecosystem</span></p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-10">
                                {STATS.map(stat => (
                                    <div key={stat.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                                        <p className="text-xl font-black text-slate-800">{stat.value}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Summary</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.
                                </p>
                            </div>

                            {/* Recent Notes */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Notes</h3>
                                    <button title="View All Notes" aria-label="View All Notes" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">View All</button>
                                </div>
                                <div className="space-y-3">
                                    {RECENT_NOTES.map(note => (
                                        <div key={note.title} className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group cursor-pointer">
                                            <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{note.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{note.excerpt}</p>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <MessageSquare size={12} />
                                                <span className="text-[10px] font-bold">{note.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Linked Tags */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Linked Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {TAGS.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-lg border border-purple-100">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-6 flex gap-3">
                                <button
                                    onClick={() => setIsNoteModalOpen(true)}
                                    title="Add New Note"
                                    aria-label="Add New Note"
                                    className="flex-1 bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 font-bold text-sm"
                                >
                                    <Plus size={18} aria-hidden="true" />
                                    Add Note
                                </button>
                                <button
                                    title="More Actions"
                                    aria-label="More Actions"
                                    className="w-14 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-95"
                                >
                                    <MoreHorizontal size={20} aria-hidden="true" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>

            {/* Create Note Modal */}
            <AnimatePresence>
                {isNoteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={() => setIsNoteModalOpen(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl bg-[#f1f5f9] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white"
                        >
                            {/* Modal Header */}
                            <div className="h-20 px-10 flex items-center justify-between bg-white/50 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                        <LayoutGrid size={24} />
                                    </div>
                                    <span className="font-extrabold text-2xl tracking-tight text-[#1e293b]">Neuro Notes</span>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="hidden md:flex items-center gap-8">
                                        <button title="My Notes" aria-label="My Notes" className="text-slate-400 font-bold text-sm tracking-wide">My Notes</button>
                                        <button title="Neuro Map" aria-label="Neuro Map" className="text-blue-500 font-bold text-sm tracking-wide border-b-2 border-blue-500 pb-1">Neuro Map</button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">Demo User</span>
                                        <ChevronDown size={16} className="text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 flex flex-col md:flex-row p-10 gap-10 min-h-0 overflow-y-auto">
                                {/* Left Side: Form */}
                                <div className="w-full md:w-[380px] flex flex-col gap-8 bg-white rounded-[32px] p-10 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-black text-[#1e293b] mb-2 uppercase tracking-tight">Create a Note</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Category</label>
                                            <select
                                                value={formCategory}
                                                onChange={(e) => setFormCategory(e.target.value)}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all font-medium appearance-none cursor-pointer"
                                            >
                                                {CATEGORIES_DATA.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Topic</label>
                                            <input
                                                type="text"
                                                value={formTopic}
                                                onChange={(e) => setFormTopic(e.target.value)}
                                                placeholder="Enter a topic..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Title <span className="text-slate-400 font-medium">(Optional)</span></label>
                                            <input
                                                type="text"
                                                value={formTitle}
                                                onChange={(e) => setFormTitle(e.target.value)}
                                                placeholder="Enter a title..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-800 mb-2">Content</label>
                                            <textarea
                                                rows={6}
                                                value={formContent}
                                                onChange={(e) => setFormContent(e.target.value)}
                                                placeholder="Write your thoughts here..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium resize-none"
                                            />
                                        </div>

                                        <button
                                            title="Save Note"
                                            aria-label="Save Note"
                                            onClick={handleSaveNote}
                                            disabled={!formTopic}
                                            className="w-full bg-[#3b82f6] text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-[#2563eb] transition-all shadow-xl shadow-blue-500/20 active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Save Note
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side: Visual Map */}
                                <div className="flex-1 bg-[#1e293b] rounded-[32px] p-12 relative overflow-hidden shadow-2xl flex flex-col">
                                    {/* Visual Header */}
                                    <div className="relative z-10 mb-8">
                                        <h3 className="text-4xl font-black text-white mb-2 tracking-tight">Neuro Map</h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your Knowledge Network</p>
                                    </div>

                                    {/* Bubbles Container */}
                                    <div className="flex-1 relative">
                                        {/* Subtle Connecting Lines (Background Effect) */}
                                        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M20,40 Q50,20 80,40" stroke="white" strokeWidth="0.2" fill="none" />
                                            <path d="M15,45 Q45,70 75,45" stroke="white" strokeWidth="0.2" fill="none" />
                                            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" />
                                        </svg>

                                        {BUBBLES.map((bubble, i) => (
                                            <motion.div
                                                key={bubble.label}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.05 + 0.3, type: 'spring', stiffness: 100 }}
                                                className={`absolute rounded-full bg-gradient-to-br ${bubble.color} flex flex-col items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer group p-4 border border-white/20 bubble-node`}
                                                style={{
                                                    '--bubble-size': `${bubble.size}px`,
                                                    '--bubble-top': bubble.top,
                                                    '--bubble-left': bubble.left
                                                } as React.CSSProperties}
                                            >
                                                <span className="bubble-label">
                                                    {bubble.label}
                                                </span>
                                                {bubble.count && (
                                                    <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full mt-1 font-bold backdrop-blur-sm">
                                                        ({bubble.count})
                                                    </span>
                                                )}

                                                {/* Glow effect */}
                                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
                                            </motion.div>
                                        ))}

                                        {/* Floating smaller dots */}
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-2 h-2 bg-blue-400/30 rounded-full blur-[1px] floating-dot"
                                                style={{
                                                    '--dot-top': `${Math.random() * 100}%`,
                                                    '--dot-left': `${Math.random() * 100}%`
                                                } as React.CSSProperties}
                                            />
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="relative z-10 mt-auto flex items-center justify-center gap-4">
                                        <div className="h-px bg-slate-700 flex-1"></div>
                                        <p className="legend-text whitespace-nowrap">
                                            Larger bubbles mean more notes & words.
                                        </p>
                                        <div className="h-px bg-slate-700 flex-1"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button Mobile */}
                            <button
                                onClick={() => setIsNoteModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 md:hidden"
                                aria-label="Close Modal"
                                title="Close Modal"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TreeItem({ item, depth, onDelete }: { item: any, depth: number, onDelete: (id: string, type: any) => void }) {
    const [isExpanded, setIsExpanded] = useState(item.expanded || false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="space-y-1">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group flex items-center justify-between px-2 py-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer ${item.active ? 'bg-blue-50 text-blue-600' : ''}`}
            >
                <div className="flex items-center gap-3">
                    {hasChildren ? (
                        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
                            <ChevronDown size={14} className="text-slate-400" />
                        </motion.div>
                    ) : (
                        <ChevronRight size={14} className="text-blue-300" />
                    )}
                    <span className={`text-sm font-semibold ${item.active ? 'text-blue-600' : 'text-slate-600'}`}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Edit" aria-label="Edit" className="p-1 hover:text-blue-500 text-slate-300 transition-colors"><Edit2 size={12} /></button>
                    <button title="Delete" aria-label="Delete" onClick={(e) => { e.stopPropagation(); onDelete(item.id, 'topic'); }} className="p-1 hover:text-red-500 text-slate-300 transition-colors"><Trash2 size={12} /></button>
                    {item.count && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">{item.count}</span>}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 border-l-2 border-slate-100 pl-2 space-y-1 overflow-hidden"
                    >
                        {item.children.map((child: any) => (
                            <TreeItem key={child.id} item={child} depth={depth + 1} onDelete={onDelete} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
