import "server-only";

import { randomUUID } from "node:crypto";

import type {
  TitanResponseMode,
  TitanUnavailableCode,
  TitanUnavailableResponse,
} from "./contracts";
import { TITAN_API_VERSION } from "./contracts";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
} as const;

export function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: NO_STORE_HEADERS,
  });
}

export function statusForAvailability(ok: boolean): number {
  return ok ? 200 : 503;
}

export function createRouteErrorResponse(options: {
  code: TitanUnavailableCode;
  message: string;
  status: number;
  mode?: TitanResponseMode;
}): Response {
  const mode = options.mode ?? "unconfigured";
  const body: TitanUnavailableResponse = {
    ok: false,
    status: "unavailable",
    data: null,
    error: {
      code: options.code,
      message: options.message,
      retryable: options.code === "INTERNAL_ERROR",
    },
    meta: {
      apiVersion: TITAN_API_VERSION,
      requestId: randomUUID(),
      generatedAt: new Date().toISOString(),
      mode,
      source:
        options.code === "INVALID_REQUEST"
          ? "request_validation"
          : "runtime_configuration",
      isDemo: false,
      modeWasExplicitlyConfigured: mode !== "unconfigured",
      disclosure: "No dashboard or Jarvis data was returned.",
    },
  };

  return jsonResponse(body, options.status);
}
