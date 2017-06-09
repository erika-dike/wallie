import React from 'react';
import { shallow } from 'enzyme';

import { DEFAULT_PROFILE_PIC } from '../../../../constants/';
import posts from '../../../../fixtures/posts.json';

import StreamItemHeaderTitle from './StreamItemHeaderTitle';


describe('StreamItemHeaderTitle component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      post: posts[2],
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<StreamItemHeaderTitle {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 1 prop', () => {
      expect(Object.keys(wrapper.instance().props)).toHaveLength(1);
    });

    it('initializes popoverPlacement state with bottom', () => {
      expect(wrapper.state('popoverPlacement')).toBe('bottom');
    });

    it('renders profile_pic from props as source of image if available', () => {
      expect(wrapper.find('img').prop('src')).toBe(props.post.author.profile_pic);
    });

    it('renders default profile pic as src of image if profile pic is undefined',
    () => {
      const newAuthor = { ...props.post.author, profile_pic: undefined };
      const newPost = { ...props.post, author: newAuthor };
      wrapper.setProps({ post: newPost });
      expect(wrapper.find('img').prop('src')).toBe(DEFAULT_PROFILE_PIC);
    });

    it('renders default profile pic as src of image if profile pic is null',
    () => {
      const newAuthor = { ...props.post.author, profile_pic: null };
      const newPost = { ...props.post, author: newAuthor };
      wrapper.setProps({ post: newPost });
      expect(wrapper.find('img').prop('src')).toBe(DEFAULT_PROFILE_PIC);
    });
  });

  describe('Mock handleHover and renderProfileCard', () => {
    let originalHandleHover;
    let originalRenderProfileCard;

    beforeEach(() => {
      originalHandleHover = StreamItemHeaderTitle.prototype.handleHover;
      StreamItemHeaderTitle.prototype.handleHover = jest.fn(() => 'handleHover');
      originalRenderProfileCard = StreamItemHeaderTitle.prototype.renderProfileCard;
      StreamItemHeaderTitle.prototype.renderProfileCard = jest.fn(() => 'renderProfileCard');
      wrapper = shallow(<StreamItemHeaderTitle {...props} />);
    });

    afterEach(() => {
      StreamItemHeaderTitle.prototype.handleHover = originalHandleHover;
      StreamItemHeaderTitle.prototype.renderProfileCard = originalRenderProfileCard;
    });

    it('calls handleHover when fullname-group is moused over', () => {
      const fullnameGroup = wrapper.find('.fullname-group');
      fullnameGroup.simulate('mouseover');
      expect(StreamItemHeaderTitle.prototype.handleHover).toHaveBeenCalled();
    });

    it('calls renderProfileCard when fullname-group is moused over', () => {
      wrapper = shallow(<StreamItemHeaderTitle {...props} />);
      const fullnameGroup = wrapper.find('.fullname-group');
      fullnameGroup.simulate('mouseover');
      expect(StreamItemHeaderTitle.prototype.renderProfileCard).toHaveBeenCalled();
    });
  });

  describe('Mock adaptProfileForProfileCard', () => {
    let originalAdaptProfileForProfileCard;
    let originalHandleHover;

    beforeEach(() => {
      const { author } = props.post;
      const profile = {
        user: {
          username: author.username,
          first_name: author.first_name,
          last_name: author.last_name,
          num_posts: author.num_posts,
        },
        about: author.about,
        profile_pic: author.profile_pic,
      };
      originalAdaptProfileForProfileCard = (
        StreamItemHeaderTitle.prototype.adaptProfileForProfileCard);
      StreamItemHeaderTitle.prototype.adaptProfileForProfileCard = jest.fn(() => profile);
      originalHandleHover = StreamItemHeaderTitle.prototype.handleHover;
      StreamItemHeaderTitle.prototype.handleHover = jest.fn(() =>
        'originalHandleHover',
      );
      wrapper = shallow(<StreamItemHeaderTitle {...props} />);
    });

    afterEach(() => {
      StreamItemHeaderTitle.prototype.adaptProfileForProfileCard = (
        originalAdaptProfileForProfileCard);
      StreamItemHeaderTitle.prototype.handleHover = originalHandleHover;
    });

    it('calls adaptProfileForProfileCard when fullname-group is moused over', () => {
      const fullnameGroup = wrapper.find('.fullname-group');
      fullnameGroup.simulate('mouseover');
      expect(StreamItemHeaderTitle.prototype.adaptProfileForProfileCard).toHaveBeenCalled();
    });
  });

  describe('Test handleHover', () => {
    let fullnameGroup;

    /**
      I don't know why but window.innerHeight has to be defined both in
      setupTests.js and here to work.
    **/
    beforeAll(() => {
      global.window.innerHeight = 1000;
    });

    beforeEach(() => {
      wrapper = shallow(<StreamItemHeaderTitle {...props} />);
      fullnameGroup = wrapper.find('.fullname-group');
    });

    it('sets popoverPlacement to top when offset.top is greater than 0.7 times windows innerHeight',
    () => {
      fullnameGroup.simulate('mouseover', {
        currentTarget: { getBoundingClientRect: () => ({ top: 900 }) },
      });
      expect(wrapper.state('popoverPlacement')).toBe('top');
    });

    it('popoverPlacement remains at bottom when offset.top is lower than 0.7 times windows innerHeight',
    () => {
      fullnameGroup.simulate('mouseover', {
        currentTarget: { getBoundingClientRect: () => ({ top: 699 }) },
      });
      expect(wrapper.state('popoverPlacement')).toBe('bottom');
    });

    it('popoverPlacement switches to bottom when offset.top is lower than 0.7 times windows innerHeight',
    () => {
      fullnameGroup.simulate('mouseover', {
        currentTarget: { getBoundingClientRect: () => ({ top: 900 }) },
      });
      expect(wrapper.state('popoverPlacement')).toBe('top');

      fullnameGroup.simulate('mouseover', {
        currentTarget: { getBoundingClientRect: () => ({ top: 20 }) },
      });
      expect(wrapper.state('popoverPlacement')).toBe('bottom');
    });
  });
});
