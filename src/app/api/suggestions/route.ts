export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return Response.json({ error: "Missing query" }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?q=${encodeURIComponent(q)}&key=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ error: `Weather API error ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Weather Search API Error:", err);
    return Response.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}