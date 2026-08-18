"use client";

import { Bell, ChevronDown, Focus, Menu, Plus } from "lucide-react";

import type { DashboardSection } from "./navigation";

type TopbarProps = {
  activeSection: DashboardSection;
  focusMode: boolean;
  isDemo: boolean;
  notificationsOpen: boolean;
  onConnect: () => void;
  onFocusToggle: () => void;
  onJump: (value: string) => void;
  onMenu: () => void;
  onNewCampaign: () => void;
  onNotificationsToggle: () => void;
};

const sectionTitles: Record<DashboardSection, string> = {
  overview: "Jarvis growth command centre",
  autopilot: "Shadow Autopilot",
  brief: "Jarvis morning brief",
  sales: "Sales intelligence",
  products: "Product signals",
  content: "Content intelligence",
  jarvis: "Jarvis workspace",
  "shop-setup": "Shop setup",
};

export function Topbar({
  activeSection,
  focusMode,
  isDemo,
  notificationsOpen,
  onConnect,
  onFocusToggle,
  onJump,
  onMenu,
  onNewCampaign,
  onNotificationsToggle,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <button aria-label="Open navigation" className="mobile-menu-button icon-button" onClick={onMenu}>
          <Menu aria-hidden="true" size={18} />
        </button>
        <div>
          <p className="eyebrow">{isDemo ? "Demo shop · 30-day scenario" : "Live workspace"}</p>
          <h1>{sectionTitles[activeSection]}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="mode-control" aria-label="Data mode">
          <span className="mode-badge">{isDemo ? "Demo" : "Live"}</span>
          <span className="mode-lock">• {isDemo ? "Live locked" : "Provider unavailable"}</span>
        </div>

        <label className="jump-control">
          <span className="sr-only">Jump to dashboard section</span>
          <select defaultValue="" onChange={(event) => onJump(event.target.value)}>
            <option value="" disabled>Jump to…</option>
            <option value="autopilot-workspace">Autopilot</option>
            <option value="performance-overview">Performance</option>
            <option value="product-signals">Products</option>
          </select>
          <ChevronDown aria-hidden="true" size={14} />
        </label>

        <button
          aria-pressed={focusMode}
          className={`button focus-button${focusMode ? " is-active" : ""}`}
          onClick={onFocusToggle}
        >
          <Focus aria-hidden="true" size={14} />
          <span>Focus view</span>
        </button>
        <button className="button connect-button" onClick={onConnect}>Connect TikTok</button>
        <div className="notification-wrap">
          <button
            aria-expanded={notificationsOpen}
            aria-label="Open notifications"
            className="icon-button"
            onClick={onNotificationsToggle}
          >
            <Bell aria-hidden="true" size={16} />
            <span className="notification-count mono">4</span>
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <p className="eyebrow">Demo notifications</p>
              <strong>4 signals need context</strong>
              <p>No live alerts are being received. These entries belong to the fixed sandbox.</p>
            </div>
          )}
        </div>
        <button className="button button-primary campaign-button" onClick={onNewCampaign}>
          <Plus aria-hidden="true" size={15} />
          <span>New campaign</span>
        </button>
      </div>
    </header>
  );
}
