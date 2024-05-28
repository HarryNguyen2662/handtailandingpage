"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { catchError } from "~/utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import { updateCartItemSchema } from "~/data/validations/cart";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/islands/primitives/form";
import { Input } from "~/islands/primitives/input";
import { addToCartAction } from "~/server/actions/cart";

export interface AddToCartFormProps {
  tAddToCart: string | "Add to cart";
  productId: number;
  storeId: number;
  email?: string;
  session?: any;
}

type Inputs = z.infer<typeof updateCartItemSchema>;

export function AddToCartForm({
  productId,
  storeId,
  tAddToCart,
}: AddToCartFormProps) {
  const id = React.useId();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
      storeId: 1,
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addToCartAction({
          productId,
          quantity: data.quantity,
          storeId,
        });
        toast.success("Added to cart.");
      } catch (error) {
        toast.error(
          "Something wrong with adding to cart. Please try again later.",
        );
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={() =>
              form.setValue(
                "quantity",
                Math.max(0, form.getValues("quantity") - 1),
              )
            }
            disabled={isPending}
          >
            <MinusIcon className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="h-8 w-14 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (Number.isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={() =>
              form.setValue("quantity", form.getValues("quantity") + 1)
            }
            disabled={isPending}
          >
            <PlusIcon className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>

        <Button
          type="submit"
          size="default"
          variant="secondary"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          {tAddToCart}
        </Button>
      </form>
    </Form>
  );
}
