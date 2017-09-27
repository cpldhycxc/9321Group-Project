import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

const MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState() {
		return {
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
		};
	},
	handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleCheckbox(e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	render() {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your favourite(s)"
					simpleValue
					value={value}
				/>
			</div>
		);
	}
});

export default MultiSelectField;
