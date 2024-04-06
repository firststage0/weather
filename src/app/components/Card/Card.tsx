import { WeatherRequest } from "../Weather/Weather.types";
import styles from "./Card.module.css";

type CardProps = {
  cityName: string;
  weatherData: WeatherRequest;
};

export const Card = (props: CardProps) => {
  const { cityName, weatherData } = props;

  return (
    <div className={styles.card} id="card">
      <div>{`${cityName}`}</div>
      <div>
        {`Фактическая температура составляет ${weatherData.main.temp} \u2103`}
      </div>
      <div>{`Ощущается как ${weatherData.main.feels_like} \u2103`}</div>
      <div>{`Скорость ветра ${weatherData.wind.speed} м/с`}</div>
    </div>
  );
};
{
  /* {`Температура в городе ${cityName} составляет ${weatherData?.main.temp} \u2103`} */
}
