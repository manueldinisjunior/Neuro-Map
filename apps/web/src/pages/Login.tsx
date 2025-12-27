import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Eye, EyeOff } from 'lucide-react';
import loginVisual from '../assets/login-visual.png';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock authentication delay
        setTimeout(() => {
            // In a real app, this would be a secure token
            localStorage.setItem('neuro_token', 'mock_token_123');
            setLoading(false);
            navigate('/onboarding');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0F1014] text-white flex items-center justify-center p-4 font-sans">
            <div className="bg-[#181920] rounded-3xl shadow-2xl flex w-full max-w-5xl h-[800px] overflow-hidden border border-white/5 relative">
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <BrainCircuit size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl">Neuro Notes</span>
                    </div>

                    <div className="max-w-md mx-auto w-full mt-12 lg:mt-0">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
                        <p className="text-slate-400 mb-8">We are happy to have you back</p>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#1F2028] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-[#1F2028] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-[#1F2028] text-blue-600 focus:ring-offset-0 focus:ring-0 cursor-pointer" />
                                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-blue-500 hover:text-blue-400 font-medium">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-4 cursor-pointer"
                            >
                                {loading ? 'Signing in...' : 'Login Account'}
                            </button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#181920] text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <button type="button" className="w-full bg-white text-slate-900 font-semibold py-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-3 cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account? <a href="#" className="font-semibold text-blue-500 hover:text-blue-400">Sign up for free</a>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:block w-1/2 relative bg-[#1F2028] overflow-hidden">
                    <img
                        src={loginVisual}
                        alt="3D Abstract Visual"
                        className="w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181920] via-transparent to-transparent opacity-60"></div>
                </div>
            </div>
        </div>
    );
}
