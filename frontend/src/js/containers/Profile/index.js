import InlineEdit from 'react-edit-inline';
import React from 'react';

const Info = {
    name: 'Aaron Peirsol',
    Gender: 'male',
    image: 'https://cdn.someecards.com/posts/time-person-of-the-year-2016-twitter-reactions-SRN.png',
    Dob: '1999-9-9',
    home_suburb: 'UNSW',
    program: 'Commerce/Economics',
};

class profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    name: Info.name,
    Gender: Info.Gender,
    image: Info.image,
    Dob: Info.Dob,
    home_suburb: Info.home_suburb,
    program: Info.program,
  };
 this.dataChanged = this.dataChanged.bind(this);
 }

 dataChanged(data) {
     console.log(data);
     this.setState({ ...data });
 }

 customValidateText(text) {
     return (text.length > 0 && text.length < 128);
 }

 render() {
     return (
         <div>
            <h2>Profile Page</h2>
            <h3>Full Name</h3>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.name}
                paramName="message"
                change={this.dataChanged}
                />
            <p></p>
            <h3>Gender</h3>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.Gender}
                paramName="message"
                change={this.dataChanged}
            />
            <h3>Photo</h3>
            <img alt="NothingToshow" src={this.state.image}></img>
            <p></p>
            <h3>Dob</h3>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.Dob}
                paramName="message"
                change={this.dataChanged}
            />
            <p></p>
            <h3>Home_suburb</h3>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.home_suburb}
                paramName="message"
                change={this.dataChanged}
            />
            <p></p>
            <h3>Program</h3>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.program}
                paramName="message"
                change={this.dataChanged}
            />
         </div>
     )
 }
 //
 // componentWillReceiveProps(nextProps) {
 //   if (this.props.name !== nextProps.name) {
 //     this.setState({ name: Object.assign({}, nextProps.name) });
 //   }
 //   this.setState({ saving: false, showModal: false });
 // }
 //
 // updateName(event) {
 //     const field = event.target.name;
 //     const name = this.state.name;
 //     name[field] = event.target.value;
 //     return this.setState({ name: name });
 // }
 //
 // saveName(event) {
 //     event.preventDefault();
 //     this.setState({ saving: true });
 //     console.log(this.props);
 //     this.props.location.updateName(this.state.name);
 // }
 //
 //
 //
 // render() {
 //       if (this.state.showModal) {
 //           return (
 //               <div>
 //               <EditProfile
 //               name={this.state.name}
 //               bio={this.state.biography}
 //               onSave={this.saveName}
 //               onChange={this.updateName}
 //               saving={this.state.saving}
 //
 //               />
 //               </div>
 //           );
 //       }
 //       return (
 //           <div className="col-md-8 col-md-offset-2">
 //            <h1>{this.state.name}</h1>
 //            <p>{this.state.biography}</p>
 //            <img alt="NothingToshow" src={this.state.image}></img>
 //            <div className="Quote">
 //            <blockquote>&ldquo; {this.state.content} &rdquo;</blockquote>
 //            <div className="byline">&mdash; {this.state.source}</div>
 //            <button onClick={this.openState}>edit</button>
 //            </div>
 //           </div>
 //       );
 //   }
 // }
}
export default profile;
