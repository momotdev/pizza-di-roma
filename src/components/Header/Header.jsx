import React, {useContext} from 'react';
import classes from './Header.module.css';
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import logo from '../../images/logo.png';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import PizzaService from "../../API/PizzaService";

const Header = () => {
	const {auth, setAuth} = useContext(AuthContext);

	const logout = async () => {
		await PizzaService.logout(localStorage.getItem('authRefreshToken'))
			.then(response => {
				setAuth({...auth, authToken: ''});
				localStorage.removeItem('authToken');
				localStorage.removeItem('authRefreshToken');
			})
	}

	return (
		<div className={classes.header}>
			<div className={classes['logo-container']}>
				<img src={logo} alt="" draggable={false}/>
				<div className={classes.logo}>Pizza Di Roma</div>
			</div>
			{auth.authToken
				? <DefaultButton onClick={logout}>Log out</DefaultButton>
				: <Link to="/login"><DefaultButton>Sign in</DefaultButton></Link>
			}
		</div>
	);
};

export default Header;