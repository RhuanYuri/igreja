'use client'

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cadastro } from "@/actions/cadastro";
import { getEscolas } from "@/actions/escola/getAll";
import { getMinisterios } from "@/actions/ministerio/getAll";

// Tipos para os dados que virão do banco
type Ministerio = { id: number; nome: string | null };
type Escola = { id: number; nome: string | null };

// Interface do formulário alinhada com o Zod schema da server action
interface FormData {
  nome: string;
  email: string;
  password: string;
  telefone: string;
  sexo: "masculino" | "feminino" | "nao_informado";
  estadoCivil: "solteiro" | "casado";
  endereco: string;
  dataNascimento: string; // O input type="date" trabalha com string no formato 'YYYY-MM-DD'
  batismo: boolean;
  escolaId: number;
  ministerioId: number;
}

export function RegisterDialog({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    nome: '', email: '', password: '', telefone: '', sexo: 'nao_informado',
    estadoCivil: 'solteiro', endereco: '', dataNascimento: '', batismo: false,
    escolaId: 0, ministerioId: 0,
  });

  // Estados para armazenar os dados do DB
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [escolas, setEscolas] = useState<Escola[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Efeito para buscar os dados quando o dialog for aberto
  useEffect(() => {
    if (isDialogOpen) {
      const fetchData = async () => {
        const [ministeriosData, escolasData] = await Promise.all([
          getMinisterios(),
          getEscolas(),
        ]);
        setMinisterios(ministeriosData);
        setEscolas(escolasData);
      };
      fetchData();
    }
  }, [isDialogOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    let finalValue: string | number | boolean = value;
    if (name === 'escolaId' || name === 'ministerioId') {
      finalValue = parseInt(value, 10);
    } else if (name === 'batismo') {
      finalValue = value === 'true';
    }
    setFormData(prev => ({ ...prev, [name]: finalValue as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Enviando cadastro...');

    const result = await cadastro(formData);

    if (result.success) {
      setStatusMessage('Cadastro enviado com sucesso!');
      setFormData({
        nome: '', email: '', password: '', telefone: '', sexo: 'nao_informado',
        estadoCivil: 'solteiro', endereco: '', dataNascimento: '', batismo: false,
        escolaId: 0, ministerioId: 0,
      });
      setTimeout(() => {
        setIsDialogOpen(false); // Fecha o dialog
        setStatusMessage(''); // Limpa a mensagem
      }, 2000);
    } else {
      setStatusMessage(`Erro: ${result.error || 'Tente novamente.'}`);
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gray-950 border-yellow-500 text-white">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl">Cadastro de Novo Membro</DialogTitle>
          <DialogDescription className="text-gray-400">
            Preencha seus dados abaixo. Entraremos em contato em breve!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-4">
            
            <div><Label htmlFor="nome" className="text-yellow-500">Nome Completo</Label><Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="email" className="text-yellow-500">E-mail</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="password" className="text-yellow-500">Senha</Label><Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="telefone" className="text-yellow-500">Telefone</Label><Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="dataNascimento" className="text-yellow-500">Data de Nascimento</Label><Input id="dataNascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="sexo" className="text-yellow-500">Sexo</Label>
              <Select name="sexo" onValueChange={(value) => handleSelectChange('sexo', value)} value={formData.sexo} required><SelectTrigger className="bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="feminino">Feminino</SelectItem><SelectItem value="masculino">Masculino</SelectItem><SelectItem value="nao_informado">Não Informado</SelectItem></SelectContent></Select>
            </div>
            <div><Label htmlFor="estadoCivil" className="text-yellow-500">Estado Civil</Label>
              <Select name="estadoCivil" onValueChange={(value) => handleSelectChange('estadoCivil', value)} value={formData.estadoCivil}><SelectTrigger className="bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="solteiro">Solteiro(a)</SelectItem><SelectItem value="casado">Casado(a)</SelectItem></SelectContent></Select>
            </div>
            <div className="md:col-span-2"><Label htmlFor="endereco" className="text-yellow-500">Endereço</Label><Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required className="bg-gray-900 border-gray-700"/></div>
            <div><Label htmlFor="batismo" className="text-yellow-500">Já é batizado(a)?</Label>
              <Select name="batismo" onValueChange={(value) => handleSelectChange('batismo', value)} value={String(formData.batismo)} required><SelectTrigger className="bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="true">Sim</SelectItem><SelectItem value="false">Não</SelectItem></SelectContent></Select>
            </div>
            
            <div><Label htmlFor="ministerioId" className="text-yellow-500">Ministério de Interesse</Label>
              <Select name="ministerioId" onValueChange={(value) => handleSelectChange('ministerioId', value)} value={String(formData.ministerioId)} required><SelectTrigger className="bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {ministerios.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div><Label htmlFor="escolaId" className="text-yellow-500">Escola de Interesse</Label>
              <Select name="escolaId" onValueChange={(value) => handleSelectChange('escolaId', value)} value={String(formData.escolaId)} required><SelectTrigger className="bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {escolas.map(e => <SelectItem key={e.id} value={String(e.id)}>{e.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4 flex-col sm:flex-row sm:justify-between items-center">
            <p className="text-sm text-yellow-400 h-4">{statusMessage}</p>
            <Button type="submit" disabled={isSubmitting} className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
              {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
