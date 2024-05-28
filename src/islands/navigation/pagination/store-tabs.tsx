"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/utils";

import { Tabs, TabsList, TabsTrigger } from "~/islands/primitives/tabs";

interface StoreTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  storeId: number;
}

export function StoreTabs({ className, storeId, ...props }: StoreTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      title: "Store",
      href: `/dashboard/stores/${storeId}`,
    },
    {
      title: "Products",
      href: `/dashboard/stores/${storeId}/products`,
    },
    {
      title: "Orders",
      href: `/dashboard/stores/${storeId}/orders`,
    },
    {
      title: "Analytics",
      href: `/dashboard/stores/${storeId}/analytics`,
    },
  ];

  return (
    <Tabs
      {...props}
      className={cn("w-full overflow-x-auto", className)}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              "rounded-sm",
              pathname === tab.href &&
                "bg-background text-foreground shadow-sm",
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
