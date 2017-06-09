import React from 'react';
import { mount } from 'enzyme';
import { Button, MenuItem } from 'react-bootstrap';

import {
  AboutUs,
  AvatarContainer,
  EditMenu,
  EditProfileForm,
  Posts,
  TopPosts,
  ProfileUserFields,
} from '../../components/';
import postsFixture from '../../fixtures/posts.json';
import profileFixture from '../../fixtures/profile.json';
import topPostsFixture from '../../fixtures/topPosts.json';


import { deleteImageFromCloudinary } from '../../utils';

import { Profile } from './Profile';

jest.mock('../../utils/', () => ({
  ...require.requireActual('../../utils/'),
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => resolve('http://success.jpg')),
  deleteImageFromCloudinary: jest.fn(() => 'deleteImageFromCloudinary'),
}));


describe('Profile Component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      createPost: jest.fn(() => 'createPost'),
      deletePost: jest.fn(() => 'deletePost'),
      editPost: jest.fn(() => 'editPost'),
      fetched: false,
      fetchPosts: jest.fn(() => 'fetchPosts'),
      fetchTopPosts: jest.fn(() => 'fetchTopPosts'),
      isAuthenticated: false,
      lovePost: jest.fn(() => 'lovePost'),
      next: null,
      posts: postsFixture,
      postsErrors: [],
      postsFetched: false,
      postsPending: false,
      profile: profileFixture,
      topPosts: topPostsFixture,
      unlovePost: jest.fn(() => 'unlovePost'),
      updateProfile: jest.fn(() => 'updateProfile'),
      userReducerErrors: [],
    };
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Tests that delete props before mounting', () => {
    it('defines values for next, profile, posts, and topPosts when not defined',
    () => {
      delete props.next;
      delete props.profile;
      delete props.posts;
      delete props.topPosts;
      expect(Object.keys(props)).toHaveLength(14);

      wrapper = mount(<Profile {...props} />);
      expect(Object.keys(wrapper.props())).toHaveLength(18);
      expect(wrapper.prop('next')).toBeNull();
      expect(wrapper.prop('profile')).toBeDefined();
      expect(wrapper.prop('posts')).toEqual([]);
      expect(wrapper.prop('topPosts')).toEqual([]);
    });
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = mount(<Profile {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 18 props', () => {
      expect(Object.keys(wrapper.props())).toHaveLength(18);
    });

    it('initializes state correctly', () => {
      expect(wrapper.state('showEditView')).toBe(false);
      expect(wrapper.state('showFieldErrors')).toBe(false);
      expect(wrapper.state('profile')).toBeDefined();
    });

    it('calls fetchPosts and fetchTopPosts after mounting', () => {
      expect(props.fetchTopPosts).toHaveBeenCalledWith('private=True');
      expect(props.fetchPosts).toHaveBeenCalledWith('?private=True&page_size=6');
    });

    it('renders AvatarContainer with right props', () => {
      const avatarContainer = wrapper.find(AvatarContainer);
      expect(avatarContainer).toBeDefined();
      expect(avatarContainer.prop('img')).toBe(wrapper.prop('profile').profile_pic);
      expect(avatarContainer.prop('uploadImage')).toBe(wrapper.instance().uploadImage);
    });

    it('renders EditMenu with the right props', () => {
      const editMenu = wrapper.find(EditMenu);
      expect(editMenu).toBeDefined();
      expect(editMenu.prop('showEditView')).toBe(wrapper.state('showEditView'));
      expect(editMenu.prop('toggleVisibility')).toBe(
        wrapper.instance().toggleEditView);
      expect(editMenu.prop('handleSubmit')).toBe(
        wrapper.instance().handleSubmit);
    });

    it('renders number of posts the user has written', () => {
      expect(wrapper.find('.Profile-nav-value').text()).toBe(
        String(props.profile.user.num_posts));
    });

    it('renders Posts with the right props', () => {
      const posts = wrapper.find(Posts);
      expect(posts).toHaveLength(1);
      expect(posts.prop('addNotification')).toBe(
        wrapper.instance().addNotification);
      expect(posts.prop('createPost')).toBe(wrapper.prop('createPost'));
      expect(posts.prop('deletePost')).toBe(wrapper.prop('deletePost'));
      expect(posts.prop('editPost')).toBe(wrapper.prop('editPost'));
      expect(posts.prop('fetched')).toBe(wrapper.prop('fetched'));
      expect(posts.prop('fetchPosts')).toBe(wrapper.prop('fetchPosts'));
      expect(posts.prop('lovePost')).toBe(wrapper.prop('lovePost'));
      expect(posts.prop('next')).toBe(wrapper.prop('next'));
      expect(posts.prop('pending')).toBe(wrapper.prop('postsPending'));
      expect(posts.prop('posts')).toBe(wrapper.prop('posts'));
      expect(posts.prop('profile')).toBe(wrapper.prop('profile'));
      expect(posts.prop('unlovePost')).toBe(wrapper.prop('unlovePost'));
    });

    it('does not render EditProfileForm when not in Edit View', () => {
      expect(wrapper.find(EditProfileForm)).toHaveLength(0);
    });

    it('renders ProfileUserFields when not in edit view', () => {
      const profileUserFields = wrapper.find(ProfileUserFields);
      expect(profileUserFields).toHaveLength(1);
      expect(profileUserFields.prop('profile')).toBe(wrapper.prop('profile'));
    });

    it('renders TopPosts with right props', () => {
      const topPosts = wrapper.find(TopPosts);
      expect(topPosts).toHaveLength(1);
      expect(topPosts.prop('posts')).toBe(wrapper.prop('topPosts'));
    });

    it('renders AboutUs', () => {
      expect(wrapper.find(AboutUs)).toHaveLength(1);
    });

    test('clicking Edit Profile button changes showEditView state to true',
    () => {
      const editProfileButton = wrapper.find(EditMenu).find(Button);
      expect(editProfileButton).toHaveLength(1);
      expect(editProfileButton.prop('children').toLowerCase()).toBe('edit profile');

      expect(wrapper.state('showEditView')).toBe(false);
      editProfileButton.simulate('click');
      expect(wrapper.state('showEditView')).toBe(true);
    });

    it("calls notificationSystem's addNotification when userErrors props not empty",
    () => {
      const originalFunction = wrapper.instance().notificationSystem.addNotification;
      wrapper.instance().notificationSystem.addNotification = jest.fn(
        () => 'notificationSystem.addNotification');
      const errors = ['That username already exists', 'Random error'];
      wrapper.setProps({ userReducerErrors: errors });
      expect(wrapper.instance().notificationSystem.addNotification).toHaveBeenCalledTimes(2);
      expect(
        wrapper.instance().notificationSystem.addNotification,
      ).toHaveBeenCalledWith({
        title: 'Update Profile Error!',
        message: errors[0],
        level: 'error',
      });
      expect(
        wrapper.instance().notificationSystem.addNotification,
      ).toHaveBeenCalledWith({
        title: 'Update Profile Error!',
        message: errors[1],
        level: 'error',
      });
      wrapper.instance().notificationSystem.addNotification = originalFunction;
    });

    it('calls addNotification when userErrors props not empty', () => {
      const originalFunction = wrapper.instance().notificationSystem.addNotification;
      wrapper.instance().notificationSystem.addNotification = jest.fn(
        () => 'notificationSystem.addNotification');
      const errors = ['Something is wrong'];
      wrapper.setProps({ postsErrors: errors });
      expect(wrapper.instance().notificationSystem.addNotification).toHaveBeenCalledTimes(1);
      expect(
        wrapper.instance().notificationSystem.addNotification,
      ).toHaveBeenCalledWith({
        title: 'Fetch Posts Error!',
        message: errors[0],
        level: 'error',
      });
      wrapper.instance().notificationSystem.addNotification = originalFunction;
    });
  });

  describe('Edit View', () => {
    beforeEach(() => {
      wrapper = mount(<Profile {...props} />);
      wrapper.setState({ showEditView: true });
    });

    it('renders EditProfileForm', () => {
      const editProfileForm = wrapper.find(EditProfileForm);
      expect(editProfileForm).toHaveLength(1);
      expect(editProfileForm.prop('handleChangeInEditProfileForm')).toBe(
        wrapper.instance().handleChangeInEditProfileForm);
      expect(editProfileForm.prop('profile')).toBe(wrapper.state('profile'));
    });

    it('unsets edit view when cancel button is clicked', () => {
      const cancelButton = wrapper.find(EditMenu).find(Button).first();
      expect(cancelButton).toHaveLength(1);
      expect(cancelButton.prop('children').toLowerCase()).toBe('cancel');
      expect(wrapper.state('showEditView')).toBe(true);
      cancelButton.simulate('click');
      expect(wrapper.state('showEditView')).toBe(false);
    });

    it('updates field in state when corresponding form input changes', () => {
      const username = wrapper.find('[name="username"]');
      expect(username).toHaveLength(1);
      username.simulate('change', { target: { name: 'username', value: 'epsilon' } });
      expect(wrapper.state('profile').user.username).toBe('epsilon');
    });

    it('updates `about` field in state when `about` form input changes', () => {
      const about = wrapper.find('[name="about"]');
      expect(about).toHaveLength(1);
      about.simulate('change', { target: { name: 'about', value: 'superhero' } });
      expect(wrapper.state('profile').about).toBe('superhero');
    });

    test('cancel button resets state', () => {
      wrapper.setState({ profile: {
        ...wrapper.state('profile'),
        about: 'superhero',
      } });
      expect(wrapper.state('profile').about).toBe('superhero');
      const cancelButton = wrapper.find(EditMenu).find(Button).first();
      cancelButton.simulate('click');
      expect(wrapper.state('profile').about).toBe(props.profile.about);
    });

    it('calls updateProfile when user submits form if valid', () => {
      const submitButton = wrapper.find(EditMenu).find(Button).at(1);
      submitButton.simulate('click');
      expect(props.updateProfile).toHaveBeenCalledWith(wrapper.state('profile'));
    });

    it('does not call updateProfile when user submits an invalid form', () => {
      wrapper.setState({ profile: {
        ...wrapper.state('profile'),
        about: '',
      } });
      const submitButton = wrapper.find(EditMenu).find(Button).at(1);
      submitButton.simulate('click');
      expect(props.updateProfile).not.toHaveBeenCalled();
      expect(wrapper.state('showFieldErrors')).toBe(true);
    });

    it('turns off edit view and calls setItem on successful update', () => {
      wrapper.setProps({ fetched: true });
      expect(wrapper.state({ showEditView: false }));
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'profile',
        JSON.stringify(props.profile),
      );
    });

    it('calls fetchPosts and fetchTopPosts on successful update', () => {
      expect(props.fetchTopPosts).toHaveBeenCalledTimes(1);
      expect(props.fetchPosts).toHaveBeenCalledTimes(1);
      wrapper.setProps({ fetched: true });
      expect(wrapper.state({ showEditView: false }));
      expect(props.fetchTopPosts).toHaveBeenCalledTimes(2);
      expect(props.fetchPosts).toHaveBeenCalledTimes(2);
    });
  });

  describe('getFieldLength method test cases', () => {
    beforeEach(() => {
      wrapper = mount(<Profile {...props} />);
      wrapper.setState({ showEditView: true });
    });

    it('returns 8 for username field', () => {
      expect(wrapper.instance().getFieldLength('username')).toBe(8);
    });

    it('returns 17 for about field', () => {
      expect(wrapper.instance().getFieldLength('about')).toBe(17);
    });

    it('returns 4 for first_name field', () => {
      expect(wrapper.instance().getFieldLength('first_name')).toBe(4);
    });

    it('returns 3 for last_name field', () => {
      expect(wrapper.instance().getFieldLength('last_name')).toBe(3);
    });
  });

  describe('isFormValid method test cases', () => {
    let user;
    let profile;

    beforeEach(() => {
      wrapper = mount(<Profile {...props} />);
      wrapper.setState({ showEditView: true });
    });

    it('returns true for valid form', () => {
      expect(wrapper.instance().isFormValid()).toBe(true);
    });

    it('returns false when about is invalid', () => {
      wrapper.setState({ profile: { ...wrapper.state('profile'), about: '' } });
      expect(wrapper.instance().isFormValid()).toBe(false);
    });

    it('returns false when all fields are invalid', () => {
      user = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
      };
      profile = { user, about: '', profile_pic: props.profile.profile_pic };
      wrapper.setState({ profile });
      expect(wrapper.instance().isFormValid()).toBe(false);
    });

    it('returns true when username has field length of 5 and about of 3',
    () => {
      user = { ...props.profile.user, username: 'zodan' };
      profile = { ...props.profile, user, about: 'foe' };
      wrapper.setState({ profile });
      expect(wrapper.instance().isFormValid()).toBe(true);
    });

    it('returns false for username field is less than 5', () => {
      user = { ...props.profile.user, username: 'code' };
      profile = { ...props.profile, user };
      wrapper.setState({ profile });
      expect(wrapper.instance().isFormValid()).toBe(false);
    });

    it('returns false for about field is less than 3', () => {
      profile = { ...props.profile, about: 'dr' };
      wrapper.setState({ profile });
      expect(wrapper.instance().isFormValid()).toBe(false);
    });
  });

  describe('upload image test', () => {
    beforeEach(() => {
      wrapper = mount(<Profile {...props} />);
    });

    test('clicking upload menu item in AvatarContainer calls uploadImage method',
    () => {
      const originalFunction = wrapper.instance().uploadImage;
      wrapper.instance().uploadImage = jest.fn(() => 'uploadImage');
      wrapper.update();
      const uploadMenuItem = wrapper.find(AvatarContainer).find(
        MenuItem).first().find('a');
      expect(uploadMenuItem.text().toLowerCase()).toContain('upload photo');
      uploadMenuItem.simulate('click');

      expect(wrapper.instance().uploadImage).toHaveBeenCalled();
      wrapper.instance().uploadImage = originalFunction;
    });

    it('updates profile_pic in state', async () => {
      await wrapper.instance().uploadImage();
      expect(wrapper.state('profile').profile_pic).toBe('http://success.jpg');
    });

    it('calls updateProfile', async () => {
      await wrapper.instance().uploadImage();
      expect(props.updateProfile).toHaveBeenCalledWith(
        wrapper.state('profile'));
    });

    it('calls deleteImageFromCloudinary on update', async () => {
      wrapper.setProps({ profile: {
        ...props.profile,
        profile_pic: 'http://success.jpg',
      } });
      await wrapper.instance().uploadImage();
      expect(deleteImageFromCloudinary).toHaveBeenCalledWith(
        props.profile.profile_pic);
    });
  });
});
