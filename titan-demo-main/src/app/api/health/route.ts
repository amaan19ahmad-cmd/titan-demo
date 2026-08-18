import {
  createRouteErrorResponse,
  jsonResponse,
} from "../../../lib/titan/route-utils";
import { getDashboardServiceState } from "../../../lib/titan/service";

export const dynamic = "force-dynamic";

export function GET(): Response {
  try {
    const health = getDashboardServiceState();
    return jsonResponse(health, health.ok ? 200 : 503);
  } catch {
    return createRouteErrorResponse({
      code: "INTERNAL_ERROR",
      message: "Titan health could not be determined.",
      status: 500,
    });
  }
}
