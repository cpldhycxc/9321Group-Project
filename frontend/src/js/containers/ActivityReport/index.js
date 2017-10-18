import React from 'react';
import ActivityTable from '../../components/ActivityTable';
import axios from 'axios';


export default class ActivityReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			joinDate:null,
			activities:null,
		}
	}

	componentWillMount(){
		const  userID=this.props.match.params.userID;
		axios.get(`http://localhost:8080/activityReport/${userID}`)
		.then((response) => {
				console.log(response);
				this.setState({
					joinDate: response.data.joinDate,
					activities: response.data.activities,
				})
		})
		.catch((err) => {
			console.log(err);
		});
	};

	render() {
		const { joinDate, activities } = this.state;
		const data ={
			joinDate,
			activities,
		}
		console.log(data)
		if(!activities && !joinDate){
			return null;
		}
    return (
			<div className="content activity">
				<h1>Activity Report</h1>
				<ActivityTable data={data} />
			</div>
    );
  }
}

// const data = {
// 	joinDate: '21:00:01 21/09/2017',
// 	activities: [
// 		{
// 			type: 'addFriend',
// 			description: 'You added Ryan as your friend',
// 			date: '16:00:01 20/09/2016'
// 		},
// 		{
// 			type: 'addFriend',
// 			description: 'You added Gary as your friend',
// 			date: '16:00:01 20/09/2016'
// 		},
// 		{
// 			type: 'post',
// 			description: 'Hello world',  // if there exists a image
// 			date: '16:00:01 20/09/2016'		//plz concat it with description after the conten with ' IMG: url'
// 		}
// 	]
// };
