import { DashboardSections, UnavailableDashboard } from "./dashboard-sections";
import { DashboardShell } from "./dashboard-shell";
import type { DashboardSection } from "./navigation";
import { getDashboardSnapshot } from "@/lib/titan/service";

type DashboardPageProps = {
  activeSection: DashboardSection;
};

export async function DashboardPage({ activeSection }: DashboardPageProps) {
  const response = await getDashboardSnapshot();

  if (!response.ok) {
    return (
      <DashboardShell
        activeSection={activeSection}
        disclosure={response.meta.disclosure}
        isDemo={false}
      >
        <UnavailableDashboard response={response} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      activeSection={activeSection}
      disclosure={response.meta.disclosure}
      isDemo={response.meta.isDemo}
    >
      <DashboardSections activeSection={activeSection} snapshot={response.data} />
    </DashboardShell>
  );
}
