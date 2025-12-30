export interface TreeItem {
    id: string;
    label: string;
    expanded?: boolean;
    children?: TreeItem[];
    count?: number;
    active?: boolean;
    color?: string; // Added for graph visualization
}

export const TREE_DATA: TreeItem[] = [
    {
        id: '1',
        label: 'Education & Learning',
        expanded: true,
        color: '#f43f5e',
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
    { label: 'Technology & Digital Topics', value: 24, color: '#22d3ee' },
    { label: 'Professional Skills', value: 18, color: '#2dd4bf' },
    { label: 'Science & Research', value: 15, color: '#3b82f6' },
    { label: 'Productivity & Methods', value: 13, color: '#f59e0b' },
    { label: 'Education & Learning', value: 12, color: '#f43f5e' }
];
