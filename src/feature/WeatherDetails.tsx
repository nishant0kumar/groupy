import { useState, useEffect } from 'react';

function WeatherDetails() {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <div>Loading weather data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!weatherData) return null;

    return (
        <div className="weather-details flex gap-2">
            <h2>{weatherData.name}</h2>
            <p>{Math.round(weatherData.main.temp)}°C</p>
        </div>
    );
}

export default WeatherDetails;