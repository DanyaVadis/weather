import React from 'react';
import classes from './list-start.module.css';
import s from '../found-list.module.css'
import geo from './geo.png';

const ListStart = ({ visible, geoPos }) => {

    return (
        <div
            className={visible ? `${s.foundList} ${s.visible}` : s.foundList}
        >
            <div
                className={s.blocked}
            >
                Поиск по геолокации
            </div>
            <div
                className={`${s.link} ${classes.geo}`}
                onClick={() => geoPos()}
            >
                <div className={classes.geoImg}>
                    <img src={geo} alt="" />
                </div>
                <div className={classes.geoTitle}>
                    <span>Поиск</span>
                </div>
            </div>
        </div>
    );
}

export default ListStart;