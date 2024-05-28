"use server";

import { revalidatePath } from "next/cache";
import { slugify } from "~/utils";
import { and, asc, desc, eq, gt, isNull, lt, not, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/data/db";
import { products, stores, type Store } from "~/data/db/schema";
import type { getStoreSchema } from "~/data/validations/store";
import { getStoresSchema, storeSchema } from "~/data/validations/store";

export async function getStoresAction(
  rawInput: z.infer<typeof getStoresSchema>,
) {
  try {
    const input = getStoresSchema.parse(rawInput);

    const limit = input.limit ?? 10;
    const offset = input.offset ?? 0;
    const [column, order] =
      (input.sort?.split(".") as [
        keyof Store | undefined,
        "asc" | "desc" | undefined,
      ]) ?? [];
    const statuses = input.statuses?.split(".") ?? [];

    const { items, count } = await db.transaction(async (tx) => {
      const items = await tx
        .select({
          id: stores.id,
          name: stores.name,
          description: stores.description,
          stripeAccountId: stores.stripeAccountId,
          productCount: sql<number>`count(*)`,
        })
        .from(stores)
        .limit(limit)
        .offset(offset)
        .leftJoin(products, eq(stores.id, products.storeId))
        .where(
          and(
            input.userId ? eq(stores.userId, input.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive") ?
              not(isNull(stores.stripeAccountId))
            : undefined,
            statuses.includes("inactive") && !statuses.includes("active") ?
              isNull(stores.stripeAccountId)
            : undefined,
          ),
        )
        .groupBy(stores.id)
        .orderBy(
          input.sort === "stripeAccountId.asc" ? asc(stores.stripeAccountId)
          : input.sort === "stripeAccountId.desc" ? desc(stores.stripeAccountId)
          : input.sort === "productCount.asc" ? asc(sql<number>`count(*)`)
          : input.sort === "productCount.desc" ? desc(sql<number>`count(*)`)
          : column && column in stores ?
            order === "asc" ?
              asc(stores[column])
            : desc(stores[column])
          : desc(stores.createdAt),
        );

      const count = await tx
        .select({
          count: sql<number>`count(*)`,
        })
        .from(stores)
        .where(
          and(
            input.userId ? eq(stores.userId, input.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive") ?
              not(isNull(stores.stripeAccountId))
            : undefined,
            statuses.includes("inactive") && !statuses.includes("active") ?
              isNull(stores.stripeAccountId)
            : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return {
        items,
        count,
      };
    });

    return {
      items,
      count,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      // Throw an Error object with the original error message
      throw new TypeError(err.message);
    } else if (err instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(err.issues.map((issue) => issue.message).join("\n"));
    } else {
      // Throw a generic Error for unknown cases
      throw new TypeError("Unknown error.");
    }
  }
}

const extendedStoreSchema = storeSchema.extend({
  userId: z.string(),
});

export async function addStoreAction(
  rawInput: z.infer<typeof extendedStoreSchema>,
) {
  const input = extendedStoreSchema.parse(rawInput);

  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, input.name),
  });

  if (storeWithSameName) {
    return { status: "error", message: "Store name already taken." };
  }

  await db.insert(stores).values({
    name: input.name,
    description: input.description,
    userId: input.userId,
    slug: slugify(input.name),
  });

  revalidatePath("/dashboard/stores");
}

export async function getNextStoreIdAction(
  input: z.infer<typeof getStoreSchema>,
) {
  if (typeof input.id !== "number" || typeof input.userId !== "string") {
    throw new TypeError("Invalid input.");
  }

  const nextStore = await db.query.stores.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(stores.userId, input.userId), gt(stores.id, input.id)),
    orderBy: asc(stores.id),
  });

  if (!nextStore) {
    const firstStore = await db.query.stores.findFirst({
      columns: {
        id: true,
      },
      where: eq(stores.userId, input.userId),
      orderBy: asc(stores.id),
    });

    if (!firstStore) {
      throw new Error("Store not found.");
    }

    return firstStore.id;
  }

  return nextStore.id;
}

export async function getPreviousStoreIdAction(
  input: z.infer<typeof getStoreSchema>,
) {
  if (typeof input.id !== "number" || typeof input.userId !== "string") {
    throw new TypeError("Invalid input.");
  }

  const previousStore = await db.query.stores.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(stores.userId, input.userId), lt(stores.id, input.id)),
    orderBy: desc(stores.id),
  });

  if (!previousStore) {
    const lastStore = await db.query.stores.findFirst({
      columns: {
        id: true,
      },
      where: eq(stores.userId, input.userId),
      orderBy: desc(stores.id),
    });

    if (!lastStore) {
      throw new Error("Store not found.");
    }

    return lastStore.id;
  }

  return previousStore.id;
}
