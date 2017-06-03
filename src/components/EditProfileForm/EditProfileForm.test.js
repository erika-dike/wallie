import React from 'react';
import { shallow } from 'enzyme';

import EditProfileForm from './EditProfileForm';

describe('EditProfileForm component test suite', () => {
  let props;

  beforeEach(() => {
    props = {
      handleChangeInEditProfileForm: jest.fn(),
      profile: {
        user: {
          username: '',
          first_name: '',
          last_name: '',
          email: '',
          num_posts: '',
        },
        about: '',
        profile_pic: '',
      },
    };
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<EditProfileForm {...props} />);
    expect(wrapper).toBeDefined();
  });


  describe('Calls handleChangeInEditProfileForm on change', () => {
    let form;

    beforeEach(() => {
      form = shallow(<EditProfileForm {...props} />);
    });

    test('change in first_name field', () => {
      const input = form.find('[name="first_name"]');
      input.simulate('change', { target: { value: 'John' } });
      expect(props.handleChangeInEditProfileForm).toHaveBeenCalled();
    });

    test('change in last_name field', () => {
      const input = form.find('[name="last_name"]');
      input.simulate('change', { target: { value: 'Doe' } });
      expect(props.handleChangeInEditProfileForm).toHaveBeenCalled();
    });

    test('change in username field', () => {
      const input = form.find('[name="username"]');
      input.simulate('change', { target: { value: 'john_doe' } });
      expect(props.handleChangeInEditProfileForm).toHaveBeenCalled();
    });

    test('change in about field', () => {
      const input = form.find('[name="about"]');
      input.simulate('change', { target: { value: 'engineer at wallie' } });
      expect(props.handleChangeInEditProfileForm).toHaveBeenCalled();
    });
  });
});
