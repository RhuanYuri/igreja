import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function ProgramacaoSection() {
  return (
    <section id="programacao" className="flex flex-col md:flex-row min-h-screen bg-black">
      <div className="w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-center text-white bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7)), url('https://i.pinimg.com/1200x/88/81/ce/8881cef3c30365a09811269065ba5c62.jpg')" }}>
        <h2 className="text-4xl font-extrabold uppercase tracking-wide">Conheça nossa programação!</h2>
        <p className="mt-4 text-lg text-gray-300">Temos encontros abençoados e momentos de comunhão para toda a igreja. Fique por dentro de tudo que vai acontecer!</p>
      </div>
      <div className="w-full md:w-1/3 p-8 md:p-12 bg-gray-950 border-l-2 border-yellow-500">
        <Tabs defaultValue="dia1" className="w-full text-white"><TabsList className="grid w-full grid-cols-3 bg-black"><TabsTrigger value="dia1">1º DIA</TabsTrigger><TabsTrigger value="dia2">2º DIA</TabsTrigger><TabsTrigger value="dia3">3º DIA</TabsTrigger></TabsList>
          <TabsContent value="dia1" className="mt-6 bg-black p-6 rounded-lg"><p><strong className="text-yellow-400 mr-3">19:30</strong> Sexta-feira</p><p className="pl-12 text-gray-300">Saída em frente à JM Vidros</p></TabsContent>
          <TabsContent value="dia2" className="mt-6 bg-black p-6 rounded-lg"><p><strong className="text-yellow-400 mr-3">10:00</strong> Sábado</p><p className="pl-12 text-gray-300">Atividades no salão principal</p><p className="mt-4"><strong className="text-yellow-400 mr-3">19:00</strong> Culto de louvor</p></TabsContent>
          <TabsContent value="dia3" className="mt-6 bg-black p-6 rounded-lg"><p><strong className="text-yellow-400 mr-3">09:00</strong> Domingo</p><p className="pl-12 text-gray-300">Café da manhã comunitário</p><p className="mt-4"><strong className="text-yellow-400 mr-3">18:00</strong> Encerramento e agradecimentos</p></TabsContent>
        </Tabs>
      </div>
    </section>
  )
};