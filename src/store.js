import { createStore } from "redux";
import weatherReducer from "./reducers/weather-reducer";

const store = createStore(weatherReducer);

export default store;