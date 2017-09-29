import React from 'react';
import data from './data.json';

class search extends React.Component {
	constructor(props) {
		super(props);
		this.handleDobChange = this.handleDobChange.bind(this);
		this.state = {
			dob: [],
            gender: [],
            isClick: false,
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
		console.log('dob: ' + this.state.dob + ' gender: ' + this.state.gender);
		e.preventDefault();
	}

	render() {
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
                <button type="submit" onClick={this.handlebuttonpress}> submit </button>
                </form>
                </div>
            );
        }
        return (
                <div>
                    <h3>asdasd</h3>
                    <button type="submit" onClick={this.handlebuttonpress}> back </button>
                </div>
        );
	}
}


export default search;
