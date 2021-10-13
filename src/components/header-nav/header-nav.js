import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './header-nav.module.css';

const HeaderNav = ({ params, toggleBurger, burger, closeBurger}) => {
    return (
        <div>
            <div 
                className={`${classes.iconMenu} ${burger ? classes.active: ''}`}
                onClick={() => toggleBurger()}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={`${classes.menu} ${burger ? classes.active: ''}`}>
                <ul className={classes.menu__list}>
                    <li 
                        className={classes.list_item}
                        onClick={() => closeBurger()}
                    >
                        <NavLink
                            exact
                            className={classes.menu__list_item}
                            to={params.city ? `/${params.city}/` : `/`}
                            activeClassName={classes.activeLink}
                        >Сейчас</NavLink>
                    </li>
                    <li 
                        className={classes.list_item}
                        onClick={() => closeBurger()}
                    >
                        <NavLink
                            className={classes.menu__list_item}
                            to={params.city ? 'tomorrow' : `/киев/tomorrow`}
                            activeClassName={classes.activeLink}
                        >Завтра</NavLink>
                    </li>
                    <li 
                        onClick={() => closeBurger()}
                        className={classes.list_item}
                    >
                        <NavLink
                            className={classes.menu__list_item}
                            to={params.city ? '3-days' : `/киев/3-days`}
                            activeClassName={classes.activeLink}
                        >3 дня</NavLink>
                    </li>
                    <li 
                        className={classes.list_item}
                        onClick={() => closeBurger()}
                    >
                        <NavLink
                            className={classes.menu__list_item}
                            to={params.city ? '5-days' : `/киев/5-days`}
                            activeClassName={classes.activeLink}
                        >5 дней</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default HeaderNav;