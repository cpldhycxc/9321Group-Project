import React from 'react';
import { connect } from 'react-redux';
import PictureDropzone from '../../components/PictureDropzone';
import { Button,Form, TextArea } from 'semantic-ui-react';
import Image from 'react-image-resizer';
import axios from 'axios';

@connect((store) => {
  return  {
    user: store.user.user
  };
})
export default class NewPostBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      step: 0,
      selectedTab: 'edit',
      filter: '',
      Description: '',
      address: '',
    };

    this.onDescriptionChange = (e) => this.setState({ Description: e.target.value });
    this.onAddressChange = (address) => this.setState({ address });
  }

  onDrop = (files) => {
    console.log(files);
    this.setState({
      files,
      step: 1
    });
  }


  onBackToStepOne = () => {
    this.setState({ step: 0 });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('file', this.state.files[0]);
    let url = 'http://localhost:8080/addPost/'.concat(this.props.user.userID).concat('/');
    if (this.state.Description.length === 0) {
      url = url.concat('null');
    } else {
      url = url.concat(this.state.Description);
    }
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: formData
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
    window.location.reload();
    // axios.post('http://localhost:8080/upload', data);
    console.log('submit');
  }

  renderDescriptionField() {
    if (this.state.files.length > 0) {
      return (
        <div>
          <div>
            <h3>Description</h3>
            <Form>
              <TextArea 
                style={{ minHeight: 100, fontSize: 20 }} 
                onChange={this.onDescriptionChange}
              />
            </Form>
          </div>
        </div>
      );
    }
  }

  render() {
    switch (this.state.step) {
      case 0:
        return (
          <div className="NewPostBoard__root">
            <div className="row">
              <div className="twelve columns">
                <div className="NewPostBoard__dropzone-wrapper">
                  <PictureDropzone onDrop={this.onDrop} />
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        const preview = this.state.files[0].preview;
        return (
          <div className="NewPostBoard__root">
            <div className="row">
              <div className="row NewPostBoard__step-two-main-container">
                <div className="six columns">
                  <div className="NewPostBoard__preview-card">
                    <div className="NewPostBoard__preview-card-header">
                    </div>
                    <div className="NewPostBoard__dropzone-wrapper">
                      <div
                       className={`GalleryItem__body ${this.state.filter || ''}`}
                       >
                        <Image src={preview} 
                          role="presentation"  
                          height={500}
                          width={500} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="six columns NewPostBoard__Description-location-container">
                  {this.renderDescriptionField()}
                </div>
              <div className="twelve columns">
                <div className="NewPostBoard__dropzone-row">
                  <div>
                    <Button
                      size='massive'
                      onClick={this.onBackToStepOne}
                      className="NewPostBoard__back-button">
                      <i className="fa fa-arrow-left"/> Back
                    </Button>
                  </div>
                  <div>
                    <Button
                      size='massive'
                      onClick={this.onSubmit}
                      disabled={this.props.isUploading}
                      className="NewPostBoard__share-button">
                      {this.props.isUploading === true
                      ? (<i className="fa fa-spinner fa-pulse fa-3x fa-fw NewPostBoard__spinner" />)
                      : 'Share'}
                    </Button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        )
      default:
        return null;
    }
  }
}

