import { relations } from "drizzle-orm";
import { serial, uuid, text, integer, timestamp, boolean, pgTable, pgEnum, date } from "drizzle-orm/pg-core";

// ---------------- USERS ----------------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

// --- Tabelas do sistema

export const ministerio = pgTable("ministerio", {
  id: serial().primaryKey(),
  nome: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
}) 


export const escola = pgTable("escola", {
  id: serial().primaryKey(),
  nome: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
}) 


export const celula = pgTable("celula", {
  id: serial().primaryKey(),
  nome: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
}) 



export const mebrosEnum = pgEnum("tipo_membro", ["discipulo", "lider", "lider em treinamento", "coordenador"])
export const sexoEnum = pgEnum("sexo", ["masculino", "feminino", "nao_informado"])
export const estadoCivilEnum = pgEnum("estado_civil", ["solteiro", "casado"])

export const membro = pgTable("membro", {
  id: serial().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  telefone: text().notNull(),
  sexo: sexoEnum("sexo").notNull(),
  estadoCivil: estadoCivilEnum("estado_civil").default("solteiro"),
  endereco: text().notNull(),
  batismo: boolean(),
  dataNascimento: date("data_nascimento").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
})

export const statusInscricaoEnum = pgEnum("status_inscricao", ["pendente", "concluido", "cancelado", "recusado"])

export const inscricao = pgTable("incricao", {
  id: serial().primaryKey(),
  membroId: integer("membro_id").references(() => membro.id, { "onDelete": "cascade" }),
  ministerioId: integer("ministerio_id").references(() => ministerio.id, { "onDelete": "set null" }),
  escolaId: integer("escola_id").references(() => escola.id, { "onDelete": "set null" }),
  status: statusInscricaoEnum().default("pendente"),
  batismo: boolean().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
})


export const membroCelula = pgTable("membro_celula", {
  id: serial().primaryKey(),
  memberId: integer("membro_id").references(() => membro.id, { onDelete: "set null" }),
  celulaId: integer("celula_id").references(() => celula.id, { onDelete: "cascade" }),
  escolaId: integer("escola_id").references(() => escola.id, { onDelete: "set null" }),
  tipo: mebrosEnum().default("discipulo"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
})

export const membroCelulaMinisterio = pgTable("membro_celula_ministerio", {
  id: serial().primaryKey(),
  membroCelulaId: integer("membro_celula_id").references(() => membroCelula.id, { onDelete: "cascade" }),
  ministerioId: integer("ministerio_id").references(() => ministerio.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => new Date()
  ),
  deletedAt: timestamp("deleted_at")
})

// Relacionamentos

export const userRelations = relations(user, ({ one }) => ({
  membro: one(membro, {
    fields: [user.id],
    references: [membro.userId]
  })
}))

export const membroRelations = relations(membro, ({ one, many }) => ({
  user: one(user, {
    fields: [membro.userId],
    references: [user.id]
  }),
  celulas: many(membroCelula),
  inscricoes: many(inscricao)
}))

export const celulaRelations = relations(celula, ({ many }) => ({
  membros: many(membroCelula)
}))

export const membroCelulaRelations = relations(membroCelula, ({ many }) => ({
  membros: many(membro),
  celulas: many(celula),
  ministerios: many(membroCelulaMinisterio)
}))

export const membroCelulaMinisterioRelations = relations(membroCelulaMinisterio, ({ many }) => ({
  membros: many(membroCelula),
  ministerios: many(ministerio)
}))

export const ministerioRelations = relations(ministerio, ({ many })=> ({
  membros: many(membroCelulaMinisterio),
  incricoes: many(inscricao)
}))


export const escolaRelations = relations(escola, ({ many })=> ({
  membros: many(membroCelula),
  incricoes: many(inscricao)
}))

export const inscricaoRelations = relations(inscricao, ({ one }) => ({
  membro: one(membro, {
    fields: [inscricao.membroId],
    references: [membro.id]
  }),
  ministerio: one(ministerio, {
    fields: [inscricao.ministerioId],
    references: [ministerio.id]
  }), 
  escola: one(escola, {
    fields: [inscricao.escolaId],
    references: [escola.id]
  }), 
}))



