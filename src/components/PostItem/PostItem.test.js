import React from 'react';
import { shallow } from 'enzyme';
import { Button, OverlayTrigger } from 'react-bootstrap';

import { PostContent } from '../../components';

import { getFullTime } from '../../utils';

import PostItem from './PostItem';

import {
  PostItemMenu,
  StreamItemHeaderTitle,
  StreamItemHeaderTimeDisplay,
} from './components';


jest.useFakeTimers();


describe('PostItem component test suite', () => {
  let loveButtonClickEventProps;
  let props;
  let updateElement;
  let wrapper;

  beforeEach(() => {
    props = {
      deletePost: jest.fn(() => 'deletePost'),
      insertPostIntoCreateBox: jest.fn(() => 'insertPostIntoCreateBox'),
      lovePost: jest.fn(() => 'lovePost'),
      mode: 'modal',
      post: {
        id: 9,
        date_created: '2017-05-10T11:41:08.735591Z',
        content: 'My first post ever. Hii haa',
        author: {
          username: 'test_user',
          first_name: 'test',
          last_name: 'testing',
          about: 'robo soldier',
          profile_pic: 'https://robo-dp.png',
          num_posts: 19,
        },
        num_loves: 1,
        in_love: false,
      },
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
      unlovePost: jest.fn(() => 'unlovePost'),
    };
    updateElement = {
      classList: {
        add: jest.fn(className => `added ${className}`),
        remove: jest.fn(className => `removed ${className}`),
      },
    };
    loveButtonClickEventProps = {
      currentTarget: {
        getElementsByClassName: () => [({
          getElementsByClassName: () => [updateElement],
        })],
      },
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<PostItem {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 7 props', () => {
      expect(Object.keys(wrapper.instance().props)).toHaveLength(7);
    });

    it('supplies mode with default value', () => {
      wrapper.setProps({ mode: undefined });
      expect(wrapper.instance().props.mode).toBeDefined();
      expect(wrapper.instance().props.mode).toBe('post-list');
    });

    test('authenticated user can love post', () => {
      const loveButton = wrapper.find(Button);
      loveButton.simulate('click', loveButtonClickEventProps);
      expect(props.lovePost).toHaveBeenCalledWith(props.post.id);
    });

    it('adds class heart-animation when user clicks love button', () => {
      const loveButton = wrapper.find(Button);
      loveButton.simulate('click', loveButtonClickEventProps);
      expect(updateElement.classList.add).toHaveBeenCalledWith('heart-animation');
    });

    it('removes heart-animation class after timer runs out', () => {
      const loveButton = wrapper.find(Button);
      loveButton.simulate('click', loveButtonClickEventProps);
      jest.runAllTimers();
      expect(updateElement.classList.remove).toHaveBeenCalledWith('heart-animation');
    });

    test('authenticated user can unlove post', () => {
      const newPost = { ...props.post, in_love: true };
      const newProps = { ...props, post: newPost };
      wrapper.setProps(newProps);
      const loveButton = wrapper.find(Button);
      loveButton.simulate('click', loveButtonClickEventProps);
      expect(props.unlovePost).toHaveBeenCalledWith(props.post.id);
    });

    test('unauthenticated user (i.e. when no user profile) can not love post', () => {
      wrapper.setProps({ profile: null });
      const loveButton = wrapper.find(Button);
      loveButton.simulate('click', loveButtonClickEventProps);
      expect(props.lovePost).not.toHaveBeenCalledWith(props.post.id);
    });

    it('renders love as text of tooltip when user not in love with post', () => {
      const tooltipOverlay = wrapper.find(OverlayTrigger);
      expect(tooltipOverlay.props().overlay.props.children.toLowerCase()).toContain('love');
    });

    it('renders unlove as text of tooltip when user already in love with post', () => {
      const newPost = { ...props.post, in_love: true };
      wrapper.setProps({ post: newPost });
      const tooltipOverlay = wrapper.find(OverlayTrigger);
      expect(tooltipOverlay.props().overlay.props.children.toLowerCase()).toContain('undo love');
    });

    it('does not render PostItemMenu when authenticated user is not owner of post', () => {
      expect(wrapper.find(PostItemMenu)).toHaveLength(0);
    });

    it('does not render PostItemMenu user is unauthenticated',
    () => {
      wrapper.setProps({ profile: null });
      expect(wrapper.find(PostItemMenu)).toHaveLength(0);
    });

    it('renders PostItemMenu when authenticated user is owner of post', () => {
      const updatedPost = {
        ...props.post,
        author: {
          ...props.post.author,
          username: props.profile.user.username,
          first_name: props.profile.user.first_name,
          last_name: props.profile.user.last_name,
        },
      };
      wrapper.setProps({ post: updatedPost });
      expect(wrapper.find(PostItemMenu)).toHaveLength(1);
    });

    it('renders PostItemMenu with the right props', () => {
      const updatedPost = {
        ...props.post,
        author: {
          ...props.post.author,
          username: props.profile.user.username,
          first_name: props.profile.user.first_name,
          last_name: props.profile.user.last_name,
        },
      };
      wrapper.setProps({ post: updatedPost });
      const postItem = wrapper.find(PostItemMenu);
      expect(postItem.prop('deletePost')).toBe(wrapper.instance().props.deletePost);
      expect(postItem.prop('insertPostIntoCreateBox')).toBe(
        wrapper.instance().props.insertPostIntoCreateBox);
      expect(postItem.prop('post')).toBe(wrapper.instance().props.post);
    });

    it('renders StreamItemHeaderTitle with right props', () => {
      const streamItemHeaderTitle = wrapper.find(StreamItemHeaderTitle);
      expect(streamItemHeaderTitle).toHaveLength(1);
      expect(streamItemHeaderTitle.prop('post')).toBe(wrapper.instance().props.post);
    });

    it('renders StreamItemHeaderTimeDisplay with right props', () => {
      const streamItemHeaderTimeDisplay = wrapper.find(StreamItemHeaderTimeDisplay);
      expect(streamItemHeaderTimeDisplay).toHaveLength(1);
      expect(streamItemHeaderTimeDisplay.prop('date_created')).toBe(
        wrapper.instance().props.post.date_created);
    });

    it('renders PostContent with right props', () => {
      const postContent = wrapper.find(PostContent);
      expect(postContent).toHaveLength(1);
      expect(postContent.prop('content')).toBe(wrapper.instance().props.post.content);
    });

    it('does not renders full time when mode not modal (i.e. post-list)', () => {
      wrapper.setProps({ mode: undefined });
      expect(wrapper.find('.full-time')).toHaveLength(0);
    });

    it('renders full time when in modal mode', () => {
      const fullTimeContainer = wrapper.find('.full-time');
      expect(fullTimeContainer).toHaveLength(1);
      expect(fullTimeContainer.find('span').prop('children')).toEqual(
        getFullTime(props.post.date_created));
    });

    it('does not render love icon container with class post-in-love when not in love',
    () => {
      expect(wrapper.find(Button).hasClass('post-in-love')).toBeFalsy();
    });

    it('renders love icon container with class post-in-love when in love', () => {
      const newPost = { ...props.post, in_love: true };
      wrapper.setProps({ post: newPost });
      expect(wrapper.find(Button).hasClass('post-in-love')).toBeTruthy();
    });
  });
});
