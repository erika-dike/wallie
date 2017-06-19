import React from 'react';
import { mount } from 'enzyme';

import profile from '../../../../fixtures/profile.json';

import PostsCreate from './PostsCreate';

jest.mock('../../../../utils/', () => ({
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => reject('Upload failed')),
}));

const FAILURE_MESSAGE = 'Upload failed';

describe('PostItem component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addNotification: jest.fn(() => 'addNotification'),
      createPost: jest.fn(() => 'createPost'),
      editPost: jest.fn(() => 'editPost'),
      fetched: false,
      pending: false,
      postToEdit: null,
      profile,
      removePostFromCreateBox: jest.fn(() => 'removePostFromCreateBox'),
    };
    wrapper = mount(<PostsCreate {...props} />);
    wrapper.setState({ isActive: true });
  });

  it('calls addNotification with title and error set correctly', async () => {
    const cameraUploadBtn = wrapper.find('#camera-upload-btn');
    expect(cameraUploadBtn).toHaveLength(1);
    try {
      await cameraUploadBtn.simulate('click');
    } catch (e) {
      expect(props.addNotification).toHaveBeenCalledWith(
        'Upload Image Error!',
        FAILURE_MESSAGE,
      );
    }
  });
});
