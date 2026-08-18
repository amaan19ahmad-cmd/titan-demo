export const TITAN_API_VERSION = "v1" as const;

export type TitanDataMode = "demo" | "live";
export type TitanResponseMode = TitanDataMode | "unconfigured";
export type TitanDataSource =
  | "demo_fixture"
  | "live_provider"
  | "runtime_configuration"
  | "request_validation";

export type Tone = "positive" | "warning" | "neutral" | "critical";

export interface DataDisclosure {
  readonly classification: TitanDataMode;
  readonly label: string;
  readonly description: string;
}

export interface DashboardMetric {
  readonly id: string;
  readonly label: string;
  readonly displayValue: string;
  readonly tone?: Tone;
  readonly description?: string;
  readonly comparison?: {
    readonly displayValue: string;
    readonly label: string;
    readonly direction: "up" | "down" | "flat";
    readonly tone: Tone;
  };
}

export interface DashboardTopStat {
  readonly id: string;
  readonly label: string;
  readonly displayValue: string;
  readonly description: string;
  readonly tone: Tone;
}

export type ShadowAutopilotStageId =
  | "observe"
  | "explain"
  | "approve"
  | "measure"
  | "learn";

export interface ShadowAutopilotStage {
  readonly id: ShadowAutopilotStageId;
  readonly label: string;
  readonly state: "complete" | "active" | "queued";
  readonly description: string;
}

export interface DashboardDecision {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: "awaiting_review" | "measuring" | "verified" | "withheld";
  readonly statusLabel: string;
  readonly confidencePercent: number | null;
  readonly modelledProfitRangeDisplay?: string;
  readonly evidence: ReadonlyArray<string>;
  readonly demoOnly: true;
  readonly requiresHumanApproval: true;
}

export interface JarvisBriefItem {
  readonly id: string;
  readonly sequence: string;
  readonly label: string;
  readonly message: string;
  readonly emphasis?: ReadonlyArray<string>;
}

export interface DashboardAlert {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly tone: Tone;
  readonly category: "inventory" | "content" | "performance" | "reliability";
}

export interface AgentFinding {
  readonly id: string;
  readonly name: string;
  readonly status: "reported" | "withheld";
  readonly confidencePercent: number | null;
  readonly finding?: string;
  readonly withheldReason?: string;
}

export interface ProductPerformanceItem {
  readonly id: string;
  readonly productName: string;
  readonly viewsDisplay: string;
  readonly ordersDisplay: string;
  readonly gmvDisplay: string;
  readonly note: string;
  readonly tone: Tone;
}

export interface ContentPerformanceItem {
  readonly id: string;
  readonly title: string;
  readonly format: string;
  readonly viewsDisplay: string;
  readonly ordersDisplay: string;
  readonly signal: string;
  readonly tone: Tone;
}

export interface SalesSeriesPoint {
  readonly id: string;
  readonly label: string;
  readonly views: number;
  readonly orders: number;
  readonly gmvPence: number;
}

export interface DashboardSection<T> {
  readonly dataLabel: string;
  readonly title: string;
  readonly description: string;
  readonly items: ReadonlyArray<T>;
}

export interface JarvisRecommendation {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly confidencePercent: number;
  readonly evidence: ReadonlyArray<{
    readonly agent: string;
    readonly finding: string;
  }>;
  readonly proposedAction: {
    readonly label: string;
    readonly description: string;
    readonly requiresHumanApproval: true;
    readonly executableInDemo: false;
  };
}

export interface DashboardSnapshot {
  readonly schemaVersion: 2;
  readonly fixtureId?: string;
  readonly disclosure: DataDisclosure;
  readonly workspace: {
    readonly name: string;
    readonly productLabel: string;
    readonly description: string;
  };
  readonly period: {
    readonly label: string;
    readonly refreshedLabel: string;
    readonly timezone: string;
    readonly isSimulated: boolean;
  };
  readonly jarvis: {
    readonly status: "online" | "unavailable";
    readonly greeting: string;
    readonly confidencePercent: number | null;
    readonly brief: ReadonlyArray<JarvisBriefItem>;
  };
  readonly topStats: ReadonlyArray<DashboardTopStat>;
  readonly shadowAutopilot: {
    readonly dataLabel: string;
    readonly title: string;
    readonly description: string;
    readonly stages: ReadonlyArray<ShadowAutopilotStage>;
  };
  readonly metrics: ReadonlyArray<DashboardMetric>;
  readonly decisions: DashboardSection<DashboardDecision>;
  readonly products: DashboardSection<ProductPerformanceItem>;
  readonly content: DashboardSection<ContentPerformanceItem>;
  readonly sales: {
    readonly dataLabel: string;
    readonly title: string;
    readonly description: string;
    readonly viewsDisplay: string;
    readonly ordersDisplay: string;
    readonly gmvDisplay: string;
    readonly averageOrderValueDisplay: string;
    readonly series: ReadonlyArray<SalesSeriesPoint>;
  };
  readonly alerts: ReadonlyArray<DashboardAlert>;
  readonly agents: ReadonlyArray<AgentFinding>;
  readonly recommendation: JarvisRecommendation | null;
  readonly reliability: {
    readonly title: string;
    readonly message: string;
  };
}

export type JarvisIntent =
  | "overview"
  | "performance"
  | "products"
  | "inventory"
  | "content"
  | "agents"
  | "autopilot"
  | "decisions"
  | "actions";

export interface JarvisRequest {
  readonly message: string;
  readonly conversationId?: string;
}

export interface JarvisAnswer {
  readonly id: string;
  readonly intent: JarvisIntent;
  readonly title: string;
  readonly message: string;
  readonly evidence: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
  readonly suggestedPrompts: ReadonlyArray<string>;
  readonly safety: {
    readonly dataDisclosure: string;
    readonly actionPolicy: string;
    readonly actionExecuted: false;
  };
}

export type TitanUnavailableCode =
  | "LIVE_PROVIDER_NOT_CONFIGURED"
  | "INVALID_CONFIGURATION"
  | "PROVIDER_UNAVAILABLE"
  | "INVALID_REQUEST"
  | "INTERNAL_ERROR";

export interface TitanUnavailableError {
  readonly code: TitanUnavailableCode;
  readonly message: string;
  readonly retryable: boolean;
}

export interface TitanResponseMeta {
  readonly apiVersion: typeof TITAN_API_VERSION;
  readonly requestId: string;
  readonly generatedAt: string;
  readonly mode: TitanResponseMode;
  readonly source: TitanDataSource;
  readonly isDemo: boolean;
  readonly modeWasExplicitlyConfigured: boolean;
  readonly disclosure: string;
}

export interface TitanReadyResponse<T> {
  readonly ok: true;
  readonly status: "ready";
  readonly data: T;
  readonly meta: TitanResponseMeta;
}

export interface TitanUnavailableResponse {
  readonly ok: false;
  readonly status: "unavailable";
  readonly data: null;
  readonly error: TitanUnavailableError;
  readonly meta: TitanResponseMeta;
}

export type DashboardApiResponse =
  | TitanReadyResponse<DashboardSnapshot>
  | TitanUnavailableResponse;

export type JarvisApiResponse =
  | TitanReadyResponse<JarvisAnswer>
  | TitanUnavailableResponse;

export interface HealthApiResponse {
  readonly ok: boolean;
  readonly status: "healthy" | "degraded";
  readonly service: "titan-growth-command-center";
  readonly generatedAt: string;
  readonly mode: TitanResponseMode;
  readonly providerStatus: "ready" | "unavailable";
  readonly isDemo: boolean;
  readonly disclosure: string;
}
