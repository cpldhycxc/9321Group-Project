import React from 'react';
import { connect } from 'react-redux';
import Resultitem from '../ResultItem';

export default class SearchResultContainer extends React.Component {

	constructor(props) {
		super(props);
		console.log('sssss')
		
	}


	render() {
		return (
			<div class="ui link cards">
				{users.map((user, i) => (
					<Resultitem
						key={i}
						id={user.id}
						joined_date={user.joined_date}
						self_intro={user.self_intro}
						numOfFriend={user.numOfFriend}
					/>

				))}
			</div>
		);
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
