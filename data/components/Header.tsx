// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, ShieldCheck, MapPin, Calculator } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const phone = process.env.NEXT_PUBLIC_PHONE || "+7 (988) 515-55-15";
  const phoneClean = phone.replace(/[^0-9+]/g, "");
  const tgUrl = process.env.NEXT_PUBLIC_TG_MANAGER || "https://t.me/your_manager_username";
  const waUrl = process.env.NEXT_PUBLIC_WA_MANAGER || "https://wa.me/79885155515";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 glass-panel border-b border-white/10 shadow-2xl"
          : "py-3 sm:py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Логотип */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 min-w-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {!logoError ? (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-md shrink-0">
              <img
                src="/logo.png"
                alt="Удобна"
                className="w-full h-full object-cover scale-110"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-industrial-accent to-orange-600 flex items-center justify-center font-black text-white text-xl shadow-industrial shrink-0">
              У
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-white text-lg sm:text-2xl uppercase leading-none truncate">
                УДОБНА
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 text-xs font-mono tracking-wider bg-industrial-surface border border-industrial-border px-2 py-0.5 rounded text-white/90 whitespace-nowrap">
                <MapPin className="w-3 h-3 text-industrial-accent" /> Ростов-на-Дону
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-industrial-muted hidden sm:block mt-0.5 leading-tight truncate">
              Фабрика корпусной мебели • С 2011 года
            </p>
          </div>
        </div>

        {/* Метрики надежности */}
        <div className="hidden xl:flex items-center gap-6 text-sm text-white/90 border-x border-industrial-border px-6 shrink-0">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-industrial-accent shrink-0" />
            <span className="font-medium">Штраф 1 000 ₽/день за срыв сроков</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-white font-semibold">Цех на связи</span>
          </div>
        </div>

        {/* Контакты и кнопки */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-industrial-surface hover:bg-industrial-border flex items-center justify-center text-sky-400 hover:scale-105 transition-transform duration-200 border border-white/10 shrink-0 gpu-layer"
              title="Написать технологу в Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-industrial-surface hover:bg-industrial-border flex items-center justify-center text-emerald-400 hover:scale-105 transition-transform duration-200 border border-white/10 shrink-0 gpu-layer"
              title="Написать в WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <a
            href={`tel:${phoneClean}`}
            className="hidden md:flex flex-col text-right pl-1 shrink-0"
          >
            <span className="text-[10px] text-industrial-muted font-mono whitespace-nowrap">Технолог цеха:</span>
            <span className="font-mono text-sm sm:text-base font-bold text-white hover:text-industrial-accent transition-colors whitespace-nowrap">
              {phone}
            </span>
          </a>

          <button
            onClick={() => scrollToSection("quiz-section")}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-industrial-accent text-white hover:bg-industrial-accentHover transition-all shadow-industrial active:scale-95 cursor-pointer whitespace-nowrap shrink-0 gpu-layer"
          >
            <Calculator className="w-4 h-4 shrink-0 lg:hidden" />
            <span className="hidden lg:inline">Рассчитать смету</span>
            <span className="hidden sm:inline lg:hidden">Смета</span>
          </button>
        </div>
      </div>
    </header>
  );
};