import React from 'react';
import { mount } from 'enzyme';

import { AvatarContainer, UserFields } from '../../components';

import ProfileCard from './ProfileCard';


jest.mock('../../utils/', () => ({
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => resolve('http://success.jpg')),
}));


describe('ProfileCardConsole Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'john',
          last_name: 'doe',
          email: 'john_doe@wallie.com',
          num_posts: 12,
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://fake-pic.jpg',
      },
      profilePageUrl: '/john_doe',
      redirectToProfilePage: jest.fn(() => 'redirectToProfilePage'),
      uploadImage: jest.fn(() => 'uploadImage'),
    };
  });

  describe('base test', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ProfileCard {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    test('props passed in is equal to props possessed', () => {
      expect(Object.keys(wrapper.props())).toEqual(Object.keys(props));
    });

    test('first link has profilePageUrl props as href', () => {
      expect(wrapper.find('a').first().prop('href')).toEqual(props.profilePageUrl);
    });

    it('calls redirectToProfilePage when first link is clicked', () => {
      const profileLink = wrapper.find('a').first();
      profileLink.simulate('click');
      expect(props.redirectToProfilePage).toHaveBeenCalled();
    });

    test('stat link has profilePageUrl props as href', () => {
      const profileLink = wrapper.find('.ProfileCard-stats-stat-link');
      expect(profileLink.prop('href')).toEqual(props.profilePageUrl);
    });

    it('calls redirectToProfilePage when stat link is clicked', () => {
      const profileLink = wrapper.find('.ProfileCard-stats-stat-link');
      profileLink.simulate('click');
      expect(props.redirectToProfilePage).toHaveBeenCalled();
    });

    it('renders num_posts from props in the right place', () => {
      const statValueElement = wrapper.find('.ProfileCardStats-stat-value');
      expect(statValueElement.html()).toContain(props.profile.user.num_posts);
    });

    it('passes the right props to AvatarContainer', () => {
      const avatarContainer = wrapper.find(AvatarContainer);
      expect(Object.keys(avatarContainer.props())).toHaveLength(2);
      expect(avatarContainer.prop('img')).toEqual(props.profile.profile_pic);
      expect(avatarContainer.prop('uploadImage')).toEqual(props.uploadImage);
    });

    it('passes the right props to UserFields', () => {
      const userFields = wrapper.find(UserFields);
      expect(Object.keys(userFields.props())).toHaveLength(3);
      expect(userFields.prop('profilePageUrl')).toEqual(props.profilePageUrl);
      expect(userFields.prop('redirectToProfilePage')).toEqual(props.redirectToProfilePage);
      expect(userFields.prop('user')).toEqual(props.profile.user);
    });
  });
});
