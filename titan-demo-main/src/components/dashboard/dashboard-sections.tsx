"use client";

import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  CircleAlert,
  Database,
  FileText,
  Link2Off,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import type { DashboardSnapshot, TitanUnavailableResponse } from "@/lib/titan/contracts";
import { AutopilotPanel } from "./autopilot-panel";
import { useDashboardActions } from "./dashboard-shell";
import { JarvisComposer } from "./jarvis-composer";
import type { DashboardSection } from "./navigation";

type SnapshotProps = {
  snapshot: DashboardSnapshot;
};

function SandboxBanner({ snapshot }: SnapshotProps) {
  const { openDialog } = useDashboardActions();
  return (
    <section className="sandbox-banner panel panel-accent">
      <div className="sandbox-identity">
        <span className="sandbox-icon"><Sparkles aria-hidden="true" size={21} /><i><LockKeyhole size={9} /></i></span>
        <div>
          <p className="eyebrow">Simulated · safe sandbox</p>
          <h2>{snapshot.workspace.name}</h2>
          <p>{snapshot.workspace.description}</p>
        </div>
      </div>
      <div className="sandbox-stats">
        {snapshot.topStats.map((stat) => (
          <article key={stat.id} title={stat.description}>
            <span className="eyebrow">{stat.label}</span>
            <strong className="mono">{stat.displayValue}</strong>
          </article>
        ))}
      </div>
      <div className="sandbox-actions">
        <button className="button" onClick={() => openDialog("dataset")}><Database size={14} />Explore dataset</button>
        <button className="button button-primary" onClick={() => openDialog("connect")}>Connect live</button>
      </div>
    </section>
  );
}

function DemoReadyStrip({ snapshot }: SnapshotProps) {
  const { notify } = useDashboardActions();
  return (
    <section className="ready-strip panel">
      <div>
        <p className="eyebrow"><span className="status-dot" />Demo workspace · ready to explore</p>
        <strong>Your realistic Titan sandbox is online</strong>
        <span>{snapshot.period.label} · static test data · never presented as real</span>
      </div>
      <button className="button" onClick={() => notify("Demo rehearsal started — nothing was sent or changed.")}>Run work-sock campaign <ArrowRight size={14} /></button>
    </section>
  );
}

function SalesPanel({ snapshot }: SnapshotProps) {
  const width = 620;
  const height = 170;
  const values = snapshot.sales.series.map((point) => point.gmvPence);
  const maxValue = Math.max(...values, 1);
  const points = snapshot.sales.series
    .map((point, index) => {
      const x = snapshot.sales.series.length === 1 ? width / 2 : (index / (snapshot.sales.series.length - 1)) * width;
      const y = height - (point.gmvPence / maxValue) * (height - 28) - 10;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <section className="data-panel panel" id="performance-overview">
      <header className="data-panel-header">
        <div className="section-icon"><BarChart3 size={18} /></div>
        <div><p className="eyebrow">{snapshot.sales.dataLabel}</p><h2>{snapshot.sales.title}</h2><p>{snapshot.sales.description}</p></div>
        <span className="badge badge-demo">Demo data</span>
      </header>
      <div className="sales-summary">
        <div><span>Views</span><strong className="mono">{snapshot.sales.viewsDisplay}</strong></div>
        <div><span>Orders</span><strong className="mono">{snapshot.sales.ordersDisplay}</strong></div>
        <div><span>GMV</span><strong className="mono">{snapshot.sales.gmvDisplay}</strong></div>
        <div><span>Avg. order</span><strong className="mono">{snapshot.sales.averageOrderValueDisplay}</strong></div>
      </div>
      <div className="chart-wrap">
        <svg aria-labelledby="sales-chart-title" role="img" viewBox={`0 0 ${width} ${height}`}>
          <title id="sales-chart-title">Simulated GMV shape over four weeks</title>
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#66cdeb" stopOpacity=".28" />
              <stop offset="1" stopColor="#66cdeb" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 75, 115, 155].map((y) => <line key={y} stroke="rgba(126,210,233,.09)" x1="0" x2={width} y1={y} y2={y} />)}
          <polygon fill="url(#chart-fill)" points={areaPoints} />
          <polyline fill="none" points={points} stroke="#74d5f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
          {points.split(" ").map((point) => {
            const [cx, cy] = point.split(",");
            return <circle cx={cx} cy={cy} fill="#071b23" key={point} r="4" stroke="#82ddf7" strokeWidth="2" />;
          })}
        </svg>
        <div className="chart-labels">{snapshot.sales.series.map((point) => <span key={point.id}>{point.label}</span>)}</div>
      </div>
    </section>
  );
}

