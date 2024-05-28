/**
 * Middleware Utilities
 * ====================
 *
 * This file contains utility functions used in the middleware.
 * These functions are intended to enable multi-tenancy in the
 * future, meaning that the same codebase can serve multiple
 * domains. As a result, users will be able to use their own
 * subdomains or domains to access our service and database.
 *
 * [Currently not all code is used] This file takes inspirations from the following:
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/middleware/utils.ts
 */

import { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// function getLocale(req: NextRequest) {
//   const headers = { "accept-language": "en-US,en;q=0.5" };
//   const languages = new Negotiator({ headers }).languages();
//   match(languages, locales, defaultLocale);
// }

// function getLocale(req) {
//   const headers = req.headers;
//   const negotiator = new Negotiator({ headers });
//   const languages = negotiator.languages();
//   const matchedLocale = match(languages, locales, defaultLocale);
//   return matchedLocale;
// }
import { defaultLocale, locales } from "~/navigation";

export function checkIfPageRequestComesFromBot(userAgent: string) {
  // Check for common search bots
  const isSearchBot =
    /Googlebot|Bingbot|Slurp|DuckDuckBot|YandexBot|Baiduspider/i.test(
      userAgent,
    );
  // Check for general bots
  const isGeneralBot = userAgent.includes("bot") || userAgent.includes("crawl");
  // Check for Google PageSpeed Insight or similar tools
  const isLighthouseBot =
    /pagespeed|lighthouse|speed insights|chrome-lighthouse/i.test(userAgent);
  // Return the results
  return { isSearchBot, isGeneralBot, isLighthouseBot };
}

export function getLocale(req: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  // biome-ignore lint/complexity/noForEach: <explanation>
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages =
    new Negotiator({ headers: negotiatorHeaders }).languages() ?? [];
  return matchLocale(languages, locales, defaultLocale);
}

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  domain = domain.replace("www.", ""); // remove www. from domain

  // `path` is the path of the URL (e.g. example.com/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;

  // `fullPath` is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${path}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  // key is the first part of the path (e.g. example.com/stats/github -> stats)
  const key = decodeURIComponent(path.split("/")[1] || "");
  // fullKey is the full path without the first slash (to account for multi-level
  // subpaths, for example, example.com/github/repo -> github/repo)
  const fullKey = decodeURIComponent(path.slice(1));

  return { domain, path, fullPath, key, fullKey };
};

export const getFinalUrl = (target: string, { req }: { req: NextRequest }) => {
  // `query` is the query string (e.g. example.com/github?utm_source=twitter -> ?utm_source=twitter)
  const searchParams = req.nextUrl.searchParams;

  // get the query params of the target url
  const targetUrl = new URL(decodeURIComponent(target));

  // if there are no query params, then return the target url as is (no need to parse it)
  // @see https://github.com/microsoft/TypeScript/issues/54466
  if (searchParams.size === 0) return targetUrl.toString();

  // if searchParams (type: `URLSearchParams`) has the same key as target url, then overwrite it
  for (const [key, value] of searchParams) {
    targetUrl.searchParams.set(key, value);
  }

  // construct final url
  const finalUrl = targetUrl.toString();

  return finalUrl;
};

export const detectBot = (req: NextRequest) => {
  const url = req.nextUrl;
  if (url.searchParams.get("bot")) return true;
  const ua = req.headers.get("User-Agent");
  if (ua) {
    /**
     * Note:
     * - bot is for most bots & crawlers
     * - ChatGPT is for ChatGPT crawling
     * - WhatsApp is for WhatsApp crawler
     * - facebookexternalhit is for Facebook
     * - MetaInspector is for https://metatags.io
     */
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|DuckDuckBot|YandexBot|teoma|slurp|MetaInspector/i.test(
      ua,
    );
  }
  return false;
};

// check if a link can be displayed in an iframe
export const isIframeable = async ({
  url,
  requestDomain,
}: {
  url: string;
  requestDomain: string;
}) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "relivator-bot/1.0",
    },
  });

  // if the request throws a status that's not 200, then it's not iframeable
  if (!res.ok) return false;

  const xFrameOptions = res.headers.get("X-Frame-Options");
  // returns null if there is no `X-Frame-Options` header
  if (xFrameOptions) return false;

  const cspHeader = res.headers.get("content-security-policy");
  // returns null if there is no `content-security-policy` header
  if (!cspHeader) return true;

  const frameAncestorsMatch = cspHeader.match(
    /frame-ancestors\s+([\s\S]+?)(?=;|$)/i,
  );

  if (frameAncestorsMatch?.[1]) {
    const allowedOrigins = frameAncestorsMatch[1].split(/\s+/);
    if (allowedOrigins.includes(requestDomain)) {
      return true;
    }
  }

  return false;
};
