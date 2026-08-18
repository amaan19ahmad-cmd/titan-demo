import "server-only";

import type { TitanDataMode } from "./contracts";

export class TitanEnvironmentError extends Error {
  readonly code = "INVALID_CONFIGURATION" as const;

  constructor(message: string) {
    super(message);
    this.name = "TitanEnvironmentError";
  }
}

export interface TitanRuntimeEnvironment {
  readonly dataMode: TitanDataMode;
  readonly dataModeWasExplicitlyConfigured: boolean;
}

export function readTitanEnvironment(): TitanRuntimeEnvironment {
  const configuredValue = process.env.TITAN_DATA_MODE?.trim().toLowerCase();

  if (!configuredValue) {
    return {
      dataMode: "demo",
      dataModeWasExplicitlyConfigured: false,
    };
  }

  if (configuredValue !== "demo" && configuredValue !== "live") {
    throw new TitanEnvironmentError(
      "TITAN_DATA_MODE must be either 'demo' or 'live'.",
    );
  }

  return {
    dataMode: configuredValue,
    dataModeWasExplicitlyConfigured: true,
  };
}
