import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMemberProfile } from "@/actions/membro/getDataMember";
import { redirect } from "next/navigation";
import { Briefcase, UserCircle, GraduationCap, Calendar, Users, Home, Mail, Phone, BookUser } from 'lucide-react';

// Função auxiliar para formatar a data para o padrão brasileiro
const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "Não informado";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: 'UTC',
  });
};

// Mapeia o status da inscrição para uma cor correspondente no Badge
const getStatusVariant = (status: string | undefined | null): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case "concluido":
            return "default";
        case "pendente":
            return "secondary";
        case "cancelado":
        case "recusado":
            return "destructive";
        default:
            return "outline";
    }
}

// Componente para exibir uma linha de informação com ícone
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-start space-x-4 py-3 border-b border-gray-800 last:border-b-0">
        <div className="text-yellow-400 mt-1">{icon}</div>
        <div className="flex-1">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-medium text-white">{value}</p>
        </div>
    </div>
);

export default async function AreaMembroPage() {
  const memberData = await getMemberProfile();

  if (!memberData) {
    redirect("/login"); 
  }

  const { name, email, membro } = memberData;
  const inscricao = membro?.inscricoes?.[0]; 

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* BANNER DE BOAS-VINDAS */}
        <div className="rounded-lg bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 p-8 md:p-12 mb-8 text-gray-900 shadow-lg">
           <h1 className="text-3xl md:text-4xl font-bold">Bem-vindo(a) de volta, {name}!</h1>
           <p className="mt-2 text-lg opacity-90">Este é o seu painel de membro.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* COLUNA ESQUERDA - INSCRIÇÃO */}
          <aside className="lg:col-span-1 space-y-6 sticky top-8">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2"><BookUser size={20} /> Minha Inscrição</CardTitle>
              </CardHeader>
              <CardContent>
                {inscricao ? (
                  <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Status</p>
                        <Badge variant={getStatusVariant(inscricao.status)} className="text-base capitalize w-full justify-center py-1">
                            {inscricao.status ?? 'N/A'}
                        </Badge>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Ministério</p>
                        <p className="font-semibold">{inscricao.ministerio?.nome ?? 'Não informado'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Escola</p>
                        <p className="font-semibold">{inscricao.escola?.nome ?? 'Não informado'}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Batizado(a)</p>
                        <p className="font-semibold">{inscricao.batismo ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">Nenhuma inscrição encontrada.</p>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* CONTEÚDO PRINCIPAL - DADOS PESSOAIS */}
          <main className="lg:col-span-3 space-y-6">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2"><UserCircle size={24}/> Dados Pessoais</CardTitle>
                <CardDescription className="text-gray-500">Suas informações de cadastro. Mantenha-as atualizadas.</CardDescription>
              </CardHeader>
              <CardContent>
                <InfoRow icon={<UserCircle size={20} />} label="Nome Completo" value={name} />
                <InfoRow icon={<Mail size={20} />} label="E-mail" value={email} />
                <InfoRow icon={<Phone size={20} />} label="Telefone" value={membro?.telefone ?? 'Não informado'} />
                <InfoRow icon={<Calendar size={20} />} label="Data de Nascimento" value={formatDate(membro?.dataNascimento)} />
                <InfoRow icon={<Users size={20} />} label="Gênero" value={<span className="capitalize">{membro?.sexo ?? 'Não informado'}</span>} />
                <InfoRow icon={<Users size={20} />} label="Estado Civil" value={<span className="capitalize">{membro?.estadoCivil ?? 'Não informado'}</span>} />
                <InfoRow icon={<Home size={20} />} label="Endereço" value={membro?.endereco ?? 'Não informado'} />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

