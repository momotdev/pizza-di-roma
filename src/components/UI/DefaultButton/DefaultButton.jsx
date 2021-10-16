import React from 'react';
import classes from './DefaultButton.module.css'

const DefaultButton = ({children, active, ...props}) => {

	const style = [classes.button];
	if (active) {
		style.push(classes['button--active'])
	}

	return (
		<button className={style.join(' ')} {...props}>
			{children}
		</button>
	);
};

export default DefaultButton;