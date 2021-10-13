export const forecastLoaded = (forecast) => {
    return {
        type: 'FORECAST_LOADED',
        forecast
    }
}
export const weatherNowLoaded = (now) => {
    return {
        type: 'WEATHER_NOW_LOADED',
        now
    }
}
export const weatherTomorrowLoaded = (tomorrowWeather) => {
    return {
        type: 'WEATHER_TOMORROW_LOADED',
        tomorrowWeather
    }
}

export const setDays = (days) => {
    return {
        type: 'FORECAST_SET_DAYS',
        days
    }
}
export const setSities = (cities) => {
    return {
        type: 'SET_CITIES',
        cities
    }
}