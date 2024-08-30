import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = 'b2694d4f657dc18092cde4868894de76';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city) => {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const weatherJson = await weatherResponse.json();

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`
    );
    const forecastJson = await forecastResponse.json();

    const forecast3Days = forecastJson.list.filter((item, index) => index % 8 === 0).slice(1, 4);

    return { weather: weatherJson, forecast: forecast3Days };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    weatherData: null,
    forecastData: null,
    theme: 'light',
    status: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload.weather;
        state.forecastData = action.payload.forecast;
        state.status = 'succeeded';
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCity, toggleTheme } = weatherSlice.actions;

export default weatherSlice.reducer;
