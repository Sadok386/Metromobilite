import React from 'react';
import User from './User'

class UserList extends React.Component {
	render() {
		return (
			<ul>
				{this.state.users.map((user)=> {
					return <User user={user}/> 
				})
			}
			</ul>
		)
	}
}
export default UserList;