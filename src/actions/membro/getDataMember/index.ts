import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

/**
 * Busca os dados completos do perfil do membro logado.
 * @returns Uma promessa que resolve para os dados do usuário com informações de membro e inscrição, ou null se não estiver logado.
 */
export async function getMemberProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) {
    return null;
  }

  const memberData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    with: {
      membro: {
        with: {
          inscricoes: {
            // Ordena para pegar a mais recente, caso haja mais de uma.
            orderBy: (inscricao, { desc }) => [desc(inscricao.createdAt)],
            with: {
              ministerio: {
                columns: {
                  nome: true,
                },
              },
              escola: {
                 columns: {
                  nome: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return memberData;
}