/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable sonarjs/no-duplicate-string */
/**
 * Content Security Policy
 * =======================
 *
 * TODO: THIS FILE IS STILL A WORK IN PROGRESS
 * TODO: TO ENABLE: NEXT_PUBLIC_CSP_XSS="TRUE"
 *
 * This file configures the Content Security Policy (CSP) for the application.
 * It's designed to be modular and easily adjustable to fit different environments.
 * Regularly review and update the CSP policy to align with security best practices.
 *
 * This file can be de/activated by toggling boolean NEXT_PUBLIC_CSP_XSS value in .env.
 * For CSP changes in dev runtime, save next.config.mjs file to reload Next.js' server.
 *
 * todo: looks like we need to specify some policies here and some
 * todo: in images.contentSecurityPolicy (of next.config.mjs file)
 *
 * @see https://github.com/payloadcms/payload/blob/main/templates/ecommerce/csp.js
 */

import { env } from "../../env.mjs";

// CSP Utils (scroll down for CSP Directives)
// ------------------------------------------

/**
 * Determines whether the environment is development.
 * @returns {boolean} Whether the environment is dev.
 */
const isDevEnv = () => {
  return process.env.NODE_ENV === "development";
};

/**
 * Determines the protocol based on the environment.
 * @returns {string} The protocol (http or https).
 */
const determineProtocol = () => {
  return isDevEnv() ? "http" : "https";
};

/**
 * Extracts the domain from a URL.
 * @param {string} url - The URL to extract the domain from.
 * @returns {string} The extracted domain or an empty string if the URL is invalid.
 */
const extractDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch (error) {
    console.error("Invalid URL in CSP policy:", url);
    return "";
  }
};

/**
 * Determines the application's domain for use in CSP directives.
 * Read the details in the end of this file for more information.
 */
const appDomain = () => {
  if (env.NEXT_PUBLIC_APP_URL) {
    return extractDomain(env.NEXT_PUBLIC_APP_URL);
  }
  if (isDevEnv() || !process.env.VERCEL_URL) {
    return "localhost:3000";
  }
  return extractDomain(process.env.VERCEL_URL);
};

// [ContentSecurityPolicy] CSP Directives
// --------------------------------------

// Base directives common to multiple policies.
const baseDirectives = () => ({
  "default-src": ["'self'"],
  "font-src": [
    "'self'",
    `${determineProtocol()}://*.${appDomain()}`,
    env.ADDITIONAL_CSP_ORIGINS,
    env.NEXT_PUBLIC_APP_URL,
  ],
  "style-src": [
    "'self'",
    "'unsafe-hashes'",
    "'unsafe-inline'",
    "'nonce-tanstack'",
    "https://*.googleapis.com",
    // "https://fonts.googleapis.com",
  ],
});

/**
 * Specific directives for different resource types.
 * Adjust these directives as per the application's requirements.
 */
const scriptSrcDirectives = () => {
  const directives = [
    ...baseDirectives()["default-src"],
    "'unsafe-eval'",
    "'unsafe-inline'",
    "https://*.clerk.accounts.dev",
    "https://*.google.com",
    "https://*.googleapis.com",
    "https://*.stripe.com",
    "https://challenges.cloudflare.com",
    "https://va.vercel-scripts.com",
    // "https://accounts.google.com",
    // "https://checkout.stripe.com",
    // "https://js.stripe.com",
    // "https://maps.googleapis.com",
    `${determineProtocol()}://*.${appDomain()}`,
    env.ADDITIONAL_CSP_ORIGINS,
    env.NEXT_PUBLIC_APP_URL,
  ];
  // Example for development environment usage only
  // if (isDevEnv()) { directives.push("'unsafe-inline'", "'unsafe-eval'"); }
  return directives;
};

/**
 * Specific directives for different resource types.
 * Adjust these directives as per the application's requirements.
 */
