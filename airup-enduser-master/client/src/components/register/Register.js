import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { bind } from '../../utils';
import { when } from '../../store';
import { redirect } from '../../routes';
import { userAuthorize, userLogin, userRegister } from '../../api/user/actions';
import './Register.scss';
import Alert from '../utils/alert/Alert';
import Button from '../utils/Button';
import Form from '../utils/Form';
import Icon from '../utils/Icon';
import Logo from '../header/Logo';
import Text from '../inputs/text/Text';

/**
 * Register component
 */
class Register extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      inputs: {
        email: '',
        name: '',
        password: '',
        username: ''
      },
      show: false
    }
    bind(this, [
      'onSubmit',
      'onSuccess',
      'togglePassword'
    ]);
  }

  render() {
    const { inputs, show } = this.state;
    return (
      <div className="Register">
        <div className="main expand">
          <Logo />
          <Form inputs={inputs} onSubmit={this.onSubmit} onSuccess={this.onSuccess}>
            {({ busy, error, input }) => (
              <>
                <Text
                  {...input('name')}
                  autoComplete="name"
                  placeholder="Full Name"
                  placeholderLabel={true}
                  required
                />
                <Text
                  {...input('username')}
                  autoComplete="username"
                  placeholder="Username"
                  placeholderLabel={true}
                  required
                />
                <Text
                  {...input('email')}
                  autoComplete="email"
                  placeholder="Email"
                  placeholderLabel={true}
                  type="email"
                  required
                />
                <Text
                  {...input('password')}
                  autoComplete="current-password"
                  className="last"
                  placeholder="Password"
                  placeholderLabel={true}
                  type={show ? 'text' : 'password'}
                  required>
                  <Icon className="show" value={'fa-eye' + (show ? '' : '-slash')} onClick={this.togglePassword} />
                </Text>
                <div className="buttons">
                  <Button disabled={busy} type="submit" variant="red">Sign Up</Button>
                  <Alert position="bottom-center">{error}</Alert>
                </div>
                <div className="foot">
                  Have an account already? <Link to="/login">Login</Link>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    );
  }

  /**
   * Form submit
   */
  onSubmit(inputs) {
    return when(userRegister(inputs)).then(() => (
      when(userLogin({
        user: inputs.username,
        password: inputs.password
      }))
    )).then(() => (
      when(userAuthorize())
    ));
  }

  /**
   * On register success
   */
  onSuccess() {
    redirect('/hangar');
  }

  /**
   * Toggle password
   */
  togglePassword() {
    this.setState((state) => ({
      show: !state.show
    }));
  }
}

export default connect(() => {
  return {};
})(Register);
