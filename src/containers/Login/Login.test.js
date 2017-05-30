import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

import { Authentication, LoginForm, Spinner } from '../../components';

import { Login } from './Login';


describe('Login component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      errors: [],
      isAuthenticated: false,
      loading: false,
      login: jest.fn(),
    };
  });

  it('shallow renders without crashing', () => {
    expect(shallow(<Login {...props} />)).toBeDefined();
  });

  it('fully renders without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>,
    );
    expect(wrapper).toBeDefined();
  });

  it('displays errors when errors props is not empty', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find(Alert)).toHaveLength(0);
    props.errors = ['There was a problem'];
    wrapper = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).html()).toContain(props.errors[0]);
  });

  describe('Authentication Integration test cases', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Login {...props} />
        </MemoryRouter>,
      );
    });

    it('renders empty blank Login Form at first', () => {
      expect(wrapper.find(LoginForm).exists()).toBeTruthy();
      expect(wrapper.find('[name="username"]').props().value).toEqual('');
      expect(wrapper.find('[name="password"]').props().value).toEqual('');
    });

    it('renders spinner when loading props is true', () => {
      expect(wrapper.find(Spinner).exists()).toBeFalsy();
      props.loading = true;
      wrapper = mount(
        <MemoryRouter>
          <Login {...props} />
        </MemoryRouter>,
      );
      expect(wrapper.find(Spinner).exists()).toBeTruthy();
    });

    test('login action not called when both form fields are not filled', () => {
      const input = wrapper.find('#login-button');
      input.simulate('click');
      expect(props.login).not.toHaveBeenCalled();
    });

    test('submitting the form calls the login action passed in from Login', () => {
      const usernameInput = wrapper.find('[name="username"]');
      usernameInput.simulate('change', { target: { name: 'username', value: 'john_doe' } });
      const passwordInput = wrapper.find('[name="password"]');
      passwordInput.simulate('change', { target: { name: 'password', value: 'notsecret' } });
      const submitButton = wrapper.find('#login-button');
      submitButton.simulate('click');
      expect(props.login).toHaveBeenCalled();
    });
  });
});
