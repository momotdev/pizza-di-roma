import React from 'react';
import ProductItem from "../ProductItem/ProductItem";
import classes from './ProductList.module.css';

const ProductsList = ({products, openProduct}) => {
	return (
		<div className={classes['product-list']}>
			{products.map((product) => (
				<ProductItem key={product.id} product={product} onClick={() => openProduct(product.id)}/>
			))}
		</div>
	);
};

export default ProductsList;