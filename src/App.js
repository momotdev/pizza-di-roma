import Header from "./components/Header/Header";
import './styles/App.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";

function App() {
	const [auth, setAuth] = useState({
		authToken: '',
		refreshToken: '',
	})
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			setAuth((state) => ({...state, authToken: true}));
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
					<AppRouter/>
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
