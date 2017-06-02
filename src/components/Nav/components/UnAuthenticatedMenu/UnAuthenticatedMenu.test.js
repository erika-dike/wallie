import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import UnAuthenticatedMenu from './UnAuthenticatedMenu';


describe('UnAuthenticatedMenu Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = { handleSelectNavItem: jest.fn() };
  });

  it('renders as a unit without crashing', () => {
    expect(shallow(<UnAuthenticatedMenu {...props} />)).toBeDefined();
  });


  describe('Integration tests', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <UnAuthenticatedMenu {...props} />
        </MemoryRouter>,
      );
    });

    it('contains two nav links', () => {
      expect(wrapper.find('li')).toHaveLength(2);
    });

    it('changes page to signup when signup link is clicked', () => {
      expect(wrapper.node.history.location.pathname).toEqual('/');
      expect(wrapper.find('li').at(0).hasClass('selected')).toBeFalsy();
      const signUpLink = wrapper.find('[href="signup"]');
      signUpLink.simulate('click');
      expect(wrapper.node.history.location.pathname).toEqual('/signup');
      expect(wrapper.find('li').at(0).hasClass('selected')).toBeTruthy();
    });

    it('changes page to login when login link is clicked', () => {
      expect(wrapper.node.history.location.pathname).toEqual('/');
      expect(wrapper.find('li').at(1).hasClass('selected')).toBeFalsy();
      const loginLink = wrapper.find('[href="login"]');
      loginLink.simulate('click');
      expect(wrapper.node.history.location.pathname).toEqual('/login');
      expect(wrapper.find('li').at(1).hasClass('selected')).toBeTruthy();
    });

    it('calls handleSelectNavItem when signup link clicked', () => {
      expect(props.handleSelectNavItem).not.toHaveBeenCalled();
      const signUpLink = wrapper.find('[href="signup"]');
      signUpLink.simulate('click');
      expect(props.handleSelectNavItem).toHaveBeenCalled();
    });

    it('calls handleSelectNavItem when login link clicked', () => {
      expect(props.handleSelectNavItem).not.toHaveBeenCalled();
      const loginLink = wrapper.find('[href="login"]');
      loginLink.simulate('click');
      expect(props.handleSelectNavItem).toHaveBeenCalled();
    });
  });
});
