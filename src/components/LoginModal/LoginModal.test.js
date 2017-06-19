import React from 'react';
import { mount, shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';

import { LoginModal } from './LoginModal';


describe('LoginModal Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      errors: [],
      isAuthenticated: false,
      loading: false,
      loginUser: jest.fn(() => 'loginUser'),
      showLoginModal: false,
      toggleLoginModal: jest.fn(() => 'toggleLoginModal'),
    };
  });

  describe('Shallow Tests', () => {
    it('shallow renders without crashing', () => {
      const wrapper = shallow(<LoginModal {...props} />);
      expect(wrapper).toBeDefined();
    });
  });

  describe('Full Dom Rendering Tests', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <LoginModal {...props} />,
      );
    });

    it('fully renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('changes showModal state to true when showLoginModal prop is set to true', () => {
      expect(wrapper.state('showModal')).toBeFalsy();
      wrapper.setProps({ showLoginModal: true });
      expect(wrapper.state('showModal')).toBeTruthy();
    });

    it('renders Modal when showLoginModal prop is set to true', () => {
      expect(wrapper.find(Modal).prop('show')).toBeFalsy();
      wrapper.setProps({ showLoginModal: true });
      expect(wrapper.find(Modal).prop('show')).toBeTruthy();
    });

    test('modal closes when isAuthenticated changes from false to true', () => {
      wrapper.setProps({ showLoginModal: true });
      expect(wrapper.find(Modal).prop('show')).toBeTruthy();
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.find(Modal).prop('show')).toBeFalsy();
    });

    test('toggleModal is called when modal closes', () => {
      wrapper.setProps({ showLoginModal: true });
      wrapper.setProps({ isAuthenticated: true });
      expect(props.toggleLoginModal).toHaveBeenCalled();
    });
  });
});
