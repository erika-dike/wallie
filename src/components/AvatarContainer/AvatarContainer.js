import React from 'react';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';


class AvatarContainer extends React.Component {
  render() {
    const stuff = (
      <a
        className="ProfileCard-avatar-link ProfileAvatar-placeholder u-inline-block profile-picture js-nav"
        href="#"
        tabIndex="-1"
        aria-hidden="true"
        role="button"
      >
        <div
          className="ProfileCard-avatar-image u-border-user-color-light-hover u-bg-user-color"
        >
          <span className="Icon Icon--extra-large">
            <i className="fa fa-camera" aria-hidden="true" />
          </span>
        </div>
        <img
          className="ProfileCard-avatar-image js-action-profile-avatar"
          src="http://res.cloudinary.com/andela-troupon/image/upload/v1491232845/default_profile_normal_n8yvkf.png"
          alt=""
          style={{ display: 'none' }}
        />
      </a>
    );

    return (
      <div className="ProfileCard-avatar-container">
        <div id="choose-photo" className="contols avatar-settings inline-upload-avatar dropdown center">
          <DropdownButton bsStyle="link" title={stuff} id="dropdown-test" noCaret>
            <MenuItem eventKey="1">Upload Photo</MenuItem>
            <MenuItem eventKey="2">Change Photo</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Cancel</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default AvatarContainer;
