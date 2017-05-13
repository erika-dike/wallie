import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup } from '../';


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        user: {
          username: props.profile.user.username,
          first_name: props.profile.user.first_name,
          last_name: props.profile.user.last_name,
          email: props.profile.user.email,
        },
        about: props.profile.about,
      },
    };
  }
  render() {
    return (
      <div className="edit-profile-form-container">
        <form className="edit-profile-form">
          <FieldGroup
            type="text"
            placeholder="First Name"
            value={this.state.profile.user.first_name}
            autoFocus
          />
          <FieldGroup
            type="text"
            placeholder="Last Name"
            value={this.state.profile.user.last_name}
          />
          <FieldGroup
            type="text"
            placeholder="Username"
            value={this.state.profile.user.username}
          />
          <FieldGroup
            type="email"
            placeholder="Email"
            value={this.state.profile.user.email}
          />
          <FieldGroup
            type="textarea"
            placeholder="About me"
            value={this.state.profile.about}
          />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
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

export default EditProfile;
