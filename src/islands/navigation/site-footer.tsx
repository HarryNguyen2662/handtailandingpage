import { cn } from "~/utils";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

import { siteConfig } from "~/app";
import { env } from "~/env.mjs";
import { SubscribeToNewsletterForm } from "~/forms/newsletter-subscribe";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";
import { ExtraContent } from "~/plugins/million/islands/users-online";

export async function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-20"
        >
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="flex flex-col items-center space-y-3 lg:items-start"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-base font-medium mb-4">Địa chỉ</h4>
                <p className="text-gray-400">
                  123 Lý Đạo Thành, Quận Sơn Trà, TP. Đà Nẵng
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium mb-4">Liên hệ</h4>
                <p className="text-gray-400">Điện thoại: 0905103928</p>
                <p className="text-gray-400">Email: contact@htaitech.net</p>
              </div>
            </div>
            <h4 className="text-base font-medium">Theo dõi chúng tôi:</h4>
            <SubscribeToNewsletterForm />
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">X (known as Twitter)</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">X (known as Twitter)</span>
              </Link>
              {/* UNCOMMENT AS NEEDED & ADD <Room /> TO LocaleLayout */}
              {/* {env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== null &&
                env.DEV_DEMO_NOTES === "true" && <ExtraContent />} */}
            </div>
            <div
              id="footer-copyright"
              aria-labelledby="footer-copyright-text"
              className="flex items-center justify-center space-x-4 lg:justify-start"
            >
              <div className="block text-sm text-muted-foreground sm:text-center">
                © {new Date().getFullYear()}{" "}
                <Link target="_blank" href="/" className="hover:underline">
                  {siteConfig.company.name}
                </Link>
                . All Rights Reserved.
              </div>
            </div>
          </section>
        </section>
      </Shell>
    </footer>
  );
}
