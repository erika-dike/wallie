import React from 'react';
import PropTypes from 'prop-types';

import { PostItem } from '../../../../components/';

import './PostsList.css';


const PostsList = ({
  deletePost,
  insertPostIntoCreateBox,
  lovePost,
  posts,
  profile,
  unlovePost,
}) => {
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
        <ol className="stream-items" id="stream-items-id">
          {posts ? mappedPostItem : null}
        </ol>
      </div>
    </div>
  );
};

PostsList.defaultProps = {
  profile: null,
};

PostsList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  insertPostIntoCreateBox: PropTypes.func.isRequired,
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

export default PostsList;
