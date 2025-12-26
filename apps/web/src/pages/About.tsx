import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-slate-900 mb-8">Concept & Philosophy</h1>

                    <div className="prose prose-lg prose-slate text-slate-600">
                        <p className="lead text-xl text-slate-700 mb-6">
                            Neuro Notes was born from a simple observation: <strong>Human thought is non-linear.</strong>
                        </p>

                        <p className="mb-6">
                            Most note-taking apps force you into rigid hierarchies—folders inside folders, linear document lists.
                            But your brain works through associations, connecting disparate ideas to form new insights.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Digital Garden</h2>
                        <p className="mb-6">
                            We believe in the concept of "digital gardening". You plant a seed (a thought), and depending on how much you water it (write more, add connections), it grows.
                        </p>
                        <p className="mb-6">
                            In Neuro Notes, this is visualized literally. Topics start as small dots. As you add content, they grow into large nodes, anchoring your personal map of knowledge.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Mental Clarity</h2>
                        <p>
                            By offloading your thoughts into a structure that mimics your mind, you free up mental RAM.
                            Focus on thinking, not remembering where you saved that file.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
