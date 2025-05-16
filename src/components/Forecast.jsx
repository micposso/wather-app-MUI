import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiDayCloudy,
} from "react-icons/wi";

const weatherIcons = {
  Clear: <WiDaySunny size={32} />,
  Clouds: <WiCloud size={32} />,
  Rain: <WiRain size={32} />,
  Thunderstorm: <WiThunderstorm size={32} />,
  Drizzle: <WiRain size={32} />,
  Mist: <WiDayCloudy size={32} />,
};

const Forecast = ({ forecast }) => (
  <>
    <Typography variant="h6" sx={{ mt: 4 }}>
      4-Day Forecast
    </Typography>
    <Grid container spacing={2}>
      {forecast.map((day, index) => {
        const date = new Date(day.dt_txt);
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
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
);

export default Forecast;
