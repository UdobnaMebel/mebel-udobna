// components/EngineeringTruth.tsx
"use client";

import React, { useState, useRef, useCallback } from "react";
import { Check, X, Cpu } from "lucide-react";

interface ComparisonRow {
  param: string;
  garage: string;
  udobna: string;
}

const comparisonData: ComparisonRow[] = [
  {
    param: "Кромка фасадов",
    garage: "EVA клей (вздуется от пара за 6-12 мес)",
    udobna: "PUR-шов 0.1 мм (100% влагозащита от пара 140°C)",
  },
  {
    param: "Корпус и экология",
    garage: "ЛДСП E2 (с едким запахом формальдегида)",
    udobna: "Egger E0.5 (эко-стандарт, безопасно для детей)",
  },
  {
    param: "Фурнитура и петли",
    garage: "Китайский Noname (провиснет через 4-6 мес)",
    udobna: "Blum / DTC (доводчики с ресурсом 15+ лет)",
  },
];

export const EngineeringTruth: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  const startDrag = (clientX: number) => {
    isDragging.current = true;
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    updatePosition(clientX);
  };

  const stopDrag = () => {
    isDragging.current = false;
    rectRef.current = null;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const updatePosition = useCallback((clientX: number) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = e.touches[0].clientX;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => updatePosition(clientX));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const clientX = e.clientX;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => updatePosition(clientX));
  };

  return (
    <section className="py-14 sm:py-24 bg-industrial-bg border-t border-industrial-border relative overflow-hidden">
      
      {/* Аппаратный свет */}
      <div className="absolute top-0 right-1/4 w-96 h-96 glow-accent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
            <Cpu className="w-4 h-4" /> Честные стандарты производства
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Почему дешевая мебель с Авито через 1,5 года отправляется на свалку
          </h2>
          <p className="mt-3 text-sm sm:text-base text-industrial-muted max-w-2xl mx-auto">
            На чем экономят гаражные мастера и как собираем мебель мы на станках с ЧПУ.
          </p>
        </div>

        {/* Before/After Слайдер с аппаратным clip-path */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider text-industrial-muted font-medium mb-3 text-center">
            <span>👈</span>
            <span className="whitespace-nowrap">Потяните ползунок для сравнения</span>
            <span>👉</span>
          </div>

          <div
            ref={containerRef}
            onMouseDown={(e) => startDrag(e.clientX)}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            onTouchEnd={stopDrag}
            onTouchMove={handleTouchMove}
            className="relative w-full max-w-4xl mx-auto h-64 sm:h-[400px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl glass-panel touch-none"
          >
            {/* Правая сторона: Фабричный PUR */}
            <div className="absolute inset-0 bg-[#161a22]">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop"
                alt="PUR-кромление фабрики Удобна"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 text-right z-10 max-w-[200px] sm:max-w-md pointer-events-none">
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/25 border border-emerald-500/50 text-emerald-400 font-mono text-xs sm:text-sm font-bold mb-1">
                  ✓ «Удобна» (PUR)
                </span>
                <p className="text-white text-xs sm:text-base font-semibold leading-snug">
                  Монолитный шов 0.1 мм. Стойкость к пару 140°C.
                </p>
              </div>
            </div>

            {/* Левая сторона: Гаражники EVA (через clip-path без пересчета DOM) */}
            <div
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              className="absolute inset-0 bg-black/90 z-10 will-change-[clip-path]"
            >
              <img
                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop"
                alt="Гаражное кромление EVA"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter grayscale contrast-75 brightness-75"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 text-left z-10 max-w-[200px] sm:max-w-md pointer-events-none">
                <span className="inline-block px-2.5 py-1 rounded bg-red-500/25 border border-red-500/50 text-red-400 font-mono text-xs sm:text-sm font-bold mb-1">
                  ✕ Гаражники (EVA)
                </span>
                <p className="text-white/90 text-xs sm:text-base font-semibold leading-snug">
                  Отклеивается от пара за 6-12 месяцев.
                </p>
              </div>
            </div>

            {/* Разделительная линия и ручка слайдера */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center will-change-[left]"
            >
              <div className="w-0.5 h-full bg-industrial-accent shadow-industrial" />
              <div className="absolute w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-industrial-accent text-white font-black text-xs sm:text-base flex items-center justify-center shadow-industrial border-2 border-white">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* Сравнение (ТОП-3) */}
        <div className="max-w-4xl mx-auto">
          
          {/* ПК версия */}
          <div className="hidden md:block glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 bg-industrial-surface px-6 py-4 border-b border-industrial-border text-xs sm:text-sm font-mono uppercase tracking-wider font-bold">
              <div className="col-span-4 text-industrial-muted">Параметр</div>
              <div className="col-span-4 text-red-400 pl-2">Гаражники / Авито</div>
              <div className="col-span-4 text-emerald-400 pl-2">Фабрика «Удобна»</div>
            </div>

            <div className="divide-y divide-industrial-border/60">
              {comparisonData.map((row, idx) => (
                <div 
                  key={idx} 
                  className="grid grid-cols-12 px-6 py-4.5 items-center hover:bg-white/[0.02] transition-colors gap-2"
                >
                  <div className="col-span-4 font-bold text-white text-sm sm:text-base leading-snug">
                    {row.param}
                  </div>
                  <div className="col-span-4 text-industrial-muted pl-2 flex items-start gap-2 text-sm leading-snug">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-red-300/90 font-normal">{row.garage}</span>
                  </div>
                  <div className="col-span-4 text-emerald-400 pl-2 flex items-start gap-2 text-sm font-medium leading-snug">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-emerald-300 font-semibold">{row.udobna}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Мобильная версия */}
          <div className="md:hidden space-y-3">
            {comparisonData.map((row, idx) => (
              <div key={idx} className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-white text-sm mb-2 text-left">
                  {row.param}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-red-950/30 border border-red-500/20 p-2.5 rounded-lg flex items-start gap-1.5 text-left">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-red-200/90 leading-tight">{row.garage}</span>
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg flex items-start gap-1.5 text-left">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-emerald-200 font-semibold leading-tight">{row.udobna}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};