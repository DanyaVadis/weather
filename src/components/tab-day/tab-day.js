import React from 'react';
import useIconImg from '../../hooks/useIconImg';
import classes from './tab-day.module.css';

const setImg = (day) => {
    let img = 'Clear';

    day.data.forEach(period => {
        const time = +new Date(period.sortTime).toLocaleString("ru", { hour: "numeric" })
        if (time >= 9 || time <= 18) {
            switch (period.weather.main) {
                case "Clouds":
                    if (img !== 'Drizzle' && img !== 'Rain' && img !== 'Thunderstorm' && img !== 'Snow') {
                        img = "Clouds";
                    }
                    break;
                case "Drizzle":
                    if (img !== 'Rain' && img !== 'Thunderstorm' && img !== 'Snow') {
                        img = "Drizzle";
                    }
                    break;
                case "Rain":
                    if (img !== 'Thunderstorm' && img !== 'Snow') {
                        img = "Rain";
                    }
                    break;
                case "Thunderstorm":
                    if (img !== 'Snow') {
                        img = "Thunderstorm";
                    }
                    break;
                case "Snow":
                    img = "Snow";
                    break;
                default:
                    break;
            }
        }
    })

    return img;
}
const findTemp = (days) => {
    let min = days[0].temp;
    let max = days[0].temp;

    days.forEach((day) => {
        if (day.temp > max) {
            max = day.temp
        }
        if (day.temp < min) {
            min = day.temp
        }
    })
    return [
        min, max
    ]
}
const tabDate = (date) => {
    const num = new Date(date).toLocaleString("ru", { day: "numeric" })
    const month = new Date(date).toLocaleString("ru", { month: "long", day: "numeric" }).replace(/\d/g, '');
    return [num, month]
}
const TabDay = ({ day, changeTab, idx, choosed }) => {

    const [num, month] = tabDate(day.data[0].sortTime)
    const [min, max] = findTemp(day.data);
    let img = useIconImg(setImg(day));

    return (
        <div
            className={choosed ? `${classes.tab} ${classes.choosed}` : classes.tab}
            onClick={() => changeTab(idx)}
        >
            <div className={classes.wrapper}>
                <div>{day.day}</div>
                <div>{num}</div>
                <div>{month}</div>
                <div style={{ height: '64px' }}>
                    <img src={require(`../../img/${img}.svg`).default} alt="" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            Мин.
                        </div>
                        <div>
                            {min > 0 ? `+${Math.round(min)}` : Math.round(min)}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            Макс.
                        </div>
                        <div>
                            {max > 0 ? `+${Math.round(max)}` : Math.round(max)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabDay;