import { motion } from 'framer-motion';
import { BrainCircuit, Share2, Zap, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50" />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                                Map Your Mind <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    Visualize Your Growth
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Neuro Notes transforms your scattered thoughts into a living, breathing network of knowledge.
                                Write freely, and watch your personal universe of ideas expand.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/login" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight size={20} />
                                </Link>
                                <Link to="/about" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    Learn How fit Works
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use Neuro Notes?</h2>
                        <p className="text-lg text-slate-600">Built for deep thinkers, learners, and creators.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-amber-500" />}
                            title="Instant Capture"
                            description="Jot down thoughts instantly without worrying about organization. Our system handles the structure."
                        />
                        <FeatureCard
                            icon={<BrainCircuit className="w-8 h-8 text-blue-500" />}
                            title="Dynamic Connections"
                            description="See how your ideas connect. Topics grow larger as you add more content, mimicking neural pathways."
                        />
                        <FeatureCard
                            icon={<Activity className="w-8 h-8 text-emerald-500" />}
                            title="Visual Insight"
                            description="Gain long-term perspective on your thinking patterns. Identify your biggest areas of focus at a glance."
                        />
                    </div>
                </div>
            </section>

            {/* Visual Placeholder Section */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your brain, visualized.</h2>
                    <div className="relative w-full max-w-4xl aspect-[16/9] bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8 flex items-center justify-center shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-slate-400">
                                <BrainCircuit size={64} className="mx-auto mb-4 opacity-50 animate-pulse" />
                                <p className="font-mono text-sm">LOADING NEURAL NETWORK SIMULATION...</p>
                            </div>
                        </div>
                        {/* Abstract decorative circles */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to expand your mind?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Join thousands of users who are organizing their thoughts with Neuro Notes.
                    </p>
                    <Link to="/login" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl hover:bg-slate-50 transition-all">
                        Start Mapping Now
                    </Link>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all"
        >
            <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-sm ring-1 ring-slate-100">{icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </motion.div>
    );
}
