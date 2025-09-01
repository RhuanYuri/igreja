'use client'

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { NavBar } from "@/components/landing-page/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Usa a API do Lucia diretamente no cliente para fazer o login
      startTransition(async () => {
        await authClient.signIn.email({
          email: email,
          password: password,
          fetchOptions: {
            onSuccess: () => {
              router.push("/area-membro");
            },
            onError: (ctx) => {
              if (ctx.error.code === "USER_NOT_FOUND") {
                toast.error("E-mail não encontrado.");
              }
              if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                toast.error("E-mail ou senha inválidos.");
              }
              toast.error(ctx.error.message);
            },
          },
        });
      });

    } catch (e: any) {
      // Trata erros específicos de autenticação
      if (e) {
        if (e?.message === 'AUTH_INVALID_KEY_ID' || e?.message === 'AUTH_INVALID_PASSWORD') {
            setError("E-mail ou senha inválidos. Verifique suas credenciais.");
        } else {
            setError("Ocorreu um erro de autenticação. Tente novamente.");
        }
      } else {
        // Trata outros erros
        console.error("Erro inesperado no login:", e);
        setError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-yellow-500 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-yellow-400 text-3xl">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Acesse sua área de membro.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-yellow-500">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-yellow-500">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 focus:ring-yellow-500 mb-4"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}
