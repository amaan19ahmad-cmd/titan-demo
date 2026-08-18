import "server-only";

import { randomUUID } from "node:crypto";

import type {
  DashboardApiResponse,
  HealthApiResponse,
  JarvisApiResponse,
  JarvisRequest,
  TitanDataMode,
  TitanResponseMeta,
  TitanUnavailableError,
  TitanUnavailableResponse,
} from "./contracts";
import { TITAN_API_VERSION } from "./contracts";
import {
  readTitanEnvironment,
  TitanEnvironmentError,
  type TitanRuntimeEnvironment,
} from "./env";
import type { TitanDataProvider } from "./provider";
import { DemoTitanProvider } from "./providers/demo-provider";
import { LiveTitanProvider } from "./providers/live-provider";

function createRequestId(): string {
  return randomUUID();
}

function createProvider(
  environment: TitanRuntimeEnvironment,
): TitanDataProvider {
  return environment.dataMode === "demo"
    ? new DemoTitanProvider()
    : new LiveTitanProvider();
}

function createMeta(
  provider: TitanDataProvider,
  environment: TitanRuntimeEnvironment,
): TitanResponseMeta {
  return {
    apiVersion: TITAN_API_VERSION,
    requestId: createRequestId(),
    generatedAt: new Date().toISOString(),
    mode: provider.mode,
    source: provider.source,
    isDemo: provider.isDemo,
    modeWasExplicitlyConfigured:
      environment.dataModeWasExplicitlyConfigured,
    disclosure: provider.disclosure,
  };
}

function createConfigurationErrorResponse(
  error: TitanEnvironmentError,
): TitanUnavailableResponse {
  return {
    ok: false,
    status: "unavailable",
    data: null,
    error: {
      code: error.code,
      message: error.message,
      retryable: false,
    },
    meta: {
      apiVersion: TITAN_API_VERSION,
      requestId: createRequestId(),
      generatedAt: new Date().toISOString(),
      mode: "unconfigured",
      source: "runtime_configuration",
      isDemo: false,
      modeWasExplicitlyConfigured: true,
      disclosure: "Titan data is unavailable because configuration is invalid.",
    },
  };
}

function unavailableResponse(
  error: TitanUnavailableError,
  meta: TitanResponseMeta,
): TitanUnavailableResponse {
  return {
    ok: false,
    status: "unavailable",
    data: null,
    error,
    meta,
  };
}

export async function getDashboardSnapshot(): Promise<DashboardApiResponse> {
  try {
    const environment = readTitanEnvironment();
    const provider = createProvider(environment);
    const meta = createMeta(provider, environment);
    const result = await provider.getDashboard();

    if (result.status === "unavailable") {
      return unavailableResponse(result.error, meta);
    }

    return {
      ok: true,
      status: "ready",
      data: result.data,
      meta,
    };
  } catch (error) {
    if (error instanceof TitanEnvironmentError) {
      return createConfigurationErrorResponse(error);
    }

    throw error;
  }
}

export async function askJarvis(
  input: JarvisRequest,
): Promise<JarvisApiResponse> {
  try {
    const environment = readTitanEnvironment();
    const provider = createProvider(environment);
    const meta = createMeta(provider, environment);
    const result = await provider.answerJarvis(input);

    if (result.status === "unavailable") {
      return unavailableResponse(result.error, meta);
    }

    return {
      ok: true,
      status: "ready",
      data: result.data,
      meta,
    };
  } catch (error) {
    if (error instanceof TitanEnvironmentError) {
      return createConfigurationErrorResponse(error);
    }

    throw error;
  }
}

function statusForMode(mode: TitanDataMode): "ready" | "unavailable" {
  return mode === "demo" ? "ready" : "unavailable";
}

export function getDashboardServiceState(): HealthApiResponse {
  try {
    const environment = readTitanEnvironment();
    const provider = createProvider(environment);
    const providerStatus = statusForMode(provider.mode);

    return {
      ok: true,
      status: providerStatus === "ready" ? "healthy" : "degraded",
      service: "titan-growth-command-center",
      generatedAt: new Date().toISOString(),
      mode: provider.mode,
      providerStatus,
      isDemo: provider.isDemo,
      disclosure: provider.disclosure,
    };
  } catch (error) {
    if (!(error instanceof TitanEnvironmentError)) {
      throw error;
    }

    return {
      ok: false,
      status: "degraded",
      service: "titan-growth-command-center",
      generatedAt: new Date().toISOString(),
      mode: "unconfigured",
      providerStatus: "unavailable",
      isDemo: false,
      disclosure: "Titan data is unavailable because configuration is invalid.",
    };
  }
}
