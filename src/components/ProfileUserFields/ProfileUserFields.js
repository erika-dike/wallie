import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { UserFields } from '../../components';

import './ProfileUserFields.css';


const ProfileUserFields = ({ profile }) =>
  <div className="Profile-user-fields">
    <UserFields user={profile.user} />
    <div className="Profile-join-date">
      <span className="Icon">
        <i className="fa fa-calendar" aria-hidden="true" />
      </span>
      <span className="Profile-join-date-text u-dir">
        Joined {moment(profile.user.date_created).format('Do MMMM YYYY')}
      </span>
    </div>
  </div>;

ProfileUserFields.propTypes = {
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

export default ProfileUserFields;
