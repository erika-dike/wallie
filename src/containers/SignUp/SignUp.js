import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

// local components
import { MessageAlert } from '../../components';
import { SignUpForm } from './components';

// actions
import { registerUser } from '../../actions';

// utils
import { isValidEmail } from '../../utils';

import './SignUp.css';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFieldErrors: false,
      msg: '',
      user: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
        about: '',
        profile_pic: '',
      },
    };
    this.fieldValidationErrorStates = {
      first_name: true,
      last_name: true,
      username: true,
      email: true,
      password1: true,
      password2: true,
      about: true,
    };
    this.getEmailValidationState = this.getEmailValidationState.bind(this);
    this.getFieldLengthValidationState = this.getFieldLengthValidationState.bind(this);
    this.getPasswordsValidationState = this.getPasswordsValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  /*
    Checks that the email input field contains valid email addresses.
  */
  getEmailValidationState() {
    const { email } = this.state.user;
    if (isValidEmail(email)) {
      this.fieldValidationErrorStates.email = false;
      return 'success';
    } else if (email.length > 0) {
      this.fieldValidationErrorStates.email = true;
      return 'error';
    } else if (this.state.showFieldErrors && email.length <= 0) {
      this.fieldValidationErrorStates.email = true;
      return 'error';
    }
    return null;
  }

  /*
    Enforces minimum length constraints for the different fields
  */
  getFieldLengthValidationState(fieldName, minLength = 1) {
    const length = this.state.user[fieldName].length;
    if (length >= minLength) {
      this.fieldValidationErrorStates[fieldName] = false;
      return 'success';
    } else if (length > 0) {
      this.fieldValidationErrorStates[fieldName] = true;
      return 'error';
    } else if (this.state.showFieldErrors && length <= 0) {
      this.fieldValidationErrorStates[fieldName] = true;
      return 'error';
    }
    return null;
  }

  /*
    Verifies that both password fields adhere to minimum length constraint
    of 6 characters and are a match.
  */
  getPasswordsValidationState(fieldName) {
    const successState = 'success';
    const errorState = 'error';
    const lengthValidationState = this.getFieldLengthValidationState(fieldName, 6);
    if (lengthValidationState === successState) {
      const { password1, password2 } = this.state.user;
      if (password1 === password2) {
        this.fieldValidationErrorStates[fieldName] = false;
        return successState;
      }
      this.fieldValidationErrorStates[fieldName] = true;
      return errorState;
    }
    return lengthValidationState;
  }


  /*
    Verifies that all fields meet the corresponding contraints
    Triggered when a user tries to submit a form so the user
    can see exactly what fields have issues.
    Initially invalid fields are highlighted, this function turns one the flag
    that displays helpful messages to aid the user.
  */
  isFormValid() {
    const { user } = this.state;
    const { fieldValidationErrorStates } = this;
    let fieldErrors = false;
    Object.keys(user).forEach((fieldName) => {
      if (fieldValidationErrorStates[fieldName]) {
        fieldErrors = true;
      }
    });

    if (fieldErrors) {
      this.setState({ showFieldErrors: true });
      return false;
    }
    this.setState({ showFieldErrors: false });
    return true;
  }

  /*
    Updates component's user state with values from corresponding
    input fields
  */
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  /*
    Handles form submission
    Calls the registerUser if all form is valid,
    otherwise it triggers alerts to inform users of errors
  */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isFormValid()) {
      const { user } = this.state;
      this.props.registerUser(user);
    } else {
      const elem = document.getElementById('submit-button');
      elem.classList.add('element-shake');
      setTimeout(() => elem.classList.remove('element-shake'), 500);
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={6} mdOffset={3}>

            <div className="alert-wrapper">
              <MessageAlert
                email={this.state.user.email}
                errors={this.props.errors}
                registered={this.props.registered}
              />
            </div>

            <div className="signup-wrapper">
              <h1>Start Walling today</h1>
              <SignUpForm
                fieldValidationErrorStates={this.fieldValidationErrorStates}
                getEmailValidationState={this.getEmailValidationState}
                getFieldLengthValidationState={this.getFieldLengthValidationState}
                getPasswordsValidationState={this.getPasswordsValidationState}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                registering={this.props.registering}
                showFieldErrors={this.state.showFieldErrors}
                user={this.state.user}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SignUp.defaultProps = {
  errors: null,
  user: null,
};

SignUp.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  registerUser: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    registering: state.user.registering,
    registered: state.user.registered,
    errors: state.user.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (userInfo) => {
      dispatch(registerUser(userInfo));
    },
  };
}

export { SignUp };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
