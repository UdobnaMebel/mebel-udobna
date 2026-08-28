// components/Hero.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Ruler, 
  CheckCircle2, 
  Sparkles, 
  Percent, 
  ShieldAlert 
} from "lucide-react";

interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  badge: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: 28,
    y: 42,
    badge: "PUR-кромление 0.1 мм",
    title: "100% влагостойкость и монолитный шов",
    description: "В отличие от гаражного EVA-клея, полиуретановый шов PUR не боится пара от чайника, брызг и не темнеет со временем.",
  },
  {
    id: 2,
    x: 68,
    y: 35,
    badge: "Фурнитура Blum / DTC",
    title: "Ресурс 200 000 циклов открываний",
    description: "Плавные доводчики без стука. Двойная фиксация исключает провисание тяжелых фасадов на 15+ лет.",
  },
  {
    id: 3,
    x: 48,
    y: 75,
    badge: "Австрийские плиты Egger",
    title: "Экологический класс безопасности E0.5",
    description: "Никаких едких запахов и формальдегидов. Материал полностью безопасен для детей и аллергиков.",
  },
];

export const Hero: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(hotspots[0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-24 pb-14 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-grid-pattern">
      
      {/* Аппаратные радиальные пятна света */}
      <div className="absolute top-1/4 left-0 w-96 h-96 glow-accent pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] glow-sky pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Левая колонка */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-white/90 mb-5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-industrial-accent animate-pulse shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-wider font-semibold">
                Фабрика «Удобна» • Цех в Ростове-на-Дону
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.15] mb-5">
              Фабричные кухни и мебель во всю квартиру{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-accent via-orange-400 to-amber-300">
                без наценки 35%
              </span>{" "}
              на аренду салонов в ТЦ
            </h1>

            <p className="text-sm sm:text-lg text-industrial-muted leading-relaxed mb-8 max-w-2xl">
              Фиксируем смету до рубля в договоре. Привезем <strong className="text-white font-semibold">«Мобильный шоурум» из 200+ образцов</strong> к вам на объект и заплатим <span className="text-white border-b-2 border-industrial-accent font-bold">1 000 ₽ за каждый день просрочки</span>, если задержим монтаж.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9">
              <button
                onClick={() => scrollToSection("quiz-section")}
                className="relative group overflow-hidden px-7 py-4 rounded-xl bg-industrial-accent text-white font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-industrial hover:bg-industrial-accentHover transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                <span>Рассчитать смету</span>
              </button>

              <button
                onClick={() => scrollToSection("booking-form")}
                className="px-6 py-4 rounded-xl glass-panel text-white hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:border-white/25 transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Ruler className="w-5 h-5 text-industrial-accent shrink-0" />
                <span>Вызвать мастера с образцами</span>
              </button>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-industrial-border w-full">
              <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3 text-center sm:text-left bg-industrial-surface/40 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-sm">
                  <strong className="text-white block font-bold text-base">840+ кухонь</strong>
                  <span className="text-industrial-muted text-xs sm:text-sm">в Ростове и области</span>
                </div>
              </div>

              <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3 text-center sm:text-left bg-industrial-surface/40 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <Percent className="w-5 h-5 text-industrial-accent shrink-0" />
                <div className="text-sm">
                  <strong className="text-white block font-bold text-base">Рассрочка 0%</strong>
                  <span className="text-industrial-muted text-xs sm:text-sm">до 24 мес. без переплат</span>
                </div>
              </div>

              <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3 text-center sm:text-left bg-industrial-surface/40 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <ShieldAlert className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="text-sm">
                  <strong className="text-white block font-bold text-base">Оплата 10%</strong>
                  <span className="text-industrial-muted text-xs sm:text-sm">строго ПОСЛЕ сборки</span>
                </div>
              </div>
            </div>

          </div>

          {/* Правая колонка: Hotspots */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden glass-panel p-2 sm:p-2.5 shadow-2xl border border-white/10">
              
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-industrial-surface">
                <img
                  src="\images\hero\hero-kitchen.webp"
                  alt="Кухня от фабрики Удобна"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 glass-panel px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-xs sm:text-sm">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> ЖК «Вересаево»
                  </div>
                  <div className="text-white/90 font-mono text-[11px] sm:text-xs mt-0.5 font-medium whitespace-nowrap">
                    Срок: 19 дней • 264 000 ₽ под ключ
                  </div>
                </div>

                {/* Аппаратные точки на GPU */}
                {hotspots.map((spot) => {
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none cursor-pointer p-2 touch-manipulation"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-8 h-8 rounded-full bg-industrial-accent animate-pulse-glow" />
                        <span
                          className={`relative flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-transform duration-200 ${
                            isActive 
                              ? "bg-white text-black ring-4 ring-industrial-accent scale-110" 
                              : "bg-industrial-accent text-white"
                          }`}
                        >
                          +
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Карточка преимущества */}
              <AnimatePresence mode="wait">
                {activeHotspot && (
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 p-3.5 sm:p-4 rounded-xl bg-industrial-surface border border-industrial-border"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-industrial-accent font-bold px-2.5 py-1 rounded bg-industrial-accent/15 border border-industrial-accent/30 whitespace-nowrap shrink-0">
                        {activeHotspot.badge}
                      </span>
                      <span className="text-xs text-industrial-muted font-mono font-medium whitespace-nowrap">
                        Стандарт качества #{activeHotspot.id}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                      {activeHotspot.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-industrial-muted mt-1 leading-relaxed">
                      {activeHotspot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};