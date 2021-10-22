import React, {useEffect, useState} from 'react';
import PizzaService from "../API/PizzaService";
import UsersTable from "../components/UsersTable/UsersTable";
import AddButton from "../components/AddProductButton/AddButton";
import Modal from "../components/UI/Modal/Modal";
import UserProfile from "../components/UserProfile/UserProfile";

const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userProfileModal, setUserProfileModal] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	const fetchUsers = async () => {
		return await PizzaService.getAllUsers();
	}

	const showUserProfile = (id) => {
		setCurrentUser(id);
		setUserProfileModal(true);
	}

	const onUserUpdate = () => {
		setUserProfileModal(false);
		setIsLoading(true);
		fetchUsers()
			.then(response => {
				setUsers(response);
				setIsLoading(false);
			});
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
			<UsersTable users={users} isLoading={isLoading} openUserProfileModal={showUserProfile}/>
			<AddButton onClick={() => {
				setCurrentUser(null);
				setUserProfileModal(true);
			}}/>
			<Modal visibility={userProfileModal} setVisibility={setUserProfileModal}>
				<UserProfile id={currentUser} onUserUpdate={onUserUpdate}/>
			</Modal>
		</>
	);
};

export default UsersPage;