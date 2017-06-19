import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';

import { PostItem } from '../../../../components';
import posts from '../../../../fixtures/topPosts.json';


import MessageModal from './MessageModal';


describe('ProfileUserFields Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      close: jest.fn(() => 'close'),
      post: posts[0],
      showModal: false,
    };
  });

  describe('base test', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<MessageModal {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    test('props passed in is equal to props possessed', () => {
      expect(Object.keys(wrapper.instance().props)).toEqual(Object.keys(props));
    });

    test('modal is hidden when showModal props is false', () => {
      expect(wrapper.find(Modal).prop('show')).toBeFalsy();
    });

    test('modal is open when showModal props is true', () => {
      wrapper.setProps({ showModal: true });
      expect(wrapper.find(Modal).prop('show')).toBeTruthy();
    });

    it('passes the right props to PostItem', () => {
      const postItem = wrapper.find(PostItem);
      expect(postItem).toHaveLength(1);
      expect(postItem.prop('post')).toEqual(wrapper.instance().props.post);
    });
  });
});
