"use server";

import { db } from "@/db";
import { escola } from "@/db/schema";
import { isNull } from "drizzle-orm";


/**
 * Busca todas as escolas ativas no banco de dados.
 * @returns Uma promessa que resolve para uma lista de escolas.
 */
export async function getEscolas() {
  try {
    const data = await db.select()
      .from(escola)
      .where(isNull(escola.deletedAt)); // Filtra para buscar apenas registros não deletados
    return data;
  } catch (error) {
    console.error("Erro ao buscar escolas:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}
