import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'one', label: 'One', gender: 'male' },
  { value: 'two', label: 'Two', gender: 'male' },
  { value: 'three', label: 'Three', gender: 'male' },
  { value: 'four', label: 'Four', gender: 'male' },
  { value: 'five', label: 'Five', gender: 'male' },
  { value: 'six', label: 'Six', gender: 'male' }
];

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
            <Select
				closeOnSelect={!this.state.stayOpen}
				disabled={this.state.disabled}
				multi
				onChange={this.selectChange}
				options={options.gender}
				placeholder="Please Select Gender"
				simpleValue
				value={this.state.gender}
			/>
			</div>
		);
	}
}


export default search;
