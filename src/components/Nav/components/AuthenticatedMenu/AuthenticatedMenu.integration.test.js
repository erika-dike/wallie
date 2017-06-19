import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

import profile from '../../../../fixtures/profile.json';

import AuthenticatedMenu from './AuthenticatedMenu';


describe('AuthenticatedMenu Component Integration Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      logout: jest.fn(),
      profile,
    };
  });

  it('redirects to profile page on profile page link click', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AuthenticatedMenu {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.node.history.location.pathname).toEqual('/');
    const profilePageLink = wrapper.find(MenuItem).at(0).find('a');
    profilePageLink.simulate('click');
    expect(wrapper.node.history.location.pathname).toEqual(
      `/${props.profile.user.username}`);
  });
});

