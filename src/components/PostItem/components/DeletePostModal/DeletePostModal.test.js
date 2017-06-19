import React from 'react';
import { shallow } from 'enzyme';

import { PostItem } from '../../../../components';
import posts from '../../../../fixtures/posts.json';

import DeletePostModal from './DeletePostModal';


describe('DeletePostModal component test suite', () => {
  let props;
  let wrapper;

  describe('Base test', () => {
    beforeEach(() => {
      props = {
        close: jest.fn(() => 'close'),
        deletePost: jest.fn(() => 'deletePost'),
        post: posts[2],
        showModal: false,
      };
      wrapper = shallow(<DeletePostModal {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 4 props', () => {
      expect(Object.keys(wrapper.instance().props)).toHaveLength(4);
    });

    it('renders PostItem with props: post and mode -> modal', () => {
      const postItem = wrapper.find(PostItem);
      expect(postItem.prop('post')).toEqual(props.post);
      expect(postItem.prop('mode')).toEqual('modal');
    });
  });
});
