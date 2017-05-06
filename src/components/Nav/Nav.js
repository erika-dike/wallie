import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthenticatedMenu, UnAuthenticatedMenu } from './components';

import { logoutUser } from '../../actions/';

// css
import './Nav.css';

class CustomNav extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink exact to="/" activeClassName="selected">Wallie</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            this.props.isAuthenticated
            ?
              <AuthenticatedMenu
                logout={this.logout}
                profile={this.props.profile}
              />
            :
              <UnAuthenticatedMenu />
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
  logoutUser: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
    }),
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.user.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
}

export { CustomNav };
export default connect(mapStateToProps, mapDispatchToProps)(CustomNav);
