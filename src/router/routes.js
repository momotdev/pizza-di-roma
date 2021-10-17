import ProductsPage from "../pages/ProductsPage";
import LoginForm from "../components/LoginForm/LoginForm";
import UsersPage from "../pages/UsersPage";

export const privateRoutes = [
	{path: '/products', component: ProductsPage, exact: true},
	{path: '/users', component: UsersPage, exact: true}
]

export const publicRoutes = [
	{path: '/login', component: LoginForm, exact: true}
]