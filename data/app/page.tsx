// app/page.tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { EngineeringTruth } from "@/components/EngineeringTruth";
import { Portfolio } from "@/components/Portfolio";
import { WorkshopAndShowroom } from "@/components/WorkshopAndShowroom";
import { Guarantees } from "@/components/Guarantees";
import { FaqAndFooter } from "@/components/FaqAndFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-industrial-bg text-white">
      <Header />
      <Hero />
      <Quiz />
      <EngineeringTruth />
      <Portfolio />
      <WorkshopAndShowroom />
      <Guarantees />
      <FaqAndFooter />
    </main>
  );
}