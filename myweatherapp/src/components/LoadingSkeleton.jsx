import React from 'react';

export const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="shimmer rounded-lg h-4 mb-2"></div>
      <div className="shimmer rounded-lg h-4 w-3/4 mb-2"></div>
      <div className="shimmer rounded-lg h-4 w-1/2"></div>
    </div>
  );
};

export const WeatherCardSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="shimmer h-8 w-32 rounded-lg"></div>
        <div className="shimmer h-12 w-12 rounded-full"></div>
      </div>
      
      <div className="shimmer h-16 w-24 rounded-lg mb-4"></div>
      
      <div className="space-y-2">
        <div className="shimmer h-4 w-full rounded"></div>
        <div className="shimmer h-4 w-3/4 rounded"></div>
        <div className="shimmer h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const ForecastSkeleton = () => {
  return (
    <div className="flex space-x-4 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 min-w-[120px] animate-pulse">
          <div className="shimmer h-4 w-16 rounded mb-2"></div>
          <div className="shimmer h-8 w-8 rounded-full mx-auto mb-2"></div>
          <div className="shimmer h-6 w-12 rounded mx-auto"></div>
        </div>
      ))}
    </div>
  );
};