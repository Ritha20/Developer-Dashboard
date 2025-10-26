import { useState, useEffect } from 'react';

const WeatherCard = ({ data, loading, error }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <div className="text-center text-red-500 dark:text-red-400">
          <p className="font-semibold">Error loading weather data</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Current Weather - Kigali
      </h2>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-4xl font-bold text-gray-800 dark:text-white">
            {data.temperature}°
          </p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
            <span className="text-2xl">{data.icon}</span>
            {data.condition}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {data.windSpeed} mph
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Wind</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {currentTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Time</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;