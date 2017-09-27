import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'semantic-ui-react';

const propTypes = {
  onDrop: PropTypes.func.isRequired,
}

const PictureDropzone = (props) => {
  return (
    <Dropzone
      className="NewPostBoard__dropzone"
      onDrop={props.onDrop}
      multiple={false}
      accept="image/*" >
      <div className="NewPostBoard__dropzone-inner-wrapper">
        <div className="NewPostBoard__dropzone-inner-content">
          <div>
            <Icon name='camera retro' size='massive' />
          </div>
          <div className="NewPostBoard__dropzone-text">Upload Picture</div>
        </div>
      </div>
    </Dropzone>
  );
};

PictureDropzone.propTypes = propTypes;

export default PictureDropzone;
