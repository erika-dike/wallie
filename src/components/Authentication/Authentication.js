import React from 'react';
import PropTypes from 'prop-types';

// local components
import { LoginForm } from '../../components/';

import { shakeButton } from '../../utils/';


class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credential: {
        username: '',
        password: '',
      },
      showFieldErrors: false,
    };
    this.getFieldLengthValidationState = this.getFieldLengthValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusOnFirstInputWithError = this.focusOnFirstInputWithError.bind(this);
  }

  getFieldLengthValidationState(fieldName, minLength = 1) {
    const { credential, showFieldErrors } = this.state;
    const length = credential[fieldName].length;
    if (length < minLength && showFieldErrors) {
      return 'error';
    }
    return null;
  }

  focusOnFirstInputWithError() {
    const { username, password } = this.state.credential;
    if (!username) {
      this.usernameInput.focus();
    } else if (!password) {
      this.passwordInput.focus();
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { credential } = this.state;
    credential[name] = value;
    this.setState({ credential });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state.credential;
    if (username && password) {
      this.props.loginUser(this.state.credential);
    } else {
      // show user helpful hightlights around invalid inputs
      this.setState({ showFieldErrors: true });
      this.focusOnFirstInputWithError();
      shakeButton('login-button');
    }
  }

  render() {
    return (
      <LoginForm
        credential={this.state.credential}
        getFieldLengthValidationState={this.getFieldLengthValidationState}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        loading={this.props.loading}
        passwordRef={(input) => { this.passwordInput = input; }}
        showFieldErrors={this.state.showFieldErrors}
        usernameRef={(input) => { this.usernameInput = input; }}
      />
    );
  }
}

Authentication.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default Authentication;
