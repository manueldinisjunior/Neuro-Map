import { Link, Outlet } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export function PublicLayout() {
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
                            Home
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link to="/services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Services
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <BrainCircuit size={20} />
                            <span className="font-bold text-slate-200">Neuro Notes</span>
                        </div>
                        <div className="text-sm">
                            &copy; {new Date().getFullYear()} Neuro Notes. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
