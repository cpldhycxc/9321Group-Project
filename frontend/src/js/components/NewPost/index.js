import React from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/lib/Button';
import { Form, TextArea } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

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
};

export default class NewPost extends React.Component {
  constructor() {
    super();
    this.state = {
      accepted: [],
      rejected: []
    };
  }


  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="NewPostModal"
        onRequestClose={this.props.onRequestClose}
        style={customStyles}>
        <section>
          <div className="dropzone">
            <Dropzone
              accept="image/*"
              multiple={false}
              onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
            >
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Accepted files</h2>
            <ul>
              {
                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <h2>Rejected files</h2>
            <ul>
              {
                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
        <Form>
          <TextArea autoHeight placeholder='Try adding multiple lines' />
        </Form>
        <Button>Create</Button>
        <Button onClick={this.props.onRequestClose}>Close</Button>
      </Modal>
    );
  }
}
