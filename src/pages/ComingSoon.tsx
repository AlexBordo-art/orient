import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo('.coming-soon-content',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
    }, []);

    return (
        <div className="flex-grow flex items-center justify-center py-32 px-4 relative z-10 min-h-[70vh]">
            <div className="coming-soon-content text-center max-w-2xl mx-auto glass-dark p-12 lg:p-20">
                <div className="inline-block text-accent mb-6">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <h1 className="font-heading italic text-4xl lg:text-5xl text-white mb-6">
                    Страница в разработке.
                </h1>
                <p className="font-sans text-slate-400 mb-10 leading-relaxed text-lg">
                    Мы готовим для вас новый персонализированный раздел. Скоро здесь появится подробная информация о наших услугах.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="btn-ghost-premium opacity-90 hover:opacity-100"
                >
                    <ArrowLeft size={18} />
                    <span>Вернуться назад</span>
                </button>
            </div>
        </div>
    );
};

export default ComingSoon;
