import React from 'react';
import { WeatherAnimation } from './WeatherAnimation';

export const HourlyForecast = ({ hourlyData, units }) => {
  if (!hourlyData) return null;

  const next24Hours = hourlyData.slice(0, 24);

  const formatHour = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric'
    });
  };

  return (
    <div className="glass-card rounded-3xl p-8 text-black animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-yellow-500 rounded-full mr-3"></div>
        24-Hour Forecast
      </h3>
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {next24Hours.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-center bg-white bg-opacity-15 rounded-2xl p-4 min-w-[90px] hover-lift transition-all duration-300 hover:bg-opacity-25"
          >
            <div className="text-sm text-black text-opacity-80 mb-3 font-medium">
              {formatHour(hour.dt)}
            </div>
            <div className="mb-3">
              <WeatherAnimation 
                weatherCondition={hour.weather[0]?.main}
                className="w-10 h-10"
              />
            </div>
            <div className="text-xl font-bold">
              {Math.round(hour.temp)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DailyForecast = ({ dailyData, units }) => {
  if (!dailyData) return null;

  const next7Days = dailyData.slice(0, 7);

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="glass-card rounded-3xl p-8 text-black animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-3"></div>
        7-Day Forecast
      </h3>
      <div className="space-y-4">
        {next7Days.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 bg-white bg-opacity-15 rounded-2xl hover-lift transition-all duration-300 hover:bg-opacity-25"
          >
            <div className="flex items-center space-x-6 flex-1">
              <div className="w-20 text-black text-opacity-60 font-semibold text-lg">
                {formatDay(day.dt)}
              </div>
              <div className="flex-shrink-0">
                <WeatherAnimation 
                  weatherCondition={day.weather[0]?.main}
                  className="w-10 h-10"
                />
              </div>
              <div className="flex-1 text-black text-opacity-80 capitalize font-medium">
                {day.weather[0]?.description}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-black text-opacity-70 text-sm font-medium">
                  {Math.round(day.temp.min)}°
                </div>
                <div className="text-xl font-bold">
                  {Math.round(day.temp.max)}°
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};