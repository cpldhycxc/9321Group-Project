import React from 'react';
import Autosuggest from 'react-autosuggest';
import match  from 'autosuggest-highlight/match';
import parse  from 'autosuggest-highlight/parse';
import { withRouter } from 'react-router';
import data from './data.json';

const people = data.data;


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
  return `${suggestion.username}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.username}`;
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
    this.props.history.push(`/user/${suggestion.username}`);
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
