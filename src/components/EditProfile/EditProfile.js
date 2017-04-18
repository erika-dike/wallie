import React from 'react';

import { FieldGroup } from '../';


class EditProfile extends React.Component {
  render() {
    return (
      <div className="edit-profile-form-container">
        <form className="edit-profile-form">
          <FieldGroup type="text" placeholder="First Name" autoFocus />
          <FieldGroup type="text" placeholder="Last Name" />
          <FieldGroup type="text" placeholder="Username" />
          <FieldGroup type="email" placeholder="Email" />
        </form>
      </div>
    );
  }
}

export default EditProfile;
