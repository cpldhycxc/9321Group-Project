import React from 'react';
// import { connect } from "react-redux";
import SearchBar from '../../components/SearchBar';

export default class Search extends React.Component {
    render() {
        return (
            <div className="front-page">
                <div className='unswbook'>
                    UNSWBook
                </div>
                <div className='search-bar-int'>
                    <div className='input-group search-bar'>
                        <SearchBar />
                    </div>
                </div>
            </div>
        );
    }
}
