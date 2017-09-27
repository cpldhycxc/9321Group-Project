import React from 'react';
import Select from 'react-select';
import Dob from '../../components/asearch/DOB'
import Gender from '../../components/asearch/gender'

class search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
            isGender: false,
            isDOB: false,
			value: [],
            gender: [],
		};
		this.selectChange = this.selectChange.bind(this);
	}
	selectChange(value) {
		console.log('You selected: ', value);
		this.setState({ value });
	}

	render() {
		return (
			<div className="section">
			<h3 className="section-heading">Advance Search</h3>
			<Dob />
            <Gender />
            <p></p>
            <button >submit</button>
			</div>
		);
	}
}


export default search;
