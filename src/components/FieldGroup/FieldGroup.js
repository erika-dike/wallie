import React from 'react';
import {
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldGroup = ({
  size,
  type,
  placeholder,
  validationState,
  children,
  inputRef,
  ...rest
}) =>
  <FormGroup bsSize={size} validationState={validationState}>
    <FormControl type={type} placeholder={placeholder} inputRef={inputRef} {...rest} />
    { children }
  </FormGroup>;

FieldGroup.defaultProps = {
  children: null,
  inputRef: null,
  size: null,
  validationState: null,
};

FieldGroup.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string.isRequired,
  inputRef: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  validationState: PropTypes.string,
};

export default FieldGroup;
