import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { PostContent } from '../../components';
import { getFullTime } from '../../utils';

import {
  PostItemMenu,
  StreamItemHeaderTitle,
  StreamItemHeaderTimeDisplay,
} from './components';

import './PostItem.css';


const getLoveToolTip = (loveStatus) => {
  let text = '';
  if (loveStatus) {
    text = 'Undo Love';
  } else {
    text = 'Love';
  }

  return <Tooltip id="love-tooltip">{text}</Tooltip>;
};


const getLoveButtonStyles = (inLove) => {
  let styles = 'post-action-button action-button-undo action-button-trigger u-link-clean';
  if (inLove) {
    styles += ' post-in-love';
  }
  return styles;
};

/**
  Show the heart fave animation by adding the class and removing at the
  end of the animation
**/
const animateLove = (event) => {
  const iconContainer = event.currentTarget.getElementsByClassName('icon-container')[0];
  const heartElement = iconContainer.getElementsByClassName('heart')[0];
  heartElement.classList.add('heart-animation');
  setTimeout(() => heartElement.classList.remove('heart-animation'), 801);
};

const PostItem = ({
  deletePost,
  insertPostIntoCreateBox,
  lovePost,
  mode,
  post,
  profile,
  unlovePost,
}) => {
  const toggleLoveStatus = (event) => {
    if (profile) {
      if (post.in_love) {
        unlovePost(post.id);
      } else {
        lovePost(post.id);
        animateLove(event);
      }
    }
  };

  return (
    <li className="stream-item">
      <div className="post">
        <div className="context" />
        <div className="content">
          <div className="stream-item-header">
            <StreamItemHeaderTitle post={post} />

            {profile && profile.user.username === post.author.username
              ?
                <div className="PostItem-menu">
                  <PostItemMenu
                    deletePost={deletePost}
                    insertPostIntoCreateBox={insertPostIntoCreateBox}
                    post={post}
                  />
                </div>
              :
                null
            }

            <StreamItemHeaderTimeDisplay date_created={post.date_created} />
          </div>

          {/** Renders the post cotent **/}
          <PostContent content={post.content} />

          <div className="stream-item-footer">

            {mode === 'modal'
              ?
                <div className="full-time">
                  <span>{getFullTime(post.date_created)}</span>
                </div>
              :
                null
            }

            <div className="post-action-list">
              <div className="post-action">
                <OverlayTrigger
                  overlay={getLoveToolTip(post.in_love)}
                  placement="top"
                  delayShow={200}
                  delayHide={150}
                >
                  <Button
                    className={getLoveButtonStyles(post.in_love)}
                    onClick={toggleLoveStatus}
                  >
                    <div className="icon-container">
                      <div className="heart" />
                    </div>
                    <div className="icon-text-container">
                      <span className="post-action-count">
                        <span className="post-action-count-presentation" aria-hidden="true">
                          {post.num_loves}
                        </span>
                      </span>
                    </div>
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};


PostItem.defaultProps = {
  deletePost: null,
  insertPostIntoCreateBox: null,
  lovePost: null,
  unlovePost: null,
  mode: 'post-list',
  post: null,
  profile: null,
};

PostItem.propTypes = {
  deletePost: PropTypes.func,
  insertPostIntoCreateBox: PropTypes.func,
  lovePost: PropTypes.func,
  mode: PropTypes.string,
  post: PropTypes.shape({
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
  unlovePost: PropTypes.func,
};

export default PostItem;
