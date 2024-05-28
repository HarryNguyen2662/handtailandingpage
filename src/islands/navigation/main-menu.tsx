"use client";

import * as React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { type MainMenuItem } from "~/types";
import { cn } from "~/utils";
import { ActivitySquare } from "lucide-react";

import { siteConfig } from "~/app";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/islands/navigation/nav-menu";
import { Link } from "~/navigation";

interface MainMenuProps {
  items?: MainMenuItem[];
}

export function MainMenu({ items }: MainMenuProps) {
  const segment = useSelectedLayoutSegment();
  const v2_main_menu_experimental = false;

  return (
    <div className="hidden gap-6 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <Link href="/" legacyBehavior passHref>
            {items?.[0]?.items ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto">
                  {items[0].title}
                </NavigationMenuTrigger>
                <NavigationMenuContent />
              </NavigationMenuItem>
            ) : null}
          </Link>
          <Link href="/mophong120" legacyBehavior passHref>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto">
                Sản Phẩm
              </NavigationMenuTrigger>
              <NavigationMenuContent />
            </NavigationMenuItem>
          </Link>{" "}
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto">
                Đào Tạo
              </NavigationMenuTrigger>
              <NavigationMenuContent />
            </NavigationMenuItem>
          </Link>{" "}
          <Link href="/gioithieu" legacyBehavior passHref>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto">
                Giới Thiệu
              </NavigationMenuTrigger>
              <NavigationMenuContent />
            </NavigationMenuItem>
          </Link>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto">
                Liên Hệ
              </NavigationMenuTrigger>
              <NavigationMenuContent />
            </NavigationMenuItem>
          </Link>
          {/*items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-auto capitalize">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent />
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-auto font-heading",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              ),
            )*/}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

/**
 * @see https://github.com/mickasmt/next-saas-stripe-starter/blob/main/components/layout/main-nav.tsx
 * @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#useselectedlayoutsegments
 * @see https://github.com/vercel/next.js/blob/canary/docs/02-app/01-building-your-application/01-routing/08-parallel-routes.mdx
 */
