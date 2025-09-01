'use client'

import { LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ButtonLogout() {
  const router = useRouter()
  const headleLogout = () => {
    authClient.signOut().then(() => {
      router.push("/");
    }).catch((error) => {
      toast.error("Erro ao sair", {
        description: error.message,
      });
    });
  }
  return (
    <Button onClick={() => headleLogout()} variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Sair</span>
    </Button>

  )
}