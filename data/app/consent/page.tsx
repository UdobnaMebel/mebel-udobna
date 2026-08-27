// app/consent/page.tsx
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Согласие на обработку персональных данных | «Удобна»",
};

export default function ConsentPage() {
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
          
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <CheckCircle2 className="w-4 h-4" /> Согласие пользователя
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Согласие на обработку персональных данных
          </h1>

          <p>
            Пользователь, заполняя любую форму заявки на сайте (квиз-конфигуратор, форма вызова мастера, запрос сметы), свободно, своей волей и в своем интересе дает согласие ИП Манасарьян Ж.В. на обработку своих персональных данных.
          </p>

          <p>
            Согласие дается на совершение следующих действий с персональными данными: сбор, систематизацию, хранение, уточнение (обновление, изменение), использование, обезличивание, блокирование и уничтожение.
          </p>

          <p>
            Настоящее согласие действует бессрочно с момента предоставления данных и может быть отозвано Пользователем путем направления письменного заявления Оператору.
          </p>

        </div>

      </div>
    </main>
  );
}