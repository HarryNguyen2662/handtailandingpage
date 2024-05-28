"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "~/utils";

import { type Store } from "~/data/db/schema";
import { Button } from "~/islands/primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/islands/primitives/command";
import { Dialog, DialogTrigger } from "~/islands/primitives/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/islands/primitives/popover";
import { getRandomPatternStyle } from "~/server/pattern";

interface StoreSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  currentStore: Pick<Store, "id" | "name">;
  stores: Pick<Store, "id" | "name">[];
  dashboardRedirectPath: string;
}

export function StoreSwitcher({
  currentStore,
  stores,
  dashboardRedirectPath,
  className,
  ...props
}: StoreSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select a store"
            className={cn(
              "w-[140px] justify-between px-3 sm:w-[180px]",
              className,
            )}
            {...props}
          >
            <div
              className="mr-2 aspect-square h-4 w-4 rounded-full"
              style={getRandomPatternStyle(String(currentStore.id))}
            />
            <span className="line-clamp-1">{currentStore.name}</span>
            <CaretSortIcon
              className="ml-auto h-4 w-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[140px] p-0 sm:w-[180px]">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store..." />
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup>
                {stores.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => {
                      router.push(`/dashboard/stores/${store.id}`);
                      setIsOpen(false);
                    }}
                    className="text-sm"
                  >
                    <div
                      className="mr-2 aspect-square h-4 w-4 rounded-full"
                      style={getRandomPatternStyle(String(store.id))}
                    />
                    <span className="line-clamp-1">{store.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore.id === store.id ?
                          "opacity-100"
                        : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      router.push(dashboardRedirectPath);
                      setIsOpen(false);
                      setIsDialogOpen(true);
                    }}
                  >
                    <PlusCircledIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Create store
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
