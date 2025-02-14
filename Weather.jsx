import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(`/api/weather?location=${location}`);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Weather Updates</h2>
      <div className="mt-4">
        <input type="text" className="border p-2 mr-2" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={fetchWeather} className="bg-blue-600 text-white px-4 py-2 rounded">Get Weather</button>
      </div>
      {weather && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">{weather.location}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Conditions: {weather.conditions}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}
