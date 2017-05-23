import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { AuthenticatedMenu, UnAuthenticatedMenu } from './components';

// css
import './Nav.css';

class CustomNav extends React.Component {
  static handleSelectNavItem(event) {
    const nav = document.getElementsByTagName('nav')[0];
    const oldSelected = nav.getElementsByClassName('selected')[0];
    if (oldSelected) {
      oldSelected.classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
  }

  render() {
    return (
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink
              exact
              to="/"
              activeClassName="selected"
              onClick={CustomNav.handleSelectNavItem}
            >
              Wallie
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            this.props.isAuthenticated
            ?
              <AuthenticatedMenu
                logout={this.props.logout}
                profile={this.props.profile}
              />
            :
              <UnAuthenticatedMenu
                handleSelectNavItem={CustomNav.handleSelectNavItem}
              />
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

CustomNav.defaultProps = {
  profile: null,
};

CustomNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      num_posts: PropTypes.number,
    }),
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }),
};

export default CustomNav;
