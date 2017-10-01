import React from 'react';
import ActivityTable from '../../components/ActivityTable';
import axios from 'axios';


export default class ActivityReport extends React.Component {

	constructor(props) {
		super(props);
	}

	getReport = () => {
		const url = 'http://localhost:8080/activityReport/'.concat(this.props.match.params.username);
		axios.get(url)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

  render() {
    return (
			<div className="content">
				<h1>Activity Report of Henry</h1>
				<ActivityTable data={data} />
			</div>
    );
  }
}

const data = {
	joinDate: '21:00:01 21/09/2017',
	activities: [
		{
			type: 'addFriend',
			description: 'You added Ryan as your friend',
			data: '16:00:01 20/09/2016'
		},
		{
			type: 'addFriend',
			description: 'You added Gary as your friend',
			data: '16:00:01 20/09/2016'
		},
		{
			type: 'post',
			description: 'Hello world',  // if there exists a image 
			data: '16:00:01 20/09/2016'		//plz concat it with description after the conten with ' IMG: url' 
		}
	]
};
