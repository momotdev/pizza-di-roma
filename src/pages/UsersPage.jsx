import React, {useEffect, useState} from 'react';
import PizzaService from "../API/PizzaService";
import UsersTable from "../components/UsersTable/UsersTable";

const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUsers = async () => {
		return await PizzaService.getAllUsers();
	}

	useEffect(() => {
		setIsLoading(true);
		fetchUsers()
			.then(response => {
				setUsers(response);
				setIsLoading(false);
			});
	}, [])

	return (
		<>
			<UsersTable users={users} isLoading={isLoading}/>
		</>
	);
};

export default UsersPage;