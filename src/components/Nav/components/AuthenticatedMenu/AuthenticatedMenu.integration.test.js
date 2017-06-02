import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

import AuthenticatedMenu from './AuthenticatedMenu';


describe('AuthenticatedMenu Component Integration Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      logout: jest.fn(),
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

