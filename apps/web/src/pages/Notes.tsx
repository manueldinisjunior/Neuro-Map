import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Tag, Calendar, Filter, Grid, List } from 'lucide-react';
import { NOTES_DATA, Note } from '../data/knowledge';

const getCategoryColorClass = (color?: string) => {
    switch (color) {
        case '#3b82f6': return 'bg-blue-500';
        case '#10b981': return 'bg-emerald-500';
        case '#f43f5e': return 'bg-rose-500';
        case '#f59e0b': return 'bg-amber-500';
        case '#2dd4bf': return 'bg-teal-400';
        case '#22d3ee': return 'bg-cyan-400';
        default: return 'bg-slate-300';
    }
};

export default function Notes() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(NOTES_DATA.map(note => note.category)));

    const filteredNotes = NOTES_DATA.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? note.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex-1 h-full flex flex-col bg-[#f8fafc] overflow-hidden">
            {/* Header */}
            <div className="px-10 py-8 bg-white border-b border-slate-100 flex-shrink-0 z-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tighter mb-2">Knowledge Notes</h1>
                        <p className="text-slate-500 font-medium">Manage and review your captured thoughts.</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                        <Plus size={16} />
                        Create Note
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search notes, tags, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                aria-label="Grid View"
                                title="Grid View"
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                aria-label="List View"
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mt-6 overflow-x-auto scrollbar-none pb-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${!selectedCategory ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                        All Notes
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-10 scrollbar-none">
                {filteredNotes.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Filter size={48} className="mb-4 opacity-20" />
                        <p className="font-bold text-lg">No notes found matching your filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                            className="mt-4 text-blue-600 font-bold text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4 max-w-4xl mx-auto"}>
                        <AnimatePresence>
                            {filteredNotes.map((note, i) => (
                                <motion.div
                                    key={note.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    className={`group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all cursor-pointer ${viewMode === 'list' ? 'flex items-stretch' : 'flex flex-col'
                                        }`}
                                >
                                    <div className={`w-2 ${viewMode === 'list' ? '' : 'h-2 w-full'} ${getCategoryColorClass(note.color)}`} />

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                                {note.category}
                                            </span>
                                            {/* Date */}
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                                                <Calendar size={12} />
                                                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                                            {note.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                                            {note.content}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex gap-2">
                                                {note.tags.map(tag => (
                                                    <div key={tag} className="flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-md">
                                                        <Tag size={10} />
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
