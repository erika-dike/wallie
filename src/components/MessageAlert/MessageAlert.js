/*
  Component renders both error and success alert messages for both the
  sign up and sign in components
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';


function renderAlert(errors, registered, email) {
  let messageType;
  let messageStyle;
  let message;
  if (errors.length) {
    messageType = 'error';
    messageStyle = 'danger';
    const mappedErrors = errors.map((error, index) =>
      <ListGroupItem key={index} bsStyle="danger">{error}</ListGroupItem>,
    );
    message = <ListGroup>{mappedErrors}</ListGroup>;
  } else if (registered) {
    messageType = 'success';
    messageStyle = messageType;
    message = `
      Check your email: ${email} to activate your account.
      Happy walling.`;
  }

  if (message) {
    return (
      <Alert bsStyle={messageStyle}>
        <strong className="u-captalize">Sign up {messageType}!</strong>&nbsp;
        {message}
      </Alert>
    );
  }
  return null;
}

const MessageAlert = ({ errors, registered, email }) =>
  renderAlert(errors, registered, email);

MessageAlert.defaultProps = {
  email: null,
  errors: null,
};

MessageAlert.propTypes = {
  email: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  registered: PropTypes.bool.isRequired,
};

export default MessageAlert;
