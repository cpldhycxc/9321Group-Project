import React, { Component } from 'react';

class profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: {
				name: 'Random Test',
				biography: '14 years-old genius student on UTS studying Computer Science',
			},
			image: 'https://cdn.someecards.com/posts/time-person-of-the-year-2016-twitter-reactions-SRN.png',
			quote: {
				content: 'FUCKED UP',
				source: 'TEST '
			}
		};
	}
	render() {
		return (
			<div className="profile">
				<img alt="No" src={this.state.image} />
				<Profile person={this.state.person} quote={this.state.quote} />
			</div>
		);
	}
}


function Profile(props) {
	return (
		<div className="Profile">
			<h1 className="Name">{props.person.name}</h1>
			<p className="Bio">{props.person.biography}</p>
			<div className="Quote">
				<blockquote>&ldquo; {props.quote.content} &rdquo;</blockquote>
				<div className="byline">&mdash; {props.quote.source}</div>
			</div>

		</div>
	);
}
export default profile;
