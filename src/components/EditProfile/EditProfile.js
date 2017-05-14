import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup } from '../';


class EditProfile extends React.Component {
  render() {
    return (
      <div className="edit-profile-form-container">
        <form className="edit-profile-form">
          <FieldGroup
            name="first_name"
            type="text"
            placeholder="First Name"
            value={this.props.profile.user.first_name}
            onChange={this.props.handleChangeInEditProfileForm}
            autoFocus
          />
          <FieldGroup
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={this.props.profile.user.last_name}
            onChange={this.props.handleChangeInEditProfileForm}
          />
          <FieldGroup
            name="username"
            type="text"
            placeholder="Username"
            value={this.props.profile.user.username}
            onChange={this.props.handleChangeInEditProfileForm}
          />
          <FieldGroup
            name="email"
            type="email"
            placeholder="Email"
            value={this.props.profile.user.email}
            onChange={this.props.handleChangeInEditProfileForm}
          />
          <FieldGroup
            name="about"
            type="textarea"
            placeholder="About me"
            value={this.props.profile.about}
            onChange={this.props.handleChangeInEditProfileForm}
          />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  handleChangeInEditProfileForm: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }).isRequired,
};

export default EditProfile;
