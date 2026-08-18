"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { TitanMark } from "@/components/brand/titan-mark";
import {
  primaryNavigation,
  setupNavigation,
  type DashboardSection,
} from "./navigation";

type SidebarProps = {
  activeSection: DashboardSection;
  isDemo: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ activeSection, isDemo, mobileOpen, onClose }: SidebarProps) {
  const SetupIcon = setupNavigation.icon;
  return (
    <>
      <button
        aria-label="Close navigation"
        className={`sidebar-scrim${mobileOpen ? " is-visible" : ""}`}
        onClick={onClose}
        type="button"
      />
      <aside className={`sidebar${mobileOpen ? " is-open" : ""}`}>
        <div className="sidebar-brand">
          <TitanMark />
        </div>

        <nav aria-label="Primary navigation" className="sidebar-nav">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`nav-item${active ? " is-active" : ""}`}
                href={item.href}
                key={item.id}
                onClick={onClose}
              >
                <Icon aria-hidden="true" size={16} strokeWidth={1.55} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge mono">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link
            className={`nav-item${activeSection === setupNavigation.id ? " is-active" : ""}`}
            href={setupNavigation.href}
            onClick={onClose}
          >
            <SetupIcon aria-hidden="true" size={16} strokeWidth={1.55} />
            <span>{setupNavigation.label}</span>
          </Link>

          <div className="core-status-card">
            <div className="core-status-heading">
              <span className="status-dot" />
              <strong>Titan Core online</strong>
            </div>
            <p>{isDemo ? "Demo workspace · no shop writes" : "Live provider not configured"}</p>
            <div aria-hidden="true" className="mini-bars">
              {[31, 48, 40, 63, 46].map((height, index) => (
                <span key={index} style={{ height }} />
              ))}
            </div>
          </div>

          <div className="profile-card">
            <span className="avatar">AA</span>
            <span className="profile-copy">
              <strong>Amaan</strong>
              <small>Owner</small>
            </span>
            <span className="replay-label mono">Replay</span>
            <ChevronRight aria-hidden="true" size={14} />
          </div>
        </div>
      </aside>
    </>
  );
}
