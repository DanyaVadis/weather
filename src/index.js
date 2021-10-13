import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import WeatherContext from './components/weather-context/weather-context';
import App from './components/app/app';
import WeatherService from './services/weather-services';
import { BrowserRouter as Router } from "react-router-dom";

const weatherService = new WeatherService();


ReactDOM.render(
    <Provider store={store}>
        <WeatherContext.Provider value={weatherService}>
            <Router>
                <App />
            </Router>
        </WeatherContext.Provider>
    </Provider>,
    document.getElementById('root')
);

