import React from 'react';
import PropTypes from 'prop-types';

import { PostItem } from '../../../../components/';

import './PostsList.css';


const PostsList = ({
  posts,
  profile,
  lovePost,
  unlovePost,
  insertPostIntoCreateBox,
}) => {
  const mappedPostItem = posts.map(post =>
    <PostItem
      key={post.id}
      post={post}
      profile={profile}
      lovePost={lovePost}
      unlovePost={unlovePost}
      insertPostIntoCreateBox={insertPostIntoCreateBox}
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

PostsList.propTypes = {
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

export default PostsList;
