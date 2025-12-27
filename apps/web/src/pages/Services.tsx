import { motion } from 'framer-motion';
import { Target, Zap, LayoutDashboard, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
    const { t } = useTranslation();

    const roadmapItems = t('services.roadmap.items', { returnObjects: true }) as string[];

    return (
        <div className="py-32 bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Capabilities</span>
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">{t('services.title')}</h1>
                    <p className="text-xl text-zinc-500 font-medium">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <Feature
                        title={t('services.capture.title')}
                        desc={t('services.capture.desc')}
                        icon={<Zap className="w-6 h-6 text-yellow-500" />}
                    />
                    <Feature
                        title={t('services.org.title')}
                        desc={t('services.org.desc')}
                        icon={<LayoutDashboard className="w-6 h-6 text-blue-500" />}
                    />
                    <Feature
                        title={t('services.map.title')}
                        desc={t('services.map.desc')}
                        icon={<Brain className="w-6 h-6 text-purple-500" />}
                    />
                    <Feature
                        title={t('services.insight.title')}
                        desc={t('services.insight.desc')}
                        icon={<Target className="w-6 h-6 text-red-500" />}
                    />
                </div>

                <div className="mt-32 max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-black text-white tracking-tighter">{t('services.roadmap.title')}</h2>
                    </div>
                    <ul className="bg-zinc-900/50 p-10 rounded-[40px] border border-zinc-800/50 backdrop-blur-sm shadow-2xl space-y-6">
                        {roadmapItems.map((item, index) => (
                            <li key={index} className="flex items-center gap-4 text-zinc-400 font-bold group">
                                <span className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Feature({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 p-8 bg-zinc-900/30 rounded-[32px] border border-zinc-800/50 hover:bg-zinc-900/50 transition-all group hover:-translate-y-1"
        >
            <div className="shrink-0 w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:border-blue-500/30 transition-colors shadow-inner">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">{desc}</p>
            </div>
        </motion.div>
    )
}

