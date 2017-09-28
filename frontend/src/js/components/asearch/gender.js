import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

class gender extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			value: [],
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
			<h3 className="section-heading">Search by Gender</h3>
			<Select
				closeOnSelect={!this.state.stayOpen}
				disabled={this.state.disabled}
				multi
				onChange={this.selectChange}
				options={options}
				placeholder="Please Select DOB"
				simpleValue
				value={this.state.value}
			/>
			</div>
		);
	}
}

export default gender;
