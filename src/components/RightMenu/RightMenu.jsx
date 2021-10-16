import React from 'react';
import classes from './RightMenu.module.css';
import dashboardIcon from '../../images/dashboard.png';
import usersIcon from '../../images/user.png';
import productsIcon from '../../images/products.png';
import ordersIcon from '../../images/box.png';
import settingsIcon from '../../images/control.png';

const RightMenu = () => {
	const menuItems = [
		{icon: dashboardIcon, label: 'Dashboard'},
		{icon: usersIcon, label: 'Users'},
		{icon: productsIcon, label: 'Products'},
		{icon: ordersIcon, label: 'Orders'},
		{icon: settingsIcon, label: 'Settings'},
	]

	return (
		<div className={classes.menu}>
			{menuItems.map(item => (
				<div key={item.label} className={classes['menu-item']}>
					<img src={item.icon} className={classes.icon} alt={item.label}/>
					<div className={classes.label}>{item.label}</div>
				</div>
			))}
		</div>
	);
};

export default RightMenu;