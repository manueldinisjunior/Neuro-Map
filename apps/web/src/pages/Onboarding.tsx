import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BrainCircuit, ArrowRight, ArrowLeft,
    Sparkles, Target, GraduationCap,
    Rocket, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TranslationWidget } from '../components/TranslationWidget';
import { updateOnboardingState, completeOnboarding } from '../lib/api';

export default function Onboarding() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profession: '',
        goal: '',
        interests: [] as string[]
    });

    const totalSteps = 4;

    const nextStep = async () => {
        if (step < totalSteps) {
            setLoading(true);
            try {
                await updateOnboardingState({ step: step + 1, ...formData });
                setStep(step + 1);
            } catch (error) {
                console.error('Failed to update onboarding state:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(true);
            try {
                await completeOnboarding();
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to complete onboarding:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const prevStep = async () => {
        if (step > 1) {
            setLoading(true);
            try {
                await updateOnboardingState({ step: step - 1, ...formData });
                setStep(step - 1);
            } catch (error) {
                console.error('Failed to go back:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    const interests = t('onboarding.step3.interests', { returnObjects: true }) as string[];

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const professions = t('onboarding.step1.options', { returnObjects: true }) as string[];
    const goalOptions = [
        { id: 'exam', label: t('onboarding.step2.options.exam'), icon: Sparkles },
        { id: 'work', label: t('onboarding.step2.options.work'), icon: Rocket },
        { id: 'explore', label: t('onboarding.step2.options.explore'), icon: BrainCircuit }
    ];

    return (
        <div className="min-h-screen bg-[#0F1014] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-5xl bg-[#181920] rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex min-h-[700px] relative">
                {/* Language Switcher */}
                <div className="absolute top-8 right-8 z-50">
                    <TranslationWidget />
                </div>

                {/* Visual Side */}
                <div className="hidden lg:flex w-[35%] bg-blue-600 p-16 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/20 rounded-full -ml-40 -mb-40 blur-[100px]"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-xl">
                            <BrainCircuit className="text-white" size={32} />
                        </div>
                        <h2 className="text-4xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
                            {t('onboarding.sideTitle').split(' ').map((word, i) => i === 1 ? <span key={i}><br />{word} </span> : word + ' ')}
                        </h2>
                        <p className="text-blue-100/80 leading-relaxed font-semibold text-lg">
                            {t('onboarding.sideSubtitle')}
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex gap-3 mb-6">
                            {[1, 2, 3, 4].map(s => (
                                <div
                                    key={s}
                                    className={`h-2 rounded-full transition-all duration-500 ease-out ${s <= step ? 'w-12 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'w-4 bg-white/20'}`}
                                ></div>
                            ))}
                        </div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{t('onboarding.step')} {step} {t('onboarding.of')} 4</p>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-16 flex flex-col justify-between bg-zinc-900/10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -30, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex-1"
                        >
                            {step === 1 && (
                                <div className="space-y-10 max-w-md">
                                    <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-[28px] flex items-center justify-center border border-blue-500/10 shadow-inner">
                                        <GraduationCap size={40} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">{t('onboarding.step1.title')}</h1>
                                        <p className="text-zinc-500 text-lg font-medium">{t('onboarding.step1.subtitle')}</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {professions.map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setFormData({ ...formData, profession: p })}
                                                className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group active:scale-[0.98] ${formData.profession === p
                                                    ? 'border-blue-600 bg-blue-600/10 text-white shadow-xl shadow-blue-600/10'
                                                    : 'border-white/5 bg-white/5 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                                                    }`}
                                            >
                                                <span className="font-bold text-lg">{p}</span>
                                                {formData.profession === p ? (
                                                    <CheckCircle2 size={24} className="text-blue-500" />
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-10 max-w-lg">
                                    <div className="w-20 h-20 bg-amber-600/10 text-amber-500 rounded-[28px] flex items-center justify-center border border-amber-500/10 shadow-inner">
                                        <Target size={40} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">{t('onboarding.step2.title')}</h1>
                                        <p className="text-zinc-500 text-lg font-medium">{t('onboarding.step2.subtitle')}</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {goalOptions.map(g => (
                                            <button
                                                key={g.id}
                                                onClick={() => setFormData({ ...formData, goal: g.label })}
                                                className={`p-7 rounded-2xl border-2 text-left transition-all flex items-center gap-5 active:scale-[0.98] ${formData.goal === g.label
                                                    ? 'border-blue-600 bg-blue-600/10 text-white shadow-xl shadow-blue-600/10'
                                                    : 'border-white/5 bg-white/5 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                                                    }`}
                                            >
                                                <div className={`p-4 rounded-xl ${formData.goal === g.label ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                                                    <g.icon size={28} />
                                                </div>
                                                <span className="font-bold text-lg flex-1">{g.label}</span>
                                                {formData.goal === g.label && <CheckCircle2 size={24} className="text-blue-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10">
                                    <div className="w-20 h-20 bg-purple-600/10 text-purple-500 rounded-[28px] flex items-center justify-center border border-purple-500/10 shadow-inner">
                                        <Sparkles size={40} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">{t('onboarding.step3.title')}</h1>
                                        <p className="text-zinc-500 text-lg font-medium">{t('onboarding.step3.subtitle')}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {interests.map(i => (
                                            <button
                                                key={i}
                                                onClick={() => toggleInterest(i)}
                                                className={`px-6 py-4 rounded-2xl border-2 text-sm font-bold transition-all active:scale-95 ${formData.interests.includes(i)
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20'
                                                    : 'bg-zinc-800 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                                                    }`}
                                            >
                                                {i}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-12 flex flex-col items-center justify-center h-full text-center">
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="w-32 h-32 bg-blue-600 rounded-[40px] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)]"
                                        >
                                            <BrainCircuit className="text-white" size={64} />
                                        </motion.div>
                                        <div className="absolute -inset-8 border-4 border-blue-600/20 rounded-[60px] animate-ping"></div>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{t('onboarding.step4.title')}</h1>
                                        <p className="text-zinc-500 max-w-sm mx-auto text-lg font-medium">
                                            {t('onboarding.step4.subtitle')}
                                        </p>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-3 rounded-full max-w-md overflow-hidden relative border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 2.5, ease: "easeInOut" }}
                                            onAnimationComplete={nextStep}
                                            className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)]"
                                        ></motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {step < 4 && (
                        <div className="flex items-center justify-between pt-10 border-t border-white/5">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all ${step === 1 ? 'opacity-0' : 'text-zinc-500 hover:text-white cursor-pointer'
                                    }`}
                            >
                                <ArrowLeft size={20} />
                                {t('onboarding.back')}
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={
                                    (step === 1 && !formData.profession) ||
                                    (step === 2 && !formData.goal) ||
                                    (step === 3 && formData.interests.length < 3)
                                }
                                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed text-white px-10 py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-2xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95 cursor-pointer"
                            >
                                {t('onboarding.next')}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

