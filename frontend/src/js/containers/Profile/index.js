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
  this.closeState = () => this.setState({ showModal: false });
  this.openState = this.openState.bind(this);
  this.closeState = this.closeState.bind(this);
 }
   render() {
       if (this.state.showModal) {
           return (
               <div>
               <label>
               Name:
               <input type="text" name="name" />
               </label>
               <label>
               biography
               <input type="text" name="biography" />
               </label>
               <label>
               quote-source
               <input type="text" name="quote-source" />
               </label>
               <label>
               quote-content
               <input type="text" name="quote-content" />
               </label>
               <button onClick={this.closeState}>submit</button>
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
