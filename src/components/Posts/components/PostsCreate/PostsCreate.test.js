import React from 'react';
import { mount } from 'enzyme';
import {
  FormControl,
  FormGroup,
  OverlayTrigger,
} from 'react-bootstrap';

import { shakeButton } from '../../../../utils/';

import PostsCreate from './PostsCreate';

jest.mock('../../../../utils/', () => ({
  openCloudinaryUploadWidget: () =>
    new Promise((resolve, reject) => resolve('http://new-image.jpg')),

  shakeButton: jest.fn(() => 'shakeButton'),
}));

const IMAGE_URL = 'http://new-image.jpg';

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
      profile: {
        user: {
          username: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john_doe@wallie.com',
          num_posts: 10,
        },
        about: 'engineer @ wallie',
        profile_pic: 'http://no_pictur.jpg',
      },
      removePostFromCreateBox: jest.fn(() => 'removePostFromCreateBox'),
    };
  });

  describe('Base Test', () => {
    beforeEach(() => {
      wrapper = mount(<PostsCreate {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 8 props', () => {
      expect(Object.keys(wrapper.props())).toHaveLength(8);
    });

    it('initializes component state correctly', () => {
      expect(wrapper.state('isActive')).toBe(false);
      expect(wrapper.state('numRows')).toBe(3);
      expect(wrapper.state('post')).toBeDefined();
      expect(wrapper.state('post').id).toBe(null);
      expect(wrapper.state('post').content).toBe('');
    });

    it('defines component property with value 3', () => {
      expect(wrapper.node.MIN_ROWS);
    });

    it('renders inactive form input by default', () => {
      expect(wrapper.find(FormGroup)).toHaveLength(1);
      expect(wrapper.find(FormGroup).prop('controlId')).toBe('inActiveFormInput');
    });

    it('does not render postCreateBoxToolbar when isActive is false', () => {
      expect(wrapper.find('.post-create-box-toolbar')).toHaveLength(0);
    });

    it('passes default message to FormControl', () => {
      const formControl = wrapper.find(FormControl);
      expect(formControl.prop('readOnly')).toBeTruthy();
      expect(formControl.prop('value')).toBe(wrapper.node.defaultMessage);
    });

    it('sets isActive state to true when inactiveFormInput receives focus',
    () => {
      const inActiveFormInput = wrapper.find(FormGroup);
      inActiveFormInput.simulate('focus');
      expect(wrapper.state('isActive')).toBe(true);
    });

    it('does not render active form input by default', () => {
      expect(wrapper.find({ controlId: 'activeFormInput' })).toBeDefined();
    });
  });

  /**
  Testing that a DOM event happens within another element is a bit tricky with the
  JSDOM and so that DOM element contains function is mocked
  **/
  describe('Test handleRenderingFormInputInactive updates state under the right conditions', () => {
    let event;

    beforeEach(() => {
      document.getElementsByClassName = () => [{
        contains: () => false,
      }];
      event = { target: 'something' };
      wrapper = mount(<PostsCreate {...props} />);
    });

    it('updates states isActive to false and numRows to true when you click outside the form element',
    () => {
      wrapper.setState({ isActive: true });
      wrapper.instance().handleRenderingFormInputInactive(event);
      expect(wrapper.state('isActive')).toBe(false);
      expect(wrapper.state('numRows')).toBe(wrapper.instance().MIN_ROWS);
    });

    it('does not update state when form contains content', () => {
      const post = { ...wrapper.state.post, content: 'Some random thought' };
      wrapper.setState({ isActive: true, post });

      wrapper.instance().handleRenderingFormInputInactive(event);
      expect(wrapper.state('isActive')).toBe(true);
    });

    it('resets state numRows', () => {
      wrapper.setState({ isActive: true, numRows: 20 });
      expect(wrapper.state('numRows')).toBe(20);
      wrapper.instance().handleRenderingFormInputInactive(event);
      expect(wrapper.state('isActive')).toBe(false);
      expect(wrapper.state('numRows')).toBe(wrapper.instance().MIN_ROWS);
    });

    it('does not update state when user clicks within the form element', () => {
      wrapper.setState({ isActive: true, numRows: 20 });
      document.getElementsByClassName = () => [{
        contains: () => true,
      }];

      wrapper.instance().handleRenderingFormInputInactive(event);
      expect(wrapper.state('isActive')).toBe(true);
      expect(wrapper.state('numRows')).toBe(20);
    });
  });

  describe('isActive set to true Test Cases', () => {
    let activeFormInput;

    beforeEach(() => {
      wrapper = mount(<PostsCreate {...props} />);
      wrapper.setState({ isActive: true });
      activeFormInput = wrapper.find('#activeFormInput');
    });

    it('renders activeFormInput when state isActive is true', () => {
      expect(activeFormInput).toHaveLength(1);
    });

    it('passes default message to FormControl', () => {
      const formControl = wrapper.find(FormControl);
      expect(formControl.prop('componentClass')).toBe('textarea');
      expect(formControl.prop('placeholder')).toBe(wrapper.instance().defaultMessage);
      expect(formControl.prop('rows')).toBe(wrapper.state('numRows'));
      expect(formControl.prop('value')).toBe(wrapper.state('post').content);
      expect(formControl.prop('autoFocus')).toBe(true);
      expect(formControl.prop('onChange')).toBe(wrapper.instance().handleChange);
    });

    it('updates state with content entered into form', () => {
      const content = 'I want to say';
      activeFormInput.simulate('change', { target: { value: content } });
      expect(wrapper.state('post').content).toContain(content);
    });

    it('updates state numRows and activeFormInput rows props', () => {
      // should only happen when element's clientHeight is less than its scrollHeight
      const content = 'I want to say';
      activeFormInput.simulate('change', { target:
      {
        value: content,
        scrollHeight: 20,
        clientHeight: 10,
      } });
      expect(wrapper.state('numRows')).toBeGreaterThan(wrapper.instance().MIN_ROWS);
      expect(activeFormInput.prop('rows')).toBeGreaterThan(wrapper.instance().MIN_ROWS);
    });

    it('does not update numRows and activeFormInput rows props', () => {
      // should only happen when element's clientHeight is greater than its scrollHeight
      const content = 'I want to say';
      activeFormInput.simulate('change', { target:
      {
        value: content,
        scrollHeight: 10,
        clientHeight: 40,
      } });
      expect(wrapper.state('numRows')).toEqual(wrapper.instance().MIN_ROWS);
      expect(activeFormInput.prop('rows')).toEqual(wrapper.instance().MIN_ROWS);
    });

    it('renders postsCreateBoxToolbar', () => {
      const postsCreateBoxToolbar = wrapper.find('.post-create-box-toolbar');
      expect(postsCreateBoxToolbar).toHaveLength(1);
    });

    it('renders OverlayTrigger with the right props', () => {
      const overlayTrigger = wrapper.find(OverlayTrigger);
      expect(overlayTrigger).toHaveLength(1);
      expect(overlayTrigger.prop('placement')).toBe('top');
      expect(overlayTrigger.prop('overlay')).toBeDefined();
    });

    it('sets content of post in state to url gotten from cloudinary', async () => {
      const cameraUploadBtn = wrapper.find('#camera-upload-btn');
      expect(cameraUploadBtn).toHaveLength(1);
      await cameraUploadBtn.simulate('click');
      expect(wrapper.state('post').content).toContain(IMAGE_URL);
    });

    it('appends form content with image url gotten from cloudinary', async () => {
      const content = 'Is this the photo you want?';
      const post = { ...props.post, content };
      wrapper.setState({ post });

      const cameraUploadBtn = wrapper.find('#camera-upload-btn');
      expect(cameraUploadBtn).toHaveLength(1);
      await cameraUploadBtn.simulate('click');

      expect(wrapper.state('post').content).toContain(IMAGE_URL);
      expect(wrapper.state('post').content).toContain(content);
    });
  });

  describe('Submit tests', () => {
    let submitButton;

    beforeEach(() => {
      wrapper = mount(<PostsCreate {...props} />);
      const post = { ...props.post, content: 'A post about something' };
      wrapper.setState({ isActive: true, post });
      submitButton = wrapper.find('#post-button');
    });

    it('renders submit text as `Post`', () => {
      expect(submitButton.text()).toBe('Post')
    });

    it('calls createPost with content', () => {
      submitButton.simulate('click');
      expect(props.createPost).toHaveBeenCalledWith(wrapper.state('post').content);
    });

    it('does not submit post when content is empty', () => {
      wrapper.setState({ post: { ...wrapper.state().post, content: '' } });
      submitButton.simulate('click');
      expect(shakeButton).toHaveBeenCalled();
    });

    it('calls editPost when content post in state has an id', () => {
      wrapper.setState({ post: { ...wrapper.state().post, id: 1 } });
      submitButton.simulate('click');
      expect(props.editPost).toHaveBeenCalled();
    });

    it('resets post and isActive states after submit', () => {
      wrapper.setProps({ pending: true });
      wrapper.setProps({ fetched: true });
      expect(wrapper.state('post').id).toBeNull();
      expect(wrapper.state('post').content).toBe('');
      expect(wrapper.state('isActive')).toBe(false);
    });
  });

  describe('Posts To Edit Tests', () => {
    beforeEach(() => {
      wrapper = mount(<PostsCreate {...props} />);
      props = {
        ...props,
        postToEdit: {
          id: 2,
          content: 'I want to edit this post',
        },
      };
      wrapper.setProps(props);
    });

    it('updates state with with content and id of posts passed in', () => {
      expect(wrapper.state('isActive')).toBe(true);
      expect(wrapper.state('post').id).toBe(props.postToEdit.id);
      expect(wrapper.state('post').content).toBe(props.postToEdit.content);
    });

    it('calls removePostFromCreateBox when form is submitted', () => {
      wrapper.setProps({ pending: true });
      wrapper.setProps({ fetched: true });
      expect(props.removePostFromCreateBox).toHaveBeenCalled();
    });

    it('renders submit text as `Edit`', () => {
      const submitButton = wrapper.find('#post-button');
      expect(submitButton.text()).toBe('Edit');
    });
  });

  describe('Mock createImagePost', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostsCreate.prototype.createImagePost;
      PostsCreate.prototype.createImagePost = jest.fn();
    });

    afterEach(() => {
      PostsCreate.prototype.createImagePost = originalFunction;
    });

    it('calls createImagePost when form receives focus', () => {
      wrapper = mount(<PostsCreate {...props} />);
      wrapper.setState({ isActive: true });
      const cameraUploadBtn = wrapper.find('#camera-upload-btn');
      expect(cameraUploadBtn).toHaveLength(1);
      cameraUploadBtn.simulate('click');
      expect(PostsCreate.prototype.createImagePost).toHaveBeenCalled();
    });
  });

  describe('Mock handleFocusOnInactiveFormInput', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostsCreate.prototype.handleFocusOnInactiveFormInput;
      PostsCreate.prototype.handleFocusOnInactiveFormInput = jest.fn();
    });

    afterEach(() => {
      PostsCreate.prototype.handleFocusOnInactiveFormInput = originalFunction;
    });

    it('calls handleFocusOnInactiveFormInput when form receives focus', () => {
      wrapper = mount(<PostsCreate {...props} />);
      const inActiveFormInput = wrapper.find(FormGroup);
      expect(inActiveFormInput.prop('controlId')).toBe('inActiveFormInput');
      inActiveFormInput.simulate('focus');
      expect(PostsCreate.prototype.handleFocusOnInactiveFormInput).toHaveBeenCalled();
    });
  });
});
