import React from 'react';
import { Button } from 'react-bootstrap';

import { FieldGroup, Spinner } from '../';


const LoginForm = ({
  credential,
  getFieldLengthValidationState,
  handleChange,
  handleSubmit,
  loading,
  passwordRef,
  usernameRef,
}) =>
  <form className="login-form">
    <FieldGroup
      type="text"
      placeholder="Username"
      name="username"
      value={credential.username}
      validationState={getFieldLengthValidationState('username')}
      onChange={handleChange}
      inputRef={usernameRef}
      autoFocus
    />
    <FieldGroup
      type="password"
      placeholder="Password"
      name="password"
      value={credential.password}
      validationState={getFieldLengthValidationState('password')}
      onChange={handleChange}
      inputRef={passwordRef}
    />
    <div className="text-center overlay-container">
      {loading ? <Spinner /> : null}
      <Button
        bsStyle="info"
        type="submit"
        bsSize="large"
        id="login-button"
        block
        onClick={handleSubmit}
      >
        Log in
      </Button>
    </div>
  </form>;

export default LoginForm;
