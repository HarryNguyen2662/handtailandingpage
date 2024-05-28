import type { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "~/core/trpc/root";
import { createTRPCContext } from "~/core/trpc/trpc";
import { env } from "~/env.mjs";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === "development" ?
        ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
  });

export { handler as GET, handler as POST };

/**
 * Learning resources and inspirations
 * ===================================
 * @see https://youtu.be/qCLV0Iaq9zU
 * @see https://github.com/t3-oss/create-t3-app/blob/next/cli/template/extras/src/app/api/trpc/%5Btrpc%5D/route.ts
 */
