export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Stockholm";
  const lang = searchParams.get("lang") || "en";

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&lang=${lang}&key=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ error: `Weather API error ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    
    // Return the transformed data in the same format your components expect
    return Response.json({
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      icon: data.current.condition.icon,
      conditionText: data.current.condition.text,
      temp_c: data.current.temp_c,
      feelslike_c: data.current.feelslike_c,
      wind_kph: data.current.wind_kph,
      gust_kph: data.current.gust_kph,
      humidity: data.current.humidity,
      uv: data.current.uv,
      vis_km: data.current.vis_km,
      last_updated: data.current.last_updated,
    });
  } catch (err) {
    console.error("Weather API Error:", err);
    return Response.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}