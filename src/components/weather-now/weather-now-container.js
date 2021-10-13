import React, { useEffect, useContext, useState } from 'react';
import WeatherContext from '../weather-context/weather-context';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { weatherNowLoaded } from '../../actions/weather-actions';
import Loader from '../loader/loader';
import classes from './weather-now.module.css';
import WeatherNow from './weather-now';

const WeatherNowContainer = (props) => {
    let { city } = useParams();
    const dispatch = useDispatch();
    const weatherService = useContext(WeatherContext);
    const now = useSelector(state => state.now);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        weatherService.getCurrentWeather(city)
            .then(res => {
                const now = {
                    main: res.main,
                    weather: res.weather,
                    wind: res.wind,
                    sys: res.sys
                }
                dispatch(weatherNowLoaded(now))
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
        <WeatherNow {...props} now={now} />
    );
}

export default WeatherNowContainer;