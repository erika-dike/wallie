import React from 'react';
import { mount, shallow } from 'enzyme';
import { MenuItem } from 'react-bootstrap';

import profile from '../../../../fixtures/profile.json';


import AuthenticatedMenu from './AuthenticatedMenu';

jest.mock('react-router-dom/Redirect', () => 'Redirect');


describe('AuthenticatedMenu Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      logout: jest.fn(),
      profile,
    };
  });

  describe('Shallow Tests', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<AuthenticatedMenu {...props} />);
    });

    it('shallow renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Full Dom Rendering Tests', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <AuthenticatedMenu {...props} />,
      );
    });

    it('fully renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('sets profilePageClicked state to true when profile page link is clicked', () => {
      expect(wrapper.state('profilePageClicked')).toBeFalsy();
      const profilePageLink = wrapper.find(MenuItem).at(0).find('a');
      profilePageLink.simulate('click');
      expect(wrapper.state('profilePageClicked')).toBeTruthy();
    });

    it('calls logout when logout button is clicked', () => {
      const logoutLink = wrapper.find(MenuItem).at(2).find('a');
      logoutLink.simulate('click');
      expect(props.logout).toHaveBeenCalled();
    });
  });
});
