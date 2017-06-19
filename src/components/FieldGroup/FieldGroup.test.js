import React from 'react';
import { shallow } from 'enzyme';
import { FormControl, FormGroup } from 'react-bootstrap';

import FieldGroup from './FieldGroup';

describe('FieldGroup', () => {
  let props;

  beforeEach(() => {
    props = {
      children: null,
      placeholder: '',
      size: '',
      type: '',
      validationState: '',
    };
  });

  it('renders without crashing', () => {
    const component = shallow(<FieldGroup {...props} />);
    expect(component).toBeDefined();
  });

  it('renders without required props', () => {
    const incompleteProps = {
      placeholder: '',
      type: '',
    };
    const component = shallow(<FieldGroup {...incompleteProps} />);
    expect(component).toBeDefined();
  });

  it('renders children', () => {
    const component = shallow(<FieldGroup {...props}><p>Hello World</p></FieldGroup>);
    expect(component.find('p').text()).toContain('Hello World');
  });

  test('FormGroup component gets right props', () => {
    props.size = 'large';
    props.validationState = 'error';
    const component = shallow(<FieldGroup {...props} />);
    expect(component.find(FormGroup).prop('bsSize')).toEqual(props.size);
    expect(component.find(FormGroup).prop('validationState')).toEqual(
      props.validationState);
  });

  test('FormControl component gets right props', () => {
    props.type = 'text';
    props.placeholder = 'Enter Name';
    const component = shallow(<FieldGroup {...props} />);
    expect(component.find(FormControl).prop('type')).toEqual(props.type);
    expect(component.find(FormControl).prop('placeholder')).toEqual(
      props.placeholder);
  });

  test('FormControl receives any extra unspecified props', () => {
    props.id = '007';
    props.vehicle = 'Aston Martin';
    const component = shallow(<FieldGroup {...props} />);
    expect(component.find(FormControl).prop('id')).toEqual(props.id);
    expect(component.find(FormControl).prop('vehicle')).toEqual(props.vehicle);
  });
});
