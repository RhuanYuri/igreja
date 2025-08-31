"use server";

import { db } from "@/db";
import { ministerio } from "@/db/schema";
import { isNull } from "drizzle-orm";

/**
 * Busca todos os ministérios ativos no banco de dados.
 * @returns Uma promessa que resolve para uma lista de ministérios.
 */
export async function getMinisterios() {
  try {
    const data = await db.select()
      .from(ministerio)
      .where(isNull(ministerio.deletedAt));
    return data;
  } catch (error) {
    console.error("Erro ao buscar ministérios:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}
