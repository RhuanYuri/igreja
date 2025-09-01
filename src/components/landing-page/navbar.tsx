'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { RegisterDialog } from "./registerDialog";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null)

  useEffect(() => {
    const checkLoggin = async () => {
      const session = await authClient.getSession()
      setIsLoggedIn(session?.data?.user)
    }
    checkLoggin()
  }, [isLoggedIn])

  return (
    <nav className="bg-gray-950 flex justify-between items-center py-3 px-5 sticky top-0 z-50 shadow-lg shadow-black/80">
      <ul className="hidden md:flex list-none gap-6">
        <li><a href="/#nossahistoria" className="text-gray-400 hover:text-yellow-400 transition-colors">Nossa História</a></li>
        <li><a href="/#ministerios" className="text-gray-400 hover:text-yellow-400 transition-colors">Ministérios</a></li>
        <li><a href="/#programacao" className="text-gray-400 hover:text-yellow-400 transition-colors">Programação</a></li>
        <li><a href="/#visao" className="text-gray-400 hover:text-yellow-400 transition-colors">Visão</a></li>
        <li><a href="/#localizacao" className="text-gray-400 hover:text-yellow-400 transition-colors">Localização</a></li>
      </ul>

      {/* Renderização condicional do botão */}
      {isLoggedIn ? (
        // Se o usuário estiver logado, mostra o botão para a Área do Membro
        <Button asChild className="bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-colors">
          <Link href="/area-membro">Área do Membro</Link>
        </Button>
      ) : (
        // Se não estiver logado, mostra os dois botões: Novo Membro e Login
        <div className="flex gap-3">
          <RegisterDialog>
            <Button className="bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-colors">
              Novo Membro
            </Button>
          </RegisterDialog>

          <Button asChild className="bg-transparent border border-yellow-500 text-yellow-500 font-bold hover:bg-yellow-600 hover:text-black transition-colors">
            <Link href="/login">Login</Link>
          </Button>
        </div>

      )}
    </nav>
  )
};
