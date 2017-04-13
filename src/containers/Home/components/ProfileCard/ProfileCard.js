import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './ProfileCard.css';


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
      <i className="fa fa-camera Icon Icon--extra-large" aria-hidden="true" />
    </div>
    <img
      className="ProfileCard-avatar-image js-action-profile-avatar"
      src="http://res.cloudinary.com/andela-troupon/image/upload/v1491232845/default_profile_normal_n8yvkf.png"
      alt=""
      style={{ display: 'none' }}
    />
  </a>
);

const ProfileCard = () =>
  <div className="ProfileCard">
    <a href="#" className="ProfileCard-bg u-bg-user-color u-block" />
    <div className="ProfileCard-content">
      <div className="ProfileCard-avatar-container">
        <div id="choose-photo" className="contols avatar-settings inline-upload-avatar dropdown center">
          <DropdownButton bsStyle="link" title={stuff} id="dropdown-test">
            <MenuItem eventKey="1">Upload Photo</MenuItem>
            <MenuItem eventKey="2">Change Photo</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Cancel</MenuItem>
          </DropdownButton>
        </div>
      </div>
      <div className="ProfileCard-user-fields account-group">
        <div className="ProfileCard-name u-text-truncate">
          <a className="u-text-inherit-color" href="#" rel="noopener">
            Erika Dike
          </a>
          <span className="user-badges"></span>
        </div>
        <span className="ProfileCard-screenname u-inline-block u-dir" dir="ltr">
          <a
            className="ProfileCard-screename-link u-link-complex u-link-clean"
            href="#"
            rel="noopener"
          >
            <span className="username u-dir" dir="ltr">
              @<b className="u-link-complex-target">rikkydyke</b>
            </span>
          </a>
        </span>
      </div>
      <div className="ProfileCard-stats">
        <ul className="ProfileCard=stats-list arrange arrage-bottom arrange-equal">
          <li className="ProfileCard-stats-stat arrange-size-fit">
            <a
              className="ProfileCard-stats-stat-link u-text-user-color u-link-clean u-block"
              href=""
            >
              <span className="ProfileCard-stats-stat-label u-block">Posts</span>
              <span className="ProfileCardStats-stat-value">45</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>;

export default ProfileCard;

