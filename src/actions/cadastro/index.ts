"use server";

import { z } from "zod";
import { auth } from "@/lib/auth"; // Sua instância do Lucia Auth
import { db } from "@/db"; // Sua instância do Drizzle ORM
import { membro, inscricao } from "@/db/schema"; // Importe as tabelas necessárias



// 1. Esquema de validação Zod atualizado para corresponder aos dados do formulário frontend
const cadastroSchema = z.object({
  // Dados para a tabela 'user'
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),

  // Dados para a tabela 'membro'
  telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos."),
  sexo: z.literal(["masculino",  "feminino", "nao_informado"]),
  estadoCivil: z.literal(["solteiro", "casado"]),
  endereco: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres."),
  dataNascimento: z.coerce.date("Por favor, insira uma data de nascimento válida."),

  // Dados para a tabela 'inscricao'
  batismo: z.boolean(),
  escolaId: z.number().positive("Selecione uma escola válida."),
  ministerioId: z.number().positive("Selecione um ministério válido."),

  // Campos do formulário que não mapeiam diretamente para o DB, mas podem ser úteis
  // discipulado: z.boolean(),
  // mensagem: z.string().optional(),
});

// Tipagem para o retorno da função
interface ActionResult {
  success: boolean;
  error?: string;
}

export async function cadastro(values: unknown): Promise<ActionResult> {
  // 2. Validar os dados recebidos do formulário
  const validatedFields = cadastroSchema.safeParse(values);

  if (!validatedFields.success) {
    // Coletando todos os erros de validação para um feedback mais claro
    const errors = validatedFields.error?.cause
    return {
      success: false,
      error: `Dados inválidos: ${errors}`,
    };
  }

  const data = validatedFields.data;

  try {
    // Usaremos uma transação para garantir que todas as inserções ocorram com sucesso.
    // Se algo falhar, a transação inteira é revertida (rollback).
    const result = await db.transaction(async (tx) => {
      // 3. Criar o usuário usando a API do Lucia
      const { user } = await auth.api.signUpEmail({
        body: {
          name: data.nome,
          email: data.email,
          password: data.password,
        },
      });

      if (!user || !user.id) {
        throw new Error("Falha ao criar o registro de autenticação do usuário.");
      }
      
      // 4. Inserir na tabela 'membro' e obter o ID do novo membro
      const [novoMembro] = await tx
        .insert(membro)
        .values({
          userId: user.id,
          telefone: data.telefone,
          sexo: data.sexo,
          estadoCivil: data.estadoCivil,
          endereco: data.endereco,
          dataNascimento: data.dataNascimento.toISOString(),
        })
        .returning({ id: membro.id });

      if (!novoMembro || !novoMembro.id) {
          throw new Error("Falha ao criar o registro do membro.");
      }

      // 5. Inserir na tabela 'inscricao' usando o ID do membro recém-criado
      await tx.insert(inscricao).values({
        membroId: novoMembro.id,
        ministerioId: data.ministerioId,
        escolaId: data.escolaId,
        batismo: data.batismo,
      });

      // Se todas as operações foram bem-sucedidas, a transação será concluída (commit).
      return { success: true };
    });

    return result;

  } catch (error: any) {
    // 6. Tratamento de erros
    if (error?.message === "AUTH_DUPLICATE_KEY_ID") {
      return {
        success: false,
        error: "Este e-mail já está em uso. Por favor, tente outro.",
      };
    }

    // Erro genérico para outras falhas
    console.error("Erro no processo de cadastro:", error);
    return {
      success: false,
      error: (error instanceof Error && error.message) || "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
    };
  }
}
