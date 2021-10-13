import React, { useEffect, useContext, useState } from 'react';
import WeatherContext from '../weather-context/weather-context';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader';
import WeatherTomorrow from './weather-tomorrow';
import { weatherTomorrowLoaded } from '../../actions/weather-actions';
import classes from './weather-tomorrow.module.css';

const findTomorrow = (day) => {
    let date = new Date(day.dt_txt).toLocaleString("ru", { day: "numeric" });
    let currentDay = new Date();
    currentDay.setDate(currentDay.getDate() + 1);
    let tomorrowDay = currentDay.getDate().toLocaleString("ru", { day: "numeric" });

    return (date === tomorrowDay);
}

const WeatherTomorrowContainer = props => {

    let { city } = useParams();
    const dispatch = useDispatch();
    const weatherService = useContext(WeatherContext);
    const tomorrow = useSelector(state => state.tomorrow);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        weatherService.getTomorrowWeather(city)
            .then(res => {
                const tomorrowWeather = res.filter(findTomorrow);
                dispatch(weatherTomorrowLoaded(tomorrowWeather));
                setLoading(false)
            })
    }, [city, weatherService, dispatch])

    if (loading) {
        return (
            <div className={classes.loaderWrapper}>
                <Loader />
            </div>
        )
    }


    return (
        <WeatherTomorrow {...props} tomorrow={tomorrow} />
    );
}

export default WeatherTomorrowContainer;