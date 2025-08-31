import { Button } from "../ui/button";
import { RegisterDialog } from "./registerDialog";

export function NavBar() {
  return (
    <nav className="bg-gray-950 flex justify-between items-center py-3 px-5 sticky top-0 z-50 shadow-lg shadow-black/80">
      <ul className="hidden md:flex list-none gap-6">
        <li><a href="#nossahistoria" className="text-gray-400 hover:text-yellow-400 transition-colors">Nossa História</a></li>
        <li><a href="#ministerios" className="text-gray-400 hover:text-yellow-400 transition-colors">Ministérios</a></li>
        <li><a href="#programacao" className="text-gray-400 hover:text-yellow-400 transition-colors">Programação</a></li>
        <li><a href="#visao" className="text-gray-400 hover:text-yellow-400 transition-colors">Visão</a></li>
        <li><a href="#localizacao" className="text-gray-400 hover:text-yellow-400 transition-colors">Localização</a></li>
      </ul>
      {/* Este botão também abre o Dialog de cadastro */}
      <RegisterDialog>
        <Button className="bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-colors">
          Novo Membro
        </Button>
      </RegisterDialog>
    </nav>
  )
};