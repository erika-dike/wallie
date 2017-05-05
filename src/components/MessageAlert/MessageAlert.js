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


function renderAlert(props) {
  let messageType;
  let messageStyle;
  let message;
  const { errors, successful, successMessage, title } = props;

  if (errors.length) {
    messageType = 'error';
    messageStyle = 'danger';
    const mappedErrors = errors.map((error, index) =>
      <ListGroupItem key={index} bsStyle="danger">{error}</ListGroupItem>,
    );
    message = <ListGroup>{mappedErrors}</ListGroup>;
  } else if (successful) {
    messageType = 'success';
    messageStyle = messageType;
    message = successMessage;
  }

  if (message) {
    return (
      <Alert bsStyle={messageStyle}>
        <strong className="u-captalize">{title} {messageType}!</strong>&nbsp;
        {message}
      </Alert>
    );
  }
  return null;
}

const MessageAlert = props =>
  renderAlert(props);

renderAlert.defaultProps = {
  errors: null,
};

renderAlert.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  successful: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MessageAlert;
