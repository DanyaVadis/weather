import React from 'react';
import classes from '../found-list.module.css';
import s from './list-not-found.module.css';

const ListNotFound = ({visible}) => {
    return (
        <div
            className={visible ? `${classes.foundList} ${classes.visible}` : classes.foundList}
        >
            <div className={classes.blocked}>
                Пункты
            </div>
            <div className={s.notFound}>
                <span>По вашему запросу ничего не найдено</span>
            </div>
        </div>
    );
}

export default ListNotFound;