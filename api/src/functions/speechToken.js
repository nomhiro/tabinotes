const { createHash } = require("node:crypto");
const { app } = require("@azure/functions");

const RATE_WINDOW_MS = 60_000;
const configuredRateLimit = Number.parseInt(process.env.TOKEN_RATE_LIMIT_PER_MINUTE || "6", 10);
const RATE_LIMIT = Number.isInteger(configuredRateLimit) && configuredRateLimit > 0 ? configuredRateLimit : 6;
const requestsByClient = new Map();
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "600",
};

function jsonResponse(status, body) {
  return {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    jsonBody: body,
  };
}

function isRateLimited(request, now = Date.now()) {
  for (const [key, entry] of requestsByClient) {
    if (now - entry.windowStart >= RATE_WINDOW_MS) requestsByClient.delete(key);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientAddress = forwardedFor?.split(",").at(-1)?.trim() || "unknown";
  const clientKey = createHash("sha256").update(clientAddress).digest("hex");
  const entry = requestsByClient.get(clientKey);

  if (!entry || now - entry.windowStart >= RATE_WINDOW_MS) {
    requestsByClient.set(clientKey, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

app.http("speech-token", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "speech-token",
  handler: async (request, context) => {
    if (request.method === "OPTIONS") return { status: 204, headers: corsHeaders };
    if (isRateLimited(request)) return jsonResponse(429, { error: "Too many token requests." });

    const speechKey = process.env.SPEECH_KEY;
    const speechRegion = process.env.SPEECH_REGION;
    if (!speechKey || !speechRegion) {
      context.error("Speech token endpoint is missing required configuration.");
      return jsonResponse(503, { error: "Speech translation is not configured." });
    }

    try {
      const response = await fetch(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
        method: "POST",
        headers: { "Ocp-Apim-Subscription-Key": speechKey, "Content-Length": "0" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        context.error(`Speech token service returned HTTP ${response.status}.`);
        return jsonResponse(502, { error: "Speech token service is temporarily unavailable." });
      }

      const authorizationToken = await response.text();
      if (!authorizationToken) {
        context.error("Speech token service returned an empty token.");
        return jsonResponse(502, { error: "Speech token service is temporarily unavailable." });
      }

      return jsonResponse(200, { authorizationToken, region: speechRegion });
    } catch (error) {
      context.error(`Speech token request failed (${error instanceof Error ? error.name : "unknown error"}).`);
      return jsonResponse(502, { error: "Speech token service is temporarily unavailable." });
    }
  },
});
