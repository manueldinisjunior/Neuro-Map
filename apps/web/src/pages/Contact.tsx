import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <div className="py-32 bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-20">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Communication</span>
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">{t('contact.title')}</h1>
                    <p className="text-xl text-zinc-500 font-medium">{t('contact.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 border border-zinc-800 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-white mb-2 uppercase tracking-widest text-xs">{t('contact.email')}</h3>
                                <p className="text-zinc-400 font-bold text-lg">hello@neuro.app</p>
                                <p className="text-zinc-500 font-medium">support@neuro.app</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 border border-zinc-800 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-white mb-2 uppercase tracking-widest text-xs">{t('contact.office')}</h3>
                                <p className="text-zinc-400 font-bold text-lg">123 Innovation Dr.</p>
                                <p className="text-zinc-500 font-medium">Berlin, Germany</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/50 p-10 rounded-[40px] border border-zinc-800/50 backdrop-blur-sm shadow-2xl"
                    >
                        <div className="mb-8">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">{t('contact.form.name')}</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold placeholder:text-zinc-700" placeholder={t('contact.form.placeholderName')} />
                        </div>
                        <div className="mb-8">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">{t('contact.form.email')}</label>
                            <input type="email" className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold placeholder:text-zinc-700" placeholder={t('contact.form.placeholderEmail')} />
                        </div>
                        <div className="mb-8">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">{t('contact.form.message')}</label>
                            <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold placeholder:text-zinc-700 resize-none" placeholder={t('contact.form.placeholderMessage')} />
                        </div>
                        <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95">
                            {t('contact.form.send')}
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}

