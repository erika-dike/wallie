import React from 'react';

import { UserFields } from '../';


const ProfileUserFields = () =>
  <div className="Profile-user-fields">
    <UserFields />
    <div className="Profile-join-date">
      <span className="Icon">
        <i className="fa fa-calendar" aria-hidden="true" />
      </span>
      <span className="Profile-join-date-text u-dir">
        Joined 6th September 2017
      </span>
    </div>
  </div>;

export default ProfileUserFields;