function ProductPanel({ snapshot }: SnapshotProps) {
  return (
    <section className="data-panel panel" id="product-signals">
      <header className="data-panel-header">
        <div className="section-icon"><Box size={18} /></div>
        <div><p className="eyebrow">{snapshot.products.dataLabel}</p><h2>{snapshot.products.title}</h2><p>{snapshot.products.description}</p></div>
      </header>
      <div className="responsive-table" role="region" aria-label="Simulated product performance" tabIndex={0}>
        <table>
          <thead><tr><th>Product</th><th>Views</th><th>Orders</th><th>GMV</th><th>Signal</th></tr></thead>
          <tbody>
            {snapshot.products.items.map((product) => (
              <tr key={product.id}>
                <th scope="row"><span className="product-swatch">{product.productName.charAt(0)}</span>{product.productName}</th>
                <td className="mono">{product.viewsDisplay}</td>
                <td className="mono">{product.ordersDisplay}</td>
                <td className="mono">{product.gmvDisplay}</td>
                <td><span className={`signal-dot is-${product.tone}`} />{product.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ContentPanel({ snapshot }: SnapshotProps) {
  return (
    <section className="data-panel panel">
      <header className="data-panel-header">
        <div className="section-icon"><FileText size={18} /></div>
        <div><p className="eyebrow">{snapshot.content.dataLabel}</p><h2>{snapshot.content.title}</h2><p>{snapshot.content.description}</p></div>
      </header>
      <div className="content-list">
        {snapshot.content.items.map((item, index) => (
          <article key={item.id}>
            <span className="content-rank mono">0{index + 1}</span>
            <div><span>{item.format}</span><strong>{item.title}</strong><p>{item.signal}</p></div>
            <dl><div><dt>Views</dt><dd className="mono">{item.viewsDisplay}</dd></div><div><dt>Orders</dt><dd className="mono">{item.ordersDisplay}</dd></div></dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function BriefPanel({ snapshot }: SnapshotProps) {
  return (
    <section className="brief-panel panel">
      <header className="data-panel-header">
        <div className="section-icon"><Sparkles size={18} /></div>
        <div><p className="eyebrow">Jarvis morning brief · simulated</p><h2>{snapshot.jarvis.greeting}</h2><p>{snapshot.period.refreshedLabel} · confidence is scoped to the demo fixture</p></div>
        {snapshot.jarvis.confidencePercent !== null ? <span className="badge badge-success">{snapshot.jarvis.confidencePercent}% confidence</span> : null}
      </header>
      <div className="brief-grid">
        {snapshot.jarvis.brief.map((item) => (
          <article key={item.id}><span className="mono">{item.sequence}</span><div><p className="eyebrow">{item.label}</p><strong>{item.message}</strong></div></article>
        ))}
      </div>
    </section>
  );
}

function AlertsAndAgents({ snapshot }: SnapshotProps) {
  return (
    <div className="two-column-grid">
      <section className="data-panel panel">
        <header className="data-panel-header compact"><div className="section-icon"><CircleAlert size={18} /></div><div><p className="eyebrow">Daytime watch</p><h2>Signals needing context</h2></div></header>
        <div className="alert-list">
          {snapshot.alerts.map((alert) => <article key={alert.id}><span className={`signal-dot is-${alert.tone}`} /><div><strong>{alert.title}</strong><p>{alert.message}</p></div></article>)}
        </div>
      </section>
      <section className="data-panel panel">
        <header className="data-panel-header compact"><div className="section-icon"><ShieldCheck size={18} /></div><div><p className="eyebrow">Agent evidence</p><h2>Shadow team findings</h2></div></header>
        <div className="agent-list">
          {snapshot.agents.map((agent) => (
            <article key={agent.id}><div><span className={`signal-dot is-${agent.status === "withheld" ? "warning" : "positive"}`} /><strong>{agent.name}</strong></div><span className={`agent-result${agent.status === "withheld" ? " is-withheld" : ""}`}>{agent.status === "withheld" ? "Withheld" : agent.confidencePercent === null ? "Guard" : `${agent.confidencePercent}%`}</span></article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReliabilityPanel({ snapshot }: SnapshotProps) {
  return (
    <section className="reliability-panel panel">
      <ShieldCheck size={22} />
      <div><p className="eyebrow">Titan reliability rule</p><h2>{snapshot.reliability.title}</h2><p>{snapshot.reliability.message}</p></div>
      <span className="badge badge-success">Truth guard active</span>
    </section>
  );
}

function Overview({ snapshot }: SnapshotProps) {
  return (
    <div className="dashboard-stack">
      <SandboxBanner snapshot={snapshot} />
      <JarvisComposer />
      <DemoReadyStrip snapshot={snapshot} />
      <AutopilotPanel snapshot={snapshot} />
      <div className="overview-grid"><SalesPanel snapshot={snapshot} /><ContentPanel snapshot={snapshot} /></div>
      <ProductPanel snapshot={snapshot} />
      <BriefPanel snapshot={snapshot} />
      <AlertsAndAgents snapshot={snapshot} />
      <ReliabilityPanel snapshot={snapshot} />
    </div>
  );
}

function ShopSetup({ snapshot }: SnapshotProps) {
  const { openDialog } = useDashboardActions();
  return (
    <div className="section-page">
      <section className="connection-empty panel">
        <span className="connection-icon"><Link2Off size={25} /></span>
        <p className="eyebrow">Live provider unavailable by design</p>
        <h2>Connect when the architecture is ready</h2>
        <p>This build contains no TikTok adapter, credentials or live commerce data. The visible workspace is <strong>{snapshot.disclosure.label.toLowerCase()}</strong>.</p>
        <button className="button button-primary" onClick={() => openDialog("connect")}>View connection policy <ArrowRight size={14} /></button>
      </section>
      <div className="setup-steps">
        {[
          ["01", "Choose a provider", "Add a future server-side adapter; never expose provider credentials to the browser."],
          ["02", "Validate access", "Verify account identity, scopes and read/write boundaries before requesting data."],
          ["03", "Label provenance", "Only switch the interface to Live after responses prove their source."],
        ].map(([number, title, copy]) => <article className="panel" key={number}><span className="mono">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </div>
  );
}

export function DashboardSections({ activeSection, snapshot }: SnapshotProps & { activeSection: DashboardSection }) {
  if (activeSection === "overview") return <Overview snapshot={snapshot} />;
  if (activeSection === "autopilot") return <div className="section-page"><SectionIntro icon={ShieldCheck} label="Observation before execution" title="Shadow Autopilot" copy={snapshot.shadowAutopilot.description} /><AutopilotPanel snapshot={snapshot} /><AlertsAndAgents snapshot={snapshot} /><ReliabilityPanel snapshot={snapshot} /></div>;
  if (activeSection === "brief") return <div className="section-page"><SectionIntro icon={Sparkles} label="Jarvis summary" title="Morning brief" copy="A concise reading of the fixed 30-day sandbox, with every claim traceable to demo evidence." /><BriefPanel snapshot={snapshot} /><AlertsAndAgents snapshot={snapshot} /><ReliabilityPanel snapshot={snapshot} /></div>;
  if (activeSection === "sales") return <div className="section-page"><SectionIntro icon={TrendingUp} label="Simulated commercial view" title="Sales intelligence" copy={snapshot.sales.description} /><SalesPanel snapshot={snapshot} /><ProductPanel snapshot={snapshot} /><ReliabilityPanel snapshot={snapshot} /></div>;
  if (activeSection === "products") return <div className="section-page"><SectionIntro icon={Box} label="Product monitor" title="Product signals" copy={snapshot.products.description} /><ProductPanel snapshot={snapshot} /><AlertsAndAgents snapshot={snapshot} /></div>;
  if (activeSection === "content") return <div className="section-page"><SectionIntro icon={FileText} label="Creative evidence" title="Content intelligence" copy={snapshot.content.description} /><ContentPanel snapshot={snapshot} /><AutopilotPanel snapshot={snapshot} /></div>;
  if (activeSection === "jarvis") return <div className="section-page"><SectionIntro icon={Sparkles} label="Demo shop orchestrator" title="Ask Jarvis" copy="Interrogate the sandbox, inspect the evidence, and keep every proposed action behind approval." /><JarvisComposer expanded /><BriefPanel snapshot={snapshot} /><ReliabilityPanel snapshot={snapshot} /></div>;
  return <ShopSetup snapshot={snapshot} />;
}

function SectionIntro({ icon: Icon, label, title, copy }: { icon: typeof Sparkles; label: string; title: string; copy: string }) {
  return <header className="section-intro"><span className="section-intro-icon"><Icon size={22} /></span><div><p className="eyebrow">{label}</p><h2>{title}</h2><p>{copy}</p></div><span className="badge badge-demo"><Database size={11} />Simulated dataset</span></header>;
}

export function UnavailableDashboard({ response }: { response: TitanUnavailableResponse }) {
  return (
    <section className="connection-empty panel unavailable-state">
      <span className="connection-icon"><Link2Off size={25} /></span>
      <p className="eyebrow">No data rendered</p>
      <h2>Titan is waiting for a real provider</h2>
      <p>{response.error.message}</p>
      <div className="unavailable-proof"><CheckCircle2 size={16} /><span>No demo figures were substituted into live mode.</span></div>
      <code className="mono">{response.error.code}</code>
    </section>
  );
}
