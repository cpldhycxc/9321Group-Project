import React from 'react';
import Resultitem from '../../components/Resultitem';

class search extends React.Component {
	constructor(props) {
		super(props);
		this.handleDobChange = this.handleDobChange.bind(this);
		this.state = {
			dob: null,
            gender: null,
            isClick: false,
            result: [],
		};
        this.handlebuttonpress = this.handlebuttonpress.bind(this);
        this.handlegenderChange = this.handlegenderChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleDobChange(event) {
		this.setState({ dob: event.target.value });
	}
    handlegenderChange(event) {
        this.setState({ gender: event.target.value });
    }
    handlebuttonpress() {
        this.setState(prevState => ({
            isClick: !prevState.isClick
        }));
    }
	handleSubmit(e) {
		e.preventDefault();
		const text = 'dob=' + this.state.dob + '&&gender=' + this.state.gender;
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
        if (this.state.isClick === false) {
            return (
                <div className="section">
                <h3 className="section-heading">Advance Search</h3>
                <form onSubmit={this.handleSubmit}>
                <label>
                    DOB:
                    <input type="text" value={this.state.dob} name="dob" onChange={this.handleDobChange} />
                </label>
                <br />
                <label>
                    Gender:
                    <input type="text" value={this.state.gender} name="geder" onChange={this.handlegenderChange} />
                </label>
                <br />
                <button type="submit" onClick={this.handleSubmit}> submit </button>
                </form>
                </div>
            );
        }
        if (this.state.result[0] !== undefined) {
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
                	<div className="button">
                    	<button type="submit" onClick={this.handlebuttonpress}> back </button>
                	</div>
                </div>
            );
        }
        return (
            <div className="result">
                <h1>No result found! Please try again!</h1>
                <button type="submit" onClick={this.handlebuttonpress}> back </button>
            </div>
        )

	}
}


export default search;