const specificDirectives = () => ({
  "script-src": scriptSrcDirectives(),
  "child-src": ["'self'", "blob:"],
  "img-src": [
    "'self'",
    "data:",
    "https://*.clerk.com",
    "https://*.githubusercontent.com",
    "https://*.googleusercontent.com",
    "https://*.stripe.com",
    "https://*.youtube.com",
    "https://api.dicebear.com",
    "https://authjs.dev",
    "https://cdn.discordapp.com",
    "https://discordapp.com",
    "https://githubusercontent.com",
    "https://googleusercontent.com",
    "https://i.imgur.com",
    "https://images.unsplash.com",
    "https://pbs.twimg.com",
    "https://res.cloudinary.com",
    "https://utfs.io",
    "https://www.gravatar.com",
    // "https://authjs.dev",
    // "https://discordapp.com",
    // "https://img.clerk.com",
    // "https://img.youtube.com",
    `${determineProtocol()}://*.${appDomain()}`,
    env.ADDITIONAL_CSP_ORIGINS,
    env.NEXT_PUBLIC_APP_URL,
  ],
  "frame-src": [
    "'self'",
    "https://*.google.com",
    "https://*.stripe.com",
    "https://challenges.cloudflare.com",
    // "https://accounts.google.com",
    // "https://checkout.stripe.com",
    // "https://hooks.stripe.com",
    // "https://js.stripe.com",
    `${determineProtocol()}://*.${appDomain()}`,
    env.ADDITIONAL_CSP_ORIGINS,
    env.NEXT_PUBLIC_APP_URL,
  ],
  "connect-src": [
    "'self'",
    "https://*.clerk.accounts.dev",
    "https://*.google.com",
    "https://*.googleapis.com",
    "https://*.stripe.com",
    // "https://accounts.google.com",
    // "https://api.stripe.com",
    // "https://checkout.stripe.com",
    // "https://maps.googleapis.com",
    `${determineProtocol()}://*.${appDomain()}`,
    env.ADDITIONAL_CSP_ORIGINS,
    env.NEXT_PUBLIC_APP_URL,
  ],
});

// Merging base and specific directives
const policies = { ...baseDirectives(), ...specificDirectives() };
// Generating the Content Security Policy string
const ContentSecurityPolicy = Object.entries(policies)
  .map(([key, sources]) => `${key} ${sources.join(" ")}`)
  .join("; ");
export default ContentSecurityPolicy;

/**
 * Details for appDomain and protocol
 * ==================================
 *
 * Determines the application's domain for use in CSP directives.
 *
 * - First, attempts to extract the domain from env.NEXT_PUBLIC_APP_URL, if it is set.
 * - If env.NEXT_PUBLIC_APP_URL is not set, the code then checks the environment.
 *   - If the NODE_ENV environment variable is not set, is set to 'development', or if
 *     the VERCEL_URL environment variable is not set, it defaults to "http://localhost:3000".
 *   - This default is useful for local development environments or in cases where
 *     VERCEL_URL is not provided in deployment.
 *   - Otherwise, if in a production environment and VERCEL_URL is set, VERCEL_URL is used.
 * - This ensures that appDomain always has a meaningful value based on the application's
 *   running environment and available environment variables.
 * - protocol is then determined based on the current environment, ensuring that the
 *   application uses the correct protocol ('http' or 'https') for its operation.
 *
 * REPORT_URL example usage:
 * =========================
 *
 * Thanks to it you can set up a specialized services for handling types of reports.
 * You simply point report-uri directive to their endpoint, and they handle the rest.
 *
 * Sentry | Cloud Logging | CloudWatch | ELK Stack | Splunk | Graylog | Self-hosted
 *
 * const specificDirectives = () => ({
 *  "report-uri": [
 *    "https://your-report-collector.example.com/report-csp-violations",
 *  ],
 * });
 *
 * @see https://docs.sentry.io/product/security-policy-reporting
 */
