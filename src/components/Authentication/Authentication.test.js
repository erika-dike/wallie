import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { shakeButton } from '../../utils/';

import { Authentication } from './Authentication';


describe('Authentication Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn(() => 'changed location'),
      },
      loading: false,
      loginUser: jest.fn(() => 'login user'),
      isAuthenticated: false,
    };
  });

  it('renders as a unit without crashing', () => {
    const wrapper = shallow(<Authentication {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('renders the full DOM without crashing', () => {
    const wrapper = mount(<Authentication {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('handleChange is called when an input value changes', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      // mock handleChange
      originalFunction = Authentication.prototype.handleChange;
      Authentication.prototype.handleChange = jest.fn();
      wrapper = mount(<Authentication {...props} />);
    });

    afterEach(() => {
      // reset handleChange
      Authentication.prototype.handleChange = originalFunction;
    });

    it('calls handleChange on username change', () => {
      const input = wrapper.find('[name="username"]');
      input.simulate('change', { target: { value: 'john_doe' } });
      expect(Authentication.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on password change', () => {
      const input = wrapper.find('[name="password"]');
      input.simulate('change', { target: { value: 'notsecret' } });
      expect(Authentication.prototype.handleChange).toHaveBeenCalled();
    });
  });

  describe('handleSubmit is called on submit', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      // mock handleSubmit
      originalFunction = Authentication.prototype.handleSubmit;
      Authentication.prototype.handleSubmit = jest.fn();
      wrapper = mount(<Authentication {...props} />);
    });

    afterEach(() => {
      // reset handleSubmit
      Authentication.prototype.handleSubmit = originalFunction;
    });

    it('calls handleSubmit on Submit', () => {
      const input = wrapper.find('#login-button');
      input.simulate('click');
      expect(Authentication.prototype.handleSubmit).toHaveBeenCalled();
    });
  });

  describe('credential state is updated when input value changes', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Authentication {...props} />);
    });

    test('username field in credential is updated when field changes', () => {
      const username = 'john_doe';
      const input = wrapper.find('[name="username"]');
      input.simulate('change', { target: { name: 'username', value: username } });
      expect(wrapper.state('credential').username).toEqual(username);
    });

    test('password field in credential is updated when field changes', () => {
      const password = 'john_doe';
      const input = wrapper.find('[name="password"]');
      input.simulate('change', { target: { name: 'password', value: password } });
      expect(wrapper.state('credential').password).toEqual(password);
    });
  });

  describe('handleSubmit Tests', () => {
    let originalFunction;

    beforeEach(() => {
      // mock handleSubmit
      originalFunction = Authentication.prototype.focusOnFirstInputWithError;
      Authentication.prototype.focusOnFirstInputWithError = jest.fn();
    });

    afterEach(() => {
      Authentication.prototype.focusOnFirstInputWithError = originalFunction;
    });

    it('triggers error state when form is not valid for submit', () => {
      const wrapper = mount(<Authentication {...props} />);
      const submitButton = wrapper.find('#login-button');
      submitButton.simulate('click');
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
      expect(Authentication.prototype.focusOnFirstInputWithError).toHaveBeenCalled();
    });

    it('calls the loginUser function when form passes validation', () => {
      const wrapper = mount(<Authentication {...props} />);
      wrapper.setState({
        credential: { username: 'john_doe', password: 'notsecret' },
      });
      const submitButton = wrapper.find('#login-button');
      submitButton.simulate('click');
      expect(props.loginUser).toHaveBeenCalledWith(wrapper.state('credential'));
    });
  });

  it('changes the location of the page when isAuthenticated is updated', () => {
    const wrapper = mount(<Authentication {...props} />);
    expect(wrapper.props().history.push).not.toHaveBeenCalled();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.props().history.push).toHaveBeenCalled();
  });
});
