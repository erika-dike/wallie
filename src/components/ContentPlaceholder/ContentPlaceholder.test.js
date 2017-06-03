import React from 'react';
import { mount } from 'enzyme';

import ContentPlaceholder from './ContentPlaceholder';


describe('ContentPlaceholder Component Test Suite', () => {
  it('renders correctly', () => {
    const wrapper = mount(<ContentPlaceholder />);
    expect(wrapper).toBeDefined();
  });

  it('assigns one to prop number if not provided', () => {
    const wrapper = mount(<ContentPlaceholder />);
    expect(wrapper.prop('number')).toEqual(1);
  });

  it('renders one timeline item when no prop is provided', () => {
    const wrapper = mount(<ContentPlaceholder />);
    expect(wrapper.find('.timeline-item')).toHaveLength(1);
  });

  it('renders the number of timeline items I specify via props', () => {
    const wrapper = mount(<ContentPlaceholder number={4} />);
    expect(wrapper.find('.timeline-item')).toHaveLength(4);
  });

  it('calls add notification after 8 seconds', () => {
    jest.useFakeTimers();
    const props = {
      number: 4,
      addNotification: jest.fn((title, message) => `${title}\n${message}`),
    };
    const wrapper = mount(<ContentPlaceholder {...props} />);
    expect(props.addNotification).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(props.addNotification).toHaveBeenCalled();
  });

  it('unmounts timer when component is unmounted', () => {
    jest.useFakeTimers();
    const props = {
      number: 4,
      addNotification: jest.fn((title, message) => `${title}\n${message}`),
    };
    const wrapper = mount(<ContentPlaceholder {...props} />);
    expect(clearTimeout.mock.calls).toHaveLength(0);
    wrapper.unmount();
    expect(clearTimeout.mock.calls).toHaveLength(1);
  });
});
