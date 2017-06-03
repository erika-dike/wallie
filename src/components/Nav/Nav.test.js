import React from 'react';
import { mount, shallow } from 'enzyme';
import { Navbar } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

import {
  AuthenticatedMenu,
  LinkWithNavItem,
  UnAuthenticatedMenu,
} from './components';

import Nav from './Nav';


describe('AuthenticatedMenu Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      isAuthenticated: false,
      logout: jest.fn(() => 'logout'),
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john_doe@wallie.com',
          num_posts: 10,
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://no_pictur.jpg',
      },
    };
  });

  describe('Shallow Tests', () => {
    it('shallow renders without crashing', () => {
      const wrapper = shallow(<Nav {...props} />);
      expect(wrapper).toBeDefined();
    });

    it('renders UnAuthenticatedMenu when isAuthenticated is false', () => {
      const wrapper = shallow(<Nav {...props} />);
      expect(wrapper.find(UnAuthenticatedMenu).exists()).toBeTruthy();
    });

    it('does not render AuthenticatedMenu when isAuthenticated is false', () => {
      const wrapper = shallow(<Nav {...props} />);
      expect(wrapper.find(AuthenticatedMenu).exists()).toBeFalsy();
    });

    it('doest not render AuthenticatedMenu when isAuthenticated is true but profile not defined',
    () => {
      props.profile = null;
      const wrapper = shallow(<Nav {...props} />);
      expect(wrapper.find(AuthenticatedMenu).exists()).toBeFalsy();
    });

    it('renders AuthenticatedMenu when isAuthenticated is true and profile is defined',
    () => {
      props.isAuthenticated = true;
      const wrapper = shallow(<Nav {...props} />);
      expect(wrapper.find(AuthenticatedMenu).exists()).toBeTruthy();
    });
  });

  describe('Full Dom Rendering Tests', () => {
    let wrapper;
    let originalFunction;

    beforeEach(() => {
      originalFunction = Nav.handleSelectNavItem;
      Nav.handleSelectNavItem = jest.fn();
      wrapper = mount(
        <MemoryRouter>
          <Nav {...props} />
        </MemoryRouter>,
      );
    });

    afterEach(() => {
      Nav.handleSelectNavItem = originalFunction;
    });

    it('fully renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders Brand link with class of selected on the index page', () => {
      expect(wrapper.find(Navbar.Brand).find('a').hasClass('selected')).toBeTruthy();
    });

    it('calls handleSelectNavItem when navbar brand link is clicked', () => {
      const brandLink = wrapper.find('.navbar-brand');
      expect(brandLink.hasClass('selected'));
    });

    it('calls handleSelectNavItem when Login Link is clicked', () => {
      const loginLink = wrapper.find(LinkWithNavItem).at(0).find('a');
      loginLink.simulate('click');
      expect(Nav.handleSelectNavItem).toHaveBeenCalled();
    });

    it('calls handleSelectNavItem when Signup Link is clicked', () => {
      const signUpLink = wrapper.find(LinkWithNavItem).at(1).find('a');
      signUpLink.simulate('click');
      expect(Nav.handleSelectNavItem).toHaveBeenCalled();
    });

    test('UnAuthenticatedMenu receives the right props', () => {
      expect(wrapper.find(UnAuthenticatedMenu).prop('handleSelectNavItem')).toBeDefined();
    });
  });

  test('AuthenticatedMenu receives the right props', () => {
    props.isAuthenticated = true;
    const wrapper = mount(
      <MemoryRouter>
        <Nav {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find(AuthenticatedMenu).prop('logout')).toBeDefined();
    expect(wrapper.find(AuthenticatedMenu).prop('profile')).toBeDefined();
  });
});
