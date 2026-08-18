import {
  createRouteErrorResponse,
  jsonResponse,
  statusForAvailability,
} from "../../../lib/titan/route-utils";
import { getDashboardSnapshot } from "../../../lib/titan/service";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const result = await getDashboardSnapshot();
    return jsonResponse(result, statusForAvailability(result.ok));
  } catch {
    return createRouteErrorResponse({
      code: "INTERNAL_ERROR",
      message: "Titan could not load the dashboard.",
      status: 500,
    });
  }
}
