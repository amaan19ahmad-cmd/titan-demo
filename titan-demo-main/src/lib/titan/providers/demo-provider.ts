import "server-only";

import { demoDashboardFixture } from "../../../data/demo/dashboard";
import { demoJarvisResponses } from "../../../data/demo/jarvis-responses";
import type {
  JarvisAnswer,
  JarvisIntent,
  JarvisRequest,
} from "../contracts";
import type { TitanDataProvider } from "../provider";

const DEMO_DISCLOSURE =
  "Static demo data. No commerce account or live provider is connected.";

const intentPatterns: ReadonlyArray<{
  intent: JarvisIntent;
  pattern: RegExp;
}> = [
  {
    intent: "actions",
    pattern:
      /\b(approve|apply|execute|change|publish|launch|promote|increase|budget|do it)\b/i,
  },
  {
    intent: "inventory",
    pattern: /\b(inventory|stock|restock|threshold|remaining)\b/i,
  },
  {
    intent: "decisions",
    pattern:
      /\b(decision|recommendation|review|profit range|awaiting|confidence)\b/i,
  },
  {
    intent: "autopilot",
    pattern: /\b(autopilot|observe|explain|measure|learn|workflow|stage)\b/i,
  },
  {
    intent: "products",
    pattern: /\b(product|workwear|tee|trouser|jacket)\b/i,
  },
  {
    intent: "content",
    pattern: /\b(content|creative|hook|video|variation)\b/i,
  },
  {
    intent: "agents",
    pattern: /\b(agent|withheld|evidence|reliable)\b/i,
  },
  {
    intent: "performance",
    pattern: /\b(gmv|revenue|sales|sold|performance|overnight|product)\b/i,
  },
];

function classifyIntent(message: string): JarvisIntent {
  return (
    intentPatterns.find(({ pattern }) => pattern.test(message))?.intent ??
    "overview"
  );
}

function createDemoAnswer(intent: JarvisIntent): JarvisAnswer {
  return {
    id: `demo-${intent}`,
    intent,
    ...demoJarvisResponses[intent],
  };
}

export class DemoTitanProvider implements TitanDataProvider {
  readonly mode = "demo" as const;
  readonly source = "demo_fixture" as const;
  readonly isDemo = true;
  readonly disclosure = DEMO_DISCLOSURE;

  async getDashboard() {
    return {
      status: "ready" as const,
      data: demoDashboardFixture,
    };
  }

  async answerJarvis(input: JarvisRequest) {
    return {
      status: "ready" as const,
      data: createDemoAnswer(classifyIntent(input.message)),
    };
  }
}
