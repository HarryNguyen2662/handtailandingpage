"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsClient } from "~/hooks/use-is-client";
import { Button, type ButtonProps } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";

export type ThemesGeneralSwitcherProps = ButtonProps & {
  iconClassName?: string;
};

export function ThemesGeneralSwitcher({
  iconClassName = "mr-2 h-4 w-4",
  className,
  ...props
}: ThemesGeneralSwitcherProps) {
  const { setTheme } = useTheme();
  setTheme("light");

  return <></>;
}
