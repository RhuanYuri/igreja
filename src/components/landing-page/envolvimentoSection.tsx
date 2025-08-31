import { MinisterioCard } from "./ministerioCard";

const ministeriosData = [
  { title: "Acolhimento", description: "Recebemos cada pessoa com carinho e acolhimento.", imgSrc: "https://i.pinimg.com/736x/81/0a/95/810a957849d897ac906d8a51b865273d.jpg" },
  { title: "Dança - Nele Nos Movemos", description: "Adoração com expressões artísticas e coreografias impactantes.", imgSrc: "https://i.pinimg.com/1200x/79/df/db/79dfdb6356edc6575c656d623c716e16.jpg" },
  { title: "Teatro - Esconderijo do Altíssimo", description: "Transmitimos o evangelho com criatividade e encenação.", imgSrc: "https://i.pinimg.com/736x/6f/25/46/6f25468b89dc83f713dde1fc547a4f60.jpg" },
  { title: "Catedral Music", description: "Conduzimos a igreja em adoração com excelência e entrega.", imgSrc: "https://i.pinimg.com/736x/0c/e4/1d/0ce41d88a29b50bf44e37c0b6e87193d.jpg" },
  { title: "Ministério de Jovens", description: "Mobilizamos a juventude para viver com propósito e paixão.", imgSrc: "https://i.pinimg.com/736x/74/ac/58/74ac58ce1afc6f7c61b43383d1e7623d.jpg" },
  { title: "Interseção", description: "Chamados a orar, movidos por fé, guiados pelo propósito.", imgSrc: "https://i.pinimg.com/736x/eb/d9/7a/ebd97a4ff13e0a289c224192ff387610.jpg" },
];
const escolasData = [
  { title: "Escola de Voluntários", description: "Seu coração encontra direção para servir com amor e excelência.", imgSrc: "https://i.pinimg.com/736x/81/0a/95/810a957849d897ac906d8a51b865273d.jpg" },
  { title: "Escola de Líderes", description: "Formando líderes com visão e propósito, alinhados à Palavra de Deus.", imgSrc: "https://i.pinimg.com/1200x/79/df/db/79dfdb6356edc6575c656d623c716e16.jpg" },
  { title: "Escola de Finanças", description: "Administre com sabedoria os recursos que Deus confiou a você.", imgSrc: "https://i.pinimg.com/736x/6f/25/46/6f25468b89dc83f713dde1fc547a4f60.jpg" },
  { title: "Escola de Empreendedores", description: "Desperte seu potencial para inovar, empreender e liderar com fé.", imgSrc: "https://i.pinimg.com/736x/0c/e4/1d/0ce41d88a29b50bf44e37c0b6e87193d.jpg" },
];

export function EnvolvimentoSection() {
  return (
    <section id="ministerios" className="bg-black py-16 px-5 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Como Se Envolver</h2>
        <p className="text-lg text-gray-400">Veja como Deus pode usar seus dons para causar um impacto eterno.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {ministeriosData.map(item => <MinisterioCard key={item.title} {...item} link="#" />)}
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Escolas Disponíveis</h2>
        <p className="text-lg text-gray-400">Escolha onde crescer no propósito e no conhecimento de Deus.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {escolasData.map(item => <MinisterioCard key={item.title} {...item} link="#" />)}
      </div>
    </section>
  )
};