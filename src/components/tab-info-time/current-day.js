import React from 'react';
import classes from './tab-info-time.module.css';

const CurrentDay = ({day, currentTime, setImg, setCurrentTemp}) => {
    const currentTemp = setCurrentTemp(day.data, currentTime);
    const img = setImg(day.data, currentTime)

    return (
        <div className={classes.lSide}>
            <div className={classes.imgBlock}>
                <div className={classes.todayTime}>Погода сегодня в {currentTime}:00</div>
                <div className={classes.img}>
                    <img src={img} alt="img" />
                </div>
                <div className={classes.therm}>
                    <span style={{ height: `${40 + currentTemp}px` }}></span>
                </div>
                <p className={classes.todayTemp}>{currentTemp >= 0 ? `+${currentTemp}` : `-${currentTemp}`}°C</p>
            </div>
            <div className={classes.titles}>
                <p>Температура, °C</p>
                <p>Чувствуется как</p>
                <p>Влажность, %</p>
                <p>Облачность, %</p>
                <p>Ветер, м/сек</p>
            </div>
        </div>
    );
}

export default CurrentDay;