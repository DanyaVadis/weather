const initialState = {
    forecast: null,
    days: null,
    now: null,
    tomorrow: null,
    params: '',
    cities: null
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FORECAST_LOADED' :
            return {
                ...state,
                forecast: action.forecast
            }
        case 'WEATHER_NOW_LOADED' :
            return {
                ...state,
                now: action.now
            }
        case 'WEATHER_TOMORROW_LOADED' :
            return {
                ...state,
                tomorrow: action.tomorrowWeather
            }
        case 'FORECAST_SET_DAYS' :
            return {
                ...state,
                days: action.days
            }
        case 'SET_PARAMS' :
            return {
                ...state,
                params: action.params
            }
        case 'SET_CITIES' :
            return {
                ...state,
                cities: action.cities
            }
        default :
            return state
    }
}

export default weatherReducer;