import React from 'react';
import { shallow } from 'enzyme';
import { Alert, ListGroupItem } from 'react-bootstrap';

import MessageAlert from './MessageAlert';

describe('MessageAlert', () => {
  it('renders without crashing', () => {
    const props = {
      email: '',
      errors: [],
      registered: false,
    };
    const wrapper = shallow(<MessageAlert {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('renders successful alert with right props', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = {
        email: 'message@alert.com',
        errors: [],
        registered: true,
      };
      wrapper = shallow(<MessageAlert {...props} />);
    });

    it('renders alert with right style', () => {
      const elem = wrapper.find(Alert);
      expect(elem).toBeTruthy();
      expect(elem.props().bsStyle).toEqual('success');
    });

    it('renders proper success title', () => {
      const elem = wrapper.find('strong');
      expect(elem.text().toLowerCase()).toContain('sign up success');
    });

    test('alert body contains supplied email address', () => {
      const elem = wrapper.find(Alert);
      expect(elem.html().toLowerCase()).toContain(props.email);
    });
  });

  describe('renders error alerts with right props', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = {
        email: 'message@alert.com',
        errors: ['username already exists', 'password required'],
        registered: false,
      };
      wrapper = shallow(<MessageAlert {...props} />);
    });

    it('renders proper error tilte', () => {
      const elem = wrapper.find('strong');
      expect(elem.text().toLowerCase()).toContain('sign up error');
    });

    it('renders alert with right style', () => {
      const elem = wrapper.find(Alert);
      expect(elem.props().bsStyle).toEqual('danger');
    });

    it('renders list group item with right style', () => {
      const elements = wrapper.find(ListGroupItem);
      expect(elements).toHaveLength(2);
      expect(elements.first().props().bsStyle).toEqual('danger');
    });

    it('renders passed in errors', () => {
      const content = wrapper.find(ListGroupItem);
      expect(content.at(0).children()).toContain(props.errors[0]);
      expect(content.at(1).children()).toContain(props.errors[1]);
    });
  });
});
