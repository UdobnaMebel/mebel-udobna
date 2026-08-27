// components/WorkshopAndShowroom.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Cpu, 
  ChevronRight, 
  Ticket, 
  X,
  Building2,
  Loader2
} from "lucide-react";

interface WorkshopPhoto {
  title: string;
  desc: string;
  img: string;
  badge: string;
}

const workshopPhotos: WorkshopPhoto[] = [
  {
    title: "ЧПУ-раскроечный центр",
    desc: "Идеальный рез без сколов и трещин с точностью до 0.1 мм",
    img: "/images/workshop/shop-1.webp",
    badge: "ЧПУ лазер",
  },
  {
    title: "Линия PUR-кромления",
    desc: "Полиуретановый влагостойкий шов, стойкий к пару от чайника 140°C",
    img: "/images/workshop/shop-2.webp",
    badge: "100% влагозащита",
  },
  {
    title: "Склад сертифицированных плит",
    desc: "Оригинальные плиты Egger (Австрия) и Lamarty класса безопасности E0.5",
    img: "/images/workshop/shop-3.webp",
    badge: "Эко-класс E0.5",
  },
];

export const WorkshopAndShowroom: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Состояние формы замера
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [agreement, setAgreement] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tgManagerUrl = process.env.NEXT_PUBLIC_TG_MANAGER || "https://t.me/your_manager_username";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Мобильный шоурум (Вызов мастера)",
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDirectTelegramBooking = () => {
    const text = `Здравствуйте! Хочу забронировать выезд мастера с чемоданом образцов:\nИмя: ${formData.name || "Не указано"}\nТелефон: ${formData.phone || "Не указан"}\nРайон/ЖК: ${formData.address || "Ростов-на-Дону"}`;
    return `${tgManagerUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative bg-industrial-bg overflow-hidden">
      
      {/* ══════════════════════════════════════════════════════════════
          СЕКЦИЯ 1: ЧЕСТНОЕ ПРОИЗВОДСТВО БЕЗ НАЦЕНКИ НА САЛОН
          ══════════════════════════════════════════════════════════════ */}
      <section id="workshop-section" className="py-14 sm:py-24 border-t border-b border-industrial-border relative">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-industrial-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Левая колонка */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-4 font-semibold">
                <Factory className="w-4 h-4" /> Честное производство в Ростове
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                Без мраморных полов и наценки на пафос салонов в ТЦ
              </h2>

              <p className="text-sm sm:text-base text-industrial-muted leading-relaxed mb-6">
                Аренда мебельного салона в ТЦ Ростова-на-Дону обходится в <strong className="text-white">от 350 000 до 600 000 ₽ каждый месяц</strong>. Плюс зарплаты администраторов, коммуналка и охрана.
              </p>

              <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 mb-6 w-full">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-industrial-accent animate-pulse" />
                  Кто за это платит?
                </h4>
                <p className="text-xs sm:text-sm text-industrial-muted leading-relaxed">
                  Покупатель — переплачивая от <strong className="text-white font-semibold">30% до 40%</strong> за каждый погонный метр. Мы инвестировали эти средства в <strong className="text-emerald-400">немецкие станки с ЧПУ</strong> и технологию PUR-кромления, а образцы привозим прямо к вам на объект.
                </p>
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-3 gap-3 w-full mb-8">
                <div className="bg-industrial-surface/80 p-3 sm:p-4 rounded-xl border border-industrial-border">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white block">0 ₽</span>
                  <span className="text-[11px] sm:text-xs text-industrial-muted">Наценка за аренду</span>
                </div>
                <div className="bg-industrial-surface/80 p-3 sm:p-4 rounded-xl border border-industrial-border">
                  <span className="font-mono text-xl sm:text-2xl font-black text-industrial-accent block">0.1 мм</span>
                  <span className="text-[11px] sm:text-xs text-industrial-muted">Точность лазера</span>
                </div>
                <div className="bg-industrial-surface/80 p-3 sm:p-4 rounded-xl border border-industrial-border">
                  <span className="font-mono text-xl sm:text-2xl font-black text-emerald-400 block">15 лет</span>
                  <span className="text-[11px] sm:text-xs text-industrial-muted">Опыт цеха</span>
                </div>
              </div>

              {/* Кнопка записи на экскурсию */}
              <button
                type="button"
                onClick={() => setIsPassModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-xl bg-industrial-surface border-2 border-industrial-accent/40 hover:border-industrial-accent text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-industrial-accent/10 transition-all shadow-xl active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Ticket className="w-4 h-4 text-industrial-accent" />
                <span>Запросить гостевой пропуск в цех</span>
              </button>
            </div>

            {/* Правая колонка: Фото цеха */}
            <div className="lg:col-span-6">
              <div className="glass-panel p-2 sm:p-3 rounded-2xl border border-white/10 shadow-2xl">
                
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-industrial-surface mb-3">
                  <img
                    src={workshopPhotos[activePhoto].img}
                    alt={workshopPhotos[activePhoto].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-white font-mono font-bold shadow-md">
                    <Cpu className="w-3.5 h-3.5 text-industrial-accent" />
                    <span>{workshopPhotos[activePhoto].badge}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {workshopPhotos[activePhoto].title}
                    </h4>
                    <p className="text-xs text-white/80 mt-0.5 leading-snug">
                      {workshopPhotos[activePhoto].desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {workshopPhotos.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhoto(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activePhoto === idx
                          ? "border-industrial-accent ring-2 ring-industrial-accent/40 scale-[1.02]"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white text-center px-1 leading-tight">
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          СЕКЦИЯ 2: «МОБИЛЬНЫЙ ШОУРУМ» (ПРОЦЕСС ЗАМЕРА + ФОРМА)
          ══════════════════════════════════════════════════════════════ */}
      <section id="booking-section" className="py-14 sm:py-24 relative overflow-hidden bg-industrial-surface/30">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Заголовок */}
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
              <Ruler className="w-4 h-4" /> Чемодан из 200+ образцов материалов
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Как работает выезд технолога (Бесплатно и ни к чему не обязывает)
            </h2>
            <p className="mt-3 text-sm sm:text-base text-industrial-muted max-w-2xl mx-auto">
              Мы привозим весь шоурум к вам на объект. Вы смотрите материалы при реальном свете вашей квартиры, а не под яркими лампами ТЦ.
            </p>
          </div>

          {/* 4 шага замера */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
            {[
              {
                step: "01",
                title: "3D-сканирование помещения",
                desc: "Лазерный замер углов разворота стен, перепадов пола, выводов сантехники и вентиляции.",
                icon: Ruler,
              },
              {
                step: "02",
                title: "Примерка 200+ образцов",
                desc: "Прикладываем пластик, эмаль AGT, образцы камня и ручек к вашим реальным обоям и плитке.",
                icon: Layers,
              },
              {
                step: "03",
                title: "3D-проект и смета за 40 мин",
                desc: "Инженер составляет точную планировку на ноутбуке и рассчитывает смету в 3 комплектациях.",
                icon: Sparkles,
              },
              {
                step: "04",
                title: "Фиксация цены на 30 дней",
                desc: "Смета фиксируется в рублях. Даже при подорожании материалов на рынке цена не изменится.",
                icon: ShieldCheck,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors shadow-lg relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-industrial-accent/15 border border-industrial-accent/30 flex items-center justify-center text-industrial-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-2xl font-black text-white/30 group-hover:text-industrial-accent/50 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-industrial-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🎯 КОНВЕРСИОННАЯ ФОРМА С ПЕРСОНАЛЬНЫМ ЯКОРЕМ */}
          <div 
            id="booking-form"
            className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden scroll-mt-24 sm:scroll-mt-28"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-industrial-accent/15 rounded-full blur-2xl pointer-events-none" />

            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-industrial-border pb-4">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-white">
                      Забронировать выезд технолога с образцами
                    </h3>
                    <p className="text-xs sm:text-sm text-industrial-muted mt-1">
                      Выезд по Ростову, Батайску и Аксаю — 0 ₽ (бесплатно)
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold whitespace-nowrap self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Свободно 3 слота на этой неделе
                  </div>
                </div>

                {/* Поля ввода */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs text-white/80 mb-1.5 font-medium">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Например, Алексей"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-industrial-bg border border-industrial-border text-white text-sm focus:outline-none focus:border-industrial-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/80 mb-1.5 font-medium">
                      Телефон для связи <span className="text-industrial-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (9XX) XXX-XX-XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-industrial-bg border border-industrial-border text-white text-sm focus:outline-none focus:border-industrial-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/80 mb-1.5 font-medium">Район / ЖК в Ростове</label>
                    <input
                      type="text"
                      placeholder="Например, ЖК Вересаево"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-industrial-bg border border-industrial-border text-white text-sm focus:outline-none focus:border-industrial-accent"
                    />
                  </div>
                </div>

                {/* Кнопка отправки */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex-1 py-4 px-8 rounded-xl bg-industrial-accent text-white font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-industrial hover:bg-industrial-accentHover transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Забронировать бесплатный выезд</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <a
                    href={getDirectTelegramBooking()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/40 hover:bg-[#229ED9]/25 text-[#229ED9] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Быстрая запись в Telegram</span>
                  </a>
                </div>

                {/* Чекбокс согласия 152-ФЗ */}
                <label className="flex items-start gap-2.5 cursor-pointer text-left pt-2">
                  <input
                    type="checkbox"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 rounded border-industrial-border bg-industrial-bg text-industrial-accent focus:ring-0"
                  />
                  <span className="text-xs text-industrial-muted leading-relaxed">
                    Согласен на обработку персональных данных в соответствии с 152-ФЗ. Номер используется только для согласования времени выезда мастера.
                  </span>
                </label>
              </form>
            ) : (
              /* Экран успешной заявки */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Заявка успешно принята!</h3>
                <p className="text-sm text-industrial-muted max-w-md mx-auto">
                  Технолог цеха свяжется с вами в течение 10–15 минут для подтверждения адреса и точного времени приезда с чемоданом образцов.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-industrial-surface border border-industrial-border text-xs text-white/80 hover:text-white cursor-pointer"
                >
                  Отправить еще одну заявку
                </button>
              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* МОДАЛКА «ГОСТЕВОЙ ПРОПУСК В ЦЕХ» */}
      <AnimatePresence>
        {isPassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPassModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-industrial-bg border border-industrial-border rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-industrial-accent font-mono text-xs font-bold uppercase">
                  <Ticket className="w-4 h-4" /> Гостевой пропуск
                </div>
                <button
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-industrial-surface border border-industrial-border flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Экскурсия на мебельную фабрику «Удобна»
              </h3>
              <p className="text-xs sm:text-sm text-industrial-muted mb-5 leading-relaxed">
                Покажем работу ЧПУ-станков, образцы австрийского ЛДСП Egger и полиуретановый шов PUR под микроскопом.
              </p>

              <div className="bg-industrial-surface p-4 rounded-xl border border-industrial-border text-xs text-white/90 space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-industrial-accent shrink-0" />
                  <span>Адрес: г. Ростов-на-Дону (визиты по записи)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Время визита: Пн–Сб с 10:00 до 18:00</span>
                </div>
              </div>

              <a
                href={`${tgManagerUrl}?text=${encodeURIComponent("Здравствуйте! Хочу запросить гостевой пропуск на экскурсию в цех")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-industrial-accent hover:bg-industrial-accentHover text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-industrial transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Получить пропуск в Telegram</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};