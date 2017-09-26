import React from 'react';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            value={this.props.person}
            onChange={this.props.onChange} />

          {boxes}

          <TextInput
            name="breed"
            label="Breed"
            value={this.props.person.biography}
            onChange={this.props.onChange} />

          <TextInput
            name="weight"
            label="weight"
            value={this.props.quote.source}
            onChange={this.props.onChange} />

          <TextInput
            name="temperament"
            label="temperament"
            value={this.props.quote.content}
            onChange={this.props.onChange} />

          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave} />
        </form>
      </div>
  );
  }
}

// EditProfile.propTypes = {
//   name: React.PropTypes.object.isRequired,
//   hobbies: React.PropTypes.array.isRequired,
//   onSave: React.PropTypes.func.isRequired,
//   onChange: React.PropTypes.func.isRequired,
//   saving: React.PropTypes.bool
// };

export default EditProfile;
