// components/Quiz.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Gift, 
  Layers,
  LayoutGrid,
  CreditCard,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  FileText,
  ChevronRight
} from "lucide-react";

interface QuizState {
  type: string;
  shape: string;
  material: string;
  installment: string;
  phone: string;
}

// ══════════════════════════════════════════════════════════════
// 1. БАЗОВЫЕ ЦЕНЫ И СПИСКИ (СИНХРОНИЗИРОВАНЫ С БОТОМ)
// ══════════════════════════════════════════════════════════════
const typesList = [
  "Кухня",
  "Кухня + Мебель во всю квартиру",
  "Шкаф-купе / Гардеробная",
  "Шкаф-кровать трансформер",
] as const;

const shapeOptionsByType: Record<string, { title: string; desc: string; basePrice: number }[]> = {
  "Кухня": [
    { title: "Прямая (линейная)", desc: "Классическое расположение вдоль одной стены", basePrice: 135000 },
    { title: "Угловая (Г-образная)", desc: "Самый популярный вариант для квартир", basePrice: 175000 },
    { title: "П-образная", desc: "Максимум рабочей зоны и мест хранения", basePrice: 225000 },
    { title: "С островом / барной стойкой", desc: "Для просторных кухонь-гостиных и студий", basePrice: 270000 },
  ],
  "Кухня + Мебель во всю квартиру": [
    { title: "Студия / 1-комнатная", desc: "Кухня + прихожая + встроенный шкаф", basePrice: 340000 },
    { title: "2-комнатная квартира", desc: "Кухня + 2 шкафа + ТВ-зона + прихожая", basePrice: 490000 },
    { title: "3-комнатная квартира", desc: "Кухня + гардеробная + детская + спальня", basePrice: 650000 },
    { title: "Частный дом / Коттедж", desc: "Индивидуальный комплексный проект под ключ", basePrice: 850000 },
  ],
  "Шкаф-купе / Гардеробная": [
    { title: "Корпусный (2–4 створки)", desc: "Отдельно стоящий шкаф с PUR-кромкой", basePrice: 75000 },
    { title: "Встроенный от пола до потолка", desc: "Идеальная подгонка под нишу без щелей", basePrice: 105000 },
    { title: "Угловой вместительный шкаф", desc: "Эффективное использование угла комнаты", basePrice: 125000 },
    { title: "Отдельная гардеробная комната", desc: "П-образная система хранения с LED-подсветкой", basePrice: 175000 },
  ],
  "Шкаф-кровать трансформер": [
    { title: "Откидная кровать в шкафу", desc: "Скрытый механизм без дивана (компакт)", basePrice: 145000 },
    { title: "Трансформер с рабочим столом", desc: "Идеально для детской или домашнего кабинета", basePrice: 170000 },
    { title: "Вертикальная с диваном", desc: "Днем — диван для гостей, ночью — полноценная кровать", basePrice: 205000 },
    { title: "Двухъярусная трансформер", desc: "Для двух детей с экономией площади", basePrice: 235000 },
  ],
};

const materialsList = [
  "Практичный стандарт",
  "Комфорт (МДФ / AGT Supramat)",
  "Премиум (Шпон / Blum)",
  "Пока не знаю — хочу сравнить образцы на замере",
] as const;

const materialMultipliers: Record<string, number> = {
  "Практичный стандарт": 1.0,
  "Комфорт (МДФ / AGT Supramat)": 1.25,
  "Премиум (Шпон / Blum)": 1.55,
  "Пока не знаю — хочу сравнить образцы на замере": 1.15,
};

const installmentsList = [
  "Да, интересен платеж от 7 500 ₽/мес",
  "Нет, оплата наличными / картой",
] as const;

