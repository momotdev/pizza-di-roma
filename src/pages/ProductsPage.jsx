import React, {useEffect, useState} from 'react';
import SearchPanel from "../components/SearchPanel/SearchPanel";
import ProductsList from "../components/ProductsList/ProductsList";
import Loader from "../components/UI/Loader/Loader";
import AddProductButton from "../components/AddProductButton/AddProductButton";
import Modal from "../components/UI/Modal/Modal";
import ProductProfile from "../components/ProductProfile/ProductProfile";
import PizzaService from "../API/PizzaService";

const ProductsPage = () => {
	const [currentProduct, setCurrentProduct] = useState(1);
	const [sortedProducts, setSortedProducts] = useState([]);
	const [modalDisplay, setModalDisplay] = useState(false);
	const [addModalDisplay, setAddModalDisplay] = useState(false);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts()
			.then(response => {
				setProducts(response);
				setSortedProducts(response);
			});
	}, [])

	const openProductProfile = (id) => {
		setCurrentProduct(id);
		setModalDisplay(true);
	}

	const fetchProducts = async () => {
		return await PizzaService.getAllProducts();
	}

	const updateProducts = () => {
		fetchProducts()
			.then(response => {
				setProducts(response);
				setSortedProducts(response);
				setModalDisplay(false);
				setAddModalDisplay(false);
			});
	}

	const sortProducts = (searchQuery) => {
		let resultArray = products;

		if (searchQuery.type.length > 0) {
			resultArray = resultArray.filter(product => searchQuery.type.some(item => item === product.type));
		}

		if (searchQuery.enabled.length > 0) {
			resultArray = resultArray.filter(product => searchQuery.enabled.some(item => item === product.active));
		}

		setSortedProducts(resultArray);
	}

	return (
		<>
			<SearchPanel sortProducts={sortProducts}/>
			{products.length
				? <ProductsList products={sortedProducts} openProduct={openProductProfile}/>
				: <Loader/>
			}
			<AddProductButton onClick={() => setAddModalDisplay(true)}/>
			<Modal visibility={modalDisplay} setVisibility={setModalDisplay}>
				<ProductProfile productId={currentProduct} onProductUpdate={updateProducts}/>
			</Modal>
			<Modal visibility={addModalDisplay} setVisibility={setAddModalDisplay}>
				<ProductProfile onProductUpdate={updateProducts}/>
			</Modal>
		</>


	);
};

export default ProductsPage;