import React from 'react';
import { Table } from 'semantic-ui-react';

export default class ActivityTable extends React.Component {

	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		return (
			<Table celled inverted selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Date</Table.HeaderCell>
						<Table.HeaderCell>Activity</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>{this.props.data.joinDate}</Table.Cell>
						<Table.Cell>You have joined UNSWBook!</Table.Cell>
					</Table.Row>
					{this.props.data.activities.map((e, i) => (
						<Table.Row keu={i}>
							<Table.Cell>{e.data}</Table.Cell>
							<Table.Cell>{e.description}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		);
	}
}
