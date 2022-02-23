import keys from 'lodash/keys';
import pick from 'lodash/pick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone-uploader'

import { bind } from '../../utils';
import './Account.scss';
import Icon from '../utils/Icon';
import Form from '../utils/Form';
import Select from '../inputs/select/Select';
import Text from '../inputs/text/Text';
import {
  updateAccount, userAuthorize,
} from '../../api/user/actions';
import {
  user
} from '../../api'
import 'react-dropzone-uploader/dist/styles.css'
import { when } from 'jquery';

/**
 * Subscriptions
 */
export const subscriptions = {
  none: 'None',
  daily: 'Once a day',
  weekly: 'Once a week',
  monthly: 'Once a month'
};

/**
 * Account component
 */
class Account extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      inputs: {
        email: '',
        name: '',
        phone: '',
        subscription: '',
        _id: ''
      },
      profilePicture: null
    };
    bind(this, [
      'onSubmit'
    ]);
  }

  getUploadParams = ({ meta }) => {
    return {
      url: '/api/v1/users/upload/profile', headers: {
        Authorization: `Bearer ${user.getUserToken()}`
      }
    }
  }

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files) => { console.log(files.map(f => f.meta)) }

  handleFileSelection = (e) => {
    const { target: { files: [file] = [] } = {} } = e || {};

    if (!file) {
      return;
    }

    this.setState({
      profilePicture: URL.createObjectURL(file)
    });

    const formData = new FormData();

    formData.append('file', file, file.originalname);
    user.uploadProfilePicture(formData)
      .then((res) => {
        return when(userAuthorize())
      })
      .then(() => {
        this.setState({
          success: 'Profile Picture update successfully'
        }, () => {
          setTimeout(() => this.setState({
            success: ''
          }), 3000)
        });
      })
      .catch(() => {
        this.setState({
          error: 'Failed to update profile picture'
        }, () => {
          setTimeout(() => this.setState({
            error: ''
          }), 3000)
        });
      });
  }

  render() {
    const { inputs, profilePicture, error, success } = this.state;
    const { user: { data: user = {} } = {} } = this.props || {};
    return (
      <div className="Account">
        <div className="header">
          <h2>{user.name}&apos;s Profile</h2>
        </div>
        <div className="content">
          <div className="photo">
            {false && <div className="content">
              <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent="Drop A File"
                styles={{
                  dropzone: { width: 400, height: 200 },
                  dropzoneActive: { borderColor: 'green' },
                }}
                accept="image/*"
              />
            </div>}
            <div className="image" style={{ backgroundImage: `url(${profilePicture ? profilePicture : (user.imageUrl ? `https://d2kijztdgb1j07.cloudfront.net/${user.imageUrl}` : "/assets/images/man-at-sunset.jpg")})` }}></div>
            <span className="change">
              <input id="profile-file-selector" type="file" onChange={this.handleFileSelection} style={{ display: 'none' }} />
              <label htmlFor="profile-file-selector">
                <Icon value="fa-camera" />
              </label>
              <span/>
            </span>
            <br/>
            {error && <span className="error">{error}</span>}
            {success && <span className="success">{success}</span>}
          </div>
          <Form onSubmit={this.onSubmit} action={updateAccount} inputs={inputs}>
            {({ input }) => (
              <>
                <input type="hidden" {...input('_id')} />
                <Text label="Full Name" {...input('name')} placeholder="Enter full name">
                  <Icon className="edit" value="fa-pen" />
                </Text>
                <Text label="Phone" {...input('phone')} placeholder="No number listed (add your number for text-alerts)" type="tel" />
                <Text label="Email" {...input('email')} placeholder="Enter email address" type="email" />
                <Select label="Receive Email Updates" {...input('subscription')} options={subscriptions} />
                <button type="submit" variant="dark-blue" className="Button btn btn-dark-blue save">Save</button>
              </>
            )}
          </Form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.updateInputs(this.props.user.data);
  }

  componentDidUpdate(props) {
    const { data } = this.props.user;
    if (data !== props.user.data) {
      this.updateInputs(data);
    }
  }

  /**
   * Update inputs
   */
  updateInputs(inputs) {
    this.setState((state) => ({
      inputs: {
        ...state.inputs,
        ...pick(inputs, keys(state.inputs))
      }
    }));
  }

  /**
   * Save profile
   */
  onSubmit() {
    console.log('asd');
  }
}

export default connect(({ api: { user } }) => {
  return {
    user: user.auth
  };
})(Account);
