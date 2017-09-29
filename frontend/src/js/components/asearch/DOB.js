import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' }
];

class DOB extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			value: 'none',
		};
		this.selectChange = this.selectChange.bind(this);
	}
	selectChange(value) {
		console.log('You selected: ', value);
		this.setState({ value: value });
	}

	render() {
		return (
			<div className="section">
			<h3 className="section-heading">Search by DOB</h3>
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

export default DOB;
