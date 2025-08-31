import Image from "next/image";
import Link from "next/link";

export function MinisterioCard({ imgSrc, title, description, link }: { imgSrc: string, title: string, description: string, link: string }) {
  return (
    <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:transform hover:-translate-y-1 transition-transform flex flex-col">
      <Image src={imgSrc} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-yellow-400 text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <Link href={link} className="text-yellow-400 font-bold hover:text-yellow-300 self-start transition-colors">Saiba mais →</Link>
      </div>
    </div>
  )
};