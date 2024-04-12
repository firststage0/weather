"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { WeatherRequest } from "./Weather.types";
import { fetcher } from "../Fetcher/fetcher";
import Geolocation from "react-native-geolocation-service";
const apiKey = "57f7df1e3063971e738d4e9c5af1bb15";
const listOfCities = ["Москва", "Воронеж", "Самара", "Санкт-петербург"];
export const Weather = () => {
  const [cityName, setCityName] = useState<string | null>(listOfCities[0]);

  const [weatherData, setWeatherData] = useState<WeatherRequest>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const fetchData = async () => {
      setIsLoading(true);
      const weatherData = (await fetcher(weatherApiURL)) as WeatherRequest;
      setWeatherData(weatherData);
      setIsLoading(false);
    };
    cityName && fetchData();
  }, [cityName]);

  const getGeolocation = () => {
    Geolocation.getCurrentPosition((position) => {
      return position;
    });
  };

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

  const fetchGeolocation = () => {
    console.log("");

    Geolocation.getCurrentPosition(async (position) => {
      const { coords } = position ?? {};
      const { latitude, longitude } = coords ?? {};
      const geolocationApiURL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      setIsLoading(true);
      const geolocationData = await fetcher(geolocationApiURL);
      const city = geolocationData.address.city;

      // TODO: Переписать по человечески

      if (!listOfCities.includes(city)) {
        listOfCities.push(city);
      }

      setCityName(city);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

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
      <button
        onClick={fetchGeolocation}
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "240px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Определить местоположение
      </button>
    </div>
  );
};
