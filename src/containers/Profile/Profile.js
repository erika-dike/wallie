import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Col,
  Grid,
  Nav,
  NavItem,
  Row,
} from 'react-bootstrap';

import {
  AboutUs,
  AvatarContainer,
  EditMenu,
  EditProfile,
  Posts,
  TopPosts,
  ProfileUserFields,
} from '../../components/';

import {
  createPost,
  deletePost,
  editPost,
  fetchUser,
  fetchPosts,
  fetchTopPosts,
  lovePost,
  updateProfile,
  unlovePost,
} from '../../actions';

import { deleteImageFromCloudinary } from '../../utils';

import './Profile.css';

const cloudinary = global.cloudinary;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditView: false,
      profile: this.constructProfileForState,
    };
    this.addNotification = this.addNotification.bind(this);
    this.constructProfileForState = this.constructProfileForState.bind(this);
    this.handleChangeInEditProfileForm = this.handleChangeInEditProfileForm.bind(this);
    this.toggleEditView = this.toggleEditView.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentWillMount() {
    // fetch top posts
    this.props.fetchTopPosts('private=True');
    // fetch posts authored by current user
    this.props.fetchPosts('private=True');
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = this.props;
    if (nextProps.fetched && this.state.showEditView) {  // success
      this.toggleEditView();
      localStorage.setItem('profile', JSON.stringify(this.props.profile));

      // fetch posts with the new profile changes reflected
      this.props.fetchTopPosts('private=True');
      this.props.fetchPosts('private=True');
    } else {  // failure
      this.props.errors.forEach(error =>
        this.addNotification('Update Profile Error!', error),
      );
    }
  }

  componentDidUpdate() {
    const overlayElem = document.getElementById('body-overlay');
    const editProfileMenu = document.getElementById('edit-profile-menu');
    const profileUserField = document.getElementById('profile-user-field');
    if (this.state.showEditView) {
      overlayElem.classList.add('overlay');
      editProfileMenu.classList.add('spotlight');
      profileUserField.classList.add('spotlight');
    } else {
      overlayElem.classList.remove('overlay');
      editProfileMenu.classList.remove('spotlight');
      profileUserField.classList.remove('spotlight');
    }
  }

  constructProfileForState() {
    const { profile } = this.props;
    return {
      user: {
        username: profile.user.username,
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        email: profile.user.email,
      },
      about: profile.about,
      profile_pic: profile.profile_pic,
    };
  }

  toggleEditView() {
    this.setState({
      profile: this.constructProfileForState(),
      showEditView: !this.state.showEditView,
    });
  }

  handleChangeInEditProfileForm(event) {
    const { name, value } = event.target;
    const { profile } = this.state;
    if (name === 'profile') {
      profile[name] = value;
    } else {
      profile.user[name] = value;
    }
    this.setState({ profile });
  }

  addNotification(title, message) {
    this.notificationSystem.addNotification({
      title,
      message,
      level: 'error',
    });
  }

  createPost(content) {
    this.props.createPost(content);
  }

  deletePost(id) {
    this.props.deletePost(id);
  }

  editPost(id, content) {
    this.props.editPost(id, content);
  }

  /**
    Update profile with current profile just received after updating profile
  **/
  updateProfile(profile, oldProfilePicUrl) {
    this.props.updateProfile(this.state.profile);

    // TODO; FIT THIS WITH the PROFILE page. still optimized for home currently
    // if (this.props.profile.profile_pic === profile.profile_pic) {
    // localStorage.setItem('profile', JSON.stringify(profile));
    //   deleteImageFromCloudinary(oldProfilePicUrl);
    // }
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
        this.updateProfile(profile, oldProfilePicUrl);
      } else if (error) {
        const title = 'Upload Image Error!';
        this.addNotification(title, error.message);
      }
    });
  }

  render() {
    return (
      <div className="Profile">
        <div className="Profile-first-banner u-bg-user-color">
          <Grid>
            <Row>
              <Col xsOffset={9} xs={3}>
                <div className="Profile-first-banner-content">
                  <div className="Profile-avatar-container">
                    <AvatarContainer
                      img={this.props.profile.profile_pic}
                      uploadImage={this.uploadImage}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="Profile-second-banner u-box-shadow">
          <Grid>
            <Row className="Profile-second-banner-container">
              <Col xs={2} md={3}>
                <div id="edit-profile-menu" className="Profile-edit-profile-menu">
                  <EditMenu
                    showEditView={this.state.showEditView}
                    toggleVisibility={this.toggleEditView}
                    updateProfile={this.updateProfile}
                  />
                </div>
              </Col>
              <Col xs={8} md={6}>
                <Nav bsStyle="pills">
                  <NavItem eventKey={1} className="Profile-nav-stat text-center u-border-user-color">
                    <span className="Profile-nav-label">Posts</span>
                    <span className="Profile-nav-value">
                      {this.props.profile.user.num_posts}
                    </span>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
          <Row className="Profile-main">
            <Col xs={8} md={6} mdPush={3}>
              <Posts
                createPost={this.createPost}
                deletePost={this.deletePost}
                editPost={this.editPost}
                lovePost={this.props.lovePost}
                fetched={this.props.postsFetched}
                pending={this.props.postsPending}
                posts={this.props.posts}
                profile={this.props.profile}
                unlovePost={this.props.unlovePost}
              />
            </Col>
            <Col xs={4} md={3} mdPush={3}>
              <div id="profile-user-field" className="Profile-user-fields">
                {this.state.showEditView
                  ?
                    <EditProfile
                      handleChangeInEditProfileForm={this.handleChangeInEditProfileForm}
                      profile={this.state.profile}
                    />
                  :
                    <ProfileUserFields profile={this.props.profile} />
                }
              </div>
            </Col>
            <Col xs={4} md={3} mdPull={9}>
              <section className="module top-post-section">
                <TopPosts posts={this.props.topPosts} />
              </section>
            </Col>
            <Col xs={4} md={3} mdPull={6}>
              <section className="module about-section">
                <AboutUs />
              </section>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: null,
  posts: [],
  topPosts: [],
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchTopPosts: PropTypes.func.isRequired,
  lovePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      date_created: PropTypes.string,
      content: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        about: PropTypes.string,
        profile_pic: PropTypes.string,
      }),
      num_loves: PropTypes.number,
      in_love: PropTypes.bool,
    }),
  ),
  postsErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  postsFetched: PropTypes.bool.isRequired,
  postsPending: PropTypes.bool.isRequired,
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
  }),
  topPosts: PropTypes.arrayOf(
    PropTypes.shape({
      date_created: PropTypes.string,
      content: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        about: PropTypes.string,
        profile_pic: PropTypes.string,
      }),
      num_loves: PropTypes.number,
      in_love: PropTypes.bool,
    }),
  ),
  unlovePost: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errors: state.user.errors,
    fetched: state.user.fetched,
    isAuthenticated: state.auth.isAuthenticated,
    pending: state.user.pending,
    posts: state.post.posts,
    postsErrors: state.post.errors,
    postsFetched: state.post.fetched,
    postsPending: state.post.pending,
    profile: state.user.profile,
    topPosts: state.post.topPosts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (content) => {
      dispatch(createPost(content));
    },
    deletePost: (id) => {
      dispatch(deletePost(id));
    },
    editPost: (id, content) => {
      dispatch(editPost(id, content));
    },
    editProfile: (data) => {
      dispatch(updateProfile(data));
    },
    fetchUser: (queryParams) => {
      dispatch(fetchUser(queryParams));
    },
    fetchPosts: (queryParams) => {
      dispatch(fetchPosts(queryParams));
    },
    fetchTopPosts: (queryParams) => {
      dispatch(fetchTopPosts(queryParams));
    },
    lovePost: (postId) => {
      dispatch(lovePost(postId));
    },
    unlovePost: (postId) => {
      dispatch(unlovePost(postId));
    },
    updateProfile: (profile) => {
      dispatch(updateProfile(profile));
    },
  };
}

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
