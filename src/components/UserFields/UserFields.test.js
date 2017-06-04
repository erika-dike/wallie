import React from 'react';
import { shallow } from 'enzyme';

import UserFields from './UserFields';


describe('UserFields Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      user: {
        username: 'john_doe',
        first_name: 'john',
        last_name: 'doe',
        email: 'john_doe@wallie.com',
        num_posts: 12,
      },
      profilePageUrl: '/john_doe',
      redirectToProfilePage: jest.fn(() => 'redirectToProfilePage'),
    };
  });

  describe('base test', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<UserFields {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    test('props passed in is equal to props possessed', () => {
      expect(Object.keys(wrapper.instance().props)).toEqual(Object.keys(props));
    });

    test('first link has profilePageUrl props as href', () => {
      expect(wrapper.find('a').first().prop('href')).toEqual(props.profilePageUrl);
    });

    test('first link wraps the first and last name of user', () => {
      const firstLink = wrapper.find('a').first();
      expect(firstLink.text()).toContain(props.user.first_name);
      expect(firstLink.text()).toContain(props.user.last_name);
    });

    it('calls redirectToProfilePage when first link is clicked', () => {
      const secondLink = wrapper.find('a').first();
      secondLink.simulate('click');
      expect(props.redirectToProfilePage).toHaveBeenCalled();
    });

    test('second link has profilePageUrl props as href', () => {
      const secondLink = wrapper.find('a').at(1);
      expect(secondLink.prop('href')).toEqual(props.profilePageUrl);
    });

    test('second link wraps username', () => {
      const secondLink = wrapper.find('a').at(1);
      expect(secondLink.text()).toContain(props.user.username);
    });
  });
});
