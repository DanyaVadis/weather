import React from 'react';
import classes from './tab-info.module.css';
import TabInfoTable from '../tab-info-table/tab-info-table';
import TabInfoTime from '../tab-info-time/tab-info-time';

const setCurrentTime = () => {
    const currentTime = new Date().toLocaleString("ru", { hour: "numeric", minute: "numeric" });
    let hour = currentTime.split(':').reduce(function (h, m) { return +h + +m / 60 });

    if(hour > 23.49 && hour < 24){
        hour = 23
    }
    let hours = Math.round(hour);

    if (hours % 3 !== 0) {
        if (hours % 3 >= 1.5) {
            
            if (hours === 23) {
                return `21`
            }
            hours += 1;
            if (hours < 10) {
                return `0${hours}`
            } else {
                return `${hours}`
            }
        } else {
            hours -= 1;
            if (hours < 10) {
                return `0${hours}`
            } else {
                return `${hours}`
            }
        }
    } else {
        if (hours < 10) {
            return `0${hours}`
        } else {
            return `${hours}`
        }
    }
}

const TabInfo = ({ day, choosedTab }) => {

    const times = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    const currentTime = setCurrentTime();

    const currentDay = new Date().toLocaleString("ru", { month: "long", day: "numeric" });
    const itemDay = new Date(day.data[0].sortTime).toLocaleString("ru", { month: "long", day: "numeric" });

    const current = currentDay === itemDay;

    return (
        <div className={classes.tabInfo}>
            <TabInfoTime day={day} currentTime={currentTime} current={current}/>
            <TabInfoTable day={day} times={times} currentTime={currentTime} current={current}/>
        </div>
    );
}

export default TabInfo;