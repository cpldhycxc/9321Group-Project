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

	//get userid from path and call api to get activity report
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

	//render the report table
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

