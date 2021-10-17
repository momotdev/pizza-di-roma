import React, {useContext} from 'react';
import Loader from "./UI/Loader/Loader";
import {Redirect, Route, Switch} from "react-router";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {
	const {auth, isLoading} = useContext(AuthContext);

	if (isLoading) {
		return <Loader/>
	}

	return (
		auth.authToken
			?
			<Switch>
				{privateRoutes.map(route =>
					<Route
						key={route.path}
						exact={route.exact}
						component={route.component}
						path={route.path}/>
				)}
				<Redirect to="/products"/>
			</Switch>
			:
			<Switch>
				{publicRoutes.map(route =>
					<Route
						key={route.path}
						exact={route.exact}
						component={route.component}
						path={route.path}/>
				)}
				<Redirect to="/login"/>
			</Switch>
	);
};

export default AppRouter;