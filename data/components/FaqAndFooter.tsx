// components/FaqAndFooter.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  Gift, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Loader2, 
  ChevronRight 
} from "lucide-react";
import { companyConfig } from "../data/company";

interface FaqItem {
  q: string;
  a: string;
}

const faqData: FaqItem[] = [
  {
    q: "Сколько по времени изготавливается мебель?",
    a: "В среднем от 14 до 28 рабочих дней. Прямые фасады в пленке и AGT Supramat делаем быстрее (от 14 дней). Матовая эмаль и сложная фрезеровка требуют технологической сушки 21 день для идеальной прочности.",
  },
  {
    q: "А что, если замерщик ошибется или модуль не влезет в стену?",
    a: "Ответственность за замер на 100% лежит на нашей фабрике по договору. Если мебель не встанет хотя бы на 2 миллиметра — мы переделываем модуль в нашем цеху за свой счет в течение 24–48 часов.",
  },
  {
    q: "Вы делаете шкафы-кровати и мебель-трансформер?",
    a: "Да, мы производим надежные шкафы-кровати с усиленными итальянскими газлифтами и цельносварными рамами. Механизм рассчитан на 10 000+ циклов открывания (около 15 лет ежедневного сна) и нагрузку до 350 кг.",
  },
  {
    q: "Выезд замерщика с чемоданом образцов действительно бесплатный?",
    a: "Да, выезд технолога по Ростову-на-Дону, Батайску и Аксаю бесплатный и ни к чему вас не обязывает. Мастер привозит 200+ образцов, делает лазерный 3D-замер и на месте составляет смету в 3 комплектациях за 40 минут.",
  },
];

