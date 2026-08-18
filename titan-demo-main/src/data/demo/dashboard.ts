import type { DashboardSnapshot } from "../../lib/titan/contracts";

/**
 * Static, illustrative content used only when Titan is in demo mode.
 * Every section carries demo provenance so isolated cards remain honest when
 * reused outside the main dashboard shell.
 */
export const demoDashboardFixture = {
  schemaVersion: 2,
  fixtureId: "titan-workwear-30-day-sandbox-v2",
  disclosure: {
    classification: "demo",
    label: "Simulated demo data",
    description:
      "A static 30-day Titan Workwear sandbox. It is not connected to a commerce account and must not be presented as live performance.",
  },
  workspace: {
    name: "Titan Workwear Demo",
    productLabel: "AI Growth Command Center",
    description:
      "Safe simulated 30-day sandbox for exploring Titan decisions, measurement, and learning without touching a real shop.",
  },
  period: {
    label: "Simulated last 30 days",
    refreshedLabel: "Static sandbox snapshot",
    timezone: "Europe/London",
    isSimulated: true,
  },
  jarvis: {
    status: "online",
    greeting: "Your 30-day sandbox is ready.",
    confidencePercent: 82,
    brief: [
      {
        id: "sandbox-overview",
        sequence: "01",
        label: "Simulated performance",
        message:
          "This 30-day demo models 117,100 views, 108 orders, and £1,079 GMV across three sandbox products.",
        emphasis: ["117,100 views", "108 orders", "£1,079 GMV"],
      },
      {
        id: "decision-queue",
        sequence: "02",
        label: "Approval queue",
        message:
          "Two demo decisions are awaiting review. One additional sandbox decision is measuring now; no outcome is yet verified.",
        emphasis: ["Two demo decisions", "no outcome is yet verified"],
      },
      {
        id: "recommended-move",
        sequence: "03",
        label: "Recommended demo move",
        message:
          "Review whether to scale the price-reveal angle without increasing spend. Jarvis assigns 82% confidence inside this sandbox only.",
        emphasis: ["without increasing spend", "82% confidence"],
      },
    ],
  },
  topStats: [
    {
      id: "views",
      label: "Views",
      displayValue: "117,100",
      description: "Simulated total for the 30-day sandbox.",
      tone: "neutral",
    },
    {
      id: "orders",
      label: "Orders",
      displayValue: "108",
      description: "Simulated orders in the sandbox dataset.",
      tone: "positive",
    },
    {
      id: "gmv",
      label: "GMV",
      displayValue: "£1,079",
      description: "Modelled GMV; this is not connected revenue.",
      tone: "positive",
    },
    {
      id: "products",
      label: "Products",
      displayValue: "3",
      description: "Illustrative workwear products in this demo.",
      tone: "neutral",
    },
  ],
  shadowAutopilot: {
    dataLabel: "Demo workflow",
    title: "Shadow Autopilot",
    description:
      "A simulated decision loop. Titan can observe and explain, but approval remains human and no real action is executed.",
    stages: [
      {
        id: "observe",
        label: "Observe",
        state: "complete",
        description: "Sandbox signals have been collected.",
      },
      {
        id: "explain",
        label: "Explain",
        state: "complete",
        description: "Demo reasoning and evidence are available.",
      },
      {
        id: "approve",
        label: "Approve",
        state: "active",
        description: "Two simulated decisions await human review.",
      },
      {
        id: "measure",
        label: "Measure",
        state: "active",
        description: "One sandbox decision is being measured.",
      },
      {
        id: "learn",
        label: "Learn",
        state: "queued",
        description: "Learning waits for a verified demo outcome.",
      },
    ],
  },
  metrics: [
    {
      id: "awaiting-review",
      label: "Awaiting review",
      displayValue: "2",
      tone: "warning",
      description: "Demo decisions that still require human approval.",
    },
    {
      id: "measuring-now",
      label: "Measuring now",
      displayValue: "1",
      tone: "neutral",
      description: "Sandbox decision currently in a modelled measurement window.",
    },
    {
      id: "modelled-profit-range",
      label: "Modelled profit range",
      displayValue: "£86–£144",
      tone: "positive",
      description: "Illustrative range, not realised or forecast live profit.",
    },
    {
      id: "verified-outcomes",
      label: "Verified outcomes",
      displayValue: "0",
      tone: "neutral",
      description: "No sandbox outcome has passed verification yet.",
    },
  ],
  decisions: {
    dataLabel: "Simulated decisions",
    title: "Decision queue",
    description:
      "Recommendations generated from the static sandbox. Review does not execute any shop or campaign change.",
    items: [
      {
        id: "scale-price-reveal",
        title: "Scale the price-reveal angle without increasing spend",
        description:
          "Reuse the strongest simulated creative angle while holding the sandbox spend assumption constant.",
        status: "awaiting_review",
        statusLabel: "Awaiting review",
        confidencePercent: 82,
        modelledProfitRangeDisplay: "£86–£144",
        evidence: [
          "The price-reveal angle accounts for 52,400 simulated views.",
          "The sandbox attributes 51 of 108 modelled orders to this angle.",
          "The modelled profit range is £86–£144; no profit is verified.",
        ],
        demoOnly: true,
        requiresHumanApproval: true,
      },
      {
        id: "refine-durability-proof",
        title: "Refine the durability-proof opening before changing targeting",
        description:
          "Test a clearer first-frame proof point in the demo before considering any distribution change.",
        status: "awaiting_review",
        statusLabel: "Awaiting review",
        confidencePercent: 76,
        evidence: [
          "The durability-proof angle has 38,700 simulated views.",
          "Its sandbox sample contains 35 modelled orders.",
        ],
        demoOnly: true,
        requiresHumanApproval: true,
      },
      {
        id: "measure-proof-timing",
        title: "Measure earlier product proof in the first three seconds",
        description:
          "A sandbox-only measurement is open; Titan will not call a winner until the demo outcome is verified.",
        status: "measuring",
        statusLabel: "Measuring now",
        confidencePercent: 79,
        evidence: [
          "One simulated measurement window is active.",
          "Verified outcomes remain at zero.",
        ],
        demoOnly: true,
        requiresHumanApproval: true,
      },
    ],
  },
  products: {
    dataLabel: "Simulated product data",
    title: "Product performance",
    description:
      "Illustrative product-level allocation of the 30-day sandbox totals.",
    items: [
      {
        id: "titan-work-tee",
        productName: "Titan Work Tee",
        viewsDisplay: "64,400",
        ordersDisplay: "61",
        gmvDisplay: "£489",
        note: "Leading product in the simulated dataset.",
        tone: "positive",
      },
      {
        id: "titan-utility-trousers",
        productName: "Titan Utility Trousers",
        viewsDisplay: "32,800",
        ordersDisplay: "29",
        gmvDisplay: "£348",
        note: "Stable sandbox contribution; no live stock signal is available.",
        tone: "neutral",
      },
      {
        id: "titan-work-jacket",
        productName: "Titan Work Jacket",
        viewsDisplay: "19,900",
        ordersDisplay: "18",
        gmvDisplay: "£242",
        note: "Smallest simulated sample; avoid overclaiming a trend.",
        tone: "warning",
      },
    ],
  },
  content: {
    dataLabel: "Simulated content data",
    title: "Content signals",
    description:
      "Illustrative creative-angle performance used to demonstrate Titan's evidence flow.",
    items: [
      {
        id: "price-reveal",
        title: "Price-reveal angle",
        format: "Demo short-form creative",
        viewsDisplay: "52,400",
        ordersDisplay: "51",
        signal: "Strongest sandbox angle; proposed for approval without added spend.",
        tone: "positive",
      },
      {
        id: "durability-proof",
        title: "Durability-proof angle",
        format: "Demo product proof",
        viewsDisplay: "38,700",
        ordersDisplay: "35",
        signal: "Promising simulated evidence; opening frame needs review.",
        tone: "neutral",
      },
      {
        id: "fit-first",
        title: "Fit-first angle",
        format: "Demo try-on creative",
        viewsDisplay: "26,000",
        ordersDisplay: "22",
        signal: "Smaller sandbox sample; no scale decision is recommended.",
        tone: "warning",
      },
    ],
  },
  sales: {
    dataLabel: "Simulated sales data",
    title: "30-day sales shape",
    description:
      "A static four-point series whose totals match the sandbox headline cards; it is not a live sales feed.",
    viewsDisplay: "117,100",
    ordersDisplay: "108",
    gmvDisplay: "£1,079",
    averageOrderValueDisplay: "£9.99",
    series: [
      { id: "week-1", label: "Week 1", views: 25_800, orders: 22, gmvPence: 21_800 },
      { id: "week-2", label: "Week 2", views: 28_400, orders: 25, gmvPence: 24_600 },
      { id: "week-3", label: "Week 3", views: 29_900, orders: 27, gmvPence: 28_300 },
      { id: "week-4", label: "Week 4", views: 33_000, orders: 34, gmvPence: 33_200 },
    ],
  },
  alerts: [
    {
      id: "approval-queue",
      title: "Approval queue",
      message:
        "Two simulated decisions are ready for review. No action can run from this demo.",
      tone: "warning",
      category: "performance",
    },
    {
      id: "measurement-window",
      title: "Measurement in progress",
      message:
        "One sandbox decision is measuring. Jarvis will withhold a result until the demo outcome is verified.",
      tone: "neutral",
      category: "reliability",
    },
  ],
  agents: [
    {
      id: "observe-agent",
      name: "Observe",
      status: "reported",
      confidencePercent: 91,
      finding: "The static 30-day sandbox signals are available for explanation.",
    },
    {
      id: "explain-agent",
      name: "Explain",
      status: "reported",
      confidencePercent: 82,
      finding: "Evidence for the price-reveal decision is exposed in the demo queue.",
    },
    {
      id: "approval-guard",
      name: "Approve",
      status: "reported",
      confidencePercent: null,
      finding: "Two sandbox decisions require human review; none was executed.",
    },
    {
      id: "measurement-agent",
      name: "Measure",
      status: "reported",
      confidencePercent: 79,
      finding: "One demo-only measurement window is active.",
    },
    {
      id: "learning-agent",
      name: "Learn",
      status: "withheld",
      confidencePercent: null,
      withheldReason:
        "Verified outcomes are zero, so the sandbox has no reliable learning to claim.",
    },
  ],
  recommendation: {
    id: "scale-price-reveal",
    title: "Scale the price-reveal angle without increasing spend",
    summary:
      "Review the strongest simulated content angle while keeping the sandbox spend assumption unchanged. This is a modelled recommendation, not a live instruction.",
    confidencePercent: 82,
    evidence: [
      { agent: "Observe", finding: "52,400 simulated price-reveal views." },
      { agent: "Explain", finding: "51 of 108 modelled orders attributed." },
      { agent: "Measure", finding: "Modelled profit range £86–£144." },
      { agent: "Reliability", finding: "Verified outcomes remain at zero." },
    ],
    proposedAction: {
      label: "Review decision",
      description:
        "Review the demo evidence. Titan will not increase spend or change a shop without human approval.",
      requiresHumanApproval: true,
      executableInDemo: false,
    },
  },
  reliability: {
    title: "No simulated result is presented as real.",
    message:
      "All figures in this workspace belong to a static 30-day sandbox. With zero verified outcomes and no live provider, Jarvis must withhold any claim of real-world impact.",
  },
} as const satisfies DashboardSnapshot;
