import React from 'react';
import classes from './AddProductButton.module.css';

const AddButton = ({...props}) => {
	return (
		<div {...props} className={classes.addbtn}>+</div>
	);
};

export default AddButton;