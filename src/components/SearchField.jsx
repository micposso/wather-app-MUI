import React from "react";
import { TextField, Button, Autocomplete } from "@mui/material";

const SearchField = ({
  city,
  setCity,
  fetchWeatherByCity,
  suggestions,
  fetchCitySuggestions,
}) => (
  <>
    <Autocomplete
      freeSolo
      options={suggestions}
      inputValue={city}
      onInputChange={(event, newInputValue) => {
        setCity(newInputValue);
        fetchCitySuggestions(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} fullWidth label="Enter City" margin="normal" />
      )}
    />
    <Button variant="contained" onClick={fetchWeatherByCity} fullWidth>
      Get Weather
    </Button>
  </>
);

export default SearchField;
