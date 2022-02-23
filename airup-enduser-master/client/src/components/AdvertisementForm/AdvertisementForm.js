import React, { Component } from 'react';
import Form from '../utils/Form';

import '../login/Login.scss';
import Logo from "../header/Logo";
import Text from "../inputs/text/Text";
import TextArea from "../inputs/text/TextArea";
import Row from "../grid/Row";
import Column from "../grid/Column";
import Checkbox from "../inputs/checkbox/Checkbox";
import {Link} from "react-router-dom";
import Button from "../utils/Button";
import Alert from "../utils/alert/Alert";
import {bind} from "../../utils";
import { connect } from "react-redux";
import {redirect} from "../../routes";
import {user} from "../../api";

/**
 * Advertisement component
 */
class AdvertisementForm extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      inputs: {
        name: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        description: ''
      }
    };
    bind(this, [
      'onSubmit',
      'onSuccess'
    ]);
  }

  onSubmit = (inputs) => {
    const data = {
      name: inputs.name,
      email: inputs.email,
      companyName: inputs.companyName,
      phoneNumber: inputs.phoneNumber,
      description: inputs.description,
    };
    console.log(user);
    console.log(user.addAdvertisementContact);
    return user.addAdvertisementContact(data);//.addAdvertisementContact(data);

  };

  onSuccess(response) {
    redirect('/');
  };

  render() {
    const { inputs } = this.state;
    return (
      <div className="Login Advertise">
        <div className="main expand">
          <Logo />
          <div>
            <p>Leave Your contact information department will return back to you shortly.</p>
            <br/>
            <br/>
          </div>
          <Form inputs={inputs} onSubmit={this.onSubmit} onSuccess={this.onSuccess}>
            {({ busy, error, input }) => (
              <>
                <Text
                  {...input('name')}
                  autoComplete="name"
                  caption="Name"
                  placeholder="Name"
                  placeholderLabel={true}
                  required
                />
                <Text
                  {...input('email')}
                  autoComplete="email"
                  className="last"
                  placeholder="Email"
                  placeholderLabel={true}
                  type="email"
                  required
                />
                <Text
                  {...input('companyName')}
                  autoComplete="company-name"
                  className="last"
                  placeholder="Company Name"
                  placeholderLabel={true}
                  type="text"
                />
                <Text
                  {...input('phoneNumber')}
                  autoComplete="phone-number"
                  className="last"
                  placeholder="Phone Number"
                  placeholderLabel={true}
                  type="text"
                  required
                />
                <TextArea
                  {...input('description')}
                  autoComplete="description"
                  className="last"
                  placeholder="Tell us what you would like to advertise"
                  placeholderLabel={true}
                />
                <div className="buttons">
                  <Button disabled={busy} type="submit" variant="red">Send Message</Button>
                  <Alert position="bottom-center">{error}</Alert>
                </div>
                <div className="foot">
                  Your information will only be used to contact you regarding advertising.
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(({ api: { user } }) => {
  return {
    user: user.auth
  };
}, {
})(AdvertisementForm);
