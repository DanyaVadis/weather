import React from 'react';
import OtherDays from './other-days';
import CurrentDay from './current-day';

const setCurrentTemp = (arr, currentTime) => {
    let temp;
    arr.forEach((time) => {
        if (new Date(time.sortTime).toLocaleString("ru", { hour: "numeric" }) === currentTime) {
            temp = time.temp
        }
    })
    return Math.round(temp)
}
const setImg = (data, currentTime) => {
    const item = data.filter(item => {
        const time = new Date(item.sortTime).toLocaleString("ru", { hour: "numeric" }).split(':')[0];
        return time === currentTime
    })

    switch (item[0].weather.main) {
        case "Clouds":
            const time = +new Date(item[0].sortTime).toLocaleString("ru", { hour: "numeric" })
            if (time <= 6 || time >= 21) {
                return 'https://sinst.fwdcdn.com/img/weatherImg/b/n200.jpg'
            }
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d200.jpg'

        case "Thunderstorm":
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d340.jpg';

        case "Drizzle":
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d320.jpg';

        case "Rain":
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d320.jpg';

        case "Snow":
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d412.jpg';

        case "Clear":
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d000.jpg';

        default:
            return 'https://sinst.fwdcdn.com/img/weatherImg/b/d000.jpg';
    }
}

const TabInfoTime = ({ currentTime, day, current }) => {
    if (!current) {
        return <OtherDays day={day} />
    }

    return (
        <CurrentDay
            setImg={setImg}
            setCurrentTemp={setCurrentTemp}
            day={day}
            currentTime={currentTime}
        />
    );
}

export default TabInfoTime;