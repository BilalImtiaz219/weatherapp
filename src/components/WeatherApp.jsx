import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCity, toggleTheme, fetchWeatherData } from './WeatherSlice';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { city, weatherData, forecastData, theme } = useSelector((state) => state.weather);

  const handleCityChange = (event) => {
    dispatch(setCity(event.target.value));
  };

  const handleFetchWeather = () => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`p-10 rounded-3xl mx-80 my-10 shadow-2xl ${theme === 'light' ? 'bg-[#AF86FF] text-white' : 'bg-[#2C2C2C] text-[#AF86FF]'}`}>
      <button 
        className={`p-4 rounded-3xl mb-10 ${theme === 'light' ? 'bg-white text-[#AF86FF]' : 'bg-[#AF86FF] text-white'}`} 
        onClick={handleToggleTheme}>
        Toggle Theme
      </button>
      <h1 className='text-5xl font-bold'>Weather App</h1>
      <h1 className='text-3xl font-bold mt-6'>Enter your City Name</h1>
      <input 
        type="text" 
        placeholder='City Name...' 
        onChange={handleCityChange} 
        className={`mt-6 w-[100%] p-4 rounded-3xl ${theme === 'light' ? 'text-black' : 'text-black'}`}
      />
      <button 
        className={`p-4 mt-6 rounded-3xl ${theme === 'light' ? 'bg-white text-[#AF86FF]' : 'bg-[#AF86FF] text-white'}`} 
        onClick={handleFetchWeather}>
        Search
      </button>

      {weatherData && (
        <div className='mt-10'>
          <h2 className='text-4xl font-bold'>{weatherData.name}</h2>
          <div className='flex items-center'>
            <p className='text-2xl mt-4'>Temperature: {weatherData.main.temp}°C</p>
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              alt={weatherData.weather[0].description} 
              className='w-20 h-20 ml-4'
            />
          </div>
          <p className='text-2xl mt-2'>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}

      {forecastData && (
        <div className='mt-10'>
          <h2 className='text-3xl font-bold'>2-Day Forecast</h2>
          <div className='flex justify-between mt-6'>
            {forecastData.map((forecast, index) => (
              <div key={index} className={`p-4 rounded-3xl mb-10 ${theme === 'light' ? 'bg-white text-[#AF86FF]' : 'bg-[#AF86FF] text-white'}`} >
                <p className='text-xl font-bold'>Day {index + 1}</p>
                <p className='text-lg mt-2'>Temp: {forecast.main.temp}°C</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                  alt={forecast.weather[0].description} 
                  className='w-20 h-20 mt-2 mx-auto'
                />
                <p className='text-lg mt-2'>Condition: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
