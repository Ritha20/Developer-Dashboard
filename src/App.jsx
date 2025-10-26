import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GitHubCard from './components/GithubCard';
import WeatherCard from './components/WeatherCard';
import { 
  fetchGitHubData, 
  fetchWeatherData, 
  getWeatherCondition,
  getWeatherIcon 
} from './Services';

function App() {
  const [githubData, setGithubData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState({ github: true, weather: true });
  const [error, setError] = useState({ github: null, weather: null });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading({ github: true, weather: true });
        setError({ github: null, weather: null });

        // Load both data sources in parallel
        const [githubResponse, weatherResponse] = await Promise.all([
          fetchGitHubData('Ritha20'),
          fetchWeatherData('Kigali')
        ]);

        // Set GitHub data
        setGithubData(githubResponse);

        // Process and set weather data
        const condition = getWeatherCondition(weatherResponse.current.weather_code);
        const processedWeatherData = {
          temperature: Math.round(weatherResponse.current.temperature_2m),
          windSpeed: Math.round(weatherResponse.current.wind_speed_10m),
          condition: condition,
          icon: getWeatherIcon(condition)
        };
        
        setWeatherData(processedWeatherData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError({ 
          github: err.message.includes('GitHub') ? err.message : null,
          weather: err.message.includes('weather') ? err.message : 'Failed to load data'
        });
      } finally {
        setLoading({ github: false, weather: false });
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <WeatherCard 
            data={weatherData}
            loading={loading.weather}
            error={error.weather}
          />
          
          <GitHubCard 
            data={githubData}
            loading={loading.github}
            error={error.github}
          />
        </div>
      </main>
    </div>
  );
}

export default App;