import React from 'react';
import PropTypes from 'prop-types';


const UserFields = ({ profilePageUrl, redirectToProfilePage, user }) =>
  <div className="ProfileCard-user-fields account-group">
    <div className="ProfileCard-name u-text-truncate text-capitalize">
      <a
        className="u-text-inherit-color"
        href={profilePageUrl}
        rel="noopener"
        onClick={redirectToProfilePage}
      >
        {`${user.first_name} ${user.last_name}`}
      </a>
      <span className="user-badges" />
    </div>
    <span className="ProfileCard-screenname u-inline-block u-dir" dir="ltr">
      <a
        className="ProfileCard-screename-link u-link-complex u-link-clean"
        href={profilePageUrl}
        rel="noopener"
        onClick={redirectToProfilePage}
      >
        <span className="username u-dir" dir="ltr">
          @<b className="u-link-complex-target">{user.username}</b>
        </span>
      </a>
    </span>
  </div>;

UserFields.defaultProps = {
  profilePageUrl: null,
  redirectToProfilePage: null,
};

UserFields.propTypes = {
  profilePageUrl: PropTypes.string,
  redirectToProfilePage: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    num_posts: PropTypes.number,
  }).isRequired,
};

export default UserFields;
