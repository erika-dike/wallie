import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

import LinkWithNavItem from './LinkWithNavItem';


describe('UnAuthenticatedMenu Component Test Suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      children: <NavItem eventKey={1}>Click me</NavItem>,
      to: '/my-location',
      handleSelectNavItem: jest.fn(() => 'handleSelectNavItem'),
      history: {
        push: jest.fn(() => 'changed location'),
      },
    };
    wrapper = mount(
      <MemoryRouter>
        <LinkWithNavItem {...props} />
      </MemoryRouter>,
    );
  });

  it('renders as a unit without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('creates new link element with `to` as href', () => {
    expect(wrapper.find('a').prop('href')).toEqual(props.to);
  });

  it('renders link as active if `to` props matches current path', () => {
    expect(wrapper.find(NavItem).hasClass('selected')).toBeFalsy();
    props.to = 'new-location';
    wrapper = mount(
      <MemoryRouter initialEntries={['/new-location']}>
        <LinkWithNavItem {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find(NavItem).hasClass('selected')).toBeTruthy();
  });

  test('handleSelectNavItem is called when link created is clicked', () => {
    props.to = 'new-location';
    wrapper.find('a').simulate('click');
    expect(props.handleSelectNavItem).toHaveBeenCalled();
  });
});
