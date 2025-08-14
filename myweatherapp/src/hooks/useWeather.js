import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../utils/weatherApi';
import { getPreferredUnits } from '../utils/storage';

export const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState(getPreferredUnits());

  const fetchWeather = useCallback(async (lat, lon, weatherUnits = units) => {
    if (!lat || !lon) {
      console.error('Invalid location:', lat, lon);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching weather for:', lat, lon, weatherUnits);
      const data = await fetchWeatherData(lat, lon, weatherUnits);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [units]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location, fetchWeather]);

  const refreshWeather = useCallback(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location, fetchWeather]);

  const changeUnits = useCallback((newUnits) => {
    setUnits(newUnits);
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon, newUnits);
    }
  }, [location, fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    units,
    refreshWeather,
    changeUnits
  };
};
