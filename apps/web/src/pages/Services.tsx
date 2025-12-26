import { motion } from 'framer-motion';
import { Target, Share2, Layers, Zap, LayoutDashboard, Brain } from 'lucide-react';

export default function Services() {
    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Features & Services</h1>
                    <p className="text-lg text-slate-600">
                        Everything you need to organize your inner world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <Feature
                        title="Thought Capture"
                        desc="A distraction-free editor designed for speed. Capture ideas the moment they strike."
                        icon={<Zap className="w-6 h-6 text-yellow-500" />}
                    />
                    <Feature
                        title="Organic Organization"
                        desc="No folder management required. Tags and natural language processing organize your notes automatically."
                        icon={<LayoutDashboard className="w-6 h-6 text-blue-500" />}
                    />
                    <Feature
                        title="Mind Map Visualization"
                        desc="The core of Neuro Notes. A real-time, force-directed graph of your knowledge base."
                        icon={<Brain className="w-6 h-6 text-purple-500" />}
                    />
                    <Feature
                        title="Long-term Insights"
                        desc="Track how your interests shift over time. See which topics are dominating your thinking."
                        icon={<Target className="w-6 h-6 text-red-500" />}
                    />
                </div>

                <div className="mt-24 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Future Roadmap</h2>
                    <ul className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-left">
                        <li className="flex items-center gap-3 mb-4 text-slate-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            AI-powered connections (suggestion of related notes)
                        </li>
                        <li className="flex items-center gap-3 mb-4 text-slate-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            Public sharing of specific knowledge branches
                        </li>
                        <li className="flex items-center gap-3 text-slate-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            Collaborative mind maps for teams
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Feature({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
            <div className="shrink-0 w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    )
}
