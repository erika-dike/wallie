import React from 'react';
import { mount, shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import { LoginModal, Nav } from './../../components/';
import { Home, Login, NotFound, Profile, SignUp } from '../../containers';

import profile from '../../fixtures/profile.json';

import { App } from './App';


describe('App Container Test Suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      isAuthenticated: false,
      logoutUser: jest.fn(() => 'logoutUser'),
      profile: null,
    };
  });

  describe('Base tests', () => {
    beforeEach(() => {
      wrapper = shallow(<App {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 3 props', () => {
      expect(Object.keys(wrapper.instance().props)).toHaveLength(3);
    });

    it('renders Nav with the right props', () => {
      const nav = wrapper.find(Nav);
      expect(nav).toHaveLength(1);
      expect(nav.prop('isAuthenticated')).toBe(
        wrapper.instance().props.isAuthenticated);
      expect(nav.prop('logout')).toBe(wrapper.instance().props.logoutUser);
      expect(nav.prop('profile')).toBe(wrapper.instance().props.profile);
    });

    it('renders four routes when unauthenticated', () => {
      expect(wrapper.find(Route)).toHaveLength(4);
    });

    it('renders first route properly', () => {
      const firstRoute = wrapper.find(Route).first();
      expect(firstRoute.prop('path')).toBe('/');
      expect(firstRoute.prop('component')).toBe(Home);
    });

    it('renders second route properly', () => {
      const secondRoute = wrapper.find(Route).at(1);
      expect(secondRoute.prop('path')).toBe('/signup');
      expect(secondRoute.prop('component')).toBe(SignUp);
    });

    it('renders third route properly', () => {
      const thirdRoute = wrapper.find(Route).at(2);
      expect(thirdRoute.prop('path')).toBe('/login');
      expect(thirdRoute.prop('component')).toBe(Login);
    });

    it('renders fourth route properly', () => {
      const fourthRoute = wrapper.find(Route).at(3);
      expect(fourthRoute.prop('path')).toBeUndefined();
      expect(fourthRoute.prop('component')).toBe(NotFound);
    });

    it('renders login modal component', () => {
      expect(LoginModal).toHaveLength(1);
    });
  });

  describe('Test when user is authenticated', () => {
    beforeEach(() => {
      props = { ...props, isAuthenticated: true, profile };
      wrapper = shallow(<App {...props} />);
    });

    it('renders 5 routes', () => {
      expect(wrapper.find(Route)).toHaveLength(5);
    });

    it('renders profile route properly', () => {
      const profileRoute = wrapper.find(Route).at(3);
      expect(profileRoute.prop('path')).toBe(`/${profile.user.username}`);
      expect(profileRoute.prop('component')).toBe(Profile);
    });
  });
});
