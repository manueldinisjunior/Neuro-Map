import { motion } from 'framer-motion';
import { BrainCircuit, Share2, Zap, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    
    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
                                {t('home.hero.title')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-gradient-x">
                                    {t('home.hero.titleGradient')}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                {t('home.hero.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link to="/login" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-2xl shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95">
                                    {t('home.hero.getStarted')}
                                    <ArrowRight size={22} />
                                </Link>
                                <Link to="/about" className="px-10 py-5 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-2xl font-bold hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-95">
                                    {t('home.hero.learnMore')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-zinc-950 border-y border-zinc-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{t('home.features.sectionTitle')}</h2>
                        <p className="text-lg text-zinc-500 font-medium">{t('home.features.sectionSubtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        <FeatureCard
                            icon={<Zap className="w-7 h-7 text-amber-500" />}
                            title={t('home.features.capture.title')}
                            description={t('home.features.capture.desc')}
                        />
                        <FeatureCard
                            icon={<BrainCircuit className="w-7 h-7 text-blue-500" />}
                            title={t('home.features.connect.title')}
                            description={t('home.features.connect.desc')}
                        />
                        <FeatureCard
                            icon={<Activity className="w-7 h-7 text-emerald-500" />}
                            title={t('home.features.insight.title')}
                            description={t('home.features.insight.desc')}
                        />
                    </div>
                </div>
            </section>

            {/* Visual Section */}
            <section className="py-32 bg-zinc-950 overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-16 text-center tracking-tighter">Your brain, <span className="text-zinc-500 font-bold">visualized.</span></h2>
                    <div className="relative w-full max-w-5xl aspect-[21/9] bg-zinc-900/50 rounded-[40px] border border-zinc-800/80 p-12 flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.05)] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent group-hover:opacity-100 opacity-60 transition-opacity" />
                        <div className="text-center text-zinc-500 relative z-20">
                            <BrainCircuit size={80} className="mx-auto mb-6 text-blue-500 opacity-40 animate-pulse" />
                            <p className="font-mono text-xs font-bold tracking-[0.3em] uppercase">Simulating Neural Network...</p>
                        </div>
                        
                        {/* Abstract glow effects */}
                        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto bg-blue-600 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">{t('home.cta.title')}</h2>
                            <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
                                {t('home.cta.subtitle')}
                            </p>
                            <Link to="/login" className="px-12 py-6 bg-white text-blue-600 rounded-[28px] font-black text-xl hover:shadow-2xl hover:bg-zinc-50 transition-all hover:-translate-y-1 inline-block active:scale-95 leading-none">
                                {t('home.cta.button')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="p-10 bg-zinc-900/30 rounded-[32px] border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
        >
            <div className="mb-8 w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center ring-1 ring-zinc-800 shadow-inner">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">{description}</p>
        </motion.div>
    );
}

