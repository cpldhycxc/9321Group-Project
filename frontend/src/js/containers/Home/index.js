import React from "react";
// import { connect } from "react-redux";
import WallContainer from './WallContainer';

export default class Home extends React.Component {
  render() {
    return(
      <div className='HomeContainer'>
        <WallContainer />
      </div>
    );
  }
}
