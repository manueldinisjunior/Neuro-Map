import { Link, Outlet } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { ScrollToTop } from '../components/ScrollToTop';
import { TranslationWidget } from '../components/TranslationWidget';
import { useTranslation } from 'react-i18next';
import { Logo } from '../components/Logo';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function PublicLayout() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400">
            <header className="sticky top-0 z-50 backdrop-blur-xl border-b bg-[var(--bg-primary)]/95 border-[var(--border-color)]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
                    {/* Logo - Left */}
                    <Logo />

                    {/* Navigation - Center Left */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link to="/" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            {t('nav.home')}
                        </Link>
                        <Link to="/about" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            {t('nav.about')}
                        </Link>
                        <Link to="/services" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            {t('nav.services')}
                        </Link>
                        <Link to="/contact" className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            {t('nav.contact')}
                        </Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4 ml-auto">
                        {/* Theme Switcher */}
                        <ThemeSwitcher />

                        {/* Translation Widget */}
                        <TranslationWidget />

                        {/* Sign In Link */}
                        <Link
                            to="/login"
                            className="hidden md:block text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                        >
                            {t('nav.signIn')}
                        </Link>

                        {/* Get Started Button */}
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

            <footer className="bg-[var(--bg-primary)] text-[var(--text-secondary)] py-20 border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="flex flex-col gap-6">
                            <Logo iconSize={28} textSize="text-2xl" />
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

