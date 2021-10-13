import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import classes from './search.module.css';
import close from './close.svg';
import FoundList from '../found-list/found-list-container';

const findCity = (str, arr) => {
    const cities = [];
    if (str.length > 1) {
        arr.areas.forEach(obl => {

            if (obl.name === 'Киев') {
                let idx = obl.name.toLowerCase().indexOf(str.toLowerCase());
                if (idx === 0) {
                    if (cities.length < 9) {
                        cities.unshift({
                            city: obl.name,
                            obl: '',
                            country: arr.name
                        })
                    }
                }
            }
            obl.areas.forEach(city => {
                let idx = city.name.toLowerCase().indexOf(str.toLowerCase());

                if (idx === 0) {
                    if (cities.length < 9) {
                        if (obl.name.includes(city.name)) {
                            cities.unshift({
                                city: city.name,
                                obl: obl.name,
                                country: arr.name
                            })
                        } else {
                            cities.push({
                                city: city.name,
                                obl: obl.name,
                                country: arr.name
                            })
                        }
                    }
                }
            })
        })
    }
    return cities;
}

const Search = ({ chooseCity, cities, params }) => {
    const [inputValue, setInputValue] = useState('');
    const [visible, setVisible] = useState(false);
    const input = useRef(null);
    let citiesList = [];

    if (cities && inputValue.length > 1) {
        citiesList = findCity(inputValue, cities);
    }

    const setCity = (e) => {
        e.preventDefault();
        chooseCity(inputValue, params);
        changeVisible(false);
        input.current.blur();
    }

    const changeVisible = (visible) => {
        setVisible(visible);
        setInputValue('');
    }

    return (
        <div className={classes.wrapper}>
            <div
                className={visible ? `${classes.overlay} ${classes.isOpen}` : classes.overlay}
                onClick={() => changeVisible(false)}
            >
            </div>
            <form
                className={visible ? `${classes.form} ${classes.visible}` : classes.form}
                onSubmit={setCity}
            >
                <input
                    className={classes.input}
                    type="text"
                    placeholder="Искать здесь..."
                    value={inputValue}
                    ref={input}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setVisible(true)}
                />
                <button
                    className={classes.button}
                ></button>
                {
                    visible
                        ? <div
                            className={classes.close}
                            onClick={() => changeVisible(false)}
                        >
                            <img src={close} alt="" />
                        </div>
                        : null
                }
                <FoundList
                    params={params}
                    str={inputValue}
                    citiesList={citiesList}
                    visible={visible}
                    srt={inputValue}
                    changeVisible={changeVisible}
                />
            </form>
        </div>
    );
}

const SearchContainer = (props) => {

    let history = useHistory();

    const chooseCity = (city, params) => {
        history.push(params.days ? `/${city.toLowerCase()}/${params.days}` : `/${city.toLowerCase()}/`)

    }
    return <Search {...props} chooseCity={chooseCity} />
}

export default SearchContainer;