import type { ReactNode } from "react";

import { typography } from "~/server/text";

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  return (
    <main className="bg-background text-foreground antialiased">
      <div className="container grid min-h-screen place-content-center text-center duration-700 animate-in fade-in">
        <h1 className={typography.h1}>{title}</h1>
        {children}
      </div>
    </main>
  );
}
