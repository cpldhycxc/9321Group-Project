import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import DatePicker from 'react-bootstrap-date-picker';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import searchResult from '../../components/SearchBar/SearchResultContainer';
import Resultitem from '../../components/ResultItem';

export default class AdvSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      birthday: moment().toISOString(),
      options: [
				{ value: 'Male', label: 'Male' },
				{ value: 'Female', label: 'Female' }
			],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false,
			result: [],
			noResult: false
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeSelect(value) {
		this.setState({ value });
	}

  handleChange(date) {
    this.setState({
      birthday: date
    });
  }

	handleSubmit(e) {
		console.log(this.state.birthday.substring(0,10));
		e.preventDefault();
		const text = 'dob=' + this.state.birthday.substring(0,10) + '&&gender=' + this.state.value + '&&username=' + this.state.username + '&&firstname=' + this.state.firstname + '&&lastname=' + this.state.lastname;
		const url = 'http://localhost:8080/advSearchResult/?' + text;
        console.log(url);
        fetch(url).then(response =>
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            this.setState({ result: res.data });
            console.log(this.state.result[0]);
        }));
        this.setState(prevState => ({
            isClick: !prevState.isClick
        }))
    }

	render() {
		const img = 'http://localhost:8080/files/users/';
		const l = 'http://127.0.0.1:9000/#/user/';
		let matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}

		if (this.state.result.length === 0) {
			if (this.state.noResult) {
				return (
					<div>
						<p>NO result</p>
					</div>
				);
			}
			return (
				<div className="front-page">
					<div className='unswbook'>
						UNSWBook
					</div>
					<div className="section">
						<form onSubmit={this.handleSubmit} >
								<div className={classnames('form-group')} >
									<label className="control-label">Username:</label>
									<input onBlur={this.checkUserExists} onChange={this.onChange} type="text" className="form-control" id="username" name="username" placeholder="Search by Username" />
								</div>
								<div className ={classnames('form-group')}>
									<label className="control-label">First Name: </label>
									<input onChange={this.onChange} type="text" className="form-control" id ="firstname" name="firstname" placeholder="Search by first name"/>
								</div>
		            <div className ={classnames('form-group')}>
		                <label className="control-label">Last Name: </label>
		              <input onChange={this.onChange} type="text" className="form-control" id ="lastname" name="lastname" placeholder="Search by last name"/>
		            </div>
		            <div className ='form-group'>
		                <label className="control-label">Data of Birth: </label>
		                <DatePicker id="example-datepicker" value={this.state.birthday} onChange={this.handleChange} />
		            </div>
		            <div className ='form-group'>
		            	<label className="control-label">Gender </label>
									<div className="section">
													<h3 className="section-heading">{this.props.label}</h3>
													<Select
														matchPos={this.state.matchPos}
														matchProp={matchProp}
														multi={this.state.multi}
														onChange={this.onChangeSelect}
														options={this.state.options}
														simpleValue
														value={this.state.value}
														/>
												</div>
		            </div>
		            <div className="form-group">
		                <Button className='btn btn-primary btn-md' type="submit" name="Submit"> Search</Button>
		            </div>
		        </form>
					</div>
				</div>
			)
		} else {
			return (
       <div className="result">
				<div class="ui link cards">
					{this.state.result.map((user, i) => (
						<Resultitem
							key={i}
							img={img + this.state.result[i].userID}
							id={this.state.result[i].firstName}
							link={l + this.state.result[i].userName}
						/>
					))}
				</div>
        </div>
       );
		}
	}
}

const users = [
	{
		id: 'henry',
		joined_date: '2011',
		self_intro: 'hi',
		numOfFriend: 20
	},
	{
		id: 'gggg',
		joined_date: '2011',
		self_intro: 'hi',
		numOfFriend: 20
	},
	{
		id: 'ddd',
		joined_date: '2013',
		self_intro: 'hi',
		numOfFriend: 20
	},
	{
		id: 'gary',
		joined_date: '2011',
		self_intro: 'hi',
		numOfFriend: 20
	},
	{
		id: 'henry',
		joined_date: '2011',
		self_intro: 'hi',
		numOfFriend: 20
	}
];
