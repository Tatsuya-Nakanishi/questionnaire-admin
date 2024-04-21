import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "TOP",
    title: "TOP",
    href: paths.dashboard.overview,
    icon: "chart-pie",
  },
  {
    key: "アンケート一覧",
    title: "アンケート一覧",
    href: paths.dashboard.customers,
    icon: "users",
  },
  {
    key: "新規作成",
    title: "新規作成",
    href: paths.dashboard.integrations,
    icon: "plugs-connected",
  },
  {
    key: "設定",
    title: "設定",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "account",
    title: "Account",
    href: paths.dashboard.account,
    icon: "user",
  },
  {
    key: "error",
    title: "Error",
    href: paths.errors.notFound,
    icon: "x-square",
  },
] satisfies NavItemConfig[];
