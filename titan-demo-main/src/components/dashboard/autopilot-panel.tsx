"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronRight, Eye, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import type { DashboardSnapshot } from "@/lib/titan/contracts";
import { useDashboardActions } from "./dashboard-shell";

type AutopilotPanelProps = {
  snapshot: DashboardSnapshot;
};

const stageIcons = [Eye, Sparkles, LockKeyhole, Check, ShieldCheck];

export function AutopilotPanel({ snapshot }: AutopilotPanelProps) {
  const [selectedId, setSelectedId] = useState(snapshot.decisions.items[0]?.id ?? "");
  const { notify } = useDashboardActions();
  const selectedDecision =
    snapshot.decisions.items.find((decision) => decision.id === selectedId) ??
    snapshot.decisions.items[0];

  return (
    <section className="autopilot-card panel" id="autopilot-workspace">
      <header className="autopilot-header">
        <div className="autopilot-icon"><ShieldCheck aria-hidden="true" size={21} /></div>
        <div className="autopilot-copy">
          <p className="eyebrow">Titan Shadow Autopilot · observation only</p>
          <h2>Jarvis is learning before Titan acts</h2>
          <p>Every recommendation is now a measurable decision with evidence, projected impact, your approval and a permanent outcome record.</p>
        </div>
        <div className="shadow-mode">
          <span className="badge badge-success"><span className="status-dot" />Shadow mode active</span>
          <small>Demo rehearsal · simulated outcomes only</small>
        </div>
      </header>

      <div className="autopilot-stages">
        {snapshot.shadowAutopilot.stages.map((stage, index) => {
          const Icon = stageIcons[index] ?? Sparkles;
          return (
            <div className={`stage-item is-${stage.state}`} key={stage.id} title={stage.description}>
              <span className="stage-number mono">0{index + 1}</span>
              <Icon aria-hidden="true" size={14} />
              <span><strong>{stage.label}</strong><small>{stage.description}</small></span>
            </div>
          );
        })}
      </div>

      <div className="autopilot-metrics">
        {snapshot.metrics.map((metric) => (
          <article key={metric.id}>
            <p className="eyebrow">{metric.label}</p>
            <strong className="mono">{metric.displayValue}</strong>
            <span>{metric.description}</span>
          </article>
        ))}
      </div>

      <div className="decision-workspace">
        <div className="decision-queue">
          <div className="section-mini-heading">
            <p className="eyebrow">Decision queue</p>
            <span className="nav-badge mono">{snapshot.decisions.items.length}</span>
          </div>
          <div className="decision-list">
            {snapshot.decisions.items.map((decision) => (
              <button
                className={decision.id === selectedDecision?.id ? "is-selected" : ""}
                key={decision.id}
                onClick={() => setSelectedId(decision.id)}
              >
                <span className={`decision-status is-${decision.status}`}>{decision.statusLabel}</span>
                <strong>{decision.title}</strong>
                <small>{decision.confidencePercent ? `${decision.confidencePercent}% confidence` : "Evidence withheld"}</small>
                <ChevronRight aria-hidden="true" size={15} />
              </button>
            ))}
          </div>
        </div>

        {selectedDecision ? (
          <article className="decision-detail">
            <div className="decision-detail-topline">
              <div className="decision-tags">
                <span className="badge badge-warning">Proposed</span>
                <span className="badge">Forecast data</span>
                <span className="badge">Low risk</span>
              </div>
              {selectedDecision.confidencePercent !== null && (
                <div className="confidence-meter">
                  <span className="mono">Confidence <strong>{selectedDecision.confidencePercent}%</strong></span>
                  <i><b style={{ width: `${selectedDecision.confidencePercent}%` }} /></i>
                </div>
              )}
            </div>
            <h3>{selectedDecision.title}</h3>
            <p>{selectedDecision.description}</p>
            <div className="evidence-grid">
              <div>
                <p className="eyebrow">Jarvis evidence</p>
                <ul>{selectedDecision.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="impact-box">
                <p className="eyebrow">Modelled impact</p>
                <strong className="mono">{selectedDecision.modelledProfitRangeDisplay ?? "Withheld"}</strong>
                <span>Illustrative range, not realised profit.</span>
              </div>
            </div>
            <div className="decision-actions">
              <span><LockKeyhole size={14} />Human approval required</span>
              <button
                className="button button-primary"
                onClick={() => notify("Decision reviewed in demo — Titan executed nothing.")}
              >
                Review decision <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ) : (
          <div className="empty-panel">No decisions are available.</div>
        )}
      </div>
    </section>
  );
}
