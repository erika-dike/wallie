import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

import { DEFAULT_PROFILE_PIC } from '../../constants/';


const getTitle = img =>
  <a
    className="ProfileCard-avatar-link ProfileAvatar-placeholder u-inline-block profile-picture"
    href="edit-image"
    tabIndex="-1"
    aria-hidden="true"
    role="button"
    onClick={e => e.preventDefault()}
  >
    {
      img === DEFAULT_PROFILE_PIC
      ?
        <div
          className="ProfileCard-avatar-image u-border-user-color-light-hover u-bg-user-color"
        >
          <span className="Icon Icon--extra-large">
            <i className="fa fa-camera" aria-hidden="true" />
          </span>
        </div>
      :
        <img
          className="ProfileCard-avatar-image js-action-profile-avatar"
          src={img}
          alt="Avatar"
        />
    }
  </a>;

const AvatarContainer = ({ img }) =>
  <div className="ProfileCard-avatar-container">
    <div id="choose-photo" className="contols avatar-settings inline-upload-avatar dropdown center">
      <DropdownButton bsStyle="link" title={getTitle(img)} id="dropdown-test" noCaret>
        <MenuItem eventKey="1">Upload Photo</MenuItem>
        <MenuItem eventKey="2">Change Photo</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Cancel</MenuItem>
      </DropdownButton>
    </div>
  </div>;

AvatarContainer.defaultProps = {
  img: DEFAULT_PROFILE_PIC,
};

AvatarContainer.propTypes = {
  img: PropTypes.string,
};

export default AvatarContainer;
