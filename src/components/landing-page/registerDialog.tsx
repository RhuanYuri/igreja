'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export function RegisterDialog ({ children }: { children: React.ReactNode }) {
  // Estado para controlar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma aplicação real, você enviaria esses dados para sua API.
    // Por enquanto, vamos apenas mostrar no console.
    console.log({ name, email, phone });
    alert(`Obrigado por se cadastrar, ${name}!`);
    // Aqui você poderia fechar o dialog e limpar os campos, se necessário.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-950 border-yellow-500 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Torne-se Membro</DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha seus dados abaixo. Entraremos em contato em breve!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-300">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="col-span-3 bg-gray-900 border-gray-700 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-300">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="col-span-3 bg-gray-900 border-gray-700 focus:ring-yellow-500"
                required
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-300">
                WhatsApp
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(99) 99999-9999"
                className="col-span-3 bg-gray-900 border-gray-700 focus:ring-yellow-500"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
              Enviar Cadastro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};