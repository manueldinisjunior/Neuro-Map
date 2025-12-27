import { Link, Outlet } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { ScrollToTop } from '../components/ScrollToTop';
import { TranslationWidget } from '../components/TranslationWidget';
import { useTranslation } from 'react-i18next';

export function PublicLayout() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                            <BrainCircuit size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                            Neuro Notes
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            {t('nav.home')}
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            {t('nav.about')}
                        </Link>
                        <Link to="/services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            {t('nav.services')}
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            {t('nav.contact')}
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <TranslationWidget />
                        <Link
                            to="/login"
                            className="hidden sm:block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            {t('nav.signIn')}
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
                        >
                            {t('nav.getStarted')}
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <BrainCircuit size={24} className="text-blue-500" />
                                <span className="font-bold text-xl text-slate-100">Neuro Notes</span>
                            </div>
                            <p className="max-w-xs text-sm text-slate-400">
                                {t('hero.subtitle')}
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>

                        <div className="flex flex-col md:items-end gap-2 text-sm">
                            <div className="flex gap-6">
                                <Link to="/privacy" className="hover:text-slate-200 transition-colors">{t('footer.privacy')}</Link>
                                <Link to="/terms" className="hover:text-slate-200 transition-colors">{t('footer.terms')}</Link>
                            </div>
                            <div>
                                &copy; {new Date().getFullYear()} Neuro Notes. {t('footer.rights')}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    );
}
