import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';
import renderer from 'react-test-renderer';

import { PostItem } from '../../../../components';

import MessageModal from './MessageModal';


describe('ProfileUserFields Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      close: jest.fn(() => 'close'),
      post: {
        id: 9,
        date_created: '2017-05-10T11:41:08.735591Z',
        content: 'My first post ever. Hii haa',
        author: {
          username: 'test_user',
          first_name: 'test',
          last_name: 'testing',
          about: 'robo soldier',
          profile_pic: 'https://res.cloudinary.com/andela-troupon/image/upload/v1495184471/wall_app/wut4gfvg5ly7strddmna.png',
          num_posts: 19,
        },
        num_loves: 1,
        in_love: false,
      },
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
