import React from 'react';
import {
  NavDropdown,
  MenuItem,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// css
import './Nav.css';


const img = (
  <img
    className="Avatar Avatar--size32 Avatar--circle"
    src="http://res.cloudinary.com/andela-troupon/image/upload/v1491232845/default_profile_normal_n8yvkf.png"
    alt="Profile and settings"
  />
);

const profileAndSettingsDropdown = (
  <Nav bsStyle="pills" pullRight>
    <NavDropdown eventKey={1} title={img} href="#" className="right-actions" id="profile-and-settings-dropdown">
      <MenuItem eventKey={1.1} className="account-summary">
        <div className="content">
          <div className="account-group">
            <b className="fullname">Erika Dike</b>
            <small className="metadata">View Profile</small>
          </div>
        </div>
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={1.1}>Log out</MenuItem>
    </NavDropdown>
  </Nav>
);

const signUpAndLoginMenus = (
  <Nav pullRight>
    <NavItem eventKey={1} href="#">
      <NavLink to="/signup" activeClassName="selected">Sign up</NavLink>
    </NavItem>
    <NavItem eventKey={2} href="#">Log in</NavItem>
  </Nav>
);

const isAuthenticated = false;

const CustomNav = () =>
  <Navbar collapseOnSelect fixedTop fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Wallie</NavLink>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      {isAuthenticated ? profileAndSettingsDropdown : signUpAndLoginMenus}
    </Navbar.Collapse>
  </Navbar>;

export default CustomNav;
