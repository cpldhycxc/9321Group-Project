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
            value={this.props.name}
            onChange={this.props.onChange} />


          <TextInput
            name="bio"
            label="bio"
            value={this.props.biography}
            onChange={this.props.onChange} />

          <TextInput
            name="source"
            label="source"
            value={this.props.source}
            onChange={this.props.onChange} />

          <TextInput
            name="content"
            label="content"
            value={this.props.content}
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

EditProfile.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default EditProfile;
