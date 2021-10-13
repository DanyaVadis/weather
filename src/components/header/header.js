import React, { useState } from 'react';
import classes from './header.module.css';
import Search from '../search/search';
import HeaderNav from '../header-nav/header-nav';

const Header = ({ cities, params }) => {
    const [burger, setBurger] = useState(false);
    const toggleBurger = () => {
        setBurger(!burger);
    }
    const closeBurger = () => {
        setBurger(false);
    }

    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <div className={classes.bot}>
                    <div className={classes.searchInner}>
                        <Search cities={cities} params={params} />
                    </div>
                    <HeaderNav params={params} burger={burger} toggleBurger= {toggleBurger} closeBurger={closeBurger}/>
                </div>
            </div>
        </div>
    );
}



export default Header;