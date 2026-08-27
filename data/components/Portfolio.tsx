// components/Portfolio.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  Grid, 
  X, 
  CheckCircle2, 
  Layers, 
  Ruler 
} from "lucide-react";
import { 
  portfolioProjects, 
  portfolioCategories, 
  ProjectCase, 
  SpecItem 
} from "@/data/portfolio";

const SpecIcon: React.FC<{ label: string }> = ({ label }) => {
  const l = label.toLowerCase();
  if (l.includes("размер") || l.includes("габарит") || l.includes("длина") || l.includes("площадь")) {
    return <Ruler className="w-4 h-4 text-industrial-accent shrink-0 mt-0.5" />;
  }
  if (l.includes("фасад") || l.includes("корпус") || l.includes("материал") || l.includes("состав")) {
    return <Layers className="w-4 h-4 text-industrial-accent shrink-0 mt-0.5" />;
  }
  if (l.includes("столешниц") || l.includes("спальн") || l.includes("профиль")) {
    return <Sparkles className="w-4 h-4 text-industrial-accent shrink-0 mt-0.5" />;
  }
  return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />;
};

const SmartCaseImage: React.FC<{ project: ProjectCase }> = ({ project }) => {
  return (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
    />
  );
};

// 100% аппаратные GPU-анимации без тяжелых шейдеров
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Динамичный и легкий шаг каскада
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1], // Шелковистая кривая Apple
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  },
};

export const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Все проекты");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalFurnitureFilter, setModalFurnitureFilter] = useState<string>("Все");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = activeTab === "Все проекты"
    ? portfolioProjects
    : portfolioProjects.filter((item) => item.category === activeTab);

  const scrollToQuiz = () => {
    setIsModalOpen(false);
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const getCategoryCount = (cat: string) => {
    if (cat === "Все проекты") return portfolioProjects.length;
    return portfolioProjects.filter((p) => p.category === cat).length;
  };

  const modalProjects = modalFurnitureFilter === "Все"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.furnitureType === modalFurnitureFilter);

  return (
    <section 
      id="cases-section" 
      style={{ overflowAnchor: "none" }}
      className="py-14 sm:py-24 bg-industrial-bg border-t border-industrial-border relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-industrial-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-surface border border-industrial-border text-xs sm:text-sm text-industrial-accent font-mono uppercase tracking-wider mb-3.5 font-semibold">
            <MapPin className="w-4 h-4" /> Реальные объекты в Ростове-на-Дону
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Мы уже собрали мебель в вашем районе. Посмотрите реальные сметы
          </h2>
          <p className="mt-3 text-sm sm:text-base text-industrial-muted max-w-2xl mx-auto">
            Кухни, шкафы и комплексные проекты. Честные фотографии с адресами и ценами под ключ.
          </p>
        </div>

        {/* Табы */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap sm:justify-center px-1">
            {portfolioCategories.map((cat) => {
              const isActive = activeTab === cat;
              const count = getCategoryCount(cat);

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-2 shrink-0 z-10 ${
                    isActive ? "text-white font-bold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {/* Скользящий индикатор таба */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-industrial-accent rounded-xl shadow-industrial -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl bg-industrial-surface border border-industrial-border hover:border-white/20 -z-10 transition-colors" />
                  )}

                  <span>{cat}</span>
                  <span className={`text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                    isActive ? "bg-white/25 text-white" : "bg-white/10 text-industrial-muted"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка проектов с аппаратным каскадом 60 FPS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            {filteredProjects.map((project, index) => {
              const isHiddenOnMobile = index >= 3;
              const isHiddenOnDesktop = index >= 6;

              if (isHiddenOnDesktop) return null;

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className={`glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-white/25 transition-colors gpu-layer ${
                    isHiddenOnMobile ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div>
                    {/* Фото проекта */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-industrial-surface">
                      <SmartCaseImage project={project} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                      <div className="absolute top-3 left-3 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-white font-mono font-semibold shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-industrial-accent shrink-0" />
                        <span>{project.complex}</span>
                      </div>

                      <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-md text-[11px] font-mono text-white/90">
                        {project.furnitureType}
                      </div>

                      <div className="absolute bottom-3 left-3 glass-panel px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>Срок: {project.days} дней</span>
                      </div>
                    </div>

                    {/* Контент карточки */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-industrial-muted font-mono mb-4">
                        {project.address}
                      </p>

                      <div className="space-y-2 py-3 border-t border-b border-industrial-border text-xs sm:text-sm text-white/90">
                        {project.specs.map((spec: SpecItem, sIdx: number) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <SpecIcon label={spec.label} />
                            <span className="leading-snug">
                              <strong className="text-white font-semibold">{spec.label}:</strong> {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Цена и кнопка */}
                  <div className="p-4 sm:p-6 pt-0 mt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-industrial-muted block">Цена под ключ:</span>
                      <span className="font-mono text-xl sm:text-2xl font-black text-white whitespace-nowrap">
                        {project.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={scrollToQuiz}
                      className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-industrial-accent text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-industrial-accentHover transition-colors shadow-industrial active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <span>Хочу похожий</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Кнопка открытия каталога */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-7 sm:px-9 py-4 rounded-xl bg-industrial-surface border-2 border-industrial-accent/40 hover:border-industrial-accent text-white font-bold text-sm sm:text-base hover:bg-industrial-accent/10 transition-all shadow-xl active:scale-98 cursor-pointer"
          >
            <Grid className="w-5 h-5 text-industrial-accent" />
            <span>Смотреть весь каталог ({portfolioProjects.length} проектов со сметами)</span>
          </button>
        </div>

      </div>

      {/* ПОЛНОЭКРАННЫЙ МОДАЛЬНЫЙ КАТАЛОГ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-7xl max-h-[92vh] bg-industrial-bg border border-industrial-border rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Шапка модалки */}
              <div className="p-4 sm:p-6 border-b border-industrial-border flex items-start justify-between gap-3 bg-industrial-surface/95 shrink-0">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-industrial-accent/15 border border-industrial-accent/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Grid className="w-5 h-5 sm:w-6 sm:h-6 text-industrial-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white leading-tight">
                      Каталог проектов фабрики «Удобна»
                    </h3>
                    <p className="text-xs sm:text-sm text-industrial-muted mt-1 leading-snug">
                      Реализованная мебель со сметами в Ростове и области
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-industrial-surface border border-industrial-border hover:bg-industrial-border flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Фильтры мебели */}
              <div className="px-4 sm:px-6 py-3 border-b border-industrial-border/60 bg-industrial-surface/40 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-xs font-mono text-industrial-muted uppercase mr-1 hidden sm:inline">Тип мебели:</span>
                {(["Все", "Кухни", "Шкафы и гардеробные", "Шкафы-кровати", "Мебель под ключ"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setModalFurnitureFilter(type)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      modalFurnitureFilter === type
                        ? "bg-industrial-accent text-white font-bold shadow-sm"
                        : "bg-industrial-surface border border-industrial-border text-white/80 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Сетка проектов */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modalProjects.map((project) => (
                    <div
                      key={`modal-project-${project.id}`}
                      className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-white/25 transition-colors shadow-lg gpu-layer"
                    >
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-industrial-surface">
                          <SmartCaseImage project={project} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                          <div className="absolute top-3 left-3 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-white font-mono font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-industrial-accent shrink-0" />
                            <span>{project.complex}</span>
                          </div>
                          <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-md text-[11px] font-mono text-white/90">
                            {project.furnitureType}
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">
                          <h4 className="text-base font-bold text-white mb-1">{project.title}</h4>
                          <p className="text-xs text-industrial-muted font-mono mb-3">{project.address}</p>
                          
                          <div className="space-y-1.5 py-2.5 border-t border-b border-industrial-border text-xs text-white/90">
                            {project.specs.map((spec: SpecItem, sIdx: number) => (
                              <div key={sIdx} className="flex items-start gap-1.5">
                                <SpecIcon label={spec.label} />
                                <span className="leading-snug"><strong className="text-white font-semibold">{spec.label}:</strong> {spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 pt-0 mt-2 flex items-center justify-between">
                        <span className="font-mono text-lg font-black text-white">
                          {project.price.toLocaleString("ru-RU")} ₽
                        </span>
                        <button
                          type="button"
                          onClick={scrollToQuiz}
                          className="px-3.5 py-2 rounded-lg bg-industrial-accent text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-industrial-accentHover transition-colors cursor-pointer"
                        >
                          <span>Рассчитать</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};