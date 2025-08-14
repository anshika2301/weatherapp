const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const fetchWeatherData = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchCityWeather = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      throw new Error('City weather fetch failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching city weather:', error);
    throw error;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City search failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};