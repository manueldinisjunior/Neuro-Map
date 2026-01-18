import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Tag, Calendar, Filter, Grid, List, X } from 'lucide-react';
import { NOTES_DATA, Note } from '../data/knowledge';

// Color class mapping
const COLOR_MAP: Record<string, string> = {
    '#3b82f6': 'bg-blue-500',
    '#10b981': 'bg-emerald-500',
    '#f43f5e': 'bg-rose-500',
    '#f59e0b': 'bg-amber-500',
    '#2dd4bf': 'bg-teal-400',
    '#22d3ee': 'bg-cyan-400',
};

const getCategoryColorClass = (color?: string): string =>
    color ? COLOR_MAP[color] || 'bg-slate-300' : 'bg-slate-300';

// Animation variants
const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 }
};

// Note Card Component
interface NoteCardProps {
    note: Note;
    viewMode: 'grid' | 'list';
    index: number;
}

const NoteCard = React.memo(({ note, viewMode, index }: NoteCardProps) => {
    const colorClass = getCategoryColorClass(note.color);
    const formattedDate = useMemo(() =>
        new Date(note.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }), [note.createdAt]);

    return (
        <motion.article
            layout
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className={`
                group bg-white dark:bg-slate-800/50 
                border border-slate-100 dark:border-slate-700/50 
                rounded-2xl sm:rounded-3xl overflow-hidden 
                hover:shadow-xl hover:shadow-blue-500/5 
                hover:border-blue-200 dark:hover:border-blue-500/30 
                transition-all cursor-pointer
                ${viewMode === 'list' ? 'flex items-stretch' : 'flex flex-col'}
            `}
        >
            {/* Color indicator */}
            <div className={`${colorClass} ${viewMode === 'list' ? 'w-1.5' : 'h-1.5 w-full'}`} />

            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-lg 
                        bg-slate-50 dark:bg-slate-700/50 
                        text-[9px] sm:text-[10px] font-black uppercase tracking-widest 
                        text-slate-500 dark:text-slate-400 
                        border border-slate-100 dark:border-slate-600 
                        group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 
                        group-hover:text-blue-600 dark:group-hover:text-blue-400 
                        group-hover:border-blue-100 dark:group-hover:border-blue-500/30 
                        transition-colors truncate max-w-[60%]">
                        {note.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-xs font-bold flex-shrink-0">
                        <Calendar size={11} />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-xl font-black text-slate-800 dark:text-white 
                    mb-2 sm:mb-3 tracking-tight 
                    group-hover:text-blue-600 dark:group-hover:text-blue-400 
                    transition-colors line-clamp-2">
                    {note.title}
                </h3>

                {/* Content preview */}
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 
                    font-medium leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                    {note.content}
                </p>

                {/* Footer with tags */}
                <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 
                    border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                        {note.tags.slice(0, 3).map(tag => (
                            <div key={tag} className="flex items-center gap-1 
                                text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 
                                font-bold bg-slate-50 dark:bg-slate-700/30 
                                px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                                <Tag size={9} />
                                <span className="max-w-[60px] truncate">{tag}</span>
                            </div>
                        ))}
                        {note.tags.length > 3 && (
                            <span className="text-[9px] text-slate-400 font-bold px-1">
                                +{note.tags.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
});
NoteCard.displayName = 'NoteCard';

// Filter Button Component
interface FilterButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const FilterButton = React.memo(({ label, isActive, onClick }: FilterButtonProps) => (
    <button
        onClick={onClick}
        className={`
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl 
            text-[10px] sm:text-xs font-black uppercase tracking-wider 
            whitespace-nowrap transition-all
            ${isActive
                ? 'bg-slate-800 dark:bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }
        `}
    >
        {label}
    </button>
));
FilterButton.displayName = 'FilterButton';

// Main Notes Component
export default function Notes() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Memoized categories
    const categories = useMemo(() =>
        Array.from(new Set(NOTES_DATA.map(note => note.category))),
        []
    );

    // Memoized filtered notes
    const filteredNotes = useMemo(() =>
        NOTES_DATA.filter(note => {
            const query = searchTerm.toLowerCase();
            const matchesSearch = !query ||
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query) ||
                note.tags.some(tag => tag.toLowerCase().includes(query));
            const matchesCategory = !selectedCategory || note.category === selectedCategory;
            return matchesSearch && matchesCategory;
        }),
        [searchTerm, selectedCategory]
    );

    // Callbacks
    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategory(null);
    }, []);

    const clearSearch = useCallback(() => setSearchTerm(''), []);

    return (
        <div className="flex-1 h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Header */}
            <header className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 
                bg-white dark:bg-slate-900 
                border-b border-slate-100 dark:border-slate-800 
                flex-shrink-0 z-20">

                {/* Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white 
                            tracking-tighter mb-1 sm:mb-2">
                            Knowledge Notes
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
                            Manage and review your captured thoughts.
                        </p>
                    </div>
                    <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl 
                        font-black uppercase tracking-widest text-[10px] sm:text-xs 
                        shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all 
                        flex items-center gap-2 self-start sm:self-center">
                        <Plus size={16} />
                        <span className="hidden xs:inline">Create Note</span>
                        <span className="xs:hidden">New</span>
                    </button>
                </div>

                {/* Search & View Toggle Row */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search notes, tags, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 
                                bg-slate-50 dark:bg-slate-800 
                                border border-slate-200 dark:border-slate-700 
                                rounded-xl sm:rounded-2xl text-sm font-medium 
                                text-slate-700 dark:text-slate-200
                                focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 
                                outline-none transition-all 
                                placeholder:text-slate-400"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                                    text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-end sm:self-auto">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 sm:p-2.5 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                            aria-label="Grid View"
                            title="Grid View"
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 sm:p-2.5 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-white'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                            aria-label="List View"
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 mt-4 sm:mt-6 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <FilterButton
                        label="All Notes"
                        isActive={!selectedCategory}
                        onClick={() => setSelectedCategory(null)}
                    />
                    {categories.map(cat => (
                        <FilterButton
                            key={cat}
                            label={cat}
                            isActive={selectedCategory === cat}
                            onClick={() => setSelectedCategory(cat)}
                        />
                    ))}
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 scrollbar-none">
                {filteredNotes.length === 0 ? (
                    // Empty State
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-4">
                        <Filter size={48} className="mb-4 opacity-20" />
                        <p className="font-bold text-base sm:text-lg text-center">
                            No notes found matching your filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    // Notes Grid/List
                    <div className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
                            : "space-y-3 sm:space-y-4 max-w-4xl mx-auto"
                    }>
                        <AnimatePresence mode="popLayout">
                            {filteredNotes.map((note, i) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    viewMode={viewMode}
                                    index={i}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
