import React from 'react';
import classes from './AddProductButton.module.css';

const AddProductButton = ({...props}) => {
	return (
		<div {...props} className={classes.addbtn}>+</div>
	);
};

export default AddProductButton;