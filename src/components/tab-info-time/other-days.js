import React from 'react';
import classes from './tab-info-time.module.css';

const OtherDays = ({day}) => {
    const month = new Date(day.data[0].sortTime).toLocaleString("ru", { month: "long" });
        const date = new Date(day.data[0].sortTime).toLocaleString("ru", { day: "numeric" });
        const dayWeek = day.day
        return (
            <div className={classes.lSide}>
                <div className={classes.calendDay}>
                    <p className={classes.infoDayWeek}>{dayWeek}</p>
                    <p className={classes.infoDate}>{date}</p>
                    <p className={classes.infoMonth}>{month}</p>
                </div>
                <div className={classes.titles}>
                    <p>Температура, °C</p>
                    <p>Чувствуется как</p>
                    <p>Влажность, %</p>
                    <p>Облачность, %</p>
                    <p>Ветер, м/сек</p>
                </div>
            </div>
        )
}

export default OtherDays;