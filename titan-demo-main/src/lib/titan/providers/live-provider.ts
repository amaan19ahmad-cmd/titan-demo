import "server-only";

import type { TitanUnavailableError } from "../contracts";
import type { ProviderUnavailable, TitanDataProvider } from "../provider";

const LIVE_PROVIDER_ERROR: TitanUnavailableError = {
  code: "LIVE_PROVIDER_NOT_CONFIGURED",
  message:
    "Live Titan data is not connected. Configure a real provider before using live mode.",
  retryable: false,
};

const unavailable = (): ProviderUnavailable => ({
  status: "unavailable",
  error: LIVE_PROVIDER_ERROR,
});

/**
 * Deliberately inert until a real provider is implemented.
 * It must never substitute the demo fixture when live mode is requested.
 */
export class LiveTitanProvider implements TitanDataProvider {
  readonly mode = "live" as const;
  readonly source = "live_provider" as const;
  readonly isDemo = false;
  readonly disclosure =
    "Live mode was requested, but no live data provider is configured.";

  async getDashboard() {
    return unavailable();
  }

  async answerJarvis() {
    return unavailable();
  }
}
