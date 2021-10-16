import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = ({product, ...props}) => {
	return (
		<div className={classes['product-item']} {...props}>
			<div className={classes['info-wrapper']}>
				<div className={classes.name}>{product.name}</div>
				<div className={classes.price}>{product.price} грн.</div>
			</div>
			<img src={`${product.imageUrl}&size=SMALL`} className={classes.picture}/>
		</div>
	);
};

export default ProductItem;