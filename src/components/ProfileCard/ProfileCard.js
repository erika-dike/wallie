import React from 'react';
import PropTypes from 'prop-types';

import { AvatarContainer, UserFields } from '../';

import './ProfileCard.css';


const ProfileCard = ({
  profile,
  profilePageUrl,
  redirectToProfilePage,
  uploadImage,
}) =>
  <div className="ProfileCard">
    <a
      href={profilePageUrl}
      className="ProfileCard-bg u-bg-user-color u-block"
      onClick={redirectToProfilePage}
    />
    <div className="ProfileCard-content">
      <AvatarContainer
        img={profile.profile_pic}
        uploadImage={uploadImage}
      />
      <UserFields
        profilePageUrl={profilePageUrl}
        redirectToProfilePage={redirectToProfilePage}
        user={profile.user}
      />
      <div className="ProfileCard-stats">
        <ul className="ProfileCard=stats-list arrange arrage-bottom arrange-equal">
          <li className="ProfileCard-stats-stat arrange-size-fit">
            <a
              className="ProfileCard-stats-stat-link u-text-user-color u-link-clean u-block"
              href={profilePageUrl}
              onClick={redirectToProfilePage}
            >
              <span className="ProfileCard-stats-stat-label u-block">Posts</span>
              <span className="ProfileCardStats-stat-value">
                {profile.user.num_posts}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>;

ProfileCard.defaultProps = {
  profilePageUrl: null,
  redirectToProfilePage: null,
  uploadImage: null,
};

ProfileCard.propTypes = {
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
  profilePageUrl: PropTypes.string,
  redirectToProfilePage: PropTypes.func,
  uploadImage: PropTypes.func,
};

export default ProfileCard;

