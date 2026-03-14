import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "8cc07a61afb342728b86dcd8d2e27515";
const SITE_URL = "https://desirig.com";

/**
 * POST /api/indexnow
 * Body: { urls: string[] }
 * Pings Bing + Yandex IndexNow endpoints for instant indexing.
 * Called after new business submissions or content updates.
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const urls: string[] = body.urls;

  if (!urls || urls.length === 0) {
    return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
  }

  // Cap at 10,000 URLs per IndexNow spec
  const batch = urls.slice(0, 10000);

  const payload = {
    host: "desirig.com",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: batch.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`)),
  };

  // Submit to both Bing and Yandex
  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const results = await Promise.allSettled(
    endpoints.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then((r) => ({ endpoint, status: r.status }))
    )
  );

  return NextResponse.json({
    submitted: batch.length,
    results: results.map((r) =>
      r.status === "fulfilled" ? r.value : { error: String(r.reason) }
    ),
  });
}
