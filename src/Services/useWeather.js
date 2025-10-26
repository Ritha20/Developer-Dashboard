import axios from 'axios';

// Create axios instance for Weather API
const weatherApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

// Coordinates for Kigali, Rwanda
const KIGALI_COORDINATES = {
  latitude: -1.9536,
  longitude: 30.0606
};

export const fetchWeatherData = async (city = 'Kigali') => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        latitude: KIGALI_COORDINATES.latitude,
        longitude: KIGALI_COORDINATES.longitude,
        current: 'temperature_2m,wind_speed_10m,weather_code',
        timezone: 'Africa/Cairo'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch weather data');
    }
  }
};

// Helper function to convert weather code to human-readable condition
export const getWeatherCondition = (code) => {
  const weatherConditions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm'
  };
  return weatherConditions[code] || 'Unknown weather condition';
};

// Optional: Get weather icon based on condition
export const getWeatherIcon = (condition) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear')) return '☀️';
  if (conditionLower.includes('cloud')) return '☁️';
  if (conditionLower.includes('rain')) return '🌧️';
  if (conditionLower.includes('drizzle')) return '🌦️';
  if (conditionLower.includes('snow')) return '❄️';
  if (conditionLower.includes('thunder')) return '⛈️';
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
  return '🌈';
};