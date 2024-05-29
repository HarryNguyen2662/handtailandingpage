import type { SidebarNavItem } from "~/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

/**
 * You can keep it in sync with similar:
 * src/islands/navigation/user-menu.tsx
 */
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [],
};