export const FaqAndFooter: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [logoError, setLogoError] = useState(false);
  
  // Состояние финальной формы
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [agreement, setAgreement] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBottomFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Финальный экран (Заявка на подарок + проект)",
          name: name || "Не указано",
          phone,
          details: "• Зафиксирован подарок: Каменная мойка GranFest / LED-подсветка",
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

  return (
    <div className="relative bg-industrial-bg overflow-hidden text-left">
      
      {/* ══════════════════════════════════════════════════════════════
          БЛОК 9: FAQ (ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ)
          ══════════════════════════════════════════════════════════════ */}
      <section id="faq-section" className="py-14 sm:py-24 border-t border-industrial-border relative">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-industrial-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
              <HelpCircle className="w-4 h-4" /> Честные ответы
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Часто задаваемые вопросы перед заказом мебели
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-industrial-muted max-w-xl mx-auto">
              Разбираем нюансы производства, замеров и гарантии без увиливаний.
            </p>
          </div>

          {/* Аккордеон */}
          <div className="space-y-3 sm:space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`glass-panel rounded-2xl border transition-colors overflow-hidden ${
                    isOpen ? "border-industrial-accent/40 bg-industrial-surface/90" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-white leading-snug">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-xl bg-industrial-surface border border-industrial-border flex items-center justify-center text-white/80 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-industrial-accent border-industrial-accent/40" : ""
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-industrial-muted leading-relaxed border-t border-industrial-border/40 mt-1">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          БЛОК 10: ФИНАЛЬНЫЙ ЭКРАН ЗАХВАТА С ПОДАРКОМ (BOTTOM CTA)
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="rounded-3xl border-2 border-industrial-accent/40 bg-gradient-to-b from-industrial-accent/15 via-industrial-surface to-industrial-bg p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Фоновое свечение */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-industrial-accent/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-accent/20 border border-industrial-accent/40 text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-4 font-bold">
                <Gift className="w-4 h-4" /> Спецпредложение недели
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                Готовы узнать честную цену вашей мебели без наценок ТЦ?
              </h2>

              <p className="text-xs sm:text-base text-industrial-muted max-w-xl mx-auto mb-8 leading-relaxed">
                Оставьте номер сегодня — зафиксируйте за собой <strong className="text-white">комплект скрытой LED-подсветки</strong> в подарок при заказе.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleBottomFormSubmit} className="space-y-4 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-industrial-bg/90 border border-industrial-border text-white text-sm focus:outline-none focus:border-industrial-accent"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <input
                        type="tel"
                        required
                        placeholder="+7 (9XX) XXX-XX-XX *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-industrial-bg/90 border border-industrial-border text-white text-sm focus:outline-none focus:border-industrial-accent"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-xl bg-industrial-accent hover:bg-industrial-accentHover text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-industrial transition-all active:scale-95 disabled:opacity-50 cursor-pointer h-full"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Получить смету</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  <label className="flex items-start justify-center gap-2.5 cursor-pointer text-left pt-2 max-w-xl mx-auto">
                    <input
                      type="checkbox"
                      checked={agreement}
                      onChange={(e) => setAgreement(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 rounded border-industrial-border bg-industrial-bg text-industrial-accent focus:ring-0"
                    />
                    <span className="text-[11px] sm:text-xs text-industrial-muted leading-tight">
                      Согласен на обработку данных по 152-ФЗ. Номер используется исключительно для отправки расчета и брони подарка.
                    </span>
                  </label>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 max-w-md mx-auto"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Заявка и подарок зафиксированы!</h4>
                  <p className="text-xs text-industrial-muted">
                    Дежурный инженер свяжется с вами в течение 10 минут и пришлет варианты сметы.
                  </p>
                </motion.div>
              )}

              {/* Прямые ссылки на связь с технологом */}
              <div className="mt-8 pt-6 border-t border-industrial-border/60 flex flex-wrap items-center justify-center gap-4 text-xs text-industrial-muted">
                <span>Или напишите нам напрямую:</span>
                <a
                  href={companyConfig.tgManagerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-bold font-mono"
                >
                  <Send className="w-3.5 h-3.5" /> Telegram
                </a>
                <span>•</span>
                <a
                  href={companyConfig.waManagerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold font-mono"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          БЛОК 11: FOOTER (ПОДВАЛ САЙТА)
          ══════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-industrial-border bg-[#07090C] py-12 text-xs text-industrial-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            
            {/* Колонка 1 */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                {!logoError ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-md shrink-0">
                    <img
                      src="/logo.png"
                      alt="Удобна"
                      className="w-full h-full object-cover scale-110"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-industrial-accent to-orange-600 flex items-center justify-center font-black text-white text-base shadow-industrial shrink-0">
                    У
                  </div>
                )}
                <span className="font-black tracking-wider text-white text-lg uppercase leading-none">
                  УДОБНА
                </span>
              </div>
              <p className="text-industrial-muted leading-relaxed mb-3">
                Фабрика корпусной мебели прямого цикла. Производство кухонь, шкафов и мебели под ключ в Ростове-на-Дону с 2011 года.
              </p>
              <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                ● Собственный цех • Прямые поставки фурнитуры
              </span>
            </div>

            {/* Колонка 2 */}
            <div>
              <h5 className="font-bold text-white uppercase font-mono tracking-wider mb-3">
                Юридические данные
              </h5>
              <div className="space-y-1.5 font-mono text-[11px] text-white/80">
                <p>{companyConfig.name}</p>
                <p>ОГРНИП: {companyConfig.ogrnip}</p>
                <p>ИНН: {companyConfig.inn}</p>
                <p className="text-industrial-muted pt-1">
                  Договорная ответственность и гарантия 36 мес.
                </p>
              </div>
            </div>

            {/* Колонка 3 */}
            <div>
              <h5 className="font-bold text-white uppercase font-mono tracking-wider mb-3">
                Производство и контакты
              </h5>
              <div className="space-y-2 text-white/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-industrial-accent shrink-0 mt-0.5" />
                  <span>г. Ростов-на-Дону (визиты в цех по записи)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Пн–Вс с 09:00 до 20:00</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Phone className="w-4 h-4 text-industrial-accent shrink-0" />
                  <a href={`tel:${companyConfig.phoneClean}`} className="text-white hover:text-industrial-accent font-bold font-mono">
                    {companyConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Колонка 4 */}
            <div>
              <h5 className="font-bold text-white uppercase font-mono tracking-wider mb-3">
                Документы и безопасность
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors underline underline-offset-4 decoration-industrial-border">
                    Политика конфиденциальности (152-ФЗ)
                  </Link>
                </li>
                <li>
                  <Link href="/consent" className="hover:text-white transition-colors underline underline-offset-4 decoration-industrial-border">
                    Согласие на обработку персональных данных
                  </Link>
                </li>
                <li className="pt-2 text-[11px] text-industrial-muted/80 leading-relaxed">
                  Информация на сайте не является публичной офертой (ст. 437 ГК РФ).
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-industrial-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-industrial-muted text-center sm:text-left">
            <p>© 2011–2026 Фабрика корпусной мебели «Удобна». Все права защищены.</p>
            <p className="font-mono">г. Ростов-на-Дону • Ростовская область</p>
          </div>

        </div>
      </footer>

    </div>
  );
};