import React from 'react';
import classes from './Modal.module.css';

const Modal = ({visibility, setVisibility, children}) => {
	const resultStyle = [classes.modal];

	if (visibility) {
		resultStyle.push(classes['modal--active']);
	}

	return (
		<div className={resultStyle.join(' ')} onClick={() => setVisibility(false)}>
			<div className={classes['modal-content']} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;