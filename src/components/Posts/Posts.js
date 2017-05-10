import React from 'react';
import PropTypes from 'prop-types';

import { PostsCreate, PostsList } from './components';

import './Posts.css';

const Posts = ({ posts, lovePost, unlovePost }) =>
  <main className="content-main">
    <PostsCreate />
    <PostsList posts={posts} lovePost={lovePost} unlovePost={unlovePost} />
  </main>;

Posts.propTypes = {
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
  unlovePost: PropTypes.func.isRequired,
};

export default Posts;
