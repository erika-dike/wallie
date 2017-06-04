import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { UserFields } from '../../components';

import ProfileUserFields from './ProfileUserFields';


describe('ProfileUserFields Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'john',
          last_name: 'doe',
          email: 'john_doe@wallie.com',
          num_posts: 12,
          date_created: '2017-05-03T11:12:12.348206Z',
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://fake-pic.jpg',
      },
    };
  });

  describe('base test', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<ProfileUserFields {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    test('props passed in is equal to props possessed', () => {
      expect(Object.keys(wrapper.instance().props)).toEqual(Object.keys(props));
    });

    it('passes the right props to UserFields', () => {
      const userFields = wrapper.find(UserFields);
      expect(userFields).toHaveLength(1);
      expect(userFields.prop('user')).toEqual(wrapper.instance().props.profile.user);
    });
  });

  describe('Snapshot testing', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<ProfileUserFields {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
