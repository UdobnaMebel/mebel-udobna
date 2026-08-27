// components/Guarantees.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Coins, 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText, 
  X
} from "lucide-react";

interface GuaranteeItem {
  id: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  desc: string;
  fact: string;
}

// Сжатый, емкий и мощный текст без лишней «воды»
const guaranteesList: GuaranteeItem[] = [
  {
    id: "01",
    icon: Coins,
    badge: "Сроки в договоре",
    title: "Штраф 1 000 ₽/день за просрочку",
    desc: "Опоздаем хотя бы на сутки — выплачиваем неустойку живыми деньгами по договору.",
    fact: "Срок сдачи в календарных днях",
  },
  {
    id: "02",
    icon: FileCheck,
    badge: "Фиксация сметы",
    title: "Смета до копейки без скрытых доплат",
    desc: "Никаких доплат за подрезку планок или подъем. Цена в договоре не вырастет ни на рубль.",
    fact: "Все работы включены в чек",
  },
  {
    id: "03",
    icon: ShieldCheck,
    badge: "Фабричный сервис",
    title: "36 месяцев полной гарантии",
    desc: "Бесплатный выезд сервисного мастера за 48 часов при любых вопросах с фурнитурой.",
    fact: "Гарантийный талон от ИП",
  },
  {
    id: "04",
    icon: Sparkles,
    badge: "Культура цеха",
    title: "Чистый монтаж с пылесосом",
    desc: "Пилим строго с пылеудалением, протираем фасады и выносим весь упаковочный мусор.",
    fact: "Чистая квартира после ухода мастеров",
  },
];

export const Guarantees: React.FC = () => {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  const scrollToQuiz = () => {
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="guarantees-section" className="py-12 sm:py-20 bg-industrial-bg border-t border-industrial-border relative overflow-hidden">
      
      {/* Фоновый свет */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-industrial-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
            <ShieldCheck className="w-4 h-4" /> 100% юридическая защита
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            4 пункта нашего договора, которые защищают ваш бюджет
          </h2>
          <p className="mt-2.5 text-xs sm:text-base text-industrial-muted max-w-xl mx-auto leading-relaxed">
            Все обязательства, сроки сдачи и штрафы прописаны в официальном договоре с синей печатью.
          </p>
        </div>

        {/* Сетка 4 компактных карточек гарантий */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 mb-8 sm:mb-10">
          {guaranteesList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="glass-panel p-4 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-industrial-accent/40 transition-colors shadow-lg relative"
              >
                <div>
                  {/* Верхняя строка */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-industrial-accent/15 border border-industrial-accent/30 flex items-center justify-center text-industrial-accent group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white/25 group-hover:text-industrial-accent/40 transition-colors">
                      {item.id}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-industrial-accent font-bold px-2 py-0.5 rounded bg-industrial-accent/10 border border-industrial-accent/20 mb-2">
                    {item.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-industrial-muted leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Нижняя строчка */}
                <div className="pt-3 border-t border-industrial-border/60 flex items-center gap-2 text-xs text-white/90 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span>{item.fact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ТРАСТОВАЯ ПЛАШКА: ОПЛАТА 10% ПОСЛЕ МОНТАЖА */}
        <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-industrial-surface to-industrial-surface flex flex-col lg:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold uppercase mb-1">
                Безопасная оплата
              </div>
              <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                10% суммы вы платите строго ПОСЛЕ сборки и проверки кухни
              </h4>
              <p className="text-xs sm:text-sm text-industrial-muted mt-0.5 max-w-2xl leading-relaxed">
                Подписываете акт только тогда, когда лично проверили каждый фасад и работу всех механизмов.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsContractModalOpen(true)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-industrial-surface border border-industrial-border hover:border-white/30 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-industrial-accent" />
              <span>Образец договора</span>
            </button>

            <button
              type="button"
              onClick={scrollToQuiz}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-industrial-accent hover:bg-industrial-accentHover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-industrial transition-colors cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Рассчитать смету</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* МОДАЛКА: ОБРАЗЕЦ ДОГОВОРА */}
      <AnimatePresence>
        {isContractModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContractModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-industrial-bg border border-industrial-border rounded-2xl p-5 sm:p-8 shadow-2xl z-10 overflow-y-auto text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-industrial-border mb-4">
                <div className="flex items-center gap-2 text-industrial-accent font-mono text-xs font-bold uppercase">
                  <FileText className="w-4 h-4" /> Выписка из договора
                </div>
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-industrial-surface border border-industrial-border flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white mb-1.5">
                Договор на изготовление мебели
              </h3>
              <p className="text-xs text-industrial-muted mb-5">
                Заключается между ИП и Заказчиком с фиксацией спецификации и сроков.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-white/90">
                <div className="bg-industrial-surface p-3.5 rounded-xl border border-industrial-border">
                  <strong className="text-white block font-bold mb-0.5">
                    Пункт 4.2. Ответственность за нарушение сроков:
                  </strong>
                  <p className="text-industrial-muted leading-relaxed">
                    «В случае нарушения Исполнителем срока поставки, Исполнитель выплачивает Заказчику неустойку в размере 1 000 (одной тысячи) рублей за каждый календарный день просрочки».
                  </p>
                </div>

                <div className="bg-industrial-surface p-3.5 rounded-xl border border-industrial-border">
                  <strong className="text-white block font-bold mb-0.5">
                    Пункт 3.4. Твердая цена изделия:
                  </strong>
                  <p className="text-industrial-muted leading-relaxed">
                    «Цена, указанная в Приложении №1 (Спецификация), является окончательной и изменению в одностороннем порядке не подлежит. Все работы по сборке включены».
                  </p>
                </div>

                <div className="bg-industrial-surface p-3.5 rounded-xl border border-industrial-border">
                  <strong className="text-white block font-bold mb-0.5">
                    Пункт 6.1. Гарантийные обязательства:
                  </strong>
                  <p className="text-industrial-muted leading-relaxed">
                    «Гарантийный срок на Изделие и фурнитуру составляет 36 (тридцать шесть) месяцев со дня подписания двустороннего Акта приема-передачи».
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-industrial-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-industrial-muted font-mono">
                  Официальный договор • Соответствует Закону о защите прав потребителей
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsContractModalOpen(false);
                    scrollToQuiz();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-industrial-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-industrial-accentHover transition-colors cursor-pointer"
                >
                  К расчету сметы
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};