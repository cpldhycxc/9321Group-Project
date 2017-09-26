import React from 'react';
import EditProfile from './EditProfile'

class profile extends React.Component {
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
   },
   showModal: false,
  };
  console.log(this.state);
  this.openState = () => this.setState({ showModal: true });
  this.openState = this.openState.bind(this);
 }
   render() {
       if (this.state.showModal) {
           return (
               <div>
               <h1> Put Editted From here </h1>
               </div>
           );
       }
       return (
           <div className="col-md-8 col-md-offset-2">
            <h1>{this.state.person.name}</h1>
            <p>{this.state.person.biography}</p>
            <img alt="NothingToshow" src={this.state.image}></img>
            <div className="Quote">
            <blockquote>&ldquo; {this.state.quote.content} &rdquo;</blockquote>
            <div className="byline">&mdash; {this.state.quote.source}</div>
            <button onClick={this.openState}>edit</button>
            </div>
           </div>
       );
   }
 }



export default profile;
