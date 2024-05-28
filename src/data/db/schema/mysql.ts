/** drizzle-schema-mysql | @see index.ts to learn more */

import type { AdapterAccount } from "@auth/core/adapters";
import type { CartItem, CheckoutItem, StoredFile } from "~/types";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import type Stripe from "stripe";

export const mysqlTable = mysqlTableCreator((name) => `acme_${name}`);

// @see src/app/[locale]/(auth)/auth/page.tsx
export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  emailClerk: varchar("emailClerk", { length: 255 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", ["admin", "user"]).notNull().default("user"),
  mode: mysqlEnum("mode", ["seller", "buyer"]).notNull().default("buyer"),
  stripeCustomerId: text("stripeCustomerId"),
  stripePriceId: text("stripePriceId"),
  currentCartId: varchar("currentCartId", { length: 255 }),
  stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToProducts: many(usersToProducts),
  capabilities: many(capabilities),
  accounts: many(accounts),
  products: many(products),
  stores: many(stores),
  todos: many(todos),
  carts: many(carts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    id_token: text("id_token"),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    refresh_token: text("refresh_token"),
    scope: varchar("scope", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
    token_type: varchar("token_type", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const stripeEvent = mysqlTable("stripe", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  account: text("account"),
  api_version: text("api_version"),
  created: timestamp("created", { mode: "date" }),
  data: json("data").$type<Stripe.Event.Data>(),
  livemode: boolean("livemode"),
  object: text("object"),
  pending_webhooks: real("pending_webhooks"),
  request: json("request").$type<Stripe.Event.Request>(),
  type: text("type"),
});

export const todos = mysqlTable("todo", {
  id: serial("id").primaryKey(),
  position: int("position").default(0),
  content: text("content").notNull(),
  done: boolean("done"),
  createdAt: timestamp("createdAt").defaultNow(),
  userId: text("userId").notNull(),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.userId],
    references: [users.email],
  }),
}));

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(false),
  stripeAccountId: varchar("stripeAccountId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const storesRelations = relations(stores, ({ many, one }) => ({
  products: many(products),
  payments: many(payments),
  user: one(users, { fields: [stores.id], references: [users.id] }),
}));

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  storeId: int("storeId").notNull().default(1),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "Sản Phẩm",
    "Đào Tạo",
    "Liên Hệ",
    "Giới Thiệu",
    "furniture,",
  ])
    .notNull()
    .default("Sản Phẩm"),
  subcategory: varchar("subcategory", { length: 255 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  user: one(users, { fields: [products.storeId], references: [users.id] }),
}));

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }),
  email: varchar("email", { length: 255 }),
  clientSecret: varchar("clientSecret", { length: 255 }),
  paymentIntentId: varchar("paymentIntentId", { length: 255 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, { fields: [carts.id], references: [users.id] }),
  store: one(stores, { fields: [carts.id], references: [stores.id] }),
}));

export const emails = mysqlTable("emails", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 255 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}));

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  storeId: int("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: int("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 255,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 255,
  }).notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  addressId: int("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 255 }),
  line2: varchar("line2", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  postalCode: varchar("postalCode", { length: 255 }),
  country: varchar("country", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const usersToProducts = mysqlTable(
  "users_to_products",
  {
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull(),
  },
  (usersToProducts) => ({
    compoundKey: primaryKey(usersToProducts.userId, usersToProducts.productId),
  }),
);

export const usersToProductsRelations = relations(
  usersToProducts,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToProducts.userId],
      references: [users.id],
    }),
    product: one(products, {
      fields: [usersToProducts.productId],
      references: [products.id],
    }),
  }),
);

export const guests = mysqlTable("guest", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const guestsRelations = relations(users, ({ many }) => ({
  usersToProducts: many(usersToProducts),
  products: many(products),
  todos: many(todos),
  carts: many(carts),
}));

export const capabilities = mysqlTable("capabilities", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  promoteUsers: boolean("promote_users").notNull().default(false),
  removeUsers: boolean("remove_users").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const capabilitiesRelations = relations(capabilities, ({ one }) => ({
  user: one(users, {
    fields: [capabilities.userId],
    references: [users.id],
  }),
}));
