import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';

const extra = (numOfFriend) => (
  <a>
    <Icon name='user' />
    {numOfFriend} Friends
  </a>
);
export default class ResultItem extends React.Component {
	render() {
		const id = this.props.id;
		const numOfFriend = this.props.numOfFriend;
		const self_intro = this.props.self_intro;
		return (
		<div class="card">
			<Card
				image='https://images.celebfamily.com/wp-content/uploads/2016/10/Kin-Jong-Un-Career.jpg'
				meta={id}
				description={self_intro}
				extra={extra(numOfFriend)}
			/>
		</div>
		);
	}
}