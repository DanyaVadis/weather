import React from 'react';
import { useHistory } from "react-router-dom";
import FoundList from './found-list';

const FoundListContainer = ({ changeVisible, params, ...props }) => {

    let history = useHistory();

    const setCity = (days) => {
        history.push(days)
    }

    const geoPos = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude= position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ab4193d2feb1424956251b3384e60a26`)
                    .then(res => res.json())
                    .then(res => {
                        history.push(params.days ? `/${res.name}/${params.days}` : `/${res.name}/`);
                        changeVisible(false)
                    })
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    return (
        <FoundList 
            {...props} 
            changeVisible={changeVisible} 
            setCity={setCity} 
            params={params} 
            geoPos={geoPos} 
        />
    )
}

export default FoundListContainer;