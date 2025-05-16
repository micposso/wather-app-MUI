import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
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

const CurrentWeather = ({ weather }) => (
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
);

export default CurrentWeather;
