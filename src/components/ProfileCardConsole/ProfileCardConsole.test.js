import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

import { ProfileCard } from '../../components';

import ProfileCardConsoleWithRouter, { ProfileCardConsole } from './ProfileCardConsole';


jest.mock('../../utils/', () => ({
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => resolve('http://success.jpg')),
}));


describe('ProfileCardConsole Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      addNotification: jest.fn(() => 'addNotification'),
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
      updateProfile: jest.fn(() => 'updateProfile'),
    };
  });

  describe('base test', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <ProfileCardConsoleWithRouter {...props} />
        </MemoryRouter>,
      );
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders ProfileCard', () => {
      expect(wrapper.find(ProfileCard).exists()).toBeTruthy();
    });

    it('passes right props to ProfileCard', () => {
      const profileCard = wrapper.find(ProfileCard);
      expect(profileCard.prop('profilePageUrl')).toBeDefined();
      expect(profileCard.prop('redirectToProfilePage')).toBeDefined();
      expect(profileCard.prop('updateProfile')).toBeDefined();
      expect(profileCard.prop('uploadImage')).toBeDefined();
    });

    test('clicking on first link redirects to profile page', () => {
      expect(wrapper.node.history.location.pathname).toEqual('/');
      const firstLink = wrapper.find('a').first();
      firstLink.simulate('click');
      expect(wrapper.node.history.location.pathname).toEqual('/john_doe');
    });

    test('clicking on second link redirects to profile page', () => {
      expect(wrapper.node.history.location.pathname).toEqual('/');
      const firstLink = wrapper.find('.ProfileCard-stats-stat-link').first();
      firstLink.simulate('click');
      expect(wrapper.node.history.location.pathname).toEqual('/john_doe');
    });
  });

  describe('mock out upload image', () => {
    let originalFunction;
    let wrapper;

    beforeEach(() => {
      originalFunction = ProfileCardConsole.prototype.uploadImage;
      ProfileCardConsole.prototype.uploadImage = jest.fn();
      wrapper = mount(<ProfileCardConsole {...props} />);
    });

    afterEach(() => {
      ProfileCardConsole.prototype.uploadImage = originalFunction;
    });

    it('calls uploadImage when Upload photo menu item is clicked', () => {
      const uploadPhotoLink = wrapper.find(MenuItem).first().find('a');
      expect(uploadPhotoLink.prop('children').toLowerCase()).toContain('upload photo');
      uploadPhotoLink.simulate('click');
      expect(ProfileCardConsole.prototype.uploadImage).toHaveBeenCalled();
    });
  });

  describe('Test upload image with openCloudinaryUploadWidget success', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ProfileCardConsole {...props} />);
    });

    it('calls update Profile on success with updated profile and old profile picture',
    async () => {
      const oldProfilePicUrl = props.profile.profile_pic;
      const uploadPhotoLink = wrapper.find(MenuItem).first().find('a');
      expect(uploadPhotoLink.prop('children').toLowerCase()).toContain('upload photo');
      await uploadPhotoLink.simulate('click');
      const updatedProfile = wrapper.find(ProfileCardConsole).prop('profile');
      expect(props.updateProfile).toHaveBeenCalledWith(updatedProfile, oldProfilePicUrl);
    });
  });

  describe('mock out redirectToProfilePage', () => {
    let originalFunction;
    let wrapper;

    beforeEach(() => {
      originalFunction = ProfileCardConsole.prototype.redirectToProfilePage;
      ProfileCardConsole.prototype.redirectToProfilePage = jest.fn();
      wrapper = mount(<ProfileCardConsole {...props} />);
    });

    afterEach(() => {
      ProfileCardConsole.prototype.redirectToProfilePage = originalFunction;
    });

    it('calls redirectToProfilePage when profile link is clicked', () => {
      const firstLink = wrapper.find('a').first();
      firstLink.simulate('click');
      expect(ProfileCardConsole.prototype.redirectToProfilePage).toHaveBeenCalled();
    });
  });

  describe('Test profilePageUrl', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ProfileCardConsole {...props} />);
    });

    it('constructs profilePageUrl according to spec', () => {
      expect(wrapper.node.profilePageUrl).toEqual(`/${props.profile.user.username}`);
    });
  });
});
