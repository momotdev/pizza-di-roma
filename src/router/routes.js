import ProductsPage from "../pages/ProductsPage";
import LoginForm from "../components/LoginForm/LoginForm";

export const privateRoutes = [
	{path: '/products', component: ProductsPage, exact: true}
]

export const publicRoutes = [
	{path: '/login', component: LoginForm, exact: true}
]