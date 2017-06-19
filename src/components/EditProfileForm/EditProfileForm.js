import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup } from '../';


const EditProfileForm = ({ handleChangeInEditProfileForm, profile }) =>
  <div className="edit-profile-form-container">
    <form className="edit-profile-form">
      <FieldGroup
        name="first_name"
        type="text"
        placeholder="First Name"
        value={profile.user.first_name}
        onChange={handleChangeInEditProfileForm}
        autoFocus
      />
      <FieldGroup
        name="last_name"
        type="text"
        placeholder="Last Name"
        value={profile.user.last_name}
        onChange={handleChangeInEditProfileForm}
      />
      <FieldGroup
        name="username"
        type="text"
        placeholder="Username"
        value={profile.user.username}
        onChange={handleChangeInEditProfileForm}
      />
      <FieldGroup
        name="about"
        type="textarea"
        placeholder="About me"
        value={profile.about}
        onChange={handleChangeInEditProfileForm}
      />
    </form>
  </div>;

EditProfileForm.propTypes = {
  handleChangeInEditProfileForm: PropTypes.func.isRequired,
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

export default EditProfileForm;
