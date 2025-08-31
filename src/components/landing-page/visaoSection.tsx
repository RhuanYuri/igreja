'use client'
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const slidesData = [
  {
    titulo: "Visão da Igreja",
    descricao: "Uma igreja que reflete o amor e a presença de Deus em cada ação.",
    imgSrc: "https://i.pinimg.com/736x/6d/c9/a9/6dc9a9503360200e9a6390da34a549e7.jpg",
    alt: "Visão da Igreja",
  },
  {
    titulo: "Missão",
    descricao: "Levar o evangelho com paixão, criatividade e dedicação.",
    imgSrc: "https://i.pinimg.com/736x/7f/84/bf/7f84bf7e803c8939c1a01fd237a3fa40.jpg",
    alt: "Missão",
  },
  {
    titulo: "Deus está te esperando!",
    descricao: "Venha com o coração preparado para receber mais de Deus neste domingo às 19h.",
    imgSrc: "https://i.pinimg.com/736x/25/61/44/25614468bc96f1d6eabde8040bae91a3.jpg",
    alt: "Culto de Domingo",
  },
];


// Componente: Seção Visão (Carrossel) - Estilo Atualizado
export function VisaoSection() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="visao" className="bg-gray-950 py-16 px-5">
      <div className="container mx-auto max-w-5xl text-left">
        <h2 className="text-3xl font-bold mb-2 text-yellow-400">
          Descubra mais formas de se conectar
        </h2>
        <p className="text-gray-300 mb-10">
          Há sempre novas maneiras de participar do que Deus está fazendo em nossa igreja, incluindo eventos, tours, música e muito mais.
        </p>
      </div>

      <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {slidesData.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="bg-transparent border-0">
                <CardContent className="relative p-0 aspect-video flex items-end justify-start rounded-2xl overflow-hidden">
                  <Image src={slide.imgSrc} alt={slide.alt} fill className="object-cover" />

                  {/* Overlay de texto estilizado como na imagem */}
                  <div className="absolute bottom-6 left-6 z-10 p-4 rounded-lg bg-black/60 backdrop-blur-sm max-w-md">
                    <h3 className="text-xl font-bold text-white">{slide.titulo}</h3>
                    <p className="text-gray-200 text-sm mt-1">{slide.descricao}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Indicadores de navegação (bolinhas) */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${current === index + 1 ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};