import React from 'react';
import PropTypes from 'prop-types';
import {
  NavDropdown,
  MenuItem,
  Nav,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// css
import './AuthenticatedMenu.css';


class AuthenticatedMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePageClicked: false,
    };
    this.handleProfileLinkClick = this.handleProfileLinkClick.bind(this);
  }

  handleProfileLinkClick() {
    this.setState({ profilePageClicked: true });
  }

  render() {
    const { logout, profile } = this.props;

    const img = (
      <img
        className="Avatar Avatar--size32 Avatar--circle"
        src={profile.profile_pic}
        alt="Profile and settings"
      />
    );

    if (this.state.profilePageClicked) {
      const profilePagePath = `/${this.props.profile.user.username}`;
      return (<Redirect to={profilePagePath} />);
    }

    return (
      <Nav bsStyle="pills" pullRight>
        <NavDropdown
          eventKey={1}
          title={img}
          href="#"
          className="right-actions"
          id="profile-and-settings-dropdown"
        >
          <MenuItem
            eventKey={1.1}
            className="account-summary"
            onClick={this.handleProfileLinkClick}
          >
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
          <MenuItem eventKey={1.2} onClick={logout}>Log out</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

AuthenticatedMenu.propTypes = {
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
  }).isRequired,
};


export default AuthenticatedMenu;
