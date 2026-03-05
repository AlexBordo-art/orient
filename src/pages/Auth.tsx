import React from 'react';
import { ArrowRight, Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const Auth: React.FC = () => {
    return (
        <div className="flex-grow flex items-center justify-center py-24 relative overflow-hidden">
            {/* Background aesthetics */}
            <div className="absolute inset-0 z-0 bg-charcoal">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-moss/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-clay/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Noise overlay */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

                    <div className="text-center mb-10">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-charcoal/50 border border-white/5 mb-6">
                            <Fingerprint className="w-8 h-8 text-cream" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold italic text-cream mb-2">Идентификация</h1>
                        <p className="text-cream/50 font-sans text-sm">Вход в закрытый контур системы Ориент Экспресс</p>
                    </div>

                    <form className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-cream/40 mb-2">ID протокола (Email)</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full bg-charcoal/30 border border-white/10 rounded-xl px-4 py-3 text-cream font-sans placeholder:text-cream/20 focus:outline-none focus:border-moss/50 transition-colors"
                                        placeholder="architect@nura.health"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-cream/40">Ключ доступа</label>
                                    <a href="#" className="text-xs font-sans text-clay hover:text-clay-light transition-colors">Восстановить</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full bg-charcoal/30 border border-white/10 rounded-xl px-4 py-3 text-cream font-sans placeholder:text-cream/20 focus:outline-none focus:border-moss/50 transition-colors"
                                        placeholder="••••••••••••"
                                    />
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20" />
                                </div>
                            </div>
                        </div>

                        <Magnetic strength={8}>
                            <button
                                type="button"
                                className="w-full py-4 rounded-xl bg-cream text-charcoal font-sans font-bold flex items-center justify-center space-x-2 hover:bg-white transition-colors magnetic-button"
                            >
                                <span>Инициализация</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Magnetic>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center space-x-2 text-cream/30 text-xs font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>AES-256 Encryption Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
