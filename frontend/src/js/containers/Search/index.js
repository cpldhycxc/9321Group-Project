import React from 'react';
// import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import Multiselect from './asearch.js'
import SearchBar from '../../components/SearchBar';


// export default class Search extends React.Component {
//   render() {
//     return (
//       <div className="front-page">
//       <Multiselect label="Multiselect" />
//       </div>
//     );
//   }
// }
ReactDOM.render(
	<div>
		<Multiselect label="Multiselect" />
	</div>,
);
