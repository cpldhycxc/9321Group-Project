import React from 'react';
import Autosuggest from 'react-autosuggest';
import match  from 'autosuggest-highlight/match';
import parse  from 'autosuggest-highlight/parse';
import { withRouter } from 'react-router';

const people = [
  {
    "first": "Aaron",
    "last": "Peirsol"
  },
  {
    "first": "Carmen",
    "last": "Electra"
  },
  {
    "first": "Vitali",
    "last": "Klitschko"
  },
  {
    "first": "Richard",
    "last": "Virenque"
  },
  {
    "first": "Lana",
    "last": "Clarkson"
  },
  {
    "first": "Amelia",
    "last": "Vega"
  },
  {
    "first": "Dominic",
    "last": "Monaghan"
  },
  {
    "first": "Juan",
    "last": "Montoya"
  },
  {
   first: 'Charlie',
   last: 'Brown',
 },
 {
   first: 'Charlotte',
   last: 'White',
 },
 {
   first: 'Chloe',
   last: 'Jones',
 },
 {
   first: 'Cooper',
   last: 'King',
 }
];


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');

  return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.first} ${suggestion.last}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first} ${suggestion.last}`;
  const matches = match(suggestionText, query);
  const parts = parse(suggestionText, matches);

  return (
    <span className='suggestion-content'>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
  const { callback } = this.props;
  if (callback) {
    callback(suggestion.id);
  } else {
    this.props.history.push(`/user/${suggestion.first}`);
  }
}

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for Username",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true} />
    );
  }
}

const SearchBarRoute = withRouter(SearchBar);
export default SearchBarRoute;
