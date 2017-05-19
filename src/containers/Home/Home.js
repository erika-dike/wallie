import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';

import {
  AboutUs,
  Posts,
  ProfileCardConsole,
  TopPosts,
} from '../../components';

import {
  createPost,
  deletePost,
  editPost,
  fetchPosts,
  fetchTopPosts,
  lovePost,
  updateProfile,
  unlovePost,
} from '../../actions';

import { openWebSocket } from '../../services';
import { deleteImageFromCloudinary } from '../../utils';

// css
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.getAboutUsPushValue = this.getAboutUsPushValue.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    // fetch top posts
    this.props.fetchTopPosts();
    this.props.fetchPosts();
    this.socket = openWebSocket();
  }

  componentWillReceiveProps(nextProps) {
    // Notify user of errors when the occur.
    const { postsErrors } = nextProps;
    let errors = [];
    const title = null;
    if (postsErrors) {
      errors = postsErrors;
    }
    errors.forEach(error => this.addNotification(title, error));
  }

  componentWillUnmount() {
    this.socket.close();
  }

  getAboutUsPushValue() {
    if (this.props.isAuthenticated && this.props.topPosts.length) {
      return 3;
    }
    return null;

  addNotification(title, message) {
    this.notificationSystem.addNotification({
      title,
      message,
      level: 'error',
    });
  }

  async updateProfile(profile, oldProfilePicUrl) {
    await this.props.updateProfile(profile);
    if (this.props.profile.profile_pic === profile.profile_pic) {
      localStorage.setItem('profile', JSON.stringify(this.props.profile));
      deleteImageFromCloudinary(oldProfilePicUrl);
    }
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={6} mdPush={3}>
            <Posts
              addNotification={this.addNotification}
              createPost={this.props.createPost}
              deletePost={this.props.deletePost}
              editPost={this.props.editPost}
              lovePost={this.props.lovePost}
              fetched={this.props.postsFetched}
              fetchPosts={this.props.fetchPosts}
              next={this.props.next}
              pending={this.props.postsPending}
              posts={this.props.posts}
              profile={this.props.profile}
              unlovePost={this.props.unlovePost}
            />
          </Col>
          {this.props.isAuthenticated
            ?
              <Col xs={4} md={3} mdPull={6}>
                <section className="module profile-section">
                  <ProfileCardConsole
                    addNotification={this.addNotification}
                    profile={this.props.profile}
                    updateProfile={this.updateProfile}
                  />
                </section>
              </Col>
            :
              null
          }
          {this.props.topPosts.length
            ?
              <Col
                xs={4}
                md={3}
                mdPull={this.props.isAuthenticated ? null : 6}
              >
                <section className="module top-post-section">
                  <TopPosts
                    posts={this.props.topPosts}
                  />
                </section>
              </Col>
            :
              null
          }
          {this.props.posts.length && this.props.topPosts.length
            ?
              <Col xs={4} md={3} mdPush={this.getAboutUsPushValue()}>
                <section className="module about-section">
                  <AboutUs />
                </section>
              </Col>
            :
              null
          }
          <Col>
            <NotificationSystem
              ref={(input) => { this.notificationSystem = input; }}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Home.defaultProps = {
  next: null,
  profile: null,
  posts: [],
  topPosts: [],
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchTopPosts: PropTypes.func.isRequired,
  lovePost: PropTypes.func.isRequired,
  next: PropTypes.string,
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
    userErrors: state.user.errors,
    fetched: state.user.fetched,
    isAuthenticated: state.auth.isAuthenticated,
    next: state.post.next,
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
    fetchPosts: (queryParams) => {
      dispatch(fetchPosts(queryParams));
    },
    fetchTopPosts: () => {
      dispatch(fetchTopPosts());
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

export { Home };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
