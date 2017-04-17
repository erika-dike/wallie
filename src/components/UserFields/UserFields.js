import React from 'react';


const UserFields = () =>
  <div className="ProfileCard-user-fields account-group">
    <div className="ProfileCard-name u-text-truncate">
      <a className="u-text-inherit-color" href="#" rel="noopener">
        Erika Dike
      </a>
      <span className="user-badges" />
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
  </div>;

export default UserFields;
