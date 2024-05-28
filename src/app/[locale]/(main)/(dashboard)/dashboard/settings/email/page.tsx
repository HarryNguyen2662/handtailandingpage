import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "~/data/db";
import { emails } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { UpdateEmailPreferencesForm } from "~/forms/update-email-preferences-form";
import { PageHeader } from "~/islands/navigation/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell-variants";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Email Preferences",
  description: "Manage your email preferences",
};

interface EmailPreferencesPageProperties {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function EmailPreferencesPage({
  searchParams,
}: EmailPreferencesPageProperties) {
  const token =
    typeof searchParams.token === "string" ? searchParams.token : "";

  const emailPreference = await db.query.emails.findFirst({
    where: eq(emails.token, token),
  });

  if (!emailPreference) {
    notFound();
  }

  return (
    <Shell variant="centered">
      <PageHeader title="Email Preferences" className="text-center" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateEmailPreferencesForm emailPreference={emailPreference} />
        </CardContent>
      </Card>
    </Shell>
  );
}
