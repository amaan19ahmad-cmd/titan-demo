import type { JarvisAnswer, JarvisIntent } from "../../lib/titan/contracts";

const DATA_DISCLOSURE =
  "This answer uses the static Titan Workwear 30-day sandbox. It is simulated and is not based on a connected commerce account.";
const ACTION_POLICY =
  "No shop, spend, campaign, product, or content action was executed. Human approval is always required.";

type DemoJarvisAnswer = Omit<JarvisAnswer, "id" | "intent">;

export const demoJarvisResponses: Readonly<
  Record<JarvisIntent, DemoJarvisAnswer>
> = {
  overview: {
    title: "Titan Workwear demo overview",
    message:
      "In the simulated 30-day sandbox, Titan Workwear Demo contains 117,100 views, 108 orders, £1,079 modelled GMV, and three illustrative products. Two decisions await review, one is measuring, and none is verified.",
    evidence: [
      { label: "Simulated views", value: "117,100" },
      { label: "Simulated orders", value: "108" },
      { label: "Modelled GMV", value: "£1,079" },
      { label: "Verified outcomes", value: "0" },
    ],
    suggestedPrompts: [
      "What is awaiting review?",
      "Explain Shadow Autopilot",
      "Which content angle is strongest?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  performance: {
    title: "Simulated 30-day performance",
    message:
      "The sandbox models 117,100 views, 108 orders, and £1,079 GMV. These are static demonstration totals, not current shop results or a live forecast.",
    evidence: [
      { label: "Views", value: "117,100 simulated" },
      { label: "Orders", value: "108 simulated" },
      { label: "GMV", value: "£1,079 modelled" },
      { label: "Average order value", value: "£9.99 modelled" },
    ],
    suggestedPrompts: [
      "Show the demo products",
      "Which decision has highest confidence?",
      "Are any outcomes verified?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  products: {
    title: "Simulated product performance",
    message:
      "Titan Work Tee leads the illustrative product allocation with 64,400 views, 61 orders, and £489 modelled GMV. Utility Trousers and Work Jacket complete the three-product sandbox.",
    evidence: [
      { label: "Titan Work Tee", value: "64,400 views · 61 orders · £489" },
      { label: "Titan Utility Trousers", value: "32,800 views · 29 orders · £348" },
      { label: "Titan Work Jacket", value: "19,900 views · 18 orders · £242" },
    ],
    suggestedPrompts: [
      "Which content angle is strongest?",
      "What is awaiting review?",
      "Is inventory connected?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  inventory: {
    title: "No inventory data in this sandbox",
    message:
      "Inventory is not connected and the current Titan Workwear fixture does not model stock levels. Jarvis will not invent availability, thresholds, or restock advice.",
    evidence: [
      { label: "Inventory provider", value: "Not connected" },
      { label: "Stock data", value: "Unavailable" },
      { label: "Restock recommendation", value: "Withheld" },
    ],
    suggestedPrompts: [
      "Show the demo products",
      "What data is simulated?",
      "What is awaiting review?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  content: {
    title: "Simulated content signals",
    message:
      "The price-reveal angle is the strongest sandbox content signal, with 52,400 simulated views and 51 modelled orders. Titan proposes reusing the angle without increasing the spend assumption.",
    evidence: [
      { label: "Price-reveal angle", value: "52,400 views · 51 orders" },
      { label: "Durability-proof angle", value: "38,700 views · 35 orders" },
      { label: "Fit-first angle", value: "26,000 views · 22 orders" },
    ],
    suggestedPrompts: [
      "Explain the price-reveal decision",
      "Will Titan increase spend?",
      "Are any outcomes verified?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  agents: {
    title: "Shadow Autopilot evidence",
    message:
      "In this demo, Observe and Explain are complete, Approve and Measure are active, and Learn is queued. Learning is withheld because verified outcomes remain at zero.",
    evidence: [
      { label: "Complete", value: "Observe · Explain" },
      { label: "Active", value: "Approve · Measure" },
      { label: "Queued", value: "Learn" },
    ],
    suggestedPrompts: [
      "Explain Shadow Autopilot",
      "Why is Learn queued?",
      "What is awaiting review?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  autopilot: {
    title: "Shadow Autopilot",
    message:
      "Shadow Autopilot demonstrates the Observe, Explain, Approve, Measure, and Learn loop. Approval stays human, measurement is simulated, and Learn cannot advance until a demo outcome is verified.",
    evidence: [
      { label: "Observe", value: "Complete" },
      { label: "Explain", value: "Complete" },
      { label: "Approve", value: "2 awaiting review" },
      { label: "Measure", value: "1 measuring now" },
      { label: "Learn", value: "Queued · 0 verified" },
    ],
    suggestedPrompts: [
      "What is awaiting review?",
      "What is measuring now?",
      "Can Titan execute an action?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  decisions: {
    title: "Highest-confidence demo decision",
    message:
      "Scale the price-reveal angle without increasing spend is awaiting review at 82% sandbox confidence. Its modelled profit range is £86–£144, but no profit or outcome is verified.",
    evidence: [
      { label: "Decision", value: "Scale the price-reveal angle" },
      { label: "Sandbox confidence", value: "82%" },
      { label: "Modelled profit range", value: "£86–£144" },
      { label: "Verified outcomes", value: "0" },
    ],
    suggestedPrompts: [
      "Show the supporting content signal",
      "Will Titan increase spend?",
      "Explain the second review item",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
  actions: {
    title: "Approval is required",
    message:
      "This sandbox cannot execute actions. Reviewing the price-reveal decision will not increase spend, publish content, or change a shop. Titan requires explicit human approval before any future live action.",
    evidence: [
      { label: "Action executed", value: "No" },
      { label: "Demo capability", value: "Review only" },
      { label: "Approval policy", value: "Human approval required" },
    ],
    suggestedPrompts: [
      "Explain the price-reveal decision",
      "What does review do in the demo?",
      "Are any outcomes verified?",
    ],
    safety: {
      dataDisclosure: DATA_DISCLOSURE,
      actionPolicy: ACTION_POLICY,
      actionExecuted: false,
    },
  },
};
