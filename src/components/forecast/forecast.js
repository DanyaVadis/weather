import React from 'react';
import classes from './forecast.module.css';
import { Route, Switch } from 'react-router';
import WeatherSeveralDays from '../weather-several-days/weather-several-days-container';
import WeatherNow from '../weather-now/weather-now-container';
import WeatherTomorrow from '../weather-tomorrow/weather-tomorrow-container';

const Forecast = ({ choosedTab, changeTab, loading }) => {
    return (
        <div className={classes.weather}>
            <div className={classes.container}>
                <Switch>
                    <Route path="/:city/now" render={() => {
                        return (
                            <WeatherNow />
                        )
                    }} />
                    <Route path="/:city/tomorrow" render={() => {
                        return (
                            <WeatherTomorrow />
                        )
                    }} />
                    <Route path='/:city/:days' render={() => {
                        return (
                            <WeatherSeveralDays
                                choosedTab={choosedTab}
                                changeTab={changeTab}
                                loading={loading}
                            />
                        )
                    }} />
                    <Route path="/:city?" exact render={() => {
                        return (
                            <WeatherNow />
                        )
                    }} />

                </Switch>


            </div>
        </div>
    );
}

export default Forecast