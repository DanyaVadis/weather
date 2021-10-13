import React from 'react';
import TabDay from '../tab-day/tab-day';
import TabInfo from '../tab-info/tab-info';
import classes from './weather-five-days.module.css';
import useFirstLetter from '../../hooks/useFirstLetter';

const WeatherSeveralDays = ({ choosedTab, changeTab, forecast, city, days }) => {

    
    const currentCity = useFirstLetter(city);
    let countDays;

    if(days.match(/\d/) === 3){
        countDays = `${days.match(/\d/)} дня`
    } else {
        countDays = `${days.match(/\d/)} дней`
    }

    const choosedDay = forecast.filter((item, idx) => idx === choosedTab);

    return (
        <div className={classes.weather}>
            <div className={classes.city}>
                <span>
                    {`Погода ${currentCity} на ${countDays}`}
                </span>
            </div>
            <div className={classes.tabDay}>
                {
                    forecast.map((day, idx) => {
                        return (
                            <TabDay
                                key={day.data[0].sortTime}
                                day={day}
                                days={days}
                                idx={idx}
                                changeTab={changeTab}
                                choosed={idx === choosedTab ? true : false}
                            />
                        )
                    })
                }
            </div>
            <TabInfo choosedTab={choosedTab} day={choosedDay[0]} />
        </div>
    );
}

export default WeatherSeveralDays;