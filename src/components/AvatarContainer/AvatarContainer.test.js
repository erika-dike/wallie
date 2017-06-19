import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import renderer from 'react-test-renderer';

import { DEFAULT_PROFILE_PIC } from '../../constants/';

import AvatarContainer from './AvatarContainer';


describe('AvatarContainer Component Test Suite', () => {
  let props;

  beforeEach(() => {
    props = {
      img: 'http://fake-pics.jpg',
      uploadImage: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const tree = renderer.create(<AvatarContainer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses default image url if none is provided for user', () => {
    props.img = undefined;
    const wrapper = mount(<AvatarContainer {...props} />);
    expect(wrapper.prop('img')).toEqual(DEFAULT_PROFILE_PIC);
  });

  it('renders camera if no image is provided', () => {
    const wrapper = mount(<AvatarContainer {...props} />);
    expect(wrapper.find('.fa-camera').exists()).toBeFalsy();
    wrapper.setProps({ img: undefined });
    expect(wrapper.find('.fa-camera').exists()).toBeTruthy();
  });

  it('calls uploadImage function when MenuItem with eventKey 1 is clicked', () => {
    const wrapper = mount(<AvatarContainer {...props} />);
    const uploadImageLink = wrapper.find(MenuItem).at(0).find('a');
    uploadImageLink.simulate('click');
    expect(props.uploadImage).toHaveBeenCalled();
  });
});
