import React from 'react';
import { mount } from 'enzyme';
import { Modal } from 'react-bootstrap';

import MessageModal from './components/MessageModal/MessageModal';

import TopPosts from './TopPosts';


describe('TopPosts component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      posts: [
        {
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
        {
          id: 8,
          date_created: '2017-04-10T01:28:07.751578Z',
          content: 'Test',
          author: {
            username: 'admin`',
            first_name: 'Admin',
            last_name: 'Django',
            about: 'engineer @ TSL',
            profile_pic: 'https://admin-dp.png',
            num_posts: 19,
          },
          num_loves: 1,
          in_love: false,
        },
      ],
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
    let postLink = wrapper.find('a').at(1);
    postLink.simulate('click', { target: { dataset: { id: props.posts[1].id } } });
    expect(wrapper.state('selectedPost')).toEqual(props.posts[1]);

    postLink = wrapper.find('a').first();
    postLink.simulate('click', { target: { dataset: { id: props.posts[0].id } } });
    expect(wrapper.state('selectedPost')).toEqual(props.posts[0]);
  });

  it('changes showMessageModal state when post is selected', () => {
    const postLink = wrapper.find('a').at(1);
    postLink.simulate('click', { target: { dataset: { id: props.posts[1].id } } });
    expect(wrapper.state('showMessageModal')).toBeTruthy();
  });

  it('renders MessageModal with the expected props', () => {
    const postLink = wrapper.find('a').at(1);
    postLink.simulate('click', { target: { dataset: { id: props.posts[1].id } } });
    const messageModal = wrapper.find(MessageModal);
    expect(messageModal.prop('post')).toEqual(props.posts[1]);
    expect(messageModal.prop('close')).toBeDefined();
    expect(messageModal.prop('showModal')).toEqual(wrapper.state('showMessageModal'));
  });

  it('renders renders bootstrap modal when showMessageModal is true', () => {
    expect(wrapper.find(Modal).prop('show')).toBeFalsy();
    const postLink = wrapper.find('a').at(1);
    postLink.simulate('click', { target: { dataset: { id: props.posts[1].id } } });
    expect(wrapper.find(Modal).prop('show')).toBeTruthy();
  });
});
