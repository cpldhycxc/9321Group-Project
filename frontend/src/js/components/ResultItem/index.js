import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';

const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
);
export default class ResultItem extends React.Component {
	render() {
		return (
		<Card
			image='https://images.celebfamily.com/wp-content/uploads/2016/10/Kin-Jong-Un-Career.jpg'
			meta='Friend'
			description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
			extra={extra}
		/>
		);
	}
}