import React from 'react';
import classes from './weather-tomorrow.module.css';
import { useParams } from 'react-router';
import useFirstLetter from '../../hooks/useFirstLetter';
import useIconImg from '../../hooks/useIconImg';

const findTemp = (days) => {
    let min = days[0].main.temp;
    let max = days[0].main.temp;

    days.forEach((day) => {
        if (day.main.temp > max) {
            max = day.main.temp
        }
        if (day.main.temp < min) {
            min = day.main.temp
        }
    })
    return [
        Math.round(min), Math.round(max)
    ]
}

const Field = ({ temp, wind, weather, time, min, height }) => {
    const img = useIconImg(weather);
    const currentTime = new Date(time).toLocaleString("ru", { hour: "numeric" });
    const currentTemp = Math.round(temp) > 0 ? `+${Math.round(temp)}` : Math.round(temp);
    const currentWind = Math.round(wind);

    const WrapperTemp = {
        height: `${height}px`
    }

    const Temp = {
        bottom: Math.abs(min - Math.round(temp)) * 4
    }

    const Wind = {};

    if (currentWind < 8) {
        Wind.backgroundImage = "linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(235, 236, 237,1) 30%)"
    } else if (currentWind >= 8 && currentWind < 14) {
        Wind.backgroundImage = "linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 235, 170,1) 30%)"
    } else if (currentWind >= 14) {
        Wind.backgroundImage = "linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 170, 170,1) 30%)"
    }

    const roundTemp = Math.round(temp);
    const style = [classes.temp];

    switch (true) {
        case roundTemp > 25:
            style.push(classes.yellow);
            break;
        case roundTemp < 25 && roundTemp > 19:
            style.push(classes.darkYellow);          
            break;
        case roundTemp <= 19 && roundTemp > 14:
            style.push(classes.lightGreen);
            break;
        case roundTemp <= 14 && roundTemp > 7:
            style.push(classes.green);
            break;
        case roundTemp <= 7 && roundTemp > 2:
            style.push(classes.darkGreen);
            break;
        case roundTemp <= 2 && roundTemp > -3:
            style.push(classes.sky);
            break;
        case roundTemp <= 1:
            style.push(classes.blue);
            break;
        default:
            break;
    }

    return (
        <div className={classes.field}>
            <div className={classes.time}>
                {+currentTime}<sup>00</sup>
            </div>
            <div className={classes.icon}>
                <img src={require(`../../img/${img}.svg`).default} alt="" />
            </div>
            <div style={WrapperTemp} className={classes.wrapperTemp}>
                <div style={Temp} className={style.join(' ')}>
                    <span>{currentTemp}</span>
                </div>
            </div>
            <div className={classes.wind}>
                <div style={Wind}></div>
                <span>{currentWind}</span>
            </div>
        </div>
    )
}

const WeatherTomorrow = ({ tomorrow }) => {
    const [min, max] = findTemp(tomorrow);
    const height = 30 + Math.abs(max - min) * 4;
    const { city } = useParams();
    const curcity = useFirstLetter(city)
    const date = new Date(tomorrow[0].dt_txt).toLocaleString("ru", {
        month: "long",
        day: "numeric"
    });

    return (
        <div className={classes.weather}>
            <div className={classes.info}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                    {curcity}
                </div>
                <div style={{ fontSize: '18px', marginBottom: '15px' }}>
                    {date}
                </div>
            </div>
            <div className={classes.timeTable}>
                {
                    tomorrow.map((item, index) => {
                        return (
                            <Field
                                min={min}
                                key={index}
                                height={height}
                                temp={item.main.temp}
                                fellsLike={item.main.fellsLike}
                                humidity={item.main.humidity}
                                wind={item.wind.speed}
                                weather={item.weather[0].main}
                                time={item.dt_txt}
                            />
                        )
                    })
                }
                <div className={classes.windSpeed}>
                    Скорость ветра, м/с
                </div>
            </div>
        </div>
    );
}

export default WeatherTomorrow;