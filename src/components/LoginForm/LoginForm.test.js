import React from 'react';
import { shallow, mount } from 'enzyme';

import LoginForm from './LoginForm';

describe('LoginForm Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      getFieldLengthValidationState: jest.fn(() => 'success'),
      handleChange: jest.fn(() => 'change'),
      handleSubmit: jest.fn(),
      loading: false,
      passwordRef: jest.fn(() => 'passwordRef'),
      usernameRef: jest.fn(() => 'usernameRef'),
      credential: {
        username: '',
        password: '',
      },
    };
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('Calls validation functions on change', () => {
    let form;

    beforeEach(() => {
      form = shallow(<LoginForm {...props} />);
    });

    it('calls proper validate function when username changes', () => {
      const input = form.find('[name="username"]');
      input.simulate('change', { target: { value: 'john_doe' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('success');
    });

    it('calls proper validate function when password changes', () => {
      const input = form.find('[name="password"]');
      input.simulate('change', { target: { value: 'notsecret' } });
      expect(props.handleChange).toHaveBeenCalled();
      expect(props.getFieldLengthValidationState).toHaveBeenCalled();
      expect(input.prop('validationState')).toEqual('success');
    });
  });

  it('fills input fields with data from props', () => {
    props.credential = {
      username: 'john_doe',
      password: 'notsecret',
    };
    const form = shallow(<LoginForm {...props} />);
    expect(form.find('[name="password"]').props().value).toEqual(props.credential.password);
    expect(form.find('[name="username"]').props().value).toEqual(props.credential.username);
  });

  describe('Loading View', () => {
    it("doesn't render loading animation when no registration request has been made",
    () => {
      const form = shallow(<LoginForm {...props} />);
      expect(form.find('.spinner')).toHaveLength(0);
    });

    it('renders spinner animation when login request is pending', () => {
      props.loading = true;
      const form = mount(<LoginForm {...props} />);
      expect(form.find('.spinner')).toHaveLength(1);
    });
  });

  describe('Submit Button', () => {
    it('calls the handleSubmit on click', () => {
      const form = shallow(<LoginForm {...props} />);
      const button = form.find('#login-button');
      button.simulate('click');
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });
});
