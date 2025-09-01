'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, Menu, UserCircle, Church } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ButtonLogout } from "./logout";

const navLinks = [
  { href: "/", label: "Início", icon: <Home className="h-5 w-5" /> },
  { href: "/area-membro", label: "Área do Membro", icon: <UserCircle className="h-5 w-5" /> },
];

export function NavbarPrivada() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900/95 px-4 md:px-6 z-50 backdrop-blur-sm">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base text-white">
          <Church className="h-6 w-6 text-yellow-400" />
          <span className="sr-only">Sistema de Gestão</span>
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-yellow-400 ${pathname === link.href ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      {/* Menu Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Abrir menu de navegação</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-gray-900 border-gray-800 text-white">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Church className="h-6 w-6 text-yellow-400" />
              <span>Sistema de Gestão</span>
            </Link>
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 px-2.5 transition-colors hover:text-yellow-400 ${pathname === link.href ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  {link.icon} {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ButtonLogout />
      </div>
    </header>
  );
}
