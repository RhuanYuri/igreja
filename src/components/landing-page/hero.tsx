import Image from "next/image";
import { RegisterDialog } from "./registerDialog";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <header className="text-center pt-36 pb-10 px-5 bg-black">
      <div className="w-56 h-56 mx-auto mb-5 rounded-full overflow-hidden border-4 border-yellow-500/40 shadow-lg shadow-yellow-500/20">
        <Image src="/logo.jpg" alt="Logo da Catedral Itapecuru" width={220} height={220} className="w-full h-full object-cover" />
      </div>
      <h1 className="font-serif text-5xl font-black uppercase mb-4 text-shadow-md shadow-yellow-500/50">
        Bem-vindos à Catedral Itapecuru
      </h1>
      <p className="text-lg text-gray-300 opacity-85 mb-8">É tempo de ganhar almas</p>
      {/* O botão agora abre o Dialog de cadastro */}
      <RegisterDialog>
        <Button size="lg" className="bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-600 shadow-lg shadow-yellow-500/50 transition-colors">
          Novo Membro
        </Button>
      </RegisterDialog>
    </header>

  )
}

