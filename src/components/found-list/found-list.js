import React from 'react';
import classes from './found-list.module.css';
import ListStart from './list-start/list-start';
import ListNotFound from './list-not-found/list-not-found';

const Field = ({ city, obl, country, params, changeVisible, setCity, str }) => {
    
    const newCity = city.split('(')[0];
    const cityLink = params.days ? `/${newCity.toLowerCase()}/${params.days}` : `/${newCity}`;
    const length = str.length;
    const piece = newCity.slice(0, length);
    const cityDef = newCity.replace(piece, '');

    return (
        <div
            className={classes.link}
            to={cityLink}
            onClick={() => {
                setCity(cityLink)
                changeVisible(false);
            }}
        >
            <span className={classes.city}><span>{piece}</span>{cityDef}</span>
            <span className={classes.obl}> {obl} {obl.length > 0 ? ',' : null}</span>
            <span className={classes.country}> {country}</span>
        </div>
    )
}

const FoundList = ({ citiesList, visible, params, changeVisible, str, setCity, geoPos }) => {

    if (str.length < 2) {
        return <ListStart visible={visible} geoPos={geoPos} changeVisible={changeVisible} />
    }

    if (citiesList.length === 0){
        return <ListNotFound visible={visible}/>
    }

    return (
        <div
            className={visible ? `${classes.foundList} ${classes.visible}` : classes.foundList}
        >
            <div className={classes.blocked}>
                Пункты
            </div>
            {
                citiesList.map((item, index) => {
                    const { city, obl, country } = item;
                    return (
                        <Field
                            str={str}
                            key={index}
                            setCity={setCity}
                            city={city}
                            obl={obl}
                            country={country}
                            params={params}
                            changeVisible={changeVisible}
                        />
                    )
                })
            }
            {
                citiesList.length === 0
                    ? null
                    : <div className={classes.findAll}>
                        <div>
                            Найти все пункты
                        </div>
                    </div>
            }
        </div>
    );
}


export default FoundList;