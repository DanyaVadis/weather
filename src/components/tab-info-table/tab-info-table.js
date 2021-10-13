import React from 'react';
import classes from './table-info-table.module.css';

const setImg = (period) => {
    if (!period) {
        return
    }
    switch (period.weather.main) {
        case "Clouds":
            const time = +new Date(period.sortTime).toLocaleString("ru", { hour: "numeric" })
            if (time <= 6 || time >= 21) {
                return 'cloudy-night'
            }
            return 'cloudy-day'

        case "Thunderstorm":
            return 'thunder';

        case "Drizzle":
            return 'drizzle';

        case "Rain":
            return 'rainy';

        case "Snow":
            return 'snowy';

        case "Clear":
            return 'day';

        default:
            return 'day';
    }
}

const renderRow = (arr, currentTime, current, times) => ({ name, render }) => {
    return (
        <tr className={name}>
            {
                times.map((time, index) => {
                    const newArr = arr.filter((item) => new Date(item.sortTime).toLocaleString("ru", { hour: "numeric", minute: "numeric" }) === time)
                    const currTime = time.split(':')[0];
                    return (
                        <td key={index} className={currentTime === currTime && current ? classes.current : null}>
                            <span>
                                {
                                    render(newArr[0])
                                }
                            </span>
                        </td>
                    )
                })
            }
        </tr>
    )
}

const TabInfoTable = ({ times, currentTime, day, current }) => {
    const Row = renderRow(day.data, currentTime, current, times);

    return (
        <div className={classes.container}>
            <div className={classes.parts}>
                <div>ночь</div>
                <div>утро</div>
                <div>день</div>
                <div>вечер</div>
            </div>
            <table className={classes.table}>
                <tbody>
                    <tr className={`${classes.times} ${classes.gray}`}>
                        {
                            times.map((item, index) => {
                                return <td key={index} className={currentTime === item.split(':')[0] && current ? classes.current : null}>{item}</td>
                            })
                        }
                    </tr>
                    <Row
                        name={classes.timeIcon}
                        render={(period) => {
                            const img = setImg(period)
                            return img ? <img src={require(`../../img/${img}.svg`).default} alt="clear" /> : "-"
                        }}
                    />
                    <Row
                        name={classes.temp}
                        render={(period) => {
                            if (!period) return "-"
                            const temp = Math.round(period.temp);
                            if (temp > 0) {
                                return `+${temp}°`
                            } else {
                                return `${temp}°`
                            }
                        }}
                    />
                    <Row
                        name={classes.feelsLike}
                        render={(period) => {
                            if (!period) return "-"
                            const temp = Math.round(period.feels_like);
                            if (temp > 0) {
                                return `+${temp}°`
                            } else {
                                return `${temp}°`
                            }
                        }}
                    />
                    <Row
                        name={`${classes.humidity} ${classes.gray}`}
                        render={(period) => {
                            if (!period) return "-"
                            return Math.round(period.humidity)
                        }}
                    />
                    <Row
                        name={classes.clouds}
                        render={(period) => {
                            if (!period) return "-"
                            return Math.round(period.clouds)
                        }}
                    />
                    <Row
                        name={`${classes.wind} ${classes.gray}`}
                        render={(period) => {
                            if (!period) return "-"
                            return Math.round(period.wind.speed)
                        }}
                    />
                </tbody>
            </table>
        </div>
    );
}

export default TabInfoTable;