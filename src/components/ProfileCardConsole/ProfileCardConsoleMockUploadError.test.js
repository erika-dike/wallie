import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';

import { ProfileCardConsole } from './ProfileCardConsole';


jest.mock('../../utils/', () => ({
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => reject('Something is wrong with the network')),
}));


describe('Test upload image with openCloudinaryUploadWidget failure', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addNotification: jest.fn(() => 'addNotification'),
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'john',
          last_name: 'doe',
          email: 'john_doe@wallie.com',
          num_posts: 12,
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://fake-pic.jpg',
      },
      updateProfile: jest.fn(() => 'updateProfile'),
    };
    wrapper = mount(<ProfileCardConsole {...props} />);
  });

  it('calls addNotification on openCloudinaryUploadWidget failure',
  async () => {
    const uploadPhotoLink = wrapper.find(MenuItem).first().find('a');
    expect(uploadPhotoLink.prop('children').toLowerCase()).toContain('upload photo');
    try {
      uploadPhotoLink.simulate('click');
    } catch (e) {
      expect(props.addNotification).toHaveBeenCalled();
    }
  });
});
