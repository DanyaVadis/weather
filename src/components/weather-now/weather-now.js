import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './weather-now.module.css';
import useIconImg from '../../hooks/useIconImg';
import useFirstLetter from '../../hooks/useFirstLetter';

const setTime = (time) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2)
}

const WeatherNow = ({ now }) => {
    const img = useIconImg(now.weather[0].main);
    const { city } = useParams();
    const sunrise = setTime(now.sys.sunrise);
    const sunset = setTime(now.sys.sunset);
    const temp = Math.round(now.main.temp) > 0 ? `+${Math.round(now.main.temp)}` : Math.round(now.main.temp);
    const fellsTemp = Math.round(now.main.feels_like) > 0 ? `+${Math.round(now.main.feels_like)}` : Math.round(now.main.feels_like);
    const date = new Date().toLocaleString("ru", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
    const cityName = useFirstLetter(city);

    return (
        <div className={classes.weatherNow}>
            <div className={classes.wrapper}>
                <div className={classes.date}>
                    <div className={classes.city}>{cityName}</div>
                    <div className={classes.date}>{date}</div>
                </div>
                <div className={classes.temp}>
                    <div className={classes.mainTemp}>{temp}°C</div>
                    <div className={classes.tempImg}>
                        <img src={require(`../../img/${img}.svg`).default} alt="img" />
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.titles}>
                        <div>По ощущению:</div>
                        <div>Ветер:</div>
                        <div>Влажность:</div>
                        <div>Восход:</div>
                        <div>Закат:</div>
                    </div>
                    <div className={classes.data}>
                        <div>{fellsTemp}°C</div>
                        <div>{now.wind.speed} м/c</div>
                        <div>{now.main.humidity}%</div>
                        <div>{sunrise}</div>
                        <div>{sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherNow;