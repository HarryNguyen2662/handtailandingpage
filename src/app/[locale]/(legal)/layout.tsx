import { type ReactNode } from "react";
import { ChevronLeftIcon } from "lucide-react";

import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { Button } from "~/islands/primitives/button";
import { Link } from "~/navigation";

type Props = {
  children?: ReactNode;
};

export default function LegalLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
