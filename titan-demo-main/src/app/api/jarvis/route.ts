import type { JarvisRequest } from "../../../lib/titan/contracts";
import {
  createRouteErrorResponse,
  jsonResponse,
  statusForAvailability,
} from "../../../lib/titan/route-utils";
import { askJarvis } from "../../../lib/titan/service";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_192;
const MAX_MESSAGE_LENGTH = 600;
const MAX_CONVERSATION_ID_LENGTH = 100;

function parseContentLength(request: Request): number | null {
  const header = request.headers.get("content-length");
  if (!header) return null;

  const parsed = Number.parseInt(header, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseJarvisRequest(value: unknown): JarvisRequest | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.message !== "string") return null;

  const message = candidate.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) return null;

  if (
    candidate.conversationId !== undefined &&
    (typeof candidate.conversationId !== "string" ||
      candidate.conversationId.length > MAX_CONVERSATION_ID_LENGTH)
  ) {
    return null;
  }

  return {
    message,
    ...(typeof candidate.conversationId === "string"
      ? { conversationId: candidate.conversationId }
      : {}),
  };
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = parseContentLength(request);
  if (contentLength !== null && contentLength > MAX_BODY_BYTES) {
    return createRouteErrorResponse({
      code: "INVALID_REQUEST",
      message: "The Jarvis request is too large.",
      status: 413,
    });
  }

  let input: JarvisRequest | null = null;

  try {
    input = parseJarvisRequest(await request.json());
  } catch {
    return createRouteErrorResponse({
      code: "INVALID_REQUEST",
      message: "The Jarvis request must contain valid JSON.",
      status: 400,
    });
  }

  if (!input) {
    return createRouteErrorResponse({
      code: "INVALID_REQUEST",
      message:
        "Provide a non-empty message of at most 600 characters and an optional conversationId of at most 100 characters.",
      status: 400,
    });
  }

  try {
    const result = await askJarvis(input);
    return jsonResponse(result, statusForAvailability(result.ok));
  } catch {
    return createRouteErrorResponse({
      code: "INTERNAL_ERROR",
      message: "Jarvis is temporarily unavailable.",
      status: 500,
    });
  }
}
