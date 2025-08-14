import React from 'react';
import { MapPin, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { WeatherAnimation } from './WeatherAnimation';

export const WeatherCard = ({ weatherData, location, units }) => {
  if (!weatherData) return null;

  const { current } = weatherData;
  const temperature = Math.round(current.temp);
  const feelsLike = Math.round(current.feels_like);
  const condition = current.weather[0]?.main;
  const description = current.weather[0]?.description;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-card rounded-3xl p-8 text-white backdrop-blur-md hover-lift animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white bg-opacity-20 rounded-full">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="text-xl font-semibold">
            {location?.name || 'Current Location'}
          </span>
        </div>
        <div className="text-right text-sm text-white text-opacity-80 bg-white bg-opacity-10 px-3 py-1 rounded-full">
          {formatTime(current.dt)}
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className="text-7xl font-thin mb-3 animate-scale-in">
            {temperature}°
            <span className="text-4xl text-opacity-80 ml-1">
              {units === 'metric' ? 'C' : 'F'}
            </span>
          </div>
          <div className="text-2xl text-white text-opacity-90 capitalize mb-2 font-medium">
            {description}
          </div>
          <div className="text-white text-opacity-70 text-lg">
            Feels like {feelsLike}°{units === 'metric' ? 'C' : 'F'}
          </div>
        </div>
        
        <div className="flex-shrink-0 animate-bounce-gentle">
          <WeatherAnimation 
            weatherCondition={condition}
            className="w-28 h-28"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-15 rounded-2xl p-5 hover-lift transition-all duration-300 hover:bg-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-400 bg-opacity-30 rounded-full">
              <Droplets size={18} className="text-blue-200" />
            </div>
            <div>
              <div className="text-white text-opacity-70 text-sm font-medium">Humidity</div>
              <div className="text-xl font-semibold">{current.humidity}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-15 rounded-2xl p-5 hover-lift transition-all duration-300 hover:bg-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-400 bg-opacity-30 rounded-full">
              <Wind size={18} className="text-gray-200" />
            </div>
            <div>
              <div className="text-white text-opacity-70 text-sm font-medium">Wind Speed</div>
              <div className="text-xl font-semibold">
                {Math.round(current.wind_speed)} {units === 'metric' ? 'm/s' : 'mph'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-15 rounded-2xl p-5 hover-lift transition-all duration-300 hover:bg-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-400 bg-opacity-30 rounded-full">
              <Eye size={18} className="text-green-200" />
            </div>
            <div>
              <div className="text-white text-opacity-70 text-sm font-medium">Visibility</div>
              <div className="text-xl font-semibold">
                {current.visibility ? Math.round(current.visibility / 1000) : 10} km
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-15 rounded-2xl p-5 hover-lift transition-all duration-300 hover:bg-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-400 bg-opacity-30 rounded-full">
              <Thermometer size={18} className="text-red-200" />
            </div>
            <div>
              <div className="text-white text-opacity-70 text-sm font-medium">UV Index</div>
              <div className="text-xl font-semibold">{current.uvi || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};