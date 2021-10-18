import React from 'react';
import classes from './UserTableItem.module.css';

const UserTableItem = ({user}) => {
	return (
		<tr className={classes['list-item']}>
			<td className={classes.id}>{user.id}</td>
			<td>{user.firstName}</td>
			<td>{user.lastName}</td>
			<td>{user.email}</td>
			<td>{user.roles.map(role => <div key={role} className={classes.role}>{role}</div>)}</td>
		</tr>
	);
};

export default UserTableItem;