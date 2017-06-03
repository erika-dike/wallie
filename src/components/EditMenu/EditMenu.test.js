import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';

import EditMenu from './EditMenu';


describe('ContentPlaceholder Component Test Suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(() => 'handleSubmit'),
      showEditView: false,
      toggleVisibility: jest.fn(() => 'toggleVisibility'),
    };
    wrapper = shallow(<EditMenu {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders one button when showEditView is false', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('calls toggleVisibility when Edit Profile button is clicked',
  () => {
    const editProfileButton = wrapper.find(Button).first();
    expect(editProfileButton.prop('children').toLowerCase()).toEqual('edit profile');
    editProfileButton.simulate('click');
    expect(props.toggleVisibility).toHaveBeenCalled();
  });

  it('renders two buttons when showEditView is true', () => {
    wrapper.setProps({ showEditView: true });
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('calls toggleVisibility when cancel button is clicked', () => {
    wrapper.setProps({ showEditView: true });
    const cancelButton = wrapper.find(Button).first();
    expect(cancelButton.prop('children').toLowerCase()).toEqual('cancel');
    cancelButton.simulate('click');
    expect(props.toggleVisibility).toHaveBeenCalled();
  });

  it('calls handleSubmit when save changes button is clicked', () => {
    wrapper.setProps({ showEditView: true });
    const cancelButton = wrapper.find(Button).at(1);
    expect(cancelButton.prop('children').toLowerCase()).toEqual('save changes');
    cancelButton.simulate('click');
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
