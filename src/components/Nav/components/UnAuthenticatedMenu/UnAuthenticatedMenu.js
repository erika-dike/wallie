import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import {
  LinkWithNavItem,
  LoginNavItem,
} from '../../components';


const UnAuthenticatedMenu = () =>
  <Nav pullRight>
    <LinkWithNavItem to="signup">
      <NavItem eventKey={1} href="/signup">Sign up</NavItem>
    </LinkWithNavItem>
    <LoginNavItem eventKey={2} href="/login" />
  </Nav>;

export default UnAuthenticatedMenu;
