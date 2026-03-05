import React, { useState } from 'react';
import { ShieldCheck, Plane, HeartPulse, GraduationCap, Check, Plus } from 'lucide-react';

type ModuleType = 'visa' | 'flight' | 'insurance' | 'education';

interface Module {
    id: ModuleType;
    title: string;
    description: string;
    price: string;
    icon: React.ReactNode;
    color: string;
}

const modules: Module[] = [
    {
        id: 'visa',
        title: 'Визовое сопровождение',
        description: 'Полный цикл: от аудита до получения паспорта курьером.',
        price: 'от 5 000 ₽',
        icon: <ShieldCheck className="w-6 h-6" />,
        color: 'text-moss'
    },
    {
        id: 'flight',
        title: 'Авиаперелет',
        description: 'Бронирование билетов, маршрутные листы для консульства.',
        price: 'по тарифу АК',
        icon: <Plane className="w-6 h-6" />,
        color: 'text-clay'
    },
    {
        id: 'insurance',
        title: 'Международная страховка',
        description: 'Покрытие от €30,000, требуемое визовым кодексом.',
        price: 'от 1 €/день',
        icon: <HeartPulse className="w-6 h-6" />,
        color: 'text-moss-light'
    },
    {
        id: 'education',
        title: 'Языковая школа',
        description: 'Подбор учебного заведения и оформление студенческой визы.',
        price: 'Индивидуально',
        icon: <GraduationCap className="w-6 h-6" />,
        color: 'text-clay-light'
    }
];

const EcosystemBuilder: React.FC = () => {
    const [selectedModules, setSelectedModules] = useState<ModuleType[]>(['visa']);

    const toggleModule = (id: ModuleType) => {
        if (id === 'visa') return; // Visa is mandatory in this template
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
            <div className="text-center mb-16">
                <h2 className="text-sm font-mono font-bold text-clay tracking-widest uppercase mb-4">Единое окно</h2>
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal font-bold italic mb-6">Ваш протокол путешествия</h1>
                <p className="text-charcoal/60 font-sans text-lg max-w-2xl mx-auto">
                    Соберите свою поездку из интегрированных модулей Ориент Экспресс. Мы синхронизируем все процессы: от покупки билета до выдачи визы.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {modules.map((mod) => {
                        const isSelected = selectedModules.includes(mod.id);
                        const isMandatory = mod.id === 'visa';

                        return (
                            <div
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={`relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${isSelected
                                        ? 'bg-cream-dark border-moss shadow-sm'
                                        : 'bg-white border-charcoal/10 hover:border-charcoal/30'
                                    }`}
                            >
                                {/* Custom Checkbox */}
                                <div className="absolute top-6 right-6">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-moss border-moss' : 'border-charcoal/20'
                                        }`}>
                                        {isSelected && <Check className="w-4 h-4 text-cream" />}
                                    </div>
                                </div>

                                <div className={`p-3 rounded-xl inline-block mb-4 ${isSelected ? 'bg-white shadow-sm' : 'bg-cream'} ${mod.color}`}>
                                    {mod.icon}
                                </div>

                                <h3 className="text-xl font-sans font-bold text-charcoal mb-2 flex items-center">
                                    {mod.title}
                                    {isMandatory && <span className="ml-2 text-[10px] font-mono uppercase bg-moss/10 text-moss px-2 py-0.5 rounded-full">Основа</span>}
                                </h3>
                                <p className="text-sm text-charcoal/60 font-sans mb-4">
                                    {mod.description}
                                </p>
                                <div className="text-sm font-mono text-charcoal/40 font-bold uppercase tracking-widest">
                                    {mod.price}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action Bar */}
                <div className="bg-charcoal text-cream rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
                    <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-cream/40 mb-1">Итоговая сборка</div>
                        <div className="text-2xl font-sans font-bold flex items-center flex-wrap gap-2">
                            Виза
                            {selectedModules.includes('flight') && <><Plus className="w-4 h-4 text-clay" /> Билеты</>}
                            {selectedModules.includes('insurance') && <><Plus className="w-4 h-4 text-clay" /> Страховка</>}
                            {selectedModules.includes('education') && <><Plus className="w-4 h-4 text-clay" /> Обучение</>}
                        </div>
                    </div>
                    <button className="mt-6 md:mt-0 px-8 py-4 bg-cream text-charcoal rounded-full font-sans font-bold hover:bg-white transition-colors">
                        Активировать протокол
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EcosystemBuilder;
