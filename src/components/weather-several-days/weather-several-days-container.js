import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WeatherContext from '../weather-context/weather-context';
import { forecastLoaded } from '../../actions/weather-actions';
import WeatherSeveralDays from './weather-several-days';
import classes from './weather-five-days.module.css';
import Loader from '../loader/loader';

const findDay = (day, dayName) => {
    let date = new Date(day.dt_txt).toLocaleString("ru", { weekday: "long" });
    return (date === dayName);
}
const createArr = (arr) => {
    return (
        arr.map((elem => {
            let time = new Date(elem.dt_txt).toLocaleString("ru", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            });
            let sortTime = new Date(elem.dt_txt);
            let labelTime = new Date(elem.dt_txt).toLocaleString("ru", {
                month: "long",
                day: "numeric"
            });
            return {
                time,
                sortTime,
                labelTime,
                humidity: elem.main.humidity,
                temp: elem.main.temp,
                feels_like: elem.main.feels_like,
                weather: elem.weather[0],
                wind: elem.wind,
                clouds: elem.clouds.all
            }
        })
        )
    )
}

const WeatherSeveralDaysContainer = (props) => {
    const dispatch = useDispatch()
    const weatherService = useContext(WeatherContext);
    let { days } = useParams();
    let { city } = useParams();
    const [choosedTab, setChoosedTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const forecast = useSelector(state => state.forecast);

    const changeTabHandler = (idx) => {
        setChoosedTab(idx)
    }

    useEffect(() => {
        setLoading(true);
        weatherService.getForecast(city, days.match(/\d/))
            .then(res => {
                let week = [
                    { day: 'Понедельник', data: createArr(res.filter((day) => findDay(day, 'понедельник'))) },
                    { day: 'Вторник', data: createArr(res.filter((day) => findDay(day, 'вторник'))) },
                    { day: 'Среда', data: createArr(res.filter((day) => findDay(day, 'среда'))) },
                    { day: 'Четверг', data: createArr(res.filter((day) => findDay(day, 'четверг'))) },
                    { day: 'Пятница', data: createArr(res.filter((day) => findDay(day, 'пятница'))) },
                    { day: 'Суббота', data: createArr(res.filter((day) => findDay(day, 'суббота'))) },
                    { day: 'Воскресенье', data: createArr(res.filter((day) => findDay(day, 'воскресенье'))) },
                ]
                    .filter(item => item.data[0])
                    .sort(function (a, b) {
                        return new Date(a.data[0].sortTime) - new Date(b.data[0].sortTime);
                    })
                setLoading(false)
                setChoosedTab(0)
                return dispatch(forecastLoaded(week))
            })
    }, [city, days, dispatch, weatherService]);

    if (loading || !forecast) {
        return (
            <div className={classes.loaderWrapper}>
                <Loader />
            </div>
        )
    }

    return (
        <WeatherSeveralDays
            {...props}
            choosedTab={choosedTab}
            changeTab={changeTabHandler}
            loading={loading}
            city={city}
            days={days}
            forecast={forecast}
        />
    )
}

export default WeatherSeveralDaysContainer;