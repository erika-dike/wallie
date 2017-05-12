import React from 'react';
import PropTypes from 'prop-types';

import { PostsCreate, PostsList } from './components';

import './Posts.css';

// const Posts = ({ posts, lovePost, unlovePost, profile, createPost }) => {
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postToEdit: null,
    };
    this.insertPostIntoCreateBox = this.insertPostIntoCreateBox.bind(this);
  }

  insertPostIntoCreateBox(post) {
    this.setState({ postToEdit: post });
  }

  render() {
    return (
      <main className="content-main">
        {this.props.profile
          ?
            <PostsCreate
              profile={this.props.profile}
              createPost={this.props.createPost}
              postToEdit={this.state.postToEdit}
            />
          :
            null
        }
        <PostsList
          posts={this.props.posts}
          profile={this.props.profile}
          lovePost={this.props.lovePost}
          unlovePost={this.props.unlovePost}
          insertPostIntoCreateBox={this.insertPostIntoCreateBox}
        />
      </main>
    );
  }
}

Posts.defaultProps = {
  profile: null,
};

Posts.propTypes = {
  createPost: PropTypes.func.isRequired,
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

export default Posts;
