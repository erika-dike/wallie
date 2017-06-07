import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';

import { PostsCreate, PostsList } from './components';

import Posts from './Posts';


describe('Posts component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addNotification: jest.fn(() => 'addNotification'),
      createPost: jest.fn(() => 'createPost'),
      deletePost: jest.fn(() => 'deletePost'),
      editPost: jest.fn(() => 'editPost'),
      fetched: false,
      fetchPosts: jest.fn(() => 'fetchPosts'),
      lovePost: jest.fn(() => 'lovePost'),
      next: null,
      pending: false,
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
            username: 'admin',
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
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john_doe@wallie.com',
          num_posts: 10,
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://no_picture.jpg',
      },
      unlovePost: jest.fn(() => 'unlovePost'),
    };
  });

  it('renders without crashing', () => {
    wrapper = mount(<Posts {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('defines next when it is not supplied', () => {
    delete props.next;
    wrapper = mount(<Posts {...props} />);
    expect(wrapper.prop('next')).toBeNull();
  });

  it('defines profile when it is not supplied', () => {
    delete props.profile;
    wrapper = mount(<Posts {...props} />);
    expect(wrapper.prop('profile')).toBeNull();
  });

  it('does not render PostsCreate when user is unauthenticated i.e. no profile', () => {
    delete props.profile;
    wrapper = mount(<Posts {...props} />);
    expect(wrapper.find(PostsCreate)).toHaveLength(0);
  });

  it('renders PostsCreate when user is authenticated i.e. has profile', () => {
    wrapper = mount(<Posts {...props} />);
    expect(wrapper.find(PostsCreate)).toHaveLength(1);
  });

  it('Integration tests', () => {
    wrapper = mount(<Posts {...props} />);
    expect(wrapper.find(PostsList)).toHaveLength(1);
  });

  describe('Base Test', () => {
    let newPost;
    let postsList;

    beforeEach(() => {
      newPost = {
        id: 10,
        date_created: '2017-05-10T01:28:07.751578Z',
        content: 'My post',
        author: {
          username: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
          about: 'engineer @ wallie',
          profile_pic: 'http://no_picture.jpg',
          num_posts: 10,
        },
        num_loves: 1,
        in_love: true,
      };
      wrapper = mount(<Posts {...props} />);
      postsList = wrapper.find(PostsList);
    });

    it('renders PostsList with the right props', () => {
      expect(postsList.prop('addNotification')).toBe(wrapper.prop('addNotification'));
      expect(postsList.prop('deletePost')).toBe(wrapper.prop('deletePost'));
      expect(postsList.prop('fetched')).toBe(wrapper.prop('fetched'));
      expect(postsList.prop('fetchPosts')).toBe(wrapper.prop('fetchPosts'));
      expect(postsList.prop('insertPostIntoCreateBox')).toBe(
        wrapper.instance().insertPostIntoCreateBox);
      expect(postsList.prop('lovePost')).toBe(wrapper.prop('lovePost'));
      expect(postsList.prop('next')).toBe(wrapper.prop('next'));
      expect(postsList.prop('pending')).toBe(wrapper.prop('pending'));
      expect(postsList.prop('posts')).toBe(wrapper.prop('posts'));
      expect(postsList.prop('profile')).toBe(wrapper.prop('profile'));
      expect(postsList.prop('unlovePost')).toBe(wrapper.prop('unlovePost'));
    });

    it('doesn not render post item menu when user does not own the posts', () => {
      expect(wrapper.find('#post-item-dropdown-menu')).toHaveLength(0);
    });

    it('inserts posts selected to be edited in PostsList component into postToEdit',
    () => {
      wrapper.setProps({ posts: [...props.posts, newPost] });
      const editPostLink = wrapper.find(MenuItem).first().find('a');
      expect(editPostLink.text().toLowerCase()).toContain('edit');
      editPostLink.simulate('click');
      expect(wrapper.state('postToEdit').id).toBeDefined();
      expect(wrapper.state('postToEdit').content).toBeDefined();
    });

    it('removes post from postToEdit in state', () => {
      const content = 'A new post';
      wrapper.setState({ postToEdit: { id: 1, content } });
      expect(wrapper.state('postToEdit')).not.toBeNull();
      expect(wrapper.find('textarea').prop('value')).toBe(content);

      wrapper.setProps({ pending: true });
      wrapper.setProps({ pending: false, fetched: true });
      expect(wrapper.state('postToEdit')).toBeNull();
    });
  });
});
