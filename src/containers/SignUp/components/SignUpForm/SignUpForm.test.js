import React from 'react';
import { shallow, mount } from 'enzyme';
import { HelpBlock } from 'react-bootstrap';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  let props;
  beforeEach(() => {
    props = {
      getEmailValidationState: jest.fn(() => 'email'),
      getFieldLengthValidationState: jest.fn(() => 'length'),
      getPasswordsValidationState: jest.fn(() => 'password'),
      handleChange: jest.fn(() => 'change'),
      handleSubmit: jest.fn(),
      registering: false,
      showFieldErrors: false,
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
      fieldValidationErrorStates: {
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        password1: true,
        password2: true,
        about: true,
      },
    };
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<SignUpForm {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('Calls validation functions on change', () => {
    let form;

    beforeEach(() => {
      form = shallow(<SignUpForm {...props} />);
    });

    it('calls proper validate function when first_name changes', () => {
      const input = form.find('[name="first_name"]');
      input.simulate('change', { target: { value: 'John' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('length');
    });

    it('calls proper validate function when last_name changes', () => {
      const input = form.find('[name="last_name"]');
      input.simulate('change', { target: { value: 'Doe' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('length');
    });

    it('calls proper validate function when username change', () => {
      const input = form.find('[name="username"]');
      input.simulate('change', { target: { value: 'john_doe' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('length');
    });

    it('calls proper validate function when email change', () => {
      const input = form.find('[name="email"]');
      input.simulate('change', { target: { value: 'john_doe@wallie.com' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getEmailValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('email');
    });

    it('calls proper validate function when password1 change', () => {
      const input = form.find('[name="password1"]');
      input.simulate('change', { target: { value: 'notsecret' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getPasswordsValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('password');
    });

    it('calls proper validate function when password2 changes', () => {
      const input = form.find('[name="password2"]');
      input.simulate('change', { target: { value: 'notsecret' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getPasswordsValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('password');
    });

    it('calls proper validate function when about changes', () => {
      const input = form.find('[name="about"]');
      input.simulate('change', { target: { value: 'Engineer' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('length');
    });
  });

  describe('HelpBlocks are displayed under the right conditions', () => {
    // For this test, remember fieldValidationErrorStates are turned on
    // by default
    let wrapper;

    beforeEach(() => {
      props.showFieldErrors = true;
      Object.keys(props.fieldValidationErrorStates).forEach((fieldName) => {
        props.fieldValidationErrorStates[fieldName] = false;
      });
    });

    test(`
      Displays helpblocks for the seven input fields when showFieldErrors
      is true and all fieldValidationErrorStates are true
    `, () => {
      Object.keys(props.fieldValidationErrorStates).forEach((fieldName) => {
        props.fieldValidationErrorStates[fieldName] = true;
      });
      const form = shallow(<SignUpForm {...props} />);
      const nodes = form.find(HelpBlock);
      expect(nodes).toHaveLength(7);
    });

    test('Displays helpblocks for a single input field with errors', () => {
      props.fieldValidationErrorStates.username = true;
      const form = shallow(<SignUpForm {...props} />);
      const nodes = form.find(HelpBlock);
      expect(nodes).toHaveLength(1);
    });

    test(
    'Displays helpblocks for a 3 randomly selected input field with errors',
    () => {
      props.fieldValidationErrorStates.username = true;
      props.fieldValidationErrorStates.about = true;
      props.fieldValidationErrorStates.email = true;
      const form = shallow(<SignUpForm {...props} />);
      const nodes = form.find(HelpBlock);
      expect(nodes).toHaveLength(3);
    });

    test(
    'Displays helpblocks for a 5 randomly selected input field with errors',
    () => {
      props.fieldValidationErrorStates.username = true;
      props.fieldValidationErrorStates.about = true;
      props.fieldValidationErrorStates.email = true;
      props.fieldValidationErrorStates.first_name = true;
      props.fieldValidationErrorStates.last_name = true;
      const form = shallow(<SignUpForm {...props} />);
      const nodes = form.find(HelpBlock);
      expect(nodes).toHaveLength(5);
    });
  });

  describe('User Props', () => {
    let form;
    beforeEach(() => {
      props.user = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'john_doe',
        email: 'john_doe@wallie.com',
        password1: 'notsecret',
        password2: 'notsecret',
        about: 'Engineer',
      };
      form = shallow(<SignUpForm {...props} />);
    });

    it('renders input field values from props', () => {
      expect(form.find('[name="first_name"]').value).toEqual(props.first_name);
      expect(form.find('[name="last_name"]').value).toEqual(props.last_name);
      expect(form.find('[name="username"]').value).toEqual(props.username);
      expect(form.find('[name="password1"]').value).toEqual(props.password1);
      expect(form.find('[name="password2"]').value).toEqual(props.password2);
      expect(form.find('[name="about"]').value).toEqual(props.about);
    });
  });

  describe('Loading View', () => {
    it(
    "doesn't render loading animation when no registration request has been made",
    () => {
      const form = shallow(<SignUpForm {...props} />);
      expect(form.find('.spinner')).toHaveLength(0);
    });
    it('renders spinner animation when registration request is pending', () => {
      props.registering = true;
      const form = mount(<SignUpForm {...props} />);
      expect(form.find('.spinner')).toHaveLength(1);
    });
  });

  describe('Submit Button', () => {
    it('calls the right function on click', () => {
      const form = shallow(<SignUpForm {...props} />);
      const button = form.find('#submit-button');
      button.simulate('click');
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });
});
