import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { type CuratedStore } from "~/types";
import { cn } from "~/utils";
import { PackagePlus, PlusIcon } from "lucide-react";

import { Link as ButtonLink } from "~/core/link";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Badge } from "~/islands/primitives/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Link } from "~/navigation";
import { getRandomPatternStyle } from "~/server/pattern";

interface StoreCardProps {
  store: CuratedStore;
  href: string;
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Link aria-label={store.name} href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/20" />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 text-white",
              store.stripeAccountId ? "bg-green-600" : "bg-red-600",
            )}
          >
            {store.stripeAccountId ? "Active" : "Inactive"}
          </Badge>
          <div
            className="h-full rounded-t-md"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{store.name}</CardTitle>
          {store.description ?
            <CardDescription className="line-clamp-2">
              {store.description}
            </CardDescription>
          : null}
        </CardHeader>
      </Card>
    </Link>
  );
}
