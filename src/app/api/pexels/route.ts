export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) return Response.json({ error: "Missing city" }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY!,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json({ error: `Pexels error ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return Response.json({ image: data.photos[0]?.src?.original || null });
  } catch (err) {
    console.error("Pexels API Error:", err);
    return Response.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}