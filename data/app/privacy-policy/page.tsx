// app/privacy-policy/page.tsx
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Политика конфиденциальности | Фабрика мебели «Удобна»",
  description: "Политика обработки персональных данных в соответствии с Федеральным законом РФ № 152-ФЗ.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B0D10] text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-industrial-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться на главную
        </Link>

        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 text-left space-y-6 text-xs sm:text-sm text-industrial-muted leading-relaxed">
          
          <div className="flex items-center gap-2 text-industrial-accent font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" /> 152-ФЗ РФ
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Политика в отношении обработки персональных данных
          </h1>

          <p>
            Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности данных, предпринимаемые ИП Манасарьян Ж.В. (далее — Оператор).
          </p>

          <h2 className="text-lg font-bold text-white pt-2">1. Основные понятия</h2>
          <p>
            Персональные данные — любая информация, относящаяся к прямо или косвенно определенному Пользователю веб-сайта. Обработка персональных данных — любое действие, совершаемое с персональными данными (сбор, запись, хранение, уточнение, использование, удаление).
          </p>

          <h2 className="text-lg font-bold text-white pt-2">2. Цели обработки персональных данных</h2>
          <p>
            Цель обработки: предоставление Пользователю предварительного расчета стоимости мебели (сметы), организация бесплатного выезда мастера-технолога для замера помещения и обратная связь по заявкам с сайта.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">3. Перечень собираемых данных</h2>
          <p>
            Оператор может обрабатывать следующие данные: имя, номер контактного телефона, адрес объекта или название жилого комплекса в г. Ростове-на-Дону и Ростовской области.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">4. Безопасность и нераспространение</h2>
          <p>
            Оператор обязуется не передавать полученные персональные данные третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства РФ. Данные хранятся в защищенной базе.
          </p>

        </div>

      </div>
    </main>
  );
}