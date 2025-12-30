import React, { useState, useRef, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    Search, Bell, ChevronRight, ChevronDown, Plus,
    X, MoreHorizontal, MessageSquare, Tag, Maximize2,
    Minus, ZoomIn, ZoomOut, User, LayoutGrid, Brain, Clock,
    Sparkles, ShieldAlert, BarChart3, Info, Globe, Moon, Star,
    Edit2, Trash2, Settings, ExternalLink, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeItem {
    id: string;
    label: string;
    expanded?: boolean;
    children?: TreeItem[];
    count?: number;
    active?: boolean;
    archived?: boolean;
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

const CATEGORIES_DATA = [
    { id: 'cat-0', label: 'Education & Learning', color: '#10b981', notesCount: 15, wordsSum: 2500, lastActive: '2024-05-15T10:00:00Z' },
    { id: 'cat-1', label: 'Professional Skills', color: '#8b5cf6', notesCount: 22, wordsSum: 4800, lastActive: '2024-05-14T08:30:00Z' },
    { id: 'cat-2', label: 'Science & Research', color: '#3b82f6', notesCount: 10, wordsSum: 3200, lastActive: '2024-05-16T15:45:00Z' },
    { id: 'cat-3', label: 'Technology', color: '#0ea5e9', notesCount: 30, wordsSum: 8500, lastActive: '2024-05-17T12:00:00Z' },
    { id: 'cat-4', label: 'Creativity', color: '#f43f5e', notesCount: 8, wordsSum: 1500, lastActive: '2024-05-10T09:00:00Z' },
    { id: 'cat-5', label: 'Productivity', color: '#f59e0b', notesCount: 18, wordsSum: 4200, lastActive: '2024-05-15T11:20:00Z' },
    { id: 'cat-6', label: 'Philosophy', color: '#10b981', notesCount: 12, wordsSum: 3000, lastActive: '2024-05-12T14:00:00Z' },
    { id: 'cat-7', label: 'Psychology', color: '#8b5cf6', notesCount: 9, wordsSum: 2100, lastActive: '2024-05-13T16:30:00Z' },
    { id: 'cat-8', label: 'Business', color: '#3b82f6', notesCount: 7, wordsSum: 1800, lastActive: '2024-05-11T10:00:00Z' },
    { id: 'cat-9', label: 'Health', color: '#0ea5e9', notesCount: 6, wordsSum: 1200, lastActive: '2024-05-09T08:00:00Z' },
    { id: 'cat-10', label: 'Languages', color: '#f43f5e', notesCount: 11, wordsSum: 2800, lastActive: '2024-05-14T12:00:00Z' },
    { id: 'cat-11', label: 'Art', color: '#f59e0b', notesCount: 5, wordsSum: 900, lastActive: '2024-05-08T07:00:00Z' }
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

    const [newCatLabel, setNewCatLabel] = useState('');
    const [newCatColor, setNewCatColor] = useState('#3b82f6');
    const [newTopicLabel, setNewTopicLabel] = useState('');
    const [currentCatIndex, setCurrentCatIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    useEffect(() => {
        // Mock onboarding check
        const hasCompletedOnboarding = localStorage.getItem('neuro_onboarded');
        if (hasCompletedOnboarding) {
            setIsOnboarded(true);
            const savedData = localStorage.getItem('neuro_data');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                setTreeData(parsed.tree || []);
                setGraphData(parsed.graph || { nodes: [], links: [] });
            }
        }
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
        <div className="flex h-screen w-full bg-[#f1f5f9] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
            {/* Sidebar Left */}
            <aside className="w-80 border-r border-[#e2e8f0] flex flex-col bg-white z-20">
                {/* Logo Section */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Brain size={24} />
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-[#1e293b]">Neuro Map</span>
                </div>

                {/* Search */}
                <div className="px-6 mb-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search your knowledge..."
                            className="w-full pl-11 pr-4 py-3 bg-[#eef2f6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all outline-none text-slate-700 placeholder:text-slate-400 font-bold"
                        />
                    </div>
                </div>

                {/* Tree View Header */}
                <div className="px-6 py-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">
                        KNOWLEDGE NAVIGATION <span className="text-[8px] font-bold text-slate-300">(LAWFUL)</span>
                    </h3>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 scrollbar-none pb-20">
                    <div className="space-y-4">
                        {treeData.filter(section => !section.archived).map(section => (
                            <div key={section.id} className="space-y-1">
                                <div className="flex items-center justify-between px-3 mb-2">
                                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{section.label}</span>
                                    <Plus size={12} className="text-slate-300 cursor-pointer hover:text-blue-500" onClick={() => {
                                        setIsNoteModalOpen(true);
                                        setFormCategory(section.id);
                                    }} />
                                </div>
                                {section.children?.filter(item => !item.archived).map(item => (
                                    <TreeItem key={item.id} item={item} depth={0} onAction={handleAction} />
                                ))}
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Footer Sidebar */}
                <div className="p-6 bg-white border-t border-slate-100">
                    <button
                        title="Create New Topic"
                        aria-label="Create New Topic"
                        onClick={() => setIsNoteModalOpen(true)}
                        className="w-full bg-[#3b82f6] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 font-black uppercase tracking-widest text-[11px]"
                    >
                        <Plus size={18} aria-hidden="true" />
                        New Topic
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#f1f5f9] neuro-grid">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-10 z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white">
                            <BrainCircuit size={24} />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter text-[#1e293b]">Neuro Map</span>
                    </div>

                    {/* Central Tab Nav */}
                    <div className="flex bg-[#e2e8f0]/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 shadow-sm">
                        {['Dashboard', 'Notes', 'Graph View'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`px-8 py-2.5 rounded-xl text-sm font-black tracking-tight transition-all ${activeTab === tab.toLowerCase() ? 'bg-[#3b82f6] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <Clock size={16} className="text-slate-400" />
                            <span className="text-xs font-black text-slate-800">0</span>
                            <Moon size={16} className="text-slate-400 ml-1" />
                        </div>
                        <button
                            className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
                            title="Notifications"
                            aria-label="Notifications"
                        >
                            <Bell size={20} aria-hidden="true" />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 flex flex-col relative" ref={containerRef}>
                    {!isOnboarded ? (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-6">
                            {/* Onboarding UI omitted for brevity in replace, keep current if possible - but I must provide full content for the range */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-10 rounded-[40px] shadow-2xl max-w-2xl w-full text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                                    <motion.div
                                        className="h-full bg-blue-600"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(onboardingStep / 2) * 100}%` }}
                                    />
                                </div>

                                {onboardingStep === 0 && (
                                    <div className="py-6">
                                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-500/30">
                                            <Brain size={40} />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-800 mb-4">Welcome to Neuro Map</h2>
                                        <p className="text-slate-500 font-medium mb-10 leading-relaxed px-10">
                                            Neuro Map is a visualization of your intellectual growth. Let's start by defining your primary areas of focus.
                                        </p>
                                        <button
                                            onClick={() => setOnboardingStep(1)}
                                            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                )}

                                {onboardingStep === 1 && (
                                    <div className="py-4 text-left">
                                        <h2 className="text-2xl font-black text-slate-800 mb-2">Define your Pillars</h2>
                                        <p className="text-slate-400 text-sm mb-8 font-bold uppercase tracking-widest">Step 1: Categories</p>

                                        <div className="flex gap-2 mb-8">
                                            <input
                                                type="text"
                                                value={newCatLabel}
                                                onChange={(e) => setNewCatLabel(e.target.value)}
                                                placeholder="e.g. Philosophy, Tech..."
                                                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20"
                                            />
                                            <input
                                                type="color"
                                                title="Choose category color"
                                                aria-label="Choose category color"
                                                value={newCatColor}
                                                onChange={(e) => setNewCatColor(e.target.value)}
                                                className="w-16 h-14 rounded-2xl border-none cursor-pointer p-0 overflow-hidden"
                                            />
                                            <button
                                                title="Add Category"
                                                aria-label="Add Category"
                                                onClick={() => {
                                                    if (newCatLabel) {
                                                        setOnboardingCategories([...onboardingCategories, { label: newCatLabel, color: newCatColor, topics: [] }]);
                                                        setNewCatLabel('');
                                                    }
                                                }}
                                                className="px-6 bg-slate-800 text-white rounded-2xl hover:bg-black transition-colors"
                                            >
                                                <Plus size={20} aria-hidden="true" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mb-10 min-h-[100px] p-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                            {onboardingCategories.map((cat, i) => (
                                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-sm dynamic-bg" style={{ '--bg-color': cat.color } as React.CSSProperties}>
                                                    {cat.label}
                                                    <button
                                                        title="Remove Category"
                                                        aria-label="Remove Category"
                                                        onClick={() => setOnboardingCategories(onboardingCategories.filter((_, idx) => idx !== i))}
                                                    >
                                                        <X size={14} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}
                                            {onboardingCategories.length === 0 && <p className="text-slate-300 italic text-sm m-auto">Add at least one category to proceed</p>}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <button onClick={() => setOnboardingStep(0)} className="text-slate-400 font-bold hover:text-slate-600">Back</button>
                                            <button
                                                disabled={onboardingCategories.length === 0}
                                                onClick={() => setOnboardingStep(2)}
                                                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                Connect Topics
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {onboardingStep === 2 && (
                                    <div className="py-4 text-left">
                                        <h2 className="text-2xl font-black text-slate-800 mb-2">Populate Topics</h2>
                                        <p className="text-slate-400 text-sm mb-6 font-bold uppercase tracking-widest">Step 2: Subjects for {onboardingCategories[currentCatIndex]?.label}</p>

                                        <div className="flex gap-2 mb-6">
                                            <input
                                                type="text"
                                                value={newTopicLabel}
                                                onChange={(e) => setNewTopicLabel(e.target.value)}
                                                placeholder={`Add topic to ${onboardingCategories[currentCatIndex]?.label}...`}
                                                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && newTopicLabel) {
                                                        const newCats = [...onboardingCategories];
                                                        newCats[currentCatIndex].topics.push(newTopicLabel);
                                                        setOnboardingCategories(newCats);
                                                        setNewTopicLabel('');
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    if (newTopicLabel) {
                                                        const newCats = [...onboardingCategories];
                                                        newCats[currentCatIndex].topics.push(newTopicLabel);
                                                        setOnboardingCategories(newCats);
                                                        setNewTopicLabel('');
                                                    }
                                                }}
                                                className="px-6 bg-slate-800 text-white rounded-2xl"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="space-y-2 mb-10 max-h-40 overflow-y-auto pr-2 scrollbar-none">
                                            {onboardingCategories[currentCatIndex]?.topics.map((topic, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
                                                    <span className="text-sm font-bold text-slate-700">{topic}</span>
                                                    <button
                                                        title="Remove Topic"
                                                        aria-label="Remove Topic"
                                                        onClick={() => {
                                                            const newCats = [...onboardingCategories];
                                                            newCats[currentCatIndex].topics = newCats[currentCatIndex].topics.filter((_, idx) => idx !== i);
                                                            setOnboardingCategories(newCats);
                                                        }}
                                                    >
                                                        <X size={14} className="text-slate-400" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {onboardingCategories.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        title={`Go to category ${i + 1}`}
                                                        aria-label={`Go to category ${i + 1}`}
                                                        onClick={() => setCurrentCatIndex(i)}
                                                        className={`w-3 h-3 rounded-full transition-all ${currentCatIndex === i ? 'bg-blue-600 w-6' : 'bg-slate-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => setOnboardingStep(1)} className="text-slate-400 font-bold hover:text-slate-600">Back</button>
                                                <button
                                                    onClick={completeOnboarding}
                                                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20"
                                                >
                                                    Finalize Map
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="flex-1 h-full flex flex-col min-h-0">
                            {activeTab === 'dashboard' && (
                                <div className="flex-1 overflow-y-auto p-10 scrollbar-none space-y-12">

                                    {/* Quick Stats Header */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Total Notes', value: '124', icon: MessageSquare, color: 'bg-blue-500' },
                                            { label: 'Knowledge Areas', value: '12', icon: LayoutGrid, color: 'bg-emerald-500' },
                                            { label: 'Learning Streak', value: '14 Days', icon: Sparkles, color: 'bg-purple-500' },
                                            { label: 'Mastery Score', value: '82%', icon: Brain, color: 'bg-amber-500' }
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                                        <stat.icon size={22} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                                        <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                                    <div className={`h-full ${stat.color} opacity-30 w-2/3 rounded-full`} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Main Dashboard Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                        {/* Recent Knowledge / Notes */}
                                        <div className="lg:col-span-2 space-y-10">
                                            {/* Category Mastery Bars */}
                                            <div className="bg-white/40 backdrop-blur-md p-10 rounded-[40px] border border-white/50 shadow-xl">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Category Mastery</h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Learning</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                                    {CATEGORIES_DATA.map((cat, i) => (
                                                        <div key={cat.id} className="space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-2 h-2 rounded-full dynamic-bg" style={{ '--bg-color': cat.color } as React.CSSProperties} />
                                                                    <span className="text-xs font-bold text-slate-700">{cat.label}</span>
                                                                </div>
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{60 + (i * 10)}%</span>
                                                            </div>
                                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${60 + (i * 10)}%` }}
                                                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                                    style={{ '--bg-color': cat.color } as React.CSSProperties}
                                                                    className="h-full rounded-full dynamic-bg"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Insights</h3>
                                                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {CATEGORIES_DATA.slice(0, 4).map((note, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.7 + i * 0.1 }}
                                                            className="bg-white p-8 rounded-[36px] border border-slate-100 hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5 group cursor-pointer relative overflow-hidden shadow-sm"
                                                        >
                                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                                                <Sparkles size={40} className="text-blue-600" />
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <div className="w-2 h-2 rounded-full dynamic-bg" style={{ '--bg-color': note.color } as React.CSSProperties} />
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{note.label}</span>
                                                            </div>
                                                            <h4 className="text-lg font-black text-slate-800 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                                                                Understanding {note.label.split(' ')[0]} in Deep Context
                                                            </h4>
                                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6 font-medium">
                                                                Your recent focus on this area shows a high correlation with previous concepts in Tech. Consider exploring the link between these elements for better retention.
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex -space-x-2">
                                                                    {[1, 2, 3].map(j => (
                                                                        <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                                                                    ))}
                                                                </div>
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Added 2h ago</span>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pinned & Recommended */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Recommended for You</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { title: 'Neural Network Basics', area: 'Technology', color: 'text-blue-500' },
                                                    { title: 'Stoic Principles', area: 'Philosophy', color: 'text-emerald-500' },
                                                    { title: 'UI Design Patterns', area: 'Design', color: 'text-pink-500' }
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-slate-50 p-6 rounded-[28px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${item.color}`}>{item.area}</span>
                                                            <Plus size={14} className="text-slate-300 group-hover:text-blue-500" />
                                                        </div>
                                                        <h5 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-10 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[36px] text-white shadow-2xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                                    <Brain size={80} />
                                                </div>
                                                <h4 className="text-lg font-black mb-2 tracking-tight">Deep Work Mode</h4>
                                                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                                                    Unlock focused learning sessions with custom timers and background soundscapes.
                                                </p>
                                                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-colors">Start Session</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div className="flex-1 p-10 overflow-y-auto scrollbar-none">
                                    <div className="max-w-4xl mx-auto space-y-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-3xl font-black text-slate-800 tracking-tight underline decoration-blue-500 decoration-8 underline-offset-4">Your Knowledge Notes</h2>
                                            <button onClick={() => setIsNoteModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20">Add New Note</button>
                                        </div>
                                        <div className="space-y-4">
                                            {CATEGORIES_DATA.map((note, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-50 hover:border-blue-100 hover:shadow-xl transition-all cursor-pointer group"
                                                >
                                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black dynamic-bg" style={{ '--bg-color': note.color } as React.CSSProperties}>
                                                        {note.label[0]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">{note.label} Summary</h4>
                                                        <p className="text-sm text-slate-400 font-medium">Last updated 14 days ago • {note.notesCount} items linked</p>
                                                    </div>
                                                    <button
                                                        title="More Options"
                                                        aria-label="More Options"
                                                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-all"
                                                    >
                                                        <MoreHorizontal size={20} aria-hidden="true" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'graph view' && (
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
                                                    const subText = "12 Notes • Mastered";
                                                    const subSize = 9 / globalScale;
                                                    ctx.font = `700 ${subSize}px Inter, sans-serif`;
                                                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                                                    ctx.fillText(subText, node.x, by + bh + 14 / globalScale);

                                                    // Glow effect for selected node
                                                    ctx.beginPath();
                                                    ctx.arc(node.x, node.y, size * 1.5, 0, 2 * Math.PI, false);
                                                    const gradient = ctx.createRadialGradient(node.x, node.y, size, node.x, node.y, size * 1.5);
                                                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                                                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                                                    ctx.fillStyle = gradient;
                                                    ctx.fill();
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
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Sidebar Right */}
            <aside className="w-[420px] border-l border-[#e2e8f0] flex flex-col bg-white">
                <div className="p-10 flex flex-col h-full overflow-y-auto scrollbar-none">
                    {!selectedTopic ? (
                        <>
                            {/* Profile & Insights Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#eef2f6] flex items-center justify-center text-slate-800 border border-[#e2e8f0]">
                                        <User size={20} />
                                    </div>
                                    <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.15em]">Profile & Insights</h2>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-[#f0fdf4] text-[#16a34a] rounded-full text-[10px] font-black border border-[#dcfce7] shadow-sm">
                                    <Sparkles size={12} />
                                    <span>Insights Ready</span>
                                </div>
                            </div>

                            {/* Top Categories */}
                            <section className="mb-12">
                                <h3 className="text-sm font-black text-[#1e293b] mb-8 uppercase tracking-tight">Top Knowledge Categories</h3>
                                <div className="space-y-7">
                                    {rankedCategories.map((cat, idx) => (
                                        <div key={cat.id} className="group">
                                            <div className="flex items-center gap-4 mb-2.5">
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-black shadow-sm dynamic-bg" style={{ '--bg-color': cat.color } as React.CSSProperties}>
                                                    {idx}
                                                </div>
                                                <span className="text-[13px] font-bold text-slate-700 flex-1">{cat.label}</span>
                                                <span className="text-[13px] font-black text-slate-900">{cat.notesCount}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cat.notesCount / rankedCategories[0].notesCount) * 100}%` }}
                                                    transition={{ duration: 1.2, ease: "circOut", delay: idx * 0.05 }}
                                                    style={{ '--bg-color': cat.color } as React.CSSProperties}
                                                    className="h-full rounded-full dynamic-bg"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Time on App */}
                            <section className="mb-12">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.15em] mb-6">Time on Neuro Map</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400">Member Since:</span>
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{timeMetrics.memberSince}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400">Days Active:</span>
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{timeMetrics.daysActive}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400">Last Activity:</span>
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{timeMetrics.lastActivity}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Behavioral Snapshot */}
                            <section className="mt-auto">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.15em] mb-6 flex items-center justify-between">
                                    <span>Behavioral Snapshot</span>
                                    <span className="text-[10px] text-slate-400 normal-case font-bold">(Non-clinical)</span>
                                </h3>

                                <div className="p-7 bg-[#f8fafc] border border-[#e2e8f0] rounded-[32px] relative overflow-hidden">
                                    <p className="text-[13px] text-slate-600 leading-relaxed font-bold">
                                        Your activity suggests a strong preference for structured learning and analytical problem-solving, with sustained atenton in Technology & Digital Topics and Science & Research. You also show consistent self-
                                    </p>
                                    <div className="mt-8 flex -space-x-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white overflow-hidden bg-slate-200 shadow-sm">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">
                                            +12
                                        </div>
                                    </div>
                                </div>
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
                                            <label htmlFor="category-select" className="block text-sm font-bold text-slate-800 mb-2">Category</label>
                                            <select
                                                id="category-select"
                                                title="Select Category"
                                                value={formCategory}
                                                onChange={(e) => setFormCategory(e.target.value)}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all font-medium appearance-none cursor-pointer"
                                            >
                                                {treeData.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="topic-input" className="block text-sm font-bold text-slate-800 mb-2">Topic</label>
                                            <input
                                                id="topic-input"
                                                type="text"
                                                value={formTopic}
                                                onChange={(e) => setFormTopic(e.target.value)}
                                                placeholder="Enter a topic..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="title-input" className="block text-sm font-bold text-slate-800 mb-2">Title <span className="text-slate-400 font-medium">(Optional)</span></label>
                                            <input
                                                id="title-input"
                                                type="text"
                                                value={formTitle}
                                                onChange={(e) => setFormTitle(e.target.value)}
                                                placeholder="Enter a title..."
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="content-textarea" className="block text-sm font-bold text-slate-800 mb-2">Content</label>
                                            <textarea
                                                id="content-textarea"
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

function TreeItem({ item, depth, onAction }: {
    item: TreeItem,
    depth: number,
    onAction: (id: string, type: 'topic' | 'category', action: 'delete' | 'archive' | 'rename', newLabel?: string) => void
}) {
    const [isExpanded, setIsExpanded] = useState(item.expanded || false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="space-y-1">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${item.active ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20' : 'hover:bg-slate-50 text-slate-600'}`}
            >
                <div className="flex items-center gap-3">
                    {hasChildren ? (
                        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
                            <ChevronDown size={14} className={item.active ? 'text-white/80' : 'text-slate-400'} />
                        </motion.div>
                    ) : (
                        <div className={`w-1 h-1 rounded-full ${item.active ? 'bg-white/80' : 'bg-blue-300'} ml-1.5 mr-1`} />
                    )}
                    <span className={`text-sm font-bold tracking-tight ${item.active ? 'text-white' : 'text-slate-700'}`}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        title="Rename"
                        onClick={(e) => {
                            e.stopPropagation();
                            const val = prompt('New name:', item.label);
                            if (val) onAction(item.id, 'topic', 'rename', val);
                        }}
                        className="p-1 hover:text-blue-500 text-slate-300 transition-colors"
                    >
                        <Edit2 size={12} />
                    </button>
                    <button
                        title="Archive"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction(item.id, 'topic', 'archive');
                        }}
                        className="p-1 hover:text-amber-500 text-slate-300 transition-colors"
                    >
                        <ShieldAlert size={12} />
                    </button>
                    <button
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction(item.id, 'topic', 'delete');
                        }}
                        className="p-1 hover:text-red-500 text-slate-300 transition-colors"
                    >
                        <Trash2 size={12} />
                    </button>
                    {item.count !== undefined && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">{item.count}</span>}
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
                        {item.children!.filter(c => !c.archived).map((child: TreeItem) => (
                            <TreeItem key={child.id} item={child} depth={depth + 1} onAction={onAction} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