export const Quiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizState>({
    type: "Кухня",
    shape: "Угловая (Г-образная)",
    material: "Комфорт (МДФ / AGT Supramat)",
    installment: "Оплата наличными / картой",
    phone: "",
  });

  const [agreement, setAgreement] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rawBotName = process.env.NEXT_PUBLIC_TG_BOT_NAME || "mebel_custom_bot";
  const cleanBotName = rawBotName.replace(/^@+/, "").trim();

  // Расчет вилки цен
  const calculatePriceRange = () => {
    const currentShapes = shapeOptionsByType[quizData.type] || shapeOptionsByType["Кухня"];
    const activeShapeObj = currentShapes.find((s) => s.title === quizData.shape) || currentShapes[0];

    const baseShapePrice = activeShapeObj?.basePrice || 160000;
    const matMultiplier = materialMultipliers[quizData.material] || 1.25;

    const calculatedBase = baseShapePrice * matMultiplier;
    const halfSpread = calculatedBase > 450000 ? 30000 : 20000;

    const minPrice = Math.round((calculatedBase - halfSpread) / 5000) * 5000;
    const maxPrice = Math.round((calculatedBase + halfSpread) / 5000) * 5000;
    const avgPrice = Math.round(calculatedBase / 1000) * 1000;

    return { minPrice, maxPrice, avgPrice };
  };

  const { minPrice, maxPrice } = calculatePriceRange();

  // 🎯 Генерация ссылки со всеми выборами пользователя
  const getBotStartUrl = () => {
    const typeIdx = Math.max(0, typesList.indexOf(quizData.type as (typeof typesList)[number]));
    const currentShapes = shapeOptionsByType[quizData.type] || shapeOptionsByType["Кухня"];
    const shapeIdx = Math.max(0, currentShapes.findIndex((s) => s.title === quizData.shape));
    const matIdx = Math.max(0, materialsList.indexOf(quizData.material as (typeof materialsList)[number]));
    const instIdx = Math.max(0, installmentsList.indexOf(quizData.installment as (typeof installmentsList)[number]));

    // Компактный payload: qz_0_1_1_0_175000_215000
    const payload = `qz_${typeIdx}_${shapeIdx}_${matIdx}_${instIdx}_${minPrice}_${maxPrice}`;
    return `https://t.me/${cleanBotName}?start=${payload}`;
  };

  const handlePhoneSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quizData.phone || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Квиз-конфигуратор (Вилка цен)",
          phone: quizData.phone,
          details: `• Изделие: ${quizData.type}\n• Конфигурация: ${quizData.shape}\n• Класс материалов: ${quizData.material}\n• Оплата: ${quizData.installment}\n• Оценка сметы (вилка): ${minPrice.toLocaleString("ru-RU")} — ${maxPrice.toLocaleString("ru-RU")} ₽`,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Ошибка отправки. Пожалуйста, запустите расчет в Telegram!");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentShapes = shapeOptionsByType[quizData.type] || shapeOptionsByType["Кухня"];

  return (
    <section id="quiz-section" className="py-16 sm:py-24 bg-industrial-surface/60 border-t border-b border-industrial-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-industrial-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
            <Sparkles className="w-4 h-4" /> Конфигуратор фабричной стоимости
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Узнайте честную цену вашей мебели за 2 минуты
          </h2>
          <p className="mt-3 text-sm sm:text-base text-industrial-muted max-w-2xl mx-auto">
            Ответьте на 4 вопроса. Мы рассчитаем реалистичную вилку стоимости без наценок салонов и зафиксируем за вами подарок.
          </p>
        </div>

        {/* Карточка квиза */}
        <div className="glass-panel rounded-2xl p-5 sm:p-10 border border-white/10 shadow-2xl relative text-left">
          
          {/* Прогресс-бар */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-industrial-muted mb-2">
              <span>Шаг {step} из 5</span>
              <span className="text-industrial-accent font-semibold">
                {step === 1 && "Тип мебели"}
                {step === 2 && "Конфигурация и размер"}
                {step === 3 && "Класс материалов"}
                {step === 4 && "Вариант оплаты"}
                {step === 5 && "Итоговый расчет сметы"}
              </span>
            </div>
            <div className="w-full h-2 bg-industrial-border rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-industrial-accent to-orange-400"
                initial={{ width: "20%" }}
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Содержимое шагов */}
          <AnimatePresence mode="wait">
            
            {/* ШАГ 1: ТИП МЕБЕЛИ */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-industrial-accent" />
                  Что планируете заказывать?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {typesList.map((typeTitle) => {
                    const tag = typeTitle === "Кухня" ? "Хит" : typeTitle === "Кухня + Мебель во всю квартиру" ? "Выгода 15%" : typeTitle === "Шкаф-купе / Гардеробная" ? "От 14 дней" : "Новинка";
                    const desc = typeTitle === "Кухня" ? "Прямая, угловая или с островом" : typeTitle === "Кухня + Мебель во всю квартиру" ? "Шкафы, ТВ-зона, прихожая под ключ" : typeTitle === "Шкаф-купе / Гардеробная" ? "Встроенные системы с PUR-кромлением" : "Усиленный газлифт, ресурс 15 лет";

                    return (
                      <button
                        key={typeTitle}
                        type="button"
                        onClick={() => {
                          const nextShapes = shapeOptionsByType[typeTitle] || [];
                          setQuizData({ 
                            ...quizData, 
                            type: typeTitle,
                            shape: nextShapes[0]?.title || "Стандартная"
                          });
                          setStep(2);
                        }}
                        className={`p-4 sm:p-5 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                          quizData.type === typeTitle
                            ? "bg-industrial-accent/15 border-industrial-accent ring-2 ring-industrial-accent/30"
                            : "bg-industrial-surface/80 border-industrial-border hover:border-white/20 hover:bg-industrial-surface"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-base sm:text-lg text-white">{typeTitle}</span>
                          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white/90">
                            {tag}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-industrial-muted">{desc}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ШАГ 2: КОНФИГУРАЦИЯ */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-industrial-accent" />
                  {quizData.type === "Кухня + Мебель во всю квартиру" ? "Какой тип жилья?" : "Какая планировка и конфигурация?"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {currentShapes.map((shape) => (
                    <button
                      key={shape.title}
                      type="button"
                      onClick={() => {
                        setQuizData({ ...quizData, shape: shape.title });
                        setStep(3);
                      }}
                      className={`p-4 sm:p-5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        quizData.shape === shape.title
                          ? "bg-industrial-accent/15 border-industrial-accent text-white"
                          : "bg-industrial-surface/80 border-industrial-border text-white/90 hover:border-white/20 hover:bg-industrial-surface"
                      }`}
                    >
                      <div className="font-bold text-base sm:text-lg mb-1">{shape.title}</div>
                      <div className="text-xs sm:text-sm text-industrial-muted">{shape.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ШАГ 3: МАТЕРИАЛЫ */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-industrial-accent" />
                  Какой класс материалов рассматриваете?
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {materialsList.map((matName) => {
                    const details = matName === "Практичный стандарт" ? "ЛДСП Egger (Австрия) + влагостойкая PUR-кромка + фурнитура DTC с доводчиками" : matName === "Комфорт (МДФ / AGT Supramat)" ? "МДФ Soft-touch AGT / эмаль матовая + фурнитура Boyard/Hettich с плавным ходом" : matName === "Премиум (Шпон / Blum)" ? "Фасады натуральный шпон / Fenix NTM + оригинальные австрийские петли Blum" : "Технолог привезет все 200+ образцов на замер бесплатно";

                    return (
                      <button
                        key={matName}
                        type="button"
                        onClick={() => {
                          setQuizData({ ...quizData, material: matName });
                          setStep(4);
                        }}
                        className={`p-4 sm:p-5 rounded-xl text-left border transition-all cursor-pointer ${
                          quizData.material === matName
                            ? "bg-industrial-accent/15 border-industrial-accent"
                            : "bg-industrial-surface/80 border-industrial-border hover:border-white/20 hover:bg-industrial-surface"
                        }`}
                      >
                        <div className="font-bold text-white text-base sm:text-lg mb-1">{matName}</div>
                        <div className="text-xs sm:text-sm text-industrial-muted">{details}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ШАГ 4: ОПЛАТА */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-industrial-accent" />
                  Интересна ли рассрочка 0% без переплат?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {installmentsList.map((instTitle) => {
                    const desc = instTitle.startsWith("Да") ? "0% первый взнос, одобрение онлайн за 5 мин на замере" : "Поэтапная оплата: 10% только ПОСЛЕ монтажа";

                    return (
                      <button
                        key={instTitle}
                        type="button"
                        onClick={() => {
                          setQuizData({ ...quizData, installment: instTitle });
                          setStep(5);
                        }}
                        className={`p-5 rounded-xl text-left border transition-all cursor-pointer ${
                          quizData.installment === instTitle
                            ? "bg-industrial-accent/15 border-industrial-accent"
                            : "bg-industrial-surface/80 border-industrial-border hover:border-white/20 hover:bg-industrial-surface"
                        }`}
                      >
                        <div className="font-bold text-white text-base sm:text-lg mb-1">{instTitle}</div>
                        <div className="text-xs sm:text-sm text-industrial-muted">{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ШАГ 5: ИТОГОВАЯ ВИЛКА ЦЕН */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-7"
              >
                <div className="rounded-2xl border-2 border-industrial-accent/40 bg-gradient-to-b from-industrial-accent/15 via-industrial-surface to-industrial-surface p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-industrial-accent font-bold px-3 py-1.5 rounded-lg bg-industrial-accent/15 border border-industrial-accent/30">
                      ● Индивидуальный расчет
                    </span>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs sm:text-sm font-mono text-emerald-400 font-bold">
                      <Gift className="w-4 h-4" /> + Подарок зафиксирован
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base text-slate-300 font-medium">
                    Ориентировочная стоимость по вашим параметрам:
                  </h4>

                  <div className="my-3 sm:my-4">
                    <span className="font-mono text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                      {minPrice.toLocaleString("ru-RU")} — {maxPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-industrial-bg/70 border border-white/10 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-industrial-muted">Конфигурация:</span>
                      <strong className="text-white font-semibold">{quizData.type} • {quizData.shape}</strong>
                    </div>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-industrial-muted">Материал:</span>
                      <strong className="text-industrial-accent font-semibold">{quizData.material}</strong>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    * Фиксируем твердую смету в договоре после бесплатного 3D-проекта и лазерного замера.
                  </p>

                </div>

                {!isSubmitted ? (
                  <div className="space-y-4 pt-1">
                    <p className="text-sm sm:text-base font-bold text-white">
                      Куда отправить подробную PDF-спецификацию и зафиксировать подарок?
                    </p>

                    <a
                      href={getBotStartUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-xl bg-[#229ED9] hover:bg-[#1e8cc0] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98"
                    >
                      <Send className="w-5 h-5 shrink-0" />
                      <span>Получить точную смету и PDF в Telegram-боте</span>
                    </a>

                    <div className="flex items-center gap-4 my-2">
                      <div className="flex-1 h-px bg-industrial-border" />
                      <span className="text-xs font-mono text-industrial-muted uppercase">Или отправьте номер</span>
                      <div className="flex-1 h-px bg-industrial-border" />
                    </div>

                    <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="tel"
                        required
                        placeholder="+7 (9XX) XXX-XX-XX"
                        value={quizData.phone}
                        onChange={(e) => setQuizData({ ...quizData, phone: e.target.value })}
                        className="flex-1 px-4 py-3.5 rounded-xl bg-industrial-bg border border-industrial-border text-white text-sm sm:text-base focus:outline-none focus:border-industrial-accent"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3.5 rounded-xl bg-industrial-accent hover:bg-industrial-accentHover text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 shadow-industrial active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Отправить смету</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer text-left">
                      <input
                        type="checkbox"
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        required
                        className="mt-0.5 w-4 h-4 rounded border-industrial-border bg-industrial-bg text-industrial-accent focus:ring-0 shrink-0"
                      />
                      <span className="text-xs text-industrial-muted leading-relaxed">
                        Даю согласие на обработку персональных данных по 152-ФЗ. Номер используется только для отправки расчета и брони подарка.
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">
                      Расчет и подарок зафиксированы!
                    </h4>
                    <p className="text-sm text-industrial-muted max-w-md mx-auto">
                      Технолог цеха свяжется с вами в течение 10 минут, уточнит детали и пришлет спецификацию.
                    </p>

                    <div className="pt-3">
                      <a
                        href={getBotStartUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-industrial-surface border border-industrial-border hover:border-industrial-accent text-white font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        <FileText className="w-4 h-4 text-industrial-accent" />
                        <span>Открыть расчет в боте Telegram</span>
                      </a>
                    </div>
                  </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>

          {/* Нижняя плашка навигации */}
          {step > 1 && step < 5 && (
            <div className="mt-8 pt-5 border-t border-industrial-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-industrial-muted hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Назад
              </button>

              <div className="text-right">
                <span className="text-[11px] font-mono text-industrial-muted block">
                  Предварительный ориентир:
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-industrial-accent">
                  ~{minPrice.toLocaleString("ru-RU")} – {maxPrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};