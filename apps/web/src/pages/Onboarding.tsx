import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BrainCircuit, ArrowRight, ArrowLeft,
    Sparkles, Target, GraduationCap,
    Rocket, ChevronRight, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profession: '',
        goal: '',
        interests: [] as string[]
    });

    const totalSteps = 4;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
        else navigate('/dashboard');
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const interests = [
        'Artificial Intelligence', 'Neuroscience', 'Psychology',
        'Data Science', 'History', 'Philosophy',
        'Software Engineering', 'Business Strategy', 'Creative Arts'
    ];

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-4xl bg-slate-900 rounded-[32px] shadow-2xl shadow-blue-500/5 overflow-hidden border border-white/5 flex min-h-[600px]">
                {/* Visual Side */}
                <div className="hidden lg:flex w-1/3 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                            <BrainCircuit className="text-white" size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                            Shape Your <br /> Mind Space
                        </h2>
                        <p className="text-blue-100 leading-relaxed font-medium">
                            Let's customize your experience to help you learn and organize efficiently.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map(s => (
                                <div
                                    key={s}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-white' : 'w-4 bg-white/30'}`}
                                ></div>
                            ))}
                        </div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-4">Step {step} of 4</p>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-12 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1"
                        >
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                        <GraduationCap size={32} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">What is your profession?</h1>
                                        <p className="text-slate-400">We'll use this to recommend relevant topics.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Student', 'Professional', 'Researcher', 'Entrepreneur', 'Other'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setFormData({ ...formData, profession: p })}
                                                className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${formData.profession === p
                                                    ? 'border-blue-600 bg-blue-600/10 text-white shadow-sm'
                                                    : 'border-white/5 bg-white/5 hover:border-blue-500/50 text-slate-300'
                                                    }`}
                                            >
                                                <span className="font-semibold">{p}</span>
                                                {formData.profession === p && <CheckCircle2 size={20} className="text-blue-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="w-16 h-16 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center border border-orange-500/20">
                                        <Target size={32} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">Primary Learning Goal</h1>
                                        <p className="text-slate-400">What do you want to achieve with Neuro Notes?</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { id: 'exam', label: 'Prepare for Exams', icon: Sparkles },
                                            { id: 'work', label: 'Organize Work Projects', icon: Rocket },
                                            { id: 'explore', label: 'Explore New Fields', icon: BrainCircuit }
                                        ].map(g => (
                                            <button
                                                key={g.id}
                                                onClick={() => setFormData({ ...formData, goal: g.label })}
                                                className={`p-6 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${formData.goal === g.label
                                                    ? 'border-blue-600 bg-blue-600/10 text-white'
                                                    : 'border-white/5 bg-white/5 hover:border-blue-500/50 text-slate-300'
                                                    }`}
                                            >
                                                <g.icon size={24} className={formData.goal === g.label ? 'text-blue-500' : 'text-slate-500'} />
                                                <span className="font-semibold">{g.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8">
                                    <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                        <Sparkles size={32} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">Select Interests</h1>
                                        <p className="text-slate-400">Pick at least 3 to build your initial map.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map(i => (
                                            <button
                                                key={i}
                                                onClick={() => toggleInterest(i)}
                                                className={`px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${formData.interests.includes(i)
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                                                    : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
                                                    }`}
                                            >
                                                {i}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-8 flex flex-col items-center justify-center h-full text-center">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center animate-bounce shadow-2xl shadow-blue-500/40">
                                            <BrainCircuit className="text-white" size={48} />
                                        </div>
                                        <div className="absolute -inset-4 border-2 border-blue-100 rounded-[40px] animate-ping opacity-25"></div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">Generating Your Space</h1>
                                        <p className="text-slate-400 max-w-sm mx-auto">
                                            We're creating a custom mind map based on your {formData.interests.length} selected interests.
                                        </p>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full max-w-xs overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 2 }}
                                            onAnimationComplete={nextStep}
                                            className="h-full bg-blue-600"
                                        ></motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {step < 4 && (
                        <div className="flex items-center justify-between pt-8 border-t border-white/5">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`flex items-center gap-2 font-bold transition-colors ${step === 1 ? 'opacity-0' : 'text-slate-500 hover:text-slate-300 cursor-pointer'
                                    }`}
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={
                                    (step === 1 && !formData.profession) ||
                                    (step === 2 && !formData.goal) ||
                                    (step === 3 && formData.interests.length < 3)
                                }
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
                            >
                                Next Step
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
