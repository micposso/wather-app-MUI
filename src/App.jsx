// Required dependencies (install before running):
// npm install @mui/material @emotion/react @emotion/styled react-icons axios

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiDayCloudy,
} from "react-icons/wi";

const weatherIcons = {
  Clear: <WiDaySunny size={48} />,
  Clouds: <WiCloud size={48} />,
  Rain: <WiRain size={48} />,
  Thunderstorm: <WiThunderstorm size={48} />,
  Drizzle: <WiRain size={48} />,
  Mist: <WiDayCloudy size={48} />,
};

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState(null);
  const apiKey = "b2efe5292c39fd73143a306f48ffcd6f"; // replace this with your OpenWeather API key

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.lat, coords.lon);
    }
  }, [coords]);

  const fetchWeatherByCoords = async (lat, lon) => {
    const resCurrent = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const resForecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    setWeather(resCurrent.data);
    setForecast(filterDailyForecast(resForecast.data.list));
  };

  const fetchWeatherByCity = async () => {
    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    if (geoRes.data.length > 0) {
      const { lat, lon } = geoRes.data[0];
      fetchWeatherByCoords(lat, lon);
    }
  };

  const filterDailyForecast = (list) => {
    const days = {};
    list.forEach((entry) => {
      const date = new Date(entry.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      if (!days[day] && date.getHours() === 12) {
        days[day] = entry;
      }
    });
    return Object.values(days).slice(0, 4);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Weather App
      </Typography>
      <TextField
        fullWidth
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={fetchWeatherByCity} fullWidth>
        Get Weather
      </Button>

      {weather && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5">{weather.name}</Typography>
            <Typography variant="h6">
              {weather.weather[0].main}{" "}
              {weatherIcons[weather.weather[0].main] || "☁️"}
            </Typography>
            <Typography>Temperature: {weather.main.temp} °C</Typography>
            <Typography>Wind: {weather.wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      )}

      {forecast.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            4-Day Forecast
          </Typography>
          <Grid container spacing={2}>
            {forecast.map((day, index) => {
              const date = new Date(day.dt_txt);
              const weekday = date.toLocaleDateString("en-US", {
                weekday: "long",
              });
              return (
                <Grid item xs={6} sm={3} key={index}>
                  <Card>
                    <CardContent>
                      <Typography>{weekday}</Typography>
                      <Typography>
                        {day.weather[0].main}{" "}
                        {weatherIcons[day.weather[0].main] || "☁️"}
                      </Typography>
                      <Typography>{day.main.temp} °C</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default App;
