import React from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/lib/Button';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0, 0.8)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50%',
    left                       : '50%',
    transform                  : 'translate(-50%, -50%)',
    right                      : 'initial',
    bottom                     : 'initial',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '30px'

  }
}


export default class NewPost extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="NewPostModal"
        onRequestClose={this.props.onRequestClose}
        style={customStyles}>
        <p>New Post</p>
        <Button onClick={this.props.onRequestClose}>close</Button>
      </Modal>
    );
  }
}