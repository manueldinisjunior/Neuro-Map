import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, User, Settings, Plus } from 'lucide-react';

export function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO: clear auth state
        navigate('/');
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            <header className="bg-white border-b border-slate-200 z-20">
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-600 rounded text-white">
                                <BrainCircuit size={20} />
                            </div>
                            <span className="font-bold text-slate-800">Neuro Notes</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus size={16} />
                            <span className="text-sm font-medium">New Note</span>
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-2" />

                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <Settings size={20} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                        <div className="ml-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
                            ME
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
