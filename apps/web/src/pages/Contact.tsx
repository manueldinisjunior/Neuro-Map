import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-slate-600">We'd love to hear your thoughts.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                                <p className="text-slate-600">hello@neuronovtes.app</p>
                                <p className="text-slate-600">support@neuronovtes.app</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Office</h3>
                                <p className="text-slate-600">123 Innovation Dr.</p>
                                <p className="text-slate-600">Berlin, Germany</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
                    >
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="How can we help?" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}
