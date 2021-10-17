import React, {useEffect, useState} from 'react';
import classes from './ProductProfile.module.css';
import PizzaService from "../../API/PizzaService";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import Select from "../UI/Select/Select";
import noImage from '../../images/noimage.png';
import Loader from "../UI/Loader/Loader";

const ProductProfile = ({productId, onProductUpdate}) => {
	const [product, setProduct] = useState({
		"id": null,
		"name": "",
		"description": "",
		"weight": "",
		"type": "",
		"imageId": "",
		"imageUrl": noImage,
		"price": "",
		"active": false
	});
	const [isLoading, setIsLoading] = useState(true);
	const imageForm = React.createRef();

	const fetchProduct = async (id) => {
		return await PizzaService.getProduct(id);
	}

	const sendProduct = async (product) => {
		if (product.id) {
			return await PizzaService.updateProduct(product);
		} else {
			return await PizzaService.createProduct(product);
		}
	}

	const selectTypeValueHandler = (value) => {
		setProduct({...product, type: value});
	}

	useEffect(() => {
		if (productId) {
			setIsLoading(true);
			fetchProduct(productId)
				.then(response => {
					setProduct(response);
					setIsLoading(false);
				})
		}
	}, [productId]);

	const sendImageForm = async (form) => {
		const formData = new FormData(form.current);
		return await PizzaService.sendImage(formData);
	}

	const handleImageChange = () => {
		if (imageForm.current != null && imageForm.current.image.value) {
			sendImageForm(imageForm)
				.then(response => {
					setProduct((state) => ({...state, imageId: response.id, imageUrl: response.url}));
				})
		}
	}

	return (
		<div className={classes.profile}>
			<form className={classes.form}>
				<div className={classes['info-wrapper']}>
					<div className={classes['inputs-wrapper']}>
						<label className={classes.label} htmlFor="productActive">Enabled: </label>
						<input className={classes.checkbox} checked={product.active}
							   onChange={(event) => setProduct({...product, active: event.target.checked})}
							   type="checkbox"
							   name="active" id="productActive"/>
						<label className={classes.label} htmlFor="productName">Name: </label>
						<input className={classes.input} value={product.name}
							   onChange={event => setProduct({...product, name: event.target.value})} type="text"
							   name="name"
							   id="productName"/>
						<label className={classes.label} htmlFor="productType">Type: </label>
						<Select style={classes.select} name="type" id="productType" selectedValue={product.type}
								options={[{value: 'PIZZA'}, {value: 'SUSHI'}, {value: 'OTHER'}]}
								onValueChange={selectTypeValueHandler}/>
						<label className={classes.label} htmlFor="productWeight">Weight:</label>
						<input className={classes.input} type="text" name="weight" id="productWeight"
							   onChange={event => setProduct({...product, weight: event.target.value})}
							   value={product.weight}/>
						<label className={classes.label} htmlFor="productPrice">Price: </label>
						<input className={classes.input} type="text" name="price" id="productPrice"
							   onChange={event => setProduct({...product, price: event.target.value})}
							   value={product.price}/>
					</div>
				</div>
				<div className={classes['description-wrapper']}>
					<label className={classes.label} htmlFor="productDescription">Description: </label>
					<textarea className={classes.textarea} name="description" id="productDescription" cols="30"
							  onChange={event => setProduct({...product, description: event.target.value})}
							  rows="5" value={product.description}/>
					<DefaultButton onClick={(event) => {
						event.preventDefault();
						sendProduct(product)
							.then(response => {
								if (response === 204) {
									onProductUpdate();
								}
							})
					}}>SAVE</DefaultButton>
				</div>
			</form>
			<div className={classes['image-form']}>
				<img src={product.imageUrl} alt={product.name} width={300} height={300} className={classes['profile-image']}/>
				<form ref={imageForm}>
					<input onChange={() => handleImageChange()} type="file" name="image"
						   id="productImage"/>
					{product.id ? isLoading ? <Loader/> : null : null}
				</form>
			</div>
		</div>
	);
};

export default ProductProfile;