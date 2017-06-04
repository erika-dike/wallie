import React from 'react';
import { shallow } from 'enzyme';
import { PostItem } from '../../../../components';

import DeletePostModal from './DeletePostModal';


describe('DeletePostModal component test suite', () => {
  let props;
  let wrapper;

  describe('Base test', () => {
    beforeEach(() => {
      props = {
        close: jest.fn(() => 'close'),
        deletePost: jest.fn(() => 'deletePost'),
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
