import React from 'react';
import {
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import PropType from 'prop-types';

const FieldGroup = ({ size, type, placeholder, ...props }) =>
  <FormGroup bsSize={size}>
    <FormControl type={type} placeholder={placeholder} {...props} />
  </FormGroup>;

FieldGroup.defaultProps = {
  size: 'normal',
};

FieldGroup.propTypes = {
  placeholder: PropType.string.isRequired,
  size: PropType.string,
  type: PropType.string.isRequired,
};

export default FieldGroup;
