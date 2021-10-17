import React, {useContext, useState} from 'react';
import classes from './LoginForm.module.css';
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import PizzaService from "../../API/PizzaService";
import {AuthContext} from "../../context";

const LoginForm = () => {
	const {setAuth} = useContext(AuthContext);
	const [userData, setUserData] = useState({
		email: 'test@gmail.com',
		password: '321321'
	})

	const login = async (userData) => {
		await PizzaService.login(userData)
			.then(({accessToken, refreshToken}) => {
				setAuth((state) => ({...state, authToken: true, refreshToken}));
				localStorage.setItem('authToken', accessToken);
				localStorage.setItem('authRefreshToken', refreshToken);
			});
	}

	return (
		<div className={classes['form-wrapper']}>
			<form className={classes.form}>
				<div className={classes['input-group']}>
					<label htmlFor="login">Login</label>
					<input
						type="text" name="login" id="login"
						value={userData.email}
						placeholder="Type login here"
						onChange={event => setUserData({...userData, email: event.target.value})}/>
				</div>
				<div className={classes['input-group']}>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" placeholder="Type password here"
						   value={userData.password} onChange={event => setUserData({...userData, password: event.target.value})}/>
				</div>
				<DefaultButton
					active
					onClick={(e) => {
						e.preventDefault();
						login(userData);
					}}
				>Login</DefaultButton>
			</form>
		</div>
	);
};

export default LoginForm;