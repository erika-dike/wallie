import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';

import { LinkWithNavItem } from '../../components';


const UnAuthenticatedMenu = ({ handleSelectNavItem }) =>
  <Nav pullRight>
    <LinkWithNavItem to="signup" handleSelectNavItem={handleSelectNavItem}>
      <NavItem eventKey={1} href="/signup">
        Sign up
      </NavItem>
    </LinkWithNavItem>
    <LinkWithNavItem to="login" handleSelectNavItem={handleSelectNavItem}>
      <NavItem eventKey={2} href="/login">
        Log in
      </NavItem>
    </LinkWithNavItem>
  </Nav>;

UnAuthenticatedMenu.propTypes = {
  handleSelectNavItem: PropTypes.func.isRequired,
};

export default UnAuthenticatedMenu;
