import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Forecast from './forecast';


const ForecastContainer = ({ match, ...props }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'SET_PARAMS',
            params: match.params
        })
    }, [match, dispatch])

    return (
        <Forecast
            {...props}
        />
    )
}

export default ForecastContainer;