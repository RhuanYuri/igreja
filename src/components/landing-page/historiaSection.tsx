import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const historiaData = [
  {
    titulo: "Fundação",
    texto: "A Catedral Itapecuru nasceu em 2013, com a missão de ser um farol de fé e amor na cidade.",
  },
  {
    titulo: "Crescimento",
    texto: "Ao longo dos anos, a igreja cresceu em número de membros e em ações sociais de grande impacto na comunidade.",
  },
  {
    titulo: "Presente",
    texto: "Hoje, seguimos firmes, anunciando o evangelho com excelência e acolhendo todos com o amor de Cristo.",
  },
  {
    titulo: "Futuro",
    texto: "Nossa visão é expandir o Reino de Deus, alcançando mais vidas e servindo nossa cidade com ainda mais dedicação.",
  }
];

// Componente: Seção Nossa História (versão corrigida)
export function HistoriaSection() {
  return (
    // 1. Padding horizontal (px-5) removido daqui para evitar overflow
    <section id="nossahistoria" className="relative py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/a4/58/04/a45804906ea7642b05d76c4e85d5167e.jpg')" }}>
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* 2. Padding (px-4) adicionado ao container para controlar o espaçamento interno */}
      <div className="relative z-10 container mx-auto px-4 text-center"> 
        <h2 className="text-4xl font-bold mb-10 text-yellow-400 drop-shadow-lg">Nossa História</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {historiaData.map((item, index) => (
              <CarouselItem key={index} className="pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="flex flex-col justify-center p-8 h-56 rounded-2xl bg-gray-950/80 backdrop-blur-sm border border-yellow-500/20 shadow-lg">
                    <h3 className="text-yellow-500 text-2xl font-bold mb-4">{item.titulo}</h3>
                    <p className="text-gray-300">{item.texto}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

      </div>
    </section>
  )
};