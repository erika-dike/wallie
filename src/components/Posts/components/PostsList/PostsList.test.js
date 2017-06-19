import React from 'react';
import { mount } from 'enzyme';
import WayPoint from 'react-waypoint';

import { ContentPlaceholder, PostItem } from '../../../../components/';
import posts from '../../../../fixtures/posts.json';
import profile from '../../../../fixtures/profile.json';

import PostsList from './PostsList';


describe('PostsList component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addNotification: jest.fn(() => 'addNotification'),
      deletePost: jest.fn(() => 'deletePost'),
      fetched: false,
      fetchPosts: jest.fn(() => 'fetchPosts'),
      insertPostIntoCreateBox: jest.fn(() => 'insertPostIntoCreateBox'),
      lovePost: jest.fn(() => 'lovePost'),
      next: null,
      pending: false,
      posts,
      profile,
      unlovePost: jest.fn(() => 'unlovePost'),
    };
  });

  describe('Base Test', () => {
    beforeEach(() => {
      wrapper = mount(<PostsList {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state with the right values', () => {
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('statusMessage')).toBe(wrapper.instance().LOADING_MESSAGE);
    });

    it('defines class properties', () => {
      expect(wrapper.instance().LOADING_MESSAGE).toBeDefined();
      expect(wrapper.instance().CAUGHT_UP_MESSAGE).toBeDefined();
    });

    it('renders loader if there is next props is not empty', () => {
      expect(wrapper.find('.fa-spinner')).toHaveLength(0);
      wrapper.setProps({ next: 'http://api-url?page_size=6&page=2' });
      expect(wrapper.find('.fa-spinner')).toHaveLength(1);
    });

    it('renders WayPoint if isLoading is false', () => {
      expect(wrapper.find(WayPoint)).toHaveLength(1);
      expect(wrapper.find(WayPoint).prop('onEnter')).toBe(wrapper.instance().loadMorePosts);
    });

    it('does not render WayPoint if isLoading is true', () => {
      wrapper.setState({ isLoading: true });
      expect(wrapper.find(WayPoint)).toHaveLength(0);
    });

    it('does not render ContentPlaceholder', () => {
      expect(wrapper.find(ContentPlaceholder)).toHaveLength(0);
    });

    it('renders the proper number of PostItems for the number of posts passed in',
    () => {
      const postItem = wrapper.find(PostItem);
      expect(postItem).toHaveLength(Object.keys(props.posts).length);
    });

    it('renders the PostItem with the proper props', () => {
      const postItem = wrapper.find(PostItem).first();
      expect(postItem.prop('deletePost')).toBe(props.deletePost);
      expect(postItem.prop('insertPostIntoCreateBox')).toBe(props.insertPostIntoCreateBox);
      expect(postItem.prop('lovePost')).toBe(props.lovePost);
      expect(postItem.prop('profile')).toBe(props.profile);
      expect(postItem.prop('unlovePost')).toBe(props.unlovePost);
    });
  });

  describe('Test loadMorePosts method', () => {
    beforeEach(() => {
      wrapper = mount(<PostsList {...props} />);
    });

    it('sets statusMessage to property CAUGHT_UP_MESSAGE when next is null', () => {
      wrapper.instance().loadMorePosts();
      expect(wrapper.state('statusMessage')).toBe(wrapper.instance().CAUGHT_UP_MESSAGE);
    });

    it('sets statusMessage to property CAUGHT_UP_MESSAGE when next is null', () => {
      wrapper.setProps({ next: 'http://api-url?page_size=6&page=2' });
      wrapper.instance().loadMorePosts();
      expect(wrapper.prop('fetchPosts')).toHaveBeenCalled();
    });
  });

  describe('Render ContentPlaceholder', () => {
    beforeEach(() => {
      props = {
        ...props,
        pending: true,
        posts: [],
      };
      wrapper = mount(<PostsList {...props} />);
    });

    it('renders ContentPlaceholder with right props', () => {
      const contentPlaceholder = wrapper.find(ContentPlaceholder);
      expect(contentPlaceholder).toHaveLength(1);
      expect(contentPlaceholder.prop('number')).toBe(2);
      expect(contentPlaceholder.prop('addNotification')).toBe(props.addNotification);
    });

    it('does not render PostItem', () => {
      expect(wrapper.find(PostItem)).toHaveLength(0);
    });
  });

  describe('Renders emptyPostsMessage', () => {
    beforeEach(() => {
      props = {
        ...props,
        pending: false,
        posts: [],
      };
      wrapper = mount(<PostsList {...props} />);
    });

    it('renders ContentPlaceholder with right props', () => {
      const contentPlaceholder = wrapper.find('#empty-posts-list-message');
      expect(contentPlaceholder).toHaveLength(1);
    });

    it('does not render PostItem', () => {
      expect(wrapper.find(PostItem)).toHaveLength(0);
    });

    it('does not render ContentPlaceholder', () => {
      expect(wrapper.find(ContentPlaceholder)).toHaveLength(0);
    });
  });

  describe('Mock renderWayPoint and renderLoader', () => {
    let originalRenderLoader;
    let originalWayPoint;

    beforeEach(() => {
      originalRenderLoader = PostsList.prototype.renderLoader;
      originalWayPoint = PostsList.prototype.renderWayPoint;
      PostsList.prototype.renderLoader = jest.fn();
      PostsList.prototype.renderWayPoint = jest.fn();
    });

    afterEach(() => {
      PostsList.prototype.renderLoader = originalRenderLoader;
      PostsList.prototype.renderWayPoint = originalWayPoint;
    });

    it('calls renderWayPoint when form receives focus', () => {
      wrapper = mount(<PostsList {...props} />);
      expect(PostsList.prototype.renderLoader).toHaveBeenCalled();
      expect(PostsList.prototype.renderWayPoint).toHaveBeenCalled();
    });
  });
});
