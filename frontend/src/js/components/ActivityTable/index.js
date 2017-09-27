import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import PostComment from '../PostComment';
import LikeButton from '../LikeButton';
import { Table } from 'semantic-ui-react';

export default class ActivityTable extends React.Component {

	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		this.renderRow = () => {
			this.props.data.activities.map((e, i) => {
				console.log(e);
				return (
					<Table.Row>
		        <Table.Cell>kk</Table.Cell>
		        <Table.Cell>{e.description}</Table.Cell>
		      </Table.Row>
				);
			});
		};

		return (
		  <Table celled inverted selectable>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>Date</Table.HeaderCell>
		        <Table.HeaderCell>Activity</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>

		    <Table.Body>
		    	{this.renderRow()}
		    </Table.Body>
		  </Table>
		);
	}
}
