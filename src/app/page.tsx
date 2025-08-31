'use client'
import Image from "next/image";
import { MapPin } from "lucide-react";
import { HeroSection } from "@/components/landing-page/hero";
import { NavBar } from "@/components/landing-page/navbar";
import { HistoriaSection } from "@/components/landing-page/historiaSection";
import { EnvolvimentoSection } from "@/components/landing-page/envolvimentoSection";
import { VisaoSection } from "@/components/landing-page/visaoSection";
import { ProgramacaoSection } from "@/components/landing-page/programacaoSection";
import { LocalizacaoSection } from "@/components/landing-page/localizacaoSection";





// Componente Principal da Página
export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <NavBar />
      <HistoriaSection />
      <EnvolvimentoSection />
      <VisaoSection />
      <ProgramacaoSection />
      <LocalizacaoSection />
    </main>
  );
}