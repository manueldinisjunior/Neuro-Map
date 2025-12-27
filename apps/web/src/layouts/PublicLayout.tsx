import { Link, Outlet } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { ScrollToTop } from '../components/ScrollToTop';
import { TranslationWidget } from '../components/TranslationWidget';
import { useTranslation } from 'react-i18next';

export function PublicLayout() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
            <header className="sticky top-0 z-50 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-900/50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group" aria-label="Neuro Notes Home">
                        <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:bg-blue-500 transition-all group-hover:shadow-lg group-hover:shadow-blue-600/20 active:scale-95 shadow-md">
                            <BrainCircuit size={24} />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter text-white">
                            Neuro
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">
                            {t('nav.home')}
                        </Link>
                        <Link to="/about" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">
                            {t('nav.about')}
                        </Link>
                        <Link to="/services" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">
                            {t('nav.services')}
                        </Link>
                        <Link to="/contact" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">
                            {t('nav.contact')}
                        </Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <TranslationWidget />
                        <Link
                            to="/login"
                            className="hidden sm:block text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                        >
                            {t('nav.signIn')}
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 text-[13px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:scale-95"
                        >
                            {t('nav.getStarted')}
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="bg-zinc-950 text-zinc-500 py-20 border-t border-zinc-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2" aria-label="Neuro Notes Logo" role="img">
                                <BrainCircuit size={28} className="text-blue-500" />
                                <span className="font-black text-2xl text-white uppercase tracking-tighter">Neuro</span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed font-medium">
                                {t('hero.subtitle')}
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:text-blue-500 hover:bg-zinc-800 transition-all border border-zinc-800" aria-label="Twitter" title="Twitter">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:text-blue-500 hover:bg-zinc-800 transition-all border border-zinc-800" aria-label="GitHub" title="GitHub">
                                    <Github size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:text-blue-500 hover:bg-zinc-800 transition-all border border-zinc-800" aria-label="LinkedIn" title="LinkedIn">
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:text-blue-500 hover:bg-zinc-800 transition-all border border-zinc-800" aria-label="Email" title="Email">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Product</h4>
                                <Link to="/" className="hover:text-blue-500 transition-colors">Features</Link>
                                <Link to="/" className="hover:text-blue-500 transition-colors">Pricing</Link>
                                <Link to="/" className="hover:text-blue-500 transition-colors">API</Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
                                <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
                                <Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
                                <Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Legal</h4>
                                <Link to="/terms" className="hover:text-blue-500 transition-colors">{t('footer.terms')}</Link>
                                <Link to="/privacy" className="hover:text-blue-500 transition-colors">{t('footer.privacy')}</Link>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600">
                            <div>
                                &copy; {new Date().getFullYear()} Neuro. {t('footer.rights')}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    );
}

