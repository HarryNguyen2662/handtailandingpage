import { SidebarNav } from "~/islands/navigation/sidebar-nav";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { redirect } from "~/navigation";
import { dashboardConfig } from "~/server/config/dashboard";
import { getServerAuthSession } from "~/utils/auth/users";

interface DashboardLayoutProperties {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProperties) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
