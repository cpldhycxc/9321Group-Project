import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';

class Search extends React.Component {

    handleclick(){
      this.props.history.push(`/adsearch`);
    }

    render() {
        return (
            <div className="front-page">
                <div className='unswbook'>
                    UNSWBook
                </div>
                <div className='search-bar-int'>
                    <div className='input-group search-bar'>
                        <SearchBar />
                        <Button onClick={()=> this.handleclick()} className='buttons btn btn-primary adsearch'>AdvancedSearch</Button>
                    </div>
                </div>
            </div>
        );
    }
}


const SearchRoute = withRouter(Search);
export default SearchRoute;
