export type WeatherRequest = {
    main: WeatherRequestMainData;
    wind: WeatherRequestWindData;    
    
}
type WeatherRequestMainData = { 
    temp: number;
    feels_like: number;
}

type WeatherRequestWindData = {
    speed: number;
}