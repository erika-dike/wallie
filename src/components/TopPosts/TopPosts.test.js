import React from 'react';
import { mount } from 'enzyme';
import { Modal } from 'react-bootstrap';

import MessageModal from './components/MessageModal/MessageModal';
import posts from '../../fixtures/topPosts.json';


import TopPosts from './TopPosts';


describe('TopPosts component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      posts,
    };
    wrapper = mount(<TopPosts {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders with right props', () => {
    expect(wrapper.prop('posts')).toEqual(props.posts);
  });

  it('does not render list when there are no posts', () => {
    wrapper.setProps({ posts: [] });
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('renders a list for each post passed in', () => {
    expect(wrapper.find('li')).toHaveLength(2);
  });

  it('selects the right post when clicked', () => {
    let postLink = wrapper.find('a').at(1).find('span');
    postLink.simulate('click');
    expect(wrapper.state('selectedPost')).toEqual(props.posts[1]);

    postLink = wrapper.find('a').first().find('span');
    postLink.simulate('click');
    expect(wrapper.state('selectedPost')).toEqual(props.posts[0]);
  });

  it('changes showMessageModal state when post is selected', () => {
    const postLink = wrapper.find('a').at(1).find('span');
    postLink.simulate('click');
    expect(wrapper.state('showMessageModal')).toBeTruthy();
  });

  it('renders MessageModal with the expected props', () => {
    const postLink = wrapper.find('a').at(1).find('span');
    postLink.simulate('click');
    const messageModal = wrapper.find(MessageModal);
    expect(messageModal.prop('post')).toEqual(props.posts[1]);
    expect(messageModal.prop('close')).toBeDefined();
    expect(messageModal.prop('showModal')).toEqual(wrapper.state('showMessageModal'));
  });

  it('renders renders bootstrap modal when showMessageModal is true', () => {
    expect(wrapper.find(Modal).prop('show')).toBeFalsy();
    const postLink = wrapper.find('a').at(1).find('span');
    postLink.simulate('click');
    expect(wrapper.find(Modal).prop('show')).toBeTruthy();
  });
});
