import { env } from "~/env.mjs";
import { Card, CardContent } from "~/islands/primitives/card";

type ShowInfoProps = {
  debug?: boolean;
  hide?: boolean;
  session?: any;
};

export function ShowInfo({
  hide = false,
  debug = false,
  session = null,
}: ShowInfoProps) {
  // ===========================================
  // IMPORTANT
  // ===========================================
  const importantVars = [
    "NEXT_PUBLIC_DB_PROVIDER",
    "DATABASE_URL",
    "NEXT_PUBLIC_AUTH_PROVIDER",
    "NEXT_PUBLIC_APP_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "NEXT_PUBLIC_INTL_PROVIDER",
  ];
  const isImportantVarsWithoutKeys: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  importantVars.forEach((envVar) => {
    if (!env[envVar]) {
      isImportantVarsWithoutKeys.push(envVar);
    }
  });

  // ===========================================
  // CLERK
  // ===========================================
  const clerkVars = ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];
  const missingClerkVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  clerkVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingClerkVars.push(envVar);
    }
  });
  const isClerkProviderWithoutKeys =
    env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" && missingClerkVars.length > 0;

  // ===========================================
  // STRIPE
  // ===========================================
  const stripeVars = [
    "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
    "STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SIGNING_SECRET",
  ];
  const missingStripeVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  stripeVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingStripeVars.push(envVar);
    }
  });
  const isStripeWithoutKeys = missingStripeVars.length > 0;

  // ===========================================
  // AUTHJS
  // ===========================================
  const authjsVars = [
    "DISCORD_CLIENT_SECRET",
    "DISCORD_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
  ];
  const missingAuthjsVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  authjsVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingAuthjsVars.push(envVar);
    }
  });
  const isAuthjsProviderWithoutKeys =
    (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs" ||
      !env.NEXT_PUBLIC_AUTH_PROVIDER) &&
    missingAuthjsVars.length > 0;
  // Do not not show the `authjs` alert if at least
  // one pair of client ID and secret is specified.
  const hasAnyAuthClientInfo =
    (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) ||
    (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) ||
    (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET);

  // ===========================================
  // OTHER
  // ===========================================
  const otherVars = [
    "UPLOADTHING_SECRET",
    "UPLOADTHING_APP_ID",
    "GITHUB_CLIENT_SECRET",
    "NEXT_PUBLIC_IS_LIVE",
    "CHECK_BOT_ACTIVITY",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "ADDITIONAL_CSP_ORIGINS",
    "NEXT_PUBLIC_CSP_XSS",
  ];
  const missingOtherVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  otherVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingOtherVars.push(envVar);
    }
  });
  const isOtherVarsWithoutKeys = missingOtherVars.length > 0;

  // ===========================================
  // COMPONENT
  // ===========================================

  // Check if all environment variables are present
  const allVarsPresent =
    isImportantVarsWithoutKeys.length === 0 &&
    (!isClerkProviderWithoutKeys || missingClerkVars.length === 0) &&
    (!isStripeWithoutKeys || missingStripeVars.length === 0) &&
    (hasAnyAuthClientInfo || !isAuthjsProviderWithoutKeys) &&
    missingOtherVars.length === 0;

  // Do not display the component if hide=true or all variables are present
  if (allVarsPresent || hide || env.NEXT_PUBLIC_HIDE_ENV_INFO === "true") {
    return null;
  }

  return <></>;
}
