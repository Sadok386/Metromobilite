import React from 'react';

class User extends React.Component {
	render() {
		return (
			<li>
				{this.state.user.id} {this.state.user.name}
			</li>
		)
	}
}
export default User;