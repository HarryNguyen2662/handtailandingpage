import { type Metadata } from "next";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { cn, formatDate } from "~/utils";
import { and, eq, not } from "drizzle-orm";
import toast from "react-hot-toast";

import { getStripeAccountAction } from "~/core/stripe/actions";
import { db } from "~/data/db";
import { products, stores } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { LoadingButton } from "~/islands/loading-button";
import { buttonVariants } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Input } from "~/islands/primitives/input";
import { Label } from "~/islands/primitives/label";
import { Textarea } from "~/islands/primitives/textarea";
import { ConnectStoreToStripeButton } from "~/islands/stripe-btn-connect";
import { Link } from "~/navigation";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Manage Store",
  description: "Manage your store",
};

interface UpdateStorePageProperties {
  params: {
    storeId: string;
  };
}

export default async function UpdateStorePage({
  params,
}: UpdateStorePageProperties) {
  const storeId = Number(params.storeId);

  async function updateStore(fd: FormData) {
    "use server";

    const name = fd.get("name") as string;
    const description = fd.get("description") as string;

    const storeWithSameName = await db.query.stores.findFirst({
      where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
      columns: {
        id: true,
      },
    });

    if (storeWithSameName) {
      toast.error("Store name already taken.");
      return;
    }

    await db
      .update(stores)
      .set({ name, description })
      .where(eq(stores.id, storeId));

    revalidatePath(`/dashboard/stores/${storeId}`);
  }

  async function deleteStore() {
    "use server";

    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
      columns: {
        id: true,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    await db.delete(stores).where(eq(stores.id, storeId));

    // Delete all products of this store
    await db.delete(products).where(eq(products.storeId, storeId));

    const path = "/dashboard/stores";
    revalidatePath(path);
    redirect(path);
  }

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
    columns: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!store) {
    notFound();
  }

  const { account: stripeAccount } = await getStripeAccountAction({
    storeId,
  });

  return (
    <div className="space-y-6">
      {stripeAccount ?
        <Card
          as="section"
          id="manage-stripe-account"
          aria-labelledby="manage-stripe-account-heading"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              Manage Stripe account
            </CardTitle>
            <CardDescription>
              Manage your Stripe account and view your payouts
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-email">Email</Label>
              <Input
                id="stripe-account-email"
                name="stripeAccountEmail"
                readOnly
                defaultValue={stripeAccount.email ?? "N/A"}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-country">Country</Label>
              <Input
                id="stripe-account-country"
                name="stripeAccountCountry"
                readOnly
                defaultValue={stripeAccount.country}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-currency">Currency</Label>
              <Input
                id="stripe-account-currency"
                name="stripeAccountCurrency"
                className="uppercase"
                readOnly
                defaultValue={stripeAccount.default_currency}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-created">Created</Label>
              <Input
                id="stripe-account-created"
                name="stripeAccountCreated"
                readOnly
                defaultValue={
                  stripeAccount.created ?
                    formatDate(stripeAccount.created * 1000)
                  : "N/A"
                }
              />
            </fieldset>
          </CardContent>
          <CardFooter>
            <Link
              aria-label="Manage Stripe account"
              href="https://dashboard.stripe.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  className: "text-center",
                }),
              )}
            >
              Manage Stripe account
            </Link>
          </CardFooter>
        </Card>
      : <Card
          as="section"
          id="connect-to-stripe"
          aria-labelledby="connect-to-stripe-heading"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              Connect to Stripe
            </CardTitle>
            <CardDescription>
              Connect your store to Stripe to start accepting payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectStoreToStripeButton storeId={storeId} />
          </CardContent>
        </Card>
      }
      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateStore} className="grid w-full max-w-xl gap-5">
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
                defaultValue={store.name}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
                defaultValue={store.description ?? ""}
              />
            </fieldset>
            <div className="flex flex-col gap-2 xs:flex-row">
              <LoadingButton>
                Update store
                <span className="sr-only">Update store</span>
              </LoadingButton>
              <LoadingButton formAction={deleteStore} variant="destructive">
                Delete store
                <span className="sr-only">Delete store</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
