import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Thermometer, MapPin } from 'lucide-react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { HourlyForecast, DailyForecast } from './components/ForecastCard';
import { CitySearch } from './components/CitySearch';
import { WeatherCardSkeleton, ForecastSkeleton } from './components/LoadingSkeleton';
import { setPreferredUnits, getLastLocation, setLastLocation } from './utils/storage';

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [backgroundTheme, setBackgroundTheme] = useState('gradient-cloudy');
  
  const { location: geoLocation, loading: geoLoading } = useGeolocation();
  const { weatherData, loading: weatherLoading, units, changeUnits, refreshWeather } = useWeather(
    selectedCity || currentLocation || geoLocation
  );

  // Set initial location
  useEffect(() => {
    const lastLocation = getLastLocation();
    if (lastLocation) {
      setCurrentLocation(lastLocation);
    } else if (geoLocation && !geoLoading) {
      setCurrentLocation(geoLocation);
    }
  }, [geoLocation, geoLoading]);

  // Update background theme based on weather
  useEffect(() => {
    if (weatherData?.current?.weather?.[0]) {
      const condition = weatherData.current.weather[0].main.toLowerCase();
      const hour = new Date().getHours();
      const isNight = hour < 6 || hour > 18;
      
      let theme = 'gradient-clear';
      
      if (isNight) {
        theme = 'gradient-night';
      } else {
        switch (condition) {
          case 'clear':
            theme = 'gradient-clear';
            break;
          case 'clouds':
            theme = 'gradient-cloudy';
            break;
          case 'rain':
          case 'drizzle':
            theme = 'gradient-rainy';
            break;
          case 'snow':
            theme = 'gradient-snowy';
            break;
          case 'mist':
          case 'fog':
          case 'haze':
            theme = 'gradient-mist';
            break;
          default:
            theme = 'gradient-clear';
        }
      }
      
      setBackgroundTheme(theme);
    }
  }, [weatherData]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setLastLocation(city);
    setShowSearch(false);
  };

  const handleUnitsToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setPreferredUnits(newUnits);
    changeUnits(newUnits);
  };

  const handleRefresh = () => {
    refreshWeather();
  };

  const currentWeatherLocation = selectedCity || currentLocation || geoLocation;
  const isLoading = weatherLoading || (geoLoading && !currentLocation);

  return (
    <div className={`min-h-screen bg-${backgroundTheme} weather-transition`}>
      <div className="min-h-screen backdrop-blur-xs bg-black bg-opacity-10">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-12 animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shadow-glow">
                  <MapPin size={24} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Weather</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleUnitsToggle}
                className="btn-glass text-white px-5 py-3 rounded-2xl flex items-center space-x-2 font-semibold"
              >
                <Thermometer size={20} />
                <span>°{units === 'metric' ? 'C' : 'F'}</span>
              </button>
              
              <button
                onClick={handleRefresh}
                className="btn-glass text-white p-4 rounded-2xl"
                disabled={isLoading}
              >
                <RefreshCw size={22} className={isLoading ? 'animate-spin' : ''} />
              </button>
              
              <button
                onClick={() => setShowSearch(true)}
                className="btn-glass text-white px-5 py-3 rounded-2xl flex items-center space-x-2 font-semibold"
              >
                <Search size={20} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <WeatherCardSkeleton />
              ) : (
                <WeatherCard
                  weatherData={weatherData}
                  location={currentWeatherLocation}
                  units={units}
                />
              )}
            </div>
            
            {/* Quick Actions / Stats */}
            <div className="space-y-8">
              {/* Air Quality / Additional Info Card */}
              <div className="glass-card rounded-3xl p-8 text-white animate-fade-in hover-lift">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-3"></div>
                  Today's Highlights
                </h3>
                <div className="space-y-5">
                  {weatherData?.current && (
                    <>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-xl">
                        <span className="text-white text-opacity-80 font-medium">Sunrise</span>
                        <span className="font-semibold text-lg">
                          {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-xl">
                        <span className="text-white text-opacity-80 font-medium">Sunset</span>
                        <span className="font-semibold text-lg">
                          {new Date(weatherData.current.sunset * 1000).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-xl">
                        <span className="text-white text-opacity-80 font-medium">Pressure</span>
                        <span className="font-semibold text-lg">{weatherData.current.pressure} hPa</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Location Info */}
              <div className="glass-card rounded-3xl p-8 text-white animate-fade-in hover-lift">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-3"></div>
                  Location
                </h3>
                <div className="space-y-4">
                  <div className="text-white text-opacity-90 text-xl font-semibold">
                    {currentWeatherLocation?.name || 'Current Location'}
                  </div>
                  {currentWeatherLocation?.country && (
                    <div className="text-white text-opacity-70 text-lg">
                      {currentWeatherLocation.country}
                    </div>
                  )}
                  <div className="text-sm text-white text-opacity-60 bg-white bg-opacity-10 px-3 py-2 rounded-lg inline-block">
                    {currentWeatherLocation?.lat?.toFixed(2)}, {currentWeatherLocation?.lon?.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecasts */}
          <div className="mt-12 space-y-8">
            {/* Hourly Forecast */}
            {isLoading ? (
              <ForecastSkeleton />
            ) : (
              <HourlyForecast
                hourlyData={weatherData?.hourly}
                units={units}
              />
            )}

            {/* Daily Forecast */}
            {isLoading ? (
              <ForecastSkeleton />
            ) : (
              <DailyForecast
                dailyData={weatherData?.daily}
                units={units}
              />
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <CitySearch
          onCitySelect={handleCitySelect}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}

export default App;