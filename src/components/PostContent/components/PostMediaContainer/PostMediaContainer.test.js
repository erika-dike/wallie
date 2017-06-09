import React from 'react';
import { mount } from 'enzyme';

import PostMediaContainer from './PostMediaContainer';


describe('PostMediaContainer component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = { url: 'https://fake-url.com' };
  });

  describe('base test', () => {
    beforeEach(() => {
      wrapper = mount(<PostMediaContainer {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has a state named actionText', () => {
      expect(wrapper.state('actionText')).toBeDefined();
      expect(wrapper.state('actionText')).toEqual(wrapper.node.SHOW_MORE_CONTENT_TEXT);
    });

    it('changes actionText when button is clicked', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      expect(wrapper.state('actionText')).toEqual(wrapper.node.SHOW_LESS_CONTENT_TEXT);

      button.simulate('click');
      expect(wrapper.state('actionText')).toEqual(wrapper.node.SHOW_MORE_CONTENT_TEXT);
    });

    it('defines embedContainerId', () => {
      expect(wrapper.node.embedContainerId).toBeDefined();
    });

    it('renders state as child of button', () => {
      expect(wrapper.find('button').text()).toContain(wrapper.state('actionText'));
    });
  });

  describe('mock toggleContentVisisbility', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostMediaContainer.prototype.toggleContentVisisbility;
      PostMediaContainer.prototype.toggleContentVisisbility = jest.fn();
      wrapper = mount(<PostMediaContainer {...props} />);
    });

    afterEach(() => {
      PostMediaContainer.prototype.toggleContentVisisbility = originalFunction;
    });

    test('toggleContentVisisbility is called when button is clicked', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      expect(PostMediaContainer.prototype.toggleContentVisisbility).toHaveBeenCalled();
    });
  });

  describe('mock addShowMoreButton', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostMediaContainer.prototype.addShowMoreButton;
      PostMediaContainer.prototype.addShowMoreButton = jest.fn();
      wrapper = mount(<PostMediaContainer {...props} />);
    });

    afterEach(() => {
      PostMediaContainer.prototype.addShowMoreButton = originalFunction;
    });

    test('addShowMoreButton is called when button is clicked', () => {
      expect(PostMediaContainer.prototype.addShowMoreButton).toHaveBeenCalled();
    });
  });

  describe('mock addShowMoreButton', () => {
    let originalFunction;

    beforeEach(() => {
      originalFunction = PostMediaContainer.prototype.getIframelyHtml;
      PostMediaContainer.prototype.getIframelyHtml = jest.fn();
      wrapper = mount(<PostMediaContainer {...props} />);
    });

    afterEach(() => {
      PostMediaContainer.prototype.getIframelyHtml = originalFunction;
    });

    test('getIframelyHtml is called when button is clicked', () => {
      expect(PostMediaContainer.prototype.getIframelyHtml).toHaveBeenCalled();
    });
  });
});
