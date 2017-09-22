import React from 'react';


export default class NewPostButton extends React.Component {
	render() {
		return (
			<div>
				<button 
				onClick={this.props.onClick}
				className="NewPostButton">
				+
				</button>
			</div>
		)
	}
}