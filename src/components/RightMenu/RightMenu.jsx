import React from 'react';
import classes from './RightMenu.module.css';
import dashboardIcon from '../../images/dashboard.png';
import usersIcon from '../../images/user.png';
import productsIcon from '../../images/products.png';
import ordersIcon from '../../images/box.png';
import settingsIcon from '../../images/control.png';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const RightMenu = () => {
	const menuItems = [
		{icon: dashboardIcon, label: 'Dashboard', link: ''},
		{icon: usersIcon, label: 'Users', link: '/users'},
		{icon: productsIcon, label: 'Products', link: '/products'},
		{icon: ordersIcon, label: 'Orders', link: ''},
		{icon: settingsIcon, label: 'Settings', link: ''},
	]

	const currentPath = useLocation().pathname;
	const activeStyle = [classes['menu-item'], classes['menu-item--active']];

	return (
		<div className={classes.menu}>
			{menuItems.map(item => (
				<Link key={item.label} to={item.link}>
					<div className={currentPath === item.link ? activeStyle.join(' ') : classes['menu-item']}>
						<img src={item.icon} className={classes.icon} alt={item.label}/>
						<div className={classes.label}>{item.label}</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default RightMenu;