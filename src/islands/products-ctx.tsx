"use client";

import { api } from "~/core/trpc/infer";

export default function ProductsCtx() {
  const { data, isLoading, error } = api.product.getProduct.useQuery();

  console.log(data, isLoading, error);

  return (
    <div>
      <h1>ProductsCtx</h1>
    </div>
  );
}
