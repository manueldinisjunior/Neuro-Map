export interface TreeItem {
    id: string;
    label: string;
    expanded?: boolean;
    children?: TreeItem[];
    count?: number;
    active?: boolean;
    color?: string; // Added for graph visualization
    colorClass?: string; // Added for Tailwind styling
    archived?: boolean;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: string;
    color?: string;
}

export const TREE_DATA: TreeItem[] = [
    {
        id: '1',
        label: 'Education & Learning',
        expanded: true,
        color: '#f43f5e',
        colorClass: 'bg-rose-500',
        children: [
            {
                id: '1-1',
                label: 'Academic Subjects',
                expanded: true,
                children: [
                    { id: '1-1-1', label: 'Mathematics' },
                    { id: '1-1-2', label: 'Calculus' },
                    { id: '1-1-3', label: 'Statistics' }
                ]
            },
            { id: '1-2', label: 'Computer Science' },
            { id: '1-3', label: 'Natural Sciences' }
        ]
    },
    {
        id: '4',
        label: 'Professional Skills',
        expanded: true,
        color: '#2dd4bf',
        colorClass: 'bg-teal-400',
        children: [
            {
                id: '4-1',
                label: 'Programming',
                count: 11,
                active: true,
                children: [
                    { id: '4-1-1', label: 'JavaScript' },
                    { id: '4-1-2', label: 'Python' },
                    { id: '4-1-3', label: 'Java' }
                ]
            }
        ]
    }
];

export const CATEGORIES_STATS = [
    { label: 'Technology & Digital Topics', value: 24, color: '#22d3ee', type: 'tech', colorClass: 'bg-cyan-400', widthClass: 'w-[96%]' },
    { label: 'Professional Skills', value: 18, color: '#2dd4bf', type: 'skills', colorClass: 'bg-teal-400', widthClass: 'w-[72%]' },
    { label: 'Science & Research', value: 15, color: '#3b82f6', type: 'research', colorClass: 'bg-blue-500', widthClass: 'w-[60%]' },
    { label: 'Productivity & Methods', value: 13, color: '#f59e0b', type: 'ideas', colorClass: 'bg-amber-500', widthClass: 'w-[52%]' },
    { label: 'Education & Learning', value: 12, color: '#f43f5e', type: 'creative', colorClass: 'bg-rose-500', widthClass: 'w-[48%]' }
];

export const NOTES_DATA: Note[] = [
    {
        id: 'n1',
        title: 'React Hooks Deep Dive',
        content: 'Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed. The most common hooks are useState and useEffect.',
        category: 'Professional Skills',
        tags: ['React', 'Frontend', 'JavaScript'],
        createdAt: '2024-05-20T10:00:00Z',
        color: '#3b82f6'
    },
    {
        id: 'n2',
        title: 'Stoicism in Modern Life',
        content: 'Stoicism is a philosophy of personal ethics informed by its system of logic and its views on the natural world. It teaches the development of self-control and fortitude as a means of overcoming destructive emotions.',
        category: 'Education & Learning',
        tags: ['Philosophy', 'Life', 'Ethics'],
        createdAt: '2024-05-18T14:30:00Z',
        color: '#10b981'
    },
    {
        id: 'n3',
        title: 'Neural Networks 101',
        content: 'A neural network is a network or circuit of neurons, or in a modern sense, an artificial neural network, composed of artificial neurons or nodes. Thus a neural network is either a biological neural network, made up of real biological neurons, or an artificial neural network, for solving artificial intelligence (AI) problems.',
        category: 'Technology & Digital Topics',
        tags: ['AI', 'ML', 'Science'],
        createdAt: '2024-05-15T09:15:00Z',
        color: '#f43f5e'
    },
    {
        id: 'n4',
        title: 'The Pomodoro Technique',
        content: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.',
        category: 'Productivity & Methods',
        tags: ['Productivity', 'Time Management'],
        createdAt: '2024-05-12T16:00:00Z',
        color: '#f59e0b'
    },
    {
        id: 'n5',
        title: 'TypeScript Generics',
        content: 'Generics provide a way to make components work over a variety of types rather than a single one. This allows users to consume these components and use their own types.',
        category: 'Professional Skills',
        tags: ['TypeScript', 'Coding'],
        createdAt: '2024-05-10T11:20:00Z',
        color: '#3b82f6'
    }
];
