"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { WeatherRequest } from "./Weather.types";

const apiKey = "57f7df1e3063971e738d4e9c5af1bb15";
const listOfCities = ["Москва", "Воронеж", "Самара", "Санкт-петербург"];
export const Weather = () => {
  const [cityName, setCityName] = useState<string | null>(listOfCities[0]);

  const [weatherData, setWeatherData] = useState<WeatherRequest>();

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

      .then((data: WeatherRequest) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [cityName]);

  const renderWeatherData = () => {
    switch (true) {
      case isLoading: {
        return <div>Загрузка...</div>;
      }
      case !!cityName && !!weatherData: {
        return <Card cityName={cityName} weatherData={weatherData} />;
      }
      default:
        const text = "Тут пусто...";
        return <div>{text}</div>;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >

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

      {renderWeatherData()}

    </div>
  );
};
