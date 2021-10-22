import Header from "./components/Header/Header";
import './styles/App.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import React, {useEffect, useState} from "react";
import RightMenu from "./components/RightMenu/RightMenu";
import Content from "./components/Content/Content";

function App() {
	const [auth, setAuth] = useState({
		authToken: '',
		authRefreshToken: '',
	})
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			setAuth((state) => ({
				...state,
				authToken: localStorage.getItem('authToken'),
				authRefreshToken: localStorage.getItem('authRefreshToken')
			}));
		}
		setIsLoading(false);
	}, [])

	return (
		<AuthContext.Provider value={{
			auth,
			setAuth,
			isLoading
		}}>
			<BrowserRouter>
				<div className="app">
					<Header/>
					<div className="content-wrapper">
						{auth.authToken ? <RightMenu/> : null}
						<Content>
							<AppRouter/>
						</Content>
					</div>

				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
