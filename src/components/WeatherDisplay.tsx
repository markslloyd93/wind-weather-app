import WindSpeed from '../assets/gauge-high-solid-full.svg';
import WindDegree from '../assets/compass-solid-full.svg';
import WindGust from '../assets/wind-solid-full.svg';
import type { WeatherData } from '../hooks/useWeatherAPI';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

interface WeatherDataItemProps {
  icon: string;
  iconAlt: string;
  label: string;
  value: number;
  unit: string;
}

const WeatherDataItem = ({ icon, iconAlt, label, value, unit }: WeatherDataItemProps) => (
  <div className="weather-data__item">
    <dt>
      <img src={icon} alt={iconAlt} className="weather-icon" />
      <span>{label}</span>
    </dt>
    <dd>
      <data value={value}>{value} {unit}</data>
    </dd>
  </div>
);

export const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  const windItems = [
    {
      icon: WindSpeed,
      iconAlt: "wind speed icon",
      label: "Speed",
      value: weatherData.windSpeed,
      unit: "km/h"
    },
    {
      icon: WindDegree,
      iconAlt: "wind degree icon", 
      label: "Degree",
      value: weatherData.windDegree,
      unit: "°"
    },
    {
      icon: WindGust,
      iconAlt: "wind gust icon",
      label: "Gust", 
      value: weatherData.windGust,
      unit: "km/h"
    }
  ];

  return (
    <section className="weather-display">
      <header className="weather-summary">
        <div className="location-info">
          <h1 className="location">{weatherData.location}</h1>
        </div>
        <div className="temp-display">
          <p className="temp">{weatherData.temp}°C</p>
        </div>
      </header>
      
      <section className="weather-details">
        <h2 id="windInfoHeading" className="sr-only">Wind Information</h2>
        <dl className="weather-data">
          {windItems.map((item) => (
            <WeatherDataItem key={item.label} {...item} />
          ))}
        </dl>
      </section>
    </section>
  );
};