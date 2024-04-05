"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const apiKey = "57f7df1e3063971e738d4e9c5af1bb15";
const listOfCities = ["Москва", "Воронеж", "Самара", "Санкт-петербург"];
export const Weather = () => {
  const [cityName, setCityName] = useState<string | null>(listOfCities[0]);
  const [weatherData, setWeatherData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
  	const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response isn`t ok");
        }
        return res.json();
      })
      .then(data => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
  }, [cityName]);

  return (
    <div style={{ padding: "20px" }}>
      <Autocomplete
        value={cityName}
        onChange={(event: any, newValue: string | null) => {
          setCityName(newValue);
        }}
        disablePortal
        id="combo-box-demo"
        options={listOfCities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Город" />}
      />

      { isLoading ? <div>Загрузка...</div> : <div >{`Температура в городе ${cityName} составляет ${weatherData?.main.temp} `}</div>}
    </div>
  );
};
