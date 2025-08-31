import { MapPin } from "lucide-react";
import Image from "next/image";

export function LocalizacaoSection() {
  return (
    <section id="localizacao" className="py-16 px-5 bg-black text-center">
      <h2 className="text-4xl font-bold text-yellow-400 mb-2 flex items-center justify-center"><MapPin className="mr-3" /> Localização</h2>
      <p className="text-gray-400 text-lg mb-12">Venha nos visitar! Estamos de portas abertas esperando por você.</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform">
          <Image src="https://i.pinimg.com/1200x/a4/58/04/a45804906ea7642b05d76c4e85d5167e.jpg" alt="Culto na igreja" width={500} height={300} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.815543796182!2d-44.35985522502785!3d-3.395156096579439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f4df006e61723f%3A0xde7008c8bd219342!2sIGREJA%20CATEDRAL!5e0!3m2!1spt-BR!2sbr!4v1756661880527!5m2!1spt-BR!2sbr" width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  )
};