"use client";

import * as React from "react";
import { cn } from "~/utils";
import { useFormStatus } from "react-dom";

import { useIsClient } from "~/hooks/use-is-client";
import { Icons } from "~/islands/icons";
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "~/islands/primitives/button";
import { Skeleton } from "~/islands/primitives/skeleton";

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { pending } = useFormStatus();
    const mounted = useIsClient();

    if (!mounted)
      return (
        <Skeleton
          className={cn(
            buttonVariants({ variant, size, className }),
            "bg-muted text-muted-foreground",
          )}
        >
          {props.children}
        </Skeleton>
      );

    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      >
        {pending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {props.children}
      </Button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
