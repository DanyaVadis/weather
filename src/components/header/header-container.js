import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSities } from '../../actions/weather-actions';
import Header from './header';

const HeaderContainer = (props) => {
    let params = useSelector(state => state.params);
    let history = useHistory();
    const dispatch = useDispatch();
    const cities = useSelector(state => state.cities);
    const setDaysHandler = (days) => {
        history.push(`${days}`)
    }

    useEffect(() => {
        fetch('https://api.hh.ru/areas/5')
            .then(res => res.json())
            .then(res => dispatch(setSities(res)))

    }, [dispatch])

    return (
        <Header 
            {...props} 
            setDays={setDaysHandler} 
            cities={cities} 
            params={params}
        />
    )
}

export default HeaderContainer;