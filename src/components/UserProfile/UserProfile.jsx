import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from './UserProfile.module.css';
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import MultiSelect from "../UI/MultiSelect/MultiSelect";
import PizzaService from "../../API/PizzaService";

const UserProfile = ({id, onUserUpdate}) => {
	const USER_MODEL = useMemo(() => ({
		"id": null,
		"deviceId": "",
		"pushToken": "",
		"firstName": "",
		"lastName": "",
		"email": "",
		"password": "",
		"roles": []
	}), []);
	const [user, setUser] = useState({
		"id": null,
		"deviceId": "",
		"pushToken": "",
		"firstName": "",
		"lastName": "",
		"email": "",
		"password": "",
		"roles": []
	});

	const options = useMemo(() => [
		{ value: 'ADMIN', label: 'Admin' },
		{ value: 'USER', label: 'User' },
		{ value: 'MANAGER', label: 'Manager' },
		{ value: 'DELIVERY', label: 'Delivery' }
	], []);

	const [isLoading, setIsLoading] = useState(true);

	const fetchUser = async (id) => {
		return await PizzaService.getUser(id);
	}

	const sendUser = async (user) => {
		if (user.id) {
			return await PizzaService.updateUser(user);
		} else {
			return await PizzaService.createUser(user);
		}
	}

	useEffect(() => {
		if (id) {
			fetchUser(id)
				.then(response => {
					setUser(state => ({...state, ...response}))
				})
		} else {
			setUser(USER_MODEL);
		}
	}, [id, USER_MODEL])

	const onSelectChange = useCallback((value) => {
		setUser((state) => ({...state, roles: value.filter(option => option.selected).map(option => option.value)}));
	}, []);

	return (
		<div className={classes.profile}>
			<form className={classes.form}>
				<div className={classes['info-wrapper']}>
					<div className={classes['inputs-wrapper']}>
						<label className={classes.label} htmlFor="firstName">First Name: </label>
						<input className={classes.checkbox} value={user.firstName ?? ''}
							   onChange={(event) => setUser({...user, firstName: event.target.value})}
							   type="text"
							   name="firstName" id="firstName"/>
						<label className={classes.label} htmlFor="lastName">Last Name: </label>
						<input className={classes.input} value={user.lastName ?? ''}
							   onChange={event => setUser({...user, lastName: event.target.value})} type="text"
							   name="lastName"
							   id="lastName"/>
						<label className={classes.label} htmlFor="email">Email:</label>
						<input className={classes.input} type="email" name="email" id="email"
							   onChange={event => setUser({...user, email: event.target.value})}
							   value={user.email ?? ''}/>
						<label className={classes.label} htmlFor="password">Password: </label>
						<input className={classes.input} type="password" name="password" id="password"
							   onChange={event => setUser({...user, password: event.target.value})}
							   value={user.password ?? ''}/>
						<label className={classes.label} htmlFor="roles">Roles: </label>
						<MultiSelect options={options} selectedOptions={user.roles} onChange={onSelectChange}/>
					</div>
				</div>
				<div className={classes['description-wrapper']}>
					<DefaultButton onClick={(event) => {
						event.preventDefault();
						sendUser(user)
							.then(_ => onUserUpdate())
					}}>SAVE</DefaultButton>
				</div>
			</form>
		</div>
	);
};

export default UserProfile;