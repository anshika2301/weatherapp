import React from 'react';

export const WeatherAnimation = ({ weatherCondition, className = '' }) => {
  const getAnimationComponent = () => {
    switch (weatherCondition?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <SunAnimation />;
      case 'rain':
      case 'drizzle':
        return <RainAnimation />;
      case 'clouds':
      case 'cloudy':
        return <CloudAnimation />;
      case 'snow':
        return <SnowAnimation />;
      default:
        return <DefaultAnimation />;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {getAnimationComponent()}
    </div>
  );
};

const SunAnimation = () => (
  <div className="relative">
    <div className="w-16 h-16 bg-yellow-400 rounded-full animate-float shadow-lg">
      <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-20"></div>
    </div>
    <div className="absolute inset-0 animate-spin-slow">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 bg-yellow-400 rounded-full origin-bottom"
          style={{
            transform: `rotate(${i * 45}deg) translateY(-24px)`,
            transformOrigin: '50% 24px'
          }}
        />
      ))}
    </div>
  </div>
);

const RainAnimation = () => (
  <div className="relative w-16 h-16">
    <div className="w-12 h-8 bg-gray-400 rounded-full mb-2 animate-float"></div>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-4 bg-blue-400 rounded-full animate-bounce"
        style={{
          left: `${20 + i * 8}%`,
          top: '60%',
          animationDelay: `${i * 0.2}s`,
          animationDuration: '1s'
        }}
      />
    ))}
  </div>
);

const CloudAnimation = () => (
  <div className="relative">
    <div className="w-14 h-10 bg-gray-300 rounded-full animate-float"></div>
    <div className="absolute top-2 left-4 w-10 h-6 bg-gray-400 rounded-full animate-float" 
         style={{ animationDelay: '0.5s' }}></div>
  </div>
);

const SnowAnimation = () => (
  <div className="relative w-16 h-16">
    <div className="w-12 h-8 bg-gray-200 rounded-full mb-2 animate-float"></div>
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-black rounded-full animate-bounce"
        style={{
          left: `${15 + (i % 4) * 18}%`,
          top: `${50 + Math.floor(i / 4) * 20}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: '2s'
        }}
      />
    ))}
  </div>
);

const DefaultAnimation = () => (
  <div className="w-16 h-16 bg-blue-200 rounded-full animate-float opacity-70"></div>
);