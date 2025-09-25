import React, { useState } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search?name=";
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?current_weather=true&latitude={lat}&longitude={lon}";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchWeather(e) {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await fetch(GEO_URL + encodeURIComponent(city));
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found!");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const url = WEATHER_URL.replace("{lat}", latitude).replace("{lon}", longitude);
      const weatherRes = await fetch(url);
      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        throw new Error("Weather data not available");
      }

      setWeather({
        city: name,
        country,
        ...weatherData.current_weather,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Map weather codes to React Icons
  const getWeatherIcon = (code) => {
    if (code === 0) return <WiDaySunny size={80} className="text-yellow-400" />;
    if ([1, 2, 3].includes(code)) return <WiCloudy size={80} className="text-gray-400" />;
    if ([45, 48].includes(code)) return <WiFog size={80} className="text-gray-500" />;
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return <WiRain size={80} className="text-blue-400 animate-pulse" />;
    if ([71, 73, 75, 77].includes(code)) return <WiSnow size={80} className="text-white" />;
    if ([95, 96, 99].includes(code)) return <WiThunderstorm size={80} className="text-purple-700 animate-pulse" />;
    return <WiDaySunny size={80} className="text-yellow-400" />;
  };

  // Format exact local time
  const formatExactTime = (isoTime) => {
    return new Date(isoTime + ":00Z").toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Dynamic background based on weather
  const getBackground = () => {
    if (!weather) return "from-blue-400 via-blue-200 to-indigo-200";
    const code = weather.weathercode;
    if (code === 0) return "from-yellow-400 via-yellow-200 to-orange-300"; // sunny
    if ([1, 2, 3].includes(code)) return "from-gray-400 via-gray-300 to-blue-300"; // cloudy
    if ([45, 48].includes(code)) return "from-gray-500 via-gray-400 to-gray-600"; // fog
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return "from-blue-500 via-blue-400 to-gray-500"; // rain
    if ([71, 73, 75, 77].includes(code)) return "from-white via-gray-200 to-gray-300"; // snow
    if ([95, 96, 99].includes(code)) return "from-purple-700 via-blue-800 to-gray-900"; // thunderstorm
    return "from-blue-400 via-blue-200 to-indigo-200";
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${getBackground()} p-4 transition-all duration-700`}
    >
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
        🌤️ Weather Now
      </h1>

      <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row gap-3 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 border-2 border-blue-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all duration-200"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-white text-lg animate-pulse">Loading...</p>}
      {error && <p className="text-red-600 text-lg font-semibold">{error}</p>}

      {weather && (
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 text-center w-72 sm:w-96 transition transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">
            {weather.city}, {weather.country}
          </h2>
          <div className="mb-2">{getWeatherIcon(weather.weathercode)}</div>
          <p className="text-5xl font-extrabold">{weather.temperature}°C</p>
          <p className="text-gray-700 mt-2">💨 {weather.windspeed} km/h</p>
          <p className="text-gray-600 text-sm mt-1">
            ⏱ {formatExactTime(weather.time)}
          </p>
        </div>
      )}
    </div>
  );
}
