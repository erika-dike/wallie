import React from 'react';
import { mount } from 'enzyme';
import { MenuItem, Modal } from 'react-bootstrap';

import posts from '../../../../fixtures/posts.json';

import DeletePostModal from '../../components/DeletePostModal/DeletePostModal';

import PostItemMenu from './PostItemMenu';


describe('PostItemMenu component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      deletePost: jest.fn(() => 'deletePost'),
      insertPostIntoCreateBox: jest.fn(() => 'insertPostIntoCreateBox'),
      post: posts[2],
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = mount(<PostItemMenu {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 3 props', () => {
      expect(Object.keys(wrapper.props())).toHaveLength(3);
    });

    it('has state showDeleteModal set to false', () => {
      expect(wrapper.state('showDeleteModal')).toBeFalsy();
    });

    it('renders DeletePostModal with the right props', () => {
      const deletePostModal = wrapper.find(DeletePostModal);
      expect(deletePostModal.prop('close')).toBeDefined();
      expect(deletePostModal.prop('deletePost')).toBeDefined();
      expect(deletePostModal.prop('post')).toBeDefined();
      expect(deletePostModal.prop('showModal')).toBeDefined();
    });

    test('showDeleteModal state determines visibility of modal in showDeleteModal',
    () => {
      const modal = wrapper.find(Modal);
      expect(modal.prop('show')).toBeFalsy();
      wrapper.setState({ showDeleteModal: true });
      expect(modal.prop('show')).toBeTruthy();
    });

    it('calls insertPostIntoCreateBox with post when edit is clicked', () => {
      const editLink = wrapper.find(MenuItem).first().find('a');
      expect(editLink.text().toLowerCase()).toContain('edit');
      editLink.simulate('click');
      expect(props.insertPostIntoCreateBox).toHaveBeenCalledWith(props.post);
    });

    it('sets showDeleteModal to true when delete link is clicked', () => {
      const deleteLink = wrapper.find(MenuItem).at(1).find('a');
      expect(deleteLink.text().toLowerCase()).toContain('delete');
      deleteLink.simulate('click');
      expect(wrapper.state('showDeleteModal')).toBeTruthy();
    });
  });

  describe('Mock handleSelect', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostItemMenu.prototype.handleSelect;
      PostItemMenu.prototype.handleSelect = jest.fn();
    });

    afterEach(() => {
      PostItemMenu.prototype.handleSelect = originalFunction;
    });

    it('calls handleSelect when dropdown is clicked', () => {
      wrapper = mount(<PostItemMenu {...props} />);
      const editLink = wrapper.find(MenuItem).first().find('a');
      expect(editLink.text().toLowerCase()).toContain('edit');
      editLink.simulate('click');
      expect(PostItemMenu.prototype.handleSelect).toHaveBeenCalled();
    });
  });
});
