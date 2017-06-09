import React from 'react';
import { mount } from 'enzyme';
import { Col } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import {
  AboutUs,
  Posts,
  ProfileCardConsole,
  TopPosts,
} from '../../components';
import postsFixture from '../../fixtures/posts.json';
import profileFixture from '../../fixtures/profile.json';
import topPostsFixture from '../../fixtures/topPosts.json';

import { deleteImageFromCloudinary } from '../../utils';

import { Home } from './Home';

jest.mock('../../utils/', () => ({
  ...require.requireActual('../../utils/'),
  deleteImageFromCloudinary: jest.fn(() => 'deleteImageFromCloudinary'),
}));


describe('Home component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      isAuthenticated: false,
      createPost: jest.fn(() => 'createPost'),
      deletePost: jest.fn(() => 'deletePost'),
      editPost: jest.fn(() => 'editPost'),
      fetchPosts: jest.fn(() => 'fetchPosts'),
      fetchTopPosts: jest.fn(() => 'fetchTopPosts'),
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
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = mount(<Home {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 16 props', () => {
      expect(Object.keys(wrapper.props())).toHaveLength(16);
    });

    it('calls fetchPosts and fetchTopPosts after component mounts', () => {
      expect(props.fetchPosts).toHaveBeenCalled();
      expect(props.fetchTopPosts).toHaveBeenCalled();
    });

    it('renders Posts with the right props', () => {
      const posts = wrapper.find(Posts);
      expect(posts).toHaveLength(1);
      expect(posts.prop('addNotification')).toBe(wrapper.instance().addNotification);
      expect(posts.prop('createPost')).toBe(wrapper.prop('createPost'));
      expect(posts.prop('deletePost')).toBe(wrapper.prop('deletePost'));
      expect(posts.prop('editPost')).toBe(wrapper.prop('editPost'));
      expect(posts.prop('lovePost')).toBe(wrapper.prop('lovePost'));
      expect(posts.prop('fetched')).toBe(wrapper.prop('postsFetched'));
      expect(posts.prop('fetchPosts')).toBe(wrapper.prop('fetchPosts'));
      expect(posts.prop('next')).toBe(wrapper.prop('next'));
      expect(posts.prop('pending')).toBe(wrapper.prop('postsPending'));
      expect(posts.prop('posts')).toBe(wrapper.prop('posts'));
      expect(posts.prop('profile')).toBe(wrapper.prop('profile'));
      expect(posts.prop('unlovePost')).toBe(wrapper.prop('unlovePost'));
    });

    it('does not render ProfileCardConsole when unauthenticated', () => {
      expect(wrapper.find(ProfileCardConsole)).toHaveLength(0);
    });

    it('renders Col container for TopPosts with an mdPull value of 6', () => {
      const topPostsCol = wrapper.find(TopPosts).closest('Col');
      expect(topPostsCol.prop('mdPull')).toBe(6);
    });

    it('renders TopPosts with the right props', () => {
      const topPosts = wrapper.find(TopPosts);
      expect(topPosts).toHaveLength(1);
      expect(topPosts.prop('posts')).toBe(wrapper.prop('topPosts'));
    });

    it('does not render TopPosts and AboutUs when top posts have not been fetched',
    () => {
      wrapper.setProps({ topPosts: [] });
      expect(wrapper.find(TopPosts)).toHaveLength(0);
      expect(wrapper.find('.top-post-section')).toHaveLength(0);
      expect(wrapper.find(AboutUs)).toHaveLength(0);
    });

    it('renders AboutUs when posts and topPosts have been fetched', () => {
      expect(wrapper.find(AboutUs)).toHaveLength(1);
    });

    it('renders AboutUs with mdPush value of null', () => {
      expect(wrapper.find(AboutUs).closest(Col).prop('mdPush')).toBeNull();
    });

    it('does not render AboutUs when posts and topPosts have not been fetched', () => {
      wrapper.setProps({ posts: [], topPosts: [] });
      expect(wrapper.find(AboutUs)).toHaveLength(0);
    });

    it('does not render AboutUs when posts has not been fetched', () => {
      wrapper.setProps({ posts: [] });
      expect(wrapper.find(AboutUs)).toHaveLength(0);
    });

    it('renders NotificationSystem', () => {
      expect(wrapper.find(NotificationSystem)).toHaveLength(1);
    });

    it("calls the  notificationSystem's addNotification function", () => {
      wrapper.instance().notificationSystem.addNotification = jest.fn(() =>
        'NotificationSystem.addNotification',
      );

      const postsErrors = ['Posts were not fetched', 'Top posts were not fetched'];
      wrapper.setProps({ postsErrors });
      expect(
        wrapper.instance().notificationSystem.addNotification,
      ).toHaveBeenCalledWith({ title: null, message: postsErrors[0], level: 'error' });
      expect(
        wrapper.instance().notificationSystem.addNotification,
      ).toHaveBeenCalledWith({ title: null, message: postsErrors[1], level: 'error' });
    });

    it('calls update profile from props with right args', () => {
      const { profile } = props;
      const { profile_pic } = profile;
      profile.profile_pic = 'http://new-picture.jpg';
      wrapper.setProps({ profile });
      wrapper.instance().updateProfile(profile, profile_pic);
      expect(props.updateProfile).toHaveBeenCalledWith(profile);
    });

    it('calls localStorage setItem to set profile', async () => {
      const { profile } = props;
      const { profile_pic } = profile;
      profile.profile_pic = 'http://new-picture.jpg';
      wrapper.setProps({ profile });
      await wrapper.instance().updateProfile(profile, profile_pic);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('calls update profile to set profile', async () => {
      const { profile } = props;
      const { profile_pic } = profile;
      profile.profile_pic = 'http://new-picture.jpg';
      wrapper.setProps({ profile });
      await wrapper.instance().updateProfile(profile, profile_pic);
      expect(deleteImageFromCloudinary).toHaveBeenCalledWith(profile_pic);
    });
  });

  describe('Tests that modify props before mounting', () => {
    it('defines values for default props even when they are not provided', () => {
      delete props.next;
      delete props.profile;
      delete props.posts;
      delete props.topPosts;

      wrapper = mount(<Home {...props} />);

      expect(wrapper.prop('next')).toBeNull();
      expect(wrapper.prop('profile')).toBeNull();
      expect(wrapper.prop('posts')).toEqual([]);
      expect(wrapper.prop('topPosts')).toEqual([]);
    });
  });

  describe('Authenticated Tests', () => {
    let home;

    beforeEach(() => {
      props.isAuthenticated = true;
      wrapper = mount(
        <MemoryRouter>
          <Home {...props} />
        </MemoryRouter>,
      );
      home = wrapper.find(Home);
    });

    it('renders PofileCardConsole with the right props', () => {
      const profileCardConsole = home.find(ProfileCardConsole);
      expect(profileCardConsole).toHaveLength(1);
      expect(profileCardConsole.prop('addNotification')).toBe(home.node.addNotification);
      expect(profileCardConsole.prop('profile')).toBe(home.prop('profile'));
      expect(profileCardConsole.prop('updateProfile')).toBe(home.node.updateProfile);
    });

    it('renders TopPosts with an mdPull of null', () => {
      expect(home.find(TopPosts).closest(Col).prop('mdPull')).toBeNull();
    });

    it('renders AboutUs with mdPush of 3 when top posts fetched',
    () => {
      expect(wrapper.find(AboutUs).closest(Col).prop('mdPush')).toBe(3);
    });
  });

  describe('Errors from the global state are sent to NotificationSystem ', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = Home.prototype.addNotification;
      Home.prototype.addNotification = jest.fn(() => 'addNotification');
      wrapper = mount(<Home {...props} />);
    });

    afterEach(() => {
      Home.prototype.addNotification = originalFunction;
    });

    it('calls addNotification with title null and message errors passed in',
    () => {
      const postsErrors = ['Posts were not fetched', 'Top posts were not fetched'];
      wrapper.setProps({ postsErrors });
      expect(Home.prototype.addNotification).toHaveBeenCalledWith(
        null, postsErrors[0]);
      expect(Home.prototype.addNotification).toHaveBeenCalledWith(
        null, postsErrors[1]);
    });
  });
});
