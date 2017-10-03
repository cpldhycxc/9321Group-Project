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
        const imng = this.props.img;
        const link = this.props.link;
		return (
		<div class="card">
			<Card
				image={imng}
				meta={id}
				description={self_intro}
				extra={extra(numOfFriend)}
                href={link}
			/>
		</div>
		);
	}
}
