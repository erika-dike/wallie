import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';

import {
  LinkWithNavItem,
  LoginNavItem,
} from '../../components';


const UnAuthenticatedMenu = ({ handleSelectNavItem }) =>
  <Nav pullRight>
    <LinkWithNavItem to="signup" handleSelectNavItem={handleSelectNavItem}>
      <NavItem eventKey={1} href="/signup">
        Sign up
      </NavItem>
    </LinkWithNavItem>
    <LoginNavItem
      eventKey={2}
      href="/login"
      handleSelectNavItem={handleSelectNavItem}
    />
  </Nav>;

UnAuthenticatedMenu.propTypes = {
  handleSelectNavItem: PropTypes.func.isRequired,
};

export default UnAuthenticatedMenu;
