import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { isDashboardSection } from "@/components/dashboard/navigation";

export const dynamic = "force-dynamic";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const readableTitle = section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return { title: isDashboardSection(section) ? readableTitle : "Not found" };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  if (!isDashboardSection(section) || section === "overview") notFound();
  return <DashboardPage activeSection={section} />;
}
