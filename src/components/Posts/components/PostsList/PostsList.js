import React from 'react';
import PropTypes from 'prop-types';
import WayPoint from 'react-waypoint';

import { PostItem } from '../../../../components/';

import './PostsList.css';


class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      statusMessage: this.LOADING_MESSAGE,
    };
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.renderWayPoint = this.renderWayPoint.bind(this);
  }

  LOADING_MESSAGE = 'Loading more posts ...';
  CAUGHT_UP_MESSAGE = 'You are caught up';

  loadMorePosts() {
    const { next } = this.props;
    if (next) {
      const queryParams = next.slice(next.indexOf('?'));
      this.props.fetchPosts(queryParams);
    } else {
      this.setState({ statusMessage: this.CAUGHT_UP_MESSAGE });
    }
  }

  renderWayPoint() {
    if (!this.state.isLoading) {
      return (
        <WayPoint onEnter={this.loadMorePosts} />
      );
    }
    return null;
  }

  renderLoader() {
    if (this.props.next) {
      return (
        <span>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw post-loader" />
          <span className="sr-only">Loading...</span>
        </span>
      );
    }
    return null;
  }

  render() {
    const {
      deletePost,
      insertPostIntoCreateBox,
      lovePost,
      posts,
      profile,
      unlovePost,
    } = this.props;

    const mappedPostItem = posts.map(post =>
      <PostItem
        key={post.id}
        deletePost={deletePost}
        insertPostIntoCreateBox={insertPostIntoCreateBox}
        lovePost={lovePost}
        post={post}
        profile={profile}
        unlovePost={unlovePost}
      />,
    );

    return (
      <div className="stream-container conversations-enabled">
        <div className="stream">
          <ol
            className="stream-items"
            id="stream-items-id"
          >
            {posts ? mappedPostItem : null}
          </ol>
        </div>
        {this.renderWayPoint()}
        {this.renderLoader()}
      </div>
    );
  }
}

PostsList.defaultProps = {
  next: null,
  profile: null,
};

PostsList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  insertPostIntoCreateBox: PropTypes.func.isRequired,
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
  ).isRequired,
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
  unlovePost: PropTypes.func.isRequired,
};

export default PostsList;
