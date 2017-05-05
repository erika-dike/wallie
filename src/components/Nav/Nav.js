import React from 'react';
import {
  NavDropdown,
  MenuItem,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { LinkWithNavItem, LoginNavItem } from './components';

// css
import './Nav.css';

// There are different pull right menus for authenticated and unauthenticated
// views.
// Here I use the presence of a token in localStorage to detect
// if the user is authenticated
function renderUnauthenticatedMenu() {
  return (
    <Nav pullRight>
      <LinkWithNavItem to="signup">
        <NavItem eventKey={1} href="/signup">Sign up</NavItem>
      </LinkWithNavItem>
      <LoginNavItem eventKey={2} href="/login" />
    </Nav>
  );
}

function renderAuthenticatedMenu(profile) {
  const img = (
    <img
      className="Avatar Avatar--size32 Avatar--circle"
      src={profile.profile_pic}
      alt="Profile and settings"
    />
  );

  return (
    <Nav bsStyle="pills" pullRight>
      <NavDropdown eventKey={1} title={img} href="#" className="right-actions" id="profile-and-settings-dropdown">
        <MenuItem eventKey={1.1} className="account-summary">
          <div className="content">
            <div className="account-group">
              <b className="fullname">
                {`${profile.user.first_name} ${profile.user.last_name}`}
              </b>
              <small className="metadata">View Profile</small>
            </div>
          </div>
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.1}>Log out</MenuItem>
      </NavDropdown>
    </Nav>
  );
}

function getPullRightMenu() {
  if (localStorage.token) {
    const profile = JSON.parse(localStorage.profile);
    return renderAuthenticatedMenu(profile);
  }
  return renderUnauthenticatedMenu();
}


const CustomNav = () =>
  <Navbar collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink exact to="/" activeClassName="selected">Wallie</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {getPullRightMenu()}
    </Navbar.Collapse>
  </Navbar>;

export default CustomNav;
