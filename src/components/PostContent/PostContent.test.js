import React from 'react';
import { mount, shallow } from 'enzyme';

import {
  PostMediaContainer,
  PostTextContainer,
} from './components';


import PostContent from './PostContent';


describe('PostContent component test suite', () => {
  let props;
  let wrapper;

  describe('Base test', () => {
    beforeEach(() => {
      props = {
        content: 'My first post again :)',
      };
      wrapper = shallow(<PostContent {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders PostTextContainer with right props', () => {
      expect(wrapper.find(PostTextContainer)).toHaveLength(1);
      expect(wrapper.find(PostTextContainer).prop('text')).toEqual(
        wrapper.instance().props.content);
    });

    it('does not render PostMediaContainer when no url', () => {
      expect(wrapper.find(PostMediaContainer)).toHaveLength(0);
    });
  });

  describe('Test content with url', () => {
    beforeEach(() => {
      props = {
        content: 'Check out this link http://www.fake-link.com',
      };
    });

    it('renders link found in text as HTML anchor links', () => {
      wrapper = mount(<PostContent {...props} />);
      const link = wrapper.find(PostTextContainer);
      expect(link.prop('text')).toContain('href="http://www.fake-link.com"');
    });

    it('renders PostMediaContainer', () => {
      wrapper = mount(<PostContent {...props} />);
      expect(wrapper.find(PostMediaContainer)).toHaveLength(1);
    });

    it('renders multiple links found in text as HTML achor links', () => {
      const secondLink = 'http://bitly.com';
      const thirdLink = 'http://www.wallie.com';
      props.content += `, ${secondLink}, ${thirdLink}`;
      wrapper = mount(<PostContent {...props} />);
      const link = wrapper.find(PostTextContainer);

      expect(link.prop('text')).toContain('href="http://www.fake-link.com"');
      expect(link.prop('text')).toContain(secondLink);
      expect(link.prop('text')).toContain(thirdLink);
    });

    it('renders 4 PostMedia components for 4 links', () => {
      props.content += ', http://bitly.com, http://www.wallie.com and www.google.com';
      wrapper = mount(<PostContent {...props} />);
      expect(wrapper.find(PostMediaContainer)).toHaveLength(4);
    });
  });
});
