import {
  BarChart3,
  BellRing,
  Bot,
  Box,
  FileText,
  Home,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type DashboardSection =
  | "overview"
  | "autopilot"
  | "brief"
  | "sales"
  | "products"
  | "content"
  | "jarvis"
  | "shop-setup";

export type NavigationItem = {
  id: DashboardSection;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export const primaryNavigation: NavigationItem[] = [
  { id: "overview", label: "Overview", href: "/", icon: Home },
  { id: "autopilot", label: "Autopilot", href: "/autopilot", icon: Sparkles, badge: "2" },
  { id: "brief", label: "Brief", href: "/brief", icon: BellRing },
  { id: "sales", label: "Sales", href: "/sales", icon: BarChart3 },
  { id: "products", label: "Products", href: "/products", icon: Box },
  { id: "content", label: "Content", href: "/content", icon: FileText },
  { id: "jarvis", label: "Jarvis", href: "/jarvis", icon: Bot },
];

export const setupNavigation: NavigationItem = {
  id: "shop-setup",
  label: "Shop setup",
  href: "/shop-setup",
  icon: Settings,
};

export const allSections = [...primaryNavigation, setupNavigation];

export function isDashboardSection(value: string): value is DashboardSection {
  return allSections.some((item) => item.id === value);
}
