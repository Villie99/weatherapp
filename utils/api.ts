// Weather API Helper Functions
export const getCityImage = async (city: string) => {
  const res = await fetch(`/api/pexels?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error("Failed to fetch city image");
  const data = await res.json();
  return data.image;
};

export const getCitySuggestions = async (searchTerm: string) => {
  const res = await fetch(`/api/suggestions?q=${encodeURIComponent(searchTerm)}`);
  if (!res.ok) throw new Error("Failed to fetch city suggestions");
  return res.json();
};

export const getCurrentWeatherFromCity = async (searchTerm: string, lan: string) => {
  const city = searchTerm || "Stockholm";
  const res = await fetch(`/api/current?city=${encodeURIComponent(city)}&lang=${lan}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch weather");
  }
  return res.json();
};

// Types for better TypeScript support
export interface WeatherData {
  name: string;
  region: string;
  country: string;
  icon: string;
  conditionText: string;
  temp_c: number;
  feelslike_c: number;
  wind_kph: number;
  gust_kph: number;
  humidity: number;
  uv: number;
  vis_km: number;
  last_updated: string;
}

export interface CityImageResponse {
  image: string | null;
}

export interface CitySuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}