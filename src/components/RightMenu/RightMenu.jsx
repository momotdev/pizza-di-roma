import React from 'react';
import classes from './RightMenu.module.css';
import dashboardIcon from '../../images/dashboard.png';
import usersIcon from '../../images/user.png';
import productsIcon from '../../images/products.png';
import ordersIcon from '../../images/box.png';
import settingsIcon from '../../images/control.png';
import {NavLink} from "react-router-dom";

const RightMenu = () => {
	const menuItems = [
		{icon: dashboardIcon, label: 'Dashboard', link: '/dashboard'},
		{icon: usersIcon, label: 'Users', link: '/users'},
		{icon: productsIcon, label: 'Products', link: '/products'},
		{icon: ordersIcon, label: 'Orders', link: '/orders'},
		{icon: settingsIcon, label: 'Settings', link: '/settings'},
	]

	return (
		<div className={classes.menu}>
			{menuItems.map(item => (
				<NavLink key={item.label} to={item.link} activeClassName={classes['menu-item--active']}>
					<div className={classes['menu-item']}>
						<img src={item.icon} className={classes.icon} alt={item.label}/>
						<div className={classes.label}>{item.label}</div>
					</div>
				</NavLink>
			))}
		</div>
	);
};

export default RightMenu;