import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="py-32 bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-16">
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Philosophy</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                            {t('about.title')}
                        </h1>
                    </div>

                    <div className="space-y-12 text-zinc-400">
                        <p className="text-2xl md:text-3xl font-bold text-zinc-200 leading-tight">
                            {t('about.lead')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed font-medium">
                                    {t('about.p1')}
                                </p>
                            </div>
                            <div className="space-y-8">
                                <div className="p-8 rounded-[32px] bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                                    <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('about.h2_1')}</h2>
                                    <p className="text-zinc-400 leading-relaxed font-medium mb-4">
                                        {t('about.p2')}
                                    </p>
                                    <p className="text-zinc-400 leading-relaxed font-medium">
                                        {t('about.p3')}
                                    </p>
                                </div>

                                <div className="p-8 rounded-[32px] bg-blue-600/5 border border-blue-500/10 backdrop-blur-sm">
                                    <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('about.h2_2')}</h2>
                                    <p className="text-zinc-400 leading-relaxed font-medium">
                                        {t('about.p4')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

