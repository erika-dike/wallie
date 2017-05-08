import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AvatarContainer, UserFields } from '../';

import './ProfileCard.css';


const cloudinary = global.cloudinary;


class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.profilePageUrl = `/profile/${this.props.profile.user.username}`;
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
    cloudinary.openUploadWidget({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      tags: ['profile_pic'],
    }, (error, result) => {
      if (result) {
        const { profile } = this.props;
        const oldProfilePicUrl = profile.profile_pic;
        profile.profile_pic = result[0].secure_url;
        this.props.updateProfile(profile, oldProfilePicUrl);
      } else if (error) {
        const title = 'Upload Image Error!';
        this.props.addNotification(title, error.message);
      }
    });
  }

  render() {
    return (
      <div className="ProfileCard">
        <a
          href={this.profilePageUrl}
          className="ProfileCard-bg u-bg-user-color u-block"
          onClick={this.redirectToProfilePage}
        />
        <div className="ProfileCard-content">
          <AvatarContainer
            img={this.props.profile.profile_pic}
            uploadImage={this.uploadImage}
          />
          <UserFields
            profilePageUrl={this.profilePageUrl}
            redirectToProfilePage={this.redirectToProfilePage}
            user={this.props.profile.user}
          />
          <div className="ProfileCard-stats">
            <ul className="ProfileCard=stats-list arrange arrage-bottom arrange-equal">
              <li className="ProfileCard-stats-stat arrange-size-fit">
                <a
                  className="ProfileCard-stats-stat-link u-text-user-color u-link-clean u-block"
                  href={this.profilePageUrl}
                  onClick={this.redirectToProfilePage}
                >
                  <span className="ProfileCard-stats-stat-label u-block">Posts</span>
                  <span className="ProfileCardStats-stat-value">
                    {this.props.profile.user.num_posts}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileCard.defaultProps = {
  addNotification: null,
  updateProfile: null,
};

ProfileCard.propTypes = {
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

export default withRouter(ProfileCard);

