
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ProfileCard } from '../../components';

import { openCloudinaryUploadWidget } from '../../utils';


class ProfileCardConsole extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.profilePageUrl = `/${this.props.profile.user.username}`;
  }

  redirectToProfilePage(event) {
    event.preventDefault();
    this.props.history.push(this.profilePageUrl);
  }

  /**
    Uploads image to cloudinary using the global cloudinary object
    On success, it dispatches action to update profile on server
  **/
  uploadImage() {
    openCloudinaryUploadWidget()
      .then(async (result) => {
        const { profile } = this.props;
        const oldProfilePicUrl = profile.profile_pic;
        profile.profile_pic = result;
        this.props.updateProfile(profile, oldProfilePicUrl);
      })
      .catch((error) => {
        const title = 'Upload Image Error!';
        this.props.addNotification(title, error);
      });
  }

  render() {
    return (
      <ProfileCard
        profilePageUrl={this.propfilePageUrl}
        profile={this.props.profile}
        redirectToProfilePage={this.redirectToProfilePage}
        uploadImage={this.uploadImage}
      />
    );
  }
}

ProfileCardConsole.defaultProps = {
  addNotification: null,
  updateProfile: null,
};

ProfileCardConsole.propTypes = {
  addNotification: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
  updateProfile: PropTypes.func,
};

export default withRouter(ProfileCardConsole);
