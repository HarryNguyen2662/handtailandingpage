"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CartItem } from "~/types";
import { cn } from "~/utils";
import { toast } from "react-hot-toast";

import type { Product } from "~/data/db/schema";
import { useDebounce } from "~/hooks/use-debounce";
import { Icons } from "~/islands/icons";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { PaginationButton } from "~/islands/navigation/pagination/pagination-button";
import { Button } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";
import { Input } from "~/islands/primitives/input";
import { Separator } from "~/islands/primitives/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/islands/primitives/sheet";
import { Slider } from "~/islands/primitives/slider";
import { addToCartAction, deleteCartItemAction } from "~/server/actions/cart";
import { sortOptions } from "~/server/config/products";

interface ProductBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  pageCount: number;
  subcategory: string | null;
  cartItems: CartItem[];
  tAddToCart: string;
}

export function ProductBuilder({
  tAddToCart = "Add to cart",
  products,
  pageCount,
  subcategory,
  cartItems,
  ...props
}: ProductBuilderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "8";
  const sort = searchParams?.get("sort") ?? "createdAt.desc";

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 500,
  ]);
  const debouncedPrice = useDebounce(priceRange, 500);

  React.useEffect(() => {
    const [min, max] = debouncedPrice;
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
      );
    });
  }, [debouncedPrice]);

  const addToCart = React.useCallback(
    async (product: Product) => {
      try {
        if (!cartItems.map((item) => item.productId).includes(product.id)) {
          // Only allow one product per subcategory in cart
          const productIdWithSameSubcategory = cartItems.find(
            (item) => item.subcategory === product.subcategory,
          )?.productId;

          if (productIdWithSameSubcategory) {
            await deleteCartItemAction({
              productId: productIdWithSameSubcategory,
            });
          }

          // console.log("ProductBuilder's await addToCartAction");
          await addToCartAction({
            productId: product.id,
            quantity: 1,
            storeId: Number(product.storeId),
            subcategory: product.subcategory ?? subcategory,
          });

          toast.success("Added to cart.");
          return;
        }

        await deleteCartItemAction({
          productId: product.id,
        });
        toast.success("Removed from cart.");
      } catch (error) {
        error instanceof Error ?
          toast.error(error.message)
        : toast.error("Something went wrong, please try again.");
      }
    },
    [subcategory, cartItems],
  );

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" disabled={isPending} size="sm">
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range ($)
                </h3>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  onValueChange={(value: typeof priceRange) => {
                    setPriceRange(value);
                  }}
                  step={1}
                  thickness="thin"
                  value={priceRange}
                  variant="range"
                />
                <div className="flex items-center space-x-4">
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={priceRange[1]}
                    min={0}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([value, priceRange[1]]);
                    }}
                    type="number"
                    value={priceRange[0]}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={500}
                    min={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([priceRange[0], value]);
                    }}
                    type="number"
                    value={priceRange[1]}
                  />
                </div>
              </div>
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  className="w-full"
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                        })}`,
                      );

                      setPriceRange([0, 100]);
                    });
                  }}
                  size="sm"
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" disabled={isPending} size="sm">
              Sort
              <Icons.chevronDown aria-hidden="true" className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "font-bold")}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                    );
                  });
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isPending && !products.length ?
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            isAddedToCart={cartItems
              .map((item) => item.productId)
              .includes(product.id)}
            onSwitch={() => addToCart(product)}
            product={product}
            storeId={Number(product.storeId)}
            variant="switchable"
            tAddToCart={tAddToCart}
          />
        ))}
      </div>
      {products.length ?
        <PaginationButton
          createQueryString={createQueryString}
          isPending={isPending}
          page={page}
          pageCount={pageCount}
          pathname={pathname}
          per_page={per_page}
          router={router}
          sort={sort}
          startTransition={startTransition}
        />
      : null}
    </section>
  );
}
