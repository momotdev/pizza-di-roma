import React from 'react';
import classes from './UsersTable.module.css';
import UserTableItem from "../UserTableItem/UserTableItem";
import Loader from "../UI/Loader/Loader";

const UsersTable = ({users, isLoading}) => {
	return (
		<>
		<table className={classes.table} >
			<thead style={{marginBottom: '10px'}}>
			<tr className={classes['table-header']}>
				<th>ID</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Roles</th>
			</tr>
			</thead>
			{isLoading
				? null
				: <tbody>
				{users.map(user => (
					<UserTableItem key={user.id} user={user}/>
				))}
				</tbody>
			}
		</table>
			{isLoading ? <div style={{margin: '0 auto'}}><Loader/></div> : null}
</>
	);
};

export default UsersTable;