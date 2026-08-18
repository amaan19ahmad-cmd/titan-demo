"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Database, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Modal } from "@/components/ui/modal";
import { allSections, type DashboardSection } from "./navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type DialogName = "campaign" | "connect" | "dataset" | null;

type DashboardActions = {
  notify: (message: string) => void;
  openDialog: (dialog: Exclude<DialogName, null>) => void;
};

const DashboardActionsContext = createContext<DashboardActions | null>(null);

export function useDashboardActions(): DashboardActions {
  const context = useContext(DashboardActionsContext);
  if (!context) throw new Error("useDashboardActions must be used inside DashboardShell");
  return context;
}

type DashboardShellProps = {
  activeSection: DashboardSection;
  children: React.ReactNode;
  disclosure: string;
  isDemo: boolean;
};

export function DashboardShell({
  activeSection,
  children,
  disclosure,
  isDemo,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogName>(null);
  const [toast, setToast] = useState<string | null>(null);

  const closeDialog = useCallback(() => setDialog(null), []);
  const actions = useMemo<DashboardActions>(
    () => ({
      notify: (message) => setToast(message),
      openDialog: (nextDialog) => setDialog(nextDialog),
    }),
    [],
  );

  useEffect(() => {
    document.body.classList.toggle("focus-mode", focusMode);
    return () => document.body.classList.remove("focus-mode");
  }, [focusMode]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`app-shell${focusMode ? " is-focus-mode" : ""}`}>
      <Sidebar
        activeSection={activeSection}
        isDemo={isDemo}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="app-column">
        <Topbar
          activeSection={activeSection}
          focusMode={focusMode}
          isDemo={isDemo}
          notificationsOpen={notificationsOpen}
          onConnect={() => setDialog("connect")}
          onFocusToggle={() => setFocusMode((value) => !value)}
          onJump={jumpTo}
          onMenu={() => setMobileOpen(true)}
          onNewCampaign={() => setDialog("campaign")}
          onNotificationsToggle={() => setNotificationsOpen((value) => !value)}
        />
        <DashboardActionsContext.Provider value={actions}>
          <main className="dashboard-main">{children}</main>
        </DashboardActionsContext.Provider>
      </div>

      <nav aria-label="Mobile navigation" className="mobile-bottom-nav">
        {allSections.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <Link aria-current={activeSection === item.id ? "page" : undefined} href={item.href} key={item.id}>
              <Icon aria-hidden="true" size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Modal
        description="Live commerce access is intentionally not configured in this build."
        open={dialog === "connect"}
        title="Connect a live shop later"
        onClose={closeDialog}
      >
        <div className="safety-callout">
          <LockKeyhole aria-hidden="true" size={20} />
          <div>
            <strong>No account was contacted</strong>
            <p>TikTok credentials and API adapters have not been added. Titan will not imply that sandbox figures came from a live shop.</p>
          </div>
        </div>
        <div className="modal-facts">
          <span><ShieldCheck size={15} />Current mode</span><strong>{isDemo ? "Safe demo" : "Unavailable"}</strong>
          <span><Database size={15} />Data source</span><strong>{isDemo ? "Static fixture" : "No provider"}</strong>
        </div>
        <button className="button button-primary modal-action" onClick={closeDialog}>Keep exploring safely</button>
      </Modal>

      <Modal
        description="Build a draft inside the sandbox. Nothing can be published or charged."
        open={dialog === "campaign"}
        title="New demo campaign"
        onClose={closeDialog}
      >
        <form
          className="campaign-form"
          onSubmit={(event) => {
            event.preventDefault();
            closeDialog();
            setToast("Demo draft reviewed — no campaign was created or published.");
          }}
        >
          <label>Campaign name<input defaultValue="Price reveal variations" maxLength={80} /></label>
          <label>Objective<select defaultValue="creative-test"><option value="creative-test">Creative test</option><option value="product-focus">Product focus</option></select></label>
          <label>Safety mode<input readOnly value="Review only · no execution" /></label>
          <div className="form-note"><ShieldCheck size={16} /><span>Every action remains a proposal until a human approves it. Demo mode cannot execute actions.</span></div>
          <button className="button button-primary modal-action" type="submit">Review demo draft</button>
        </form>
      </Modal>

      <Modal
        description="Provenance travels with every payload returned by Titan."
        open={dialog === "dataset"}
        title="Dataset provenance"
        onClose={closeDialog}
      >
        <div className="dataset-sheet">
          <span className="badge badge-demo">Simulated data</span>
          <h3>Fixed 30-day Titan Workwear scenario</h3>
          <p>{disclosure}</p>
          <dl>
            <div><dt>Writes</dt><dd>Disabled</dd></div>
            <div><dt>Live provider</dt><dd>Not configured</dd></div>
            <div><dt>Truth rule</dt><dd>Unavailable beats invented</dd></div>
          </dl>
        </div>
      </Modal>

      {toast && <div aria-live="polite" className="toast"><ShieldCheck size={16} />{toast}</div>}
    </div>
  );
}

export type { DialogName };
