import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormControl } from 'react-bootstrap';

import { SignUp } from './SignUp';


describe('SignUp component Test Suite', () => {
  let props;
  const userData = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'john_doe',
    email: 'john_doe@wallie.com',
    password1: 'notsecret',
    password2: 'notsecret',
    about: 'Engineer',
    profile_pic: '',
  };

  beforeEach(() => {
    props = {
      errors: [],
      registered: false,
      registering: true,
      registerUser: jest.fn(),
    };
  });

  it('renders as a unit without crashing', () => {
    const wrapper = shallow(<SignUp {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('renders fully without crashing', () => {
    const wrapper = mount(<SignUp {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('handleChange is called when input value changes', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      // mock handleChange
      originalFunction = SignUp.prototype.handleChange;
      SignUp.prototype.handleChange = jest.fn();
      wrapper = mount(<SignUp {...props} />);
    });

    afterEach(() => {
      // reset handleChange
      SignUp.prototype.handleChange = originalFunction;
    });

    it('calls handleChange on first_name change', () => {
      const input = wrapper.find('[name="first_name"]');
      input.simulate('change', { target: { value: userData.first_name } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on last_name change', () => {
      const input = wrapper.find('[name="last_name"]');
      input.simulate('change', { target: { value: userData.last_name } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on username change', () => {
      const input = wrapper.find('[name="username"]');
      input.simulate('change', { target: { value: userData.username } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on password1 change', () => {
      const input = wrapper.find('[name="password1"]');
      input.simulate('change', { target: { value: userData.password1 } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on password2 change', () => {
      const input = wrapper.find('[name="password2"]');
      input.simulate('change', { target: { value: userData.password2 } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on about field value change', () => {
      const input = wrapper.find('[name="about"]');
      input.simulate('change', { target: { value: userData.about } });
      expect(SignUp.prototype.handleChange).toHaveBeenCalled();
    });
  });

  describe('handleSubmit is called on submit', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      // mock handleSubmit
      originalFunction = SignUp.prototype.handleSubmit;
      SignUp.prototype.handleSubmit = jest.fn();
      wrapper = mount(<SignUp {...props} />);
    });

    afterEach(() => {
      // reset handleSubmit
      SignUp.prototype.handleSubmit = originalFunction;
    });

    it('calls handleSubmit on submit', () => {
      const input = wrapper.find('#submit-button');
      input.simulate('click');
      expect(SignUp.prototype.handleSubmit).toHaveBeenCalled();
    });
  });

  describe("Change in field values update component's state", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<SignUp {...props} />);
    });

    it('calls updates first_name state on first_name change', () => {
      const input = wrapper.find('[name="first_name"]');
      input.node.value = userData.first_name;
      input.simulate('change');
      expect(wrapper.state().user.first_name).toEqual(userData.first_name);
    });

    it('calls updates last_name state on last_name change', () => {
      const input = wrapper.find('[name="last_name"]');
      input.node.value = userData.last_name;
      input.simulate('change');
      expect(wrapper.state().user.last_name).toEqual(userData.last_name);
    });

    it('calls updates username state on username change', () => {
      const input = wrapper.find('[name="username"]');
      input.node.value = userData.username;
      input.simulate('change');
      expect(wrapper.state().user.username).toEqual(userData.username);
    });

    it('calls updates email state on email change', () => {
      const input = wrapper.find('[name="email"]');
      input.node.value = 'jane_doe@wallie.com';
      input.simulate('change');
      expect(wrapper.state().user.email).toEqual('jane_doe@wallie.com');
    });

    it('calls updates user password1 state on password1 change', () => {
      const input = wrapper.find('[name="password1"]');
      input.node.value = userData.password1;
      input.simulate('change');
      expect(wrapper.state().user.password1).toEqual(userData.password1);
    });

    it('calls updates user password2 state on password2 change', () => {
      const input = wrapper.find('[name="password2"]');
      input.node.value = userData.password2;
      input.simulate('change');
      expect(wrapper.state().user.password2).toEqual(userData.password2);
    });

    it('calls updates user about state on about change', () => {
      const input = wrapper.find('[name="about"]');
      input.node.value = userData.about;
      input.simulate('change');
      expect(wrapper.state().user.about).toEqual(userData.about);
    });
  });

  describe('handleSubmit Test Case', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      // mock isFormValid
      originalFunction = SignUp.prototype.isFormValid;
    });

    afterEach(() => {
      // reset isFormValid
      SignUp.prototype.isFormValid = originalFunction;
    });

    test('action registerUser is called when form valid', () => {
      SignUp.prototype.isFormValid = () => true;
      wrapper = mount(<SignUp {...props} />);
      const input = wrapper.find('#submit-button');
      input.simulate('click');
      expect(props.registerUser).toHaveBeenCalled();
    });

    test('action registerUser is not called when form is invalid', () => {
      SignUp.prototype.isFormValid = () => false;
      wrapper = mount(<SignUp {...props} />);
      const input = wrapper.find('#submit-button');
      input.simulate('click');
      expect(props.registerUser).not.toHaveBeenCalled();
    });
  });

  describe('isFormValid Test Case', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<SignUp {...props} />);
    });

    it(`returns false when no value has been filled and sets state
    to show field errors`,
    () => {
      expect(wrapper.state('showFieldErrors')).toBeFalsy();
      expect(wrapper.instance().isFormValid()).toBeFalsy();
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
    });

    it('returns true when all fields are filled', () => {
      wrapper.setState({ user: userData });
      expect(wrapper.instance().isFormValid()).toBeTruthy();
      expect(wrapper.state('showFieldErrors')).toBeFalsy();
    });

    it('returns false when even one required field is empty', () => {
      const localUserData = { ...userData, about: '' };
      wrapper.setState({ user: localUserData });
      expect(wrapper.instance().isFormValid()).toBeFalsy();
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
    });

    it('returns false when a field does not meet its validation constraint',
    () => {
      const localUserData = { ...userData, username: 'yo' };
      wrapper.setState({ user: localUserData });
      expect(wrapper.instance().isFormValid()).toBeFalsy();
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
    });

    it('returns false when password fields do not match', () => {
      const localUserData = { ...userData, password2: 'nomatch' };
      wrapper.setState({ user: localUserData });
      expect(wrapper.instance().isFormValid()).toBeFalsy();
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
    });

    it('returns false when email field does not pass validation', () => {
      const localUserData = { ...userData, email: 'jane_doe' };
      wrapper.setState({ user: localUserData });
      expect(wrapper.instance().isFormValid()).toBeFalsy();
      expect(wrapper.state('showFieldErrors')).toBeTruthy();
    });
  });

  describe('getFieldLengthValidationState Test Case', () => {
    let wrapper;
    let minLength;
    let instance;
    let localUserData;

    beforeEach(() => {
      localUserData = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
        about: '',
      };
      minLength = 5;
      wrapper = shallow(<SignUp {...props} />);
      instance = wrapper.instance();
    });

    it('returns success when field meets length constraints', () => {
      Object.keys(localUserData).forEach((fieldName) => {
        localUserData[fieldName] = 'five_characters';
        expect(instance.fieldValidationErrorStates[fieldName]).toBeTruthy();
        wrapper.setState({ user: localUserData });
        expect(instance.getFieldLengthValidationState(
          fieldName, minLength)).toEqual('success');
        expect(instance.fieldValidationErrorStates[fieldName]).toBeFalsy();
      });
    });

    it('returns error when field contains values but is less than minimum length',
    () => {
      Object.keys(localUserData).forEach((fieldName) => {
        localUserData[fieldName] = 'less';
        expect(instance.fieldValidationErrorStates[fieldName]).toBeTruthy();
        wrapper.setState({ user: localUserData });
        expect(instance.getFieldLengthValidationState(
          fieldName, minLength)).toEqual('error');
        expect(instance.fieldValidationErrorStates[fieldName]).toBeTruthy();
      });
    });

    it('returns error when field is empty and showFieldErrors state is true',
    () => {
      Object.keys(localUserData).forEach((fieldName) => {
        localUserData[fieldName] = '';
        expect(instance.fieldValidationErrorStates[fieldName]).toBeTruthy();
        wrapper.setState({ showFieldErrors: true });
        expect(instance.getFieldLengthValidationState(
          fieldName, minLength)).toEqual('error');
        expect(instance.fieldValidationErrorStates[fieldName]).toBeTruthy();
      });
    });

    it('returns null when field is empty and showFieldErrors state is false',
    () => {
      Object.keys(localUserData).forEach((n) => {
        expect(instance.fieldValidationErrorStates[n]).toBeTruthy();
        expect(instance.getFieldLengthValidationState(
          n, minLength)).toBeNull();
        expect(instance.fieldValidationErrorStates[n]).toBeTruthy();
      });
    });
  });

  describe('getEmailValidationState Test Case', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(<SignUp {...props} />);
      instance = wrapper.instance();
    });

    it('returns success when field meets email constraints', () => {
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
      wrapper.setState({ user: userData });
      expect(instance.getEmailValidationState()).toEqual('success');
      expect(instance.fieldValidationErrorStates.email).toBeFalsy();
    });

    it('returns error when field value is not valid email 1 (+/- 95% accuracy)',
    () => {
      const localUserData = { ...userData };
      localUserData.email = 'jane_doe';
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getEmailValidationState()).toEqual('error');
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
    });

    it('returns error for empty field only when showFieldErrors is set', () => {
      wrapper.setState({ showFieldErrors: true });
      const localUserData = { ...userData };
      localUserData.email = '';
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getEmailValidationState()).toEqual('error');
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
    });

    it('returns null for empty field when showFieldErrors is not set', () => {
      const localUserData = { ...userData };
      localUserData.email = '';
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getEmailValidationState()).toBeNull();
      expect(instance.fieldValidationErrorStates.email).toBeTruthy();
    });
  });

  describe('getPasswordsValidationState Test Case', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(<SignUp {...props} />);
      instance = wrapper.instance();
    });

    it(`returns success when field value contains more than six characters
    and the two password fields are a match`,
    () => {
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      wrapper.setState({ user: userData });
      expect(instance.getPasswordsValidationState('password1')).toEqual('success');
      expect(instance.getPasswordsValidationState('password2')).toEqual('success');
      expect(instance.fieldValidationErrorStates.password1).toBeFalsy();
      expect(instance.fieldValidationErrorStates.password2).toBeFalsy();
    });

    it(`returns success when field value contains six characters
    and the two password fields are a match`,
    () => {
      const password = 'master';
      const localUserData = {
        ...userData,
        password1: password,
        password2: password,
      };
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getPasswordsValidationState('password1')).toEqual('success');
      expect(instance.getPasswordsValidationState('password2')).toEqual('success');
      expect(instance.fieldValidationErrorStates.password1).toBeFalsy();
      expect(instance.fieldValidationErrorStates.password2).toBeFalsy();
    });

    it('returns error when field value atleast six but passwords not match',
    () => {
      const localUserData = {
        ...userData,
        password1: 'secret',
      };
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getPasswordsValidationState('password1')).toEqual('error');
      expect(instance.getPasswordsValidationState('password2')).toEqual('error');
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
    });

    it('returns error when field value less than six but passwords match',
    () => {
      const localUserData = {
        ...userData,
        password1: 'doe',
        password2: 'doe',
      };
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
      wrapper.setState({ user: localUserData });
      expect(instance.getPasswordsValidationState('password1')).toEqual('error');
      expect(instance.getPasswordsValidationState('password2')).toEqual('error');
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
    });

    it('returns null when both fields are empty',
    () => {
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
      expect(instance.getPasswordsValidationState('password1')).toBeNull();
      expect(instance.getPasswordsValidationState('password2')).toBeNull();
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
    });

    it('returns error for non empty field and null for empty field', () => {
      const localUserData = {
        ...userData,
        password1: '',
      };
      wrapper.setState({ user: localUserData });
      expect(instance.getPasswordsValidationState('password1')).toBeNull();
      expect(instance.getPasswordsValidationState('password2')).toEqual('error');
      expect(instance.fieldValidationErrorStates.password1).toBeTruthy();
      expect(instance.fieldValidationErrorStates.password2).toBeTruthy();
    });
  });
});
