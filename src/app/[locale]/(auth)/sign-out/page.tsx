import { type Metadata } from "next";

import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import { LogOutButtons } from "~/islands/account/logout-buttons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import { redirect } from "~/navigation";
import { getServerAuthSession } from "~/utils/auth/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Sign out",
  description: "Sign out of your account",
};

export default async function SignOutPage() {
  const session = await getServerAuthSession();
  if (!session) return redirect("/");

  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>

      <LogOutButtons />
    </Shell>
  );
}
