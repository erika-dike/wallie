import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, HelpBlock } from 'react-bootstrap';

// components
import { FieldGroup } from '../../../../components';


/*
Tiny component for rendering a spinner animation
*/
const loadingView = (
  <div>
    <div className="overlay" />
    <span className="spotlight signup-loader">
      <i className="fa fa-spinner fa-pulse fa-2x fa-fw" />
      <span className="sr-only">Loading...</span>
    </span>
  </div>
);


const SignUpForm = ({
  fieldValidationErrorStates,
  getEmailValidationState,
  getFieldLengthValidationState,
  getPasswordsValidationState,
  handleChange,
  handleSubmit,
  registering,
  showFieldErrors,
  user,
}) =>
  <form className="signup-form">
    <FieldGroup
      size="large"
      type="text"
      placeholder="First Name"
      name="first_name"
      value={user.first_name}
      onChange={handleChange}
      validationState={getFieldLengthValidationState('first_name')}
      autoFocus
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.first_name
        ?
          <HelpBlock>This field can not be empty</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="text"
      placeholder="Last Name"
      name="last_name"
      value={user.last_name}
      onChange={handleChange}
      validationState={getFieldLengthValidationState('last_name')}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.last_name
        ?
          <HelpBlock>This field can not be empty</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="text"
      placeholder="Username"
      name="username"
      value={user.username}
      onChange={handleChange}
      validationState={getFieldLengthValidationState('username', 5)}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.username
        ?
          <HelpBlock>Username cannot be less than 5 characters</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="email"
      placeholder="Email"
      name="email"
      value={user.email}
      onChange={handleChange}
      validationState={getEmailValidationState()}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.email
        ?
          <HelpBlock>You entered an Invalid Email</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="password"
      placeholder="Password"
      name="password1"
      value={user.password1}
      onChange={handleChange}
      validationState={getPasswordsValidationState('password1')}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.password1
        ?
          <HelpBlock>The two password fields must match</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="password"
      placeholder="Re-enter Password"
      name="password2"
      value={user.password2}
      onChange={handleChange}
      validationState={getPasswordsValidationState('password2')}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.password2
        ?
          <HelpBlock>The two password fields must match</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <FieldGroup
      size="large"
      type="null"
      placeholder="About me"
      name="about"
      value={user.about}
      componentClass="textarea"
      onChange={handleChange}
      validationState={getFieldLengthValidationState('about', 2)}
    >
      <FormControl.Feedback />
      {
        showFieldErrors && fieldValidationErrorStates.about
        ?
          <HelpBlock>The About field cannot be empty</HelpBlock>
        :
          null
      }
    </FieldGroup>
    <div className="overlay-container">
      {registering ? loadingView : null}
      <Button
        bsStyle="info"
        bsSize="large"
        type="submit"
        id="submit-button"
        block
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </div>
  </form>;

SignUpForm.propTypes = {
  fieldValidationErrorStates: PropTypes.shape({
    first_name: PropTypes.bool.isRequired,
    last_name: PropTypes.bool.isRequired,
    username: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    password1: PropTypes.bool.isRequired,
    password2: PropTypes.bool.isRequired,
    about: PropTypes.bool.isRequired,
  }).isRequired,
  getEmailValidationState: PropTypes.func.isRequired,
  getFieldLengthValidationState: PropTypes.func.isRequired,
  getPasswordsValidationState: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
  showFieldErrors: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password1: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignUpForm;
