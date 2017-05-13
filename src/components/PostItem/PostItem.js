import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import { ProfileCard } from '../../components';

import PostItemMenu from './components/PostItemMenu/PostItemMenu';

import './PostItem.css';

// constants
import { DEFAULT_PROFILE_PIC } from '../../constants/';


const getLoveToolTip = (loveStatus) => {
  let text = '';
  if (loveStatus) {
    text = 'Undo Love';
  } else {
    text = 'Love';
  }

  return <Tooltip id="love-tooltip">{text}</Tooltip>;
};

const getFullTime = time => (moment(time).format('h:mm a - D MMM YYYY'));


const getTimeTooltip = time =>
  <Tooltip id="time-tooltip">{getFullTime(time)}</Tooltip>;


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
    if (post.in_love) {
      unlovePost(post.id);
    } else {
      lovePost(post.id);
      animateLove(event);
    }
  };

  const authorsProfile = {
    user: {
      username: post.author.username,
      first_name: post.author.first_name,
      last_name: post.author.last_name,
      num_posts: post.author.num_posts,
    },
    about: post.author.about,
    profile_pic: post.author.profile_pic,
  };

  const popoverProfileCard = (
    <Popover id="popover-trigger-hover-focus">
      <ProfileCard profile={authorsProfile} />
    </Popover>
  );

  return (
    <li className="stream-item">
      <div className="post">
        <div className="context" />
        <div className="content">
          <div className="stream-item-header">
            <a className="account-group" href="#">
              <img
                className="avatar"
                src={post.author.profile_pic || DEFAULT_PROFILE_PIC}
                alt={`${post.author.first_name} ${post.author.last_name}`}
              />
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverProfileCard}>
                <span className="fullname-group">
                  <strong className="fullname show-popup-with-id">{post.author.first_name} {post.author.last_name}</strong>
                  <span>&rlm;</span>
                  <span className="user-badges" />
                  <span className="username-break">&nbsp;</span>
                </span>
              </OverlayTrigger>
              <span className="username u-dir" dir="ltr">
                @<b>{post.author.username}</b>
              </span>
            </a>

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

            <small className="time">
              <OverlayTrigger
                overlay={getTimeTooltip(post.date_created)}
                placement="top"
                delayShow={200}
                delayHide={150}
              >
                <a className="post-timestamp">
                  <span className="timestamp">
                    {moment(post.date_created).fromNow(true)}
                  </span>
                  <span style={{ display: 'none' }}>
                    {moment(post.date_created).fromNow()}
                  </span>
                </a>
              </OverlayTrigger>
            </small>
          </div>
          <div className="post-text-container">
            <p className="post-text-size post-text">
              {post.content}
            </p>
          </div>
          <div className="media-container media-card">
            <span style={{ display: 'none' }}>THIS IS WHERE LINKS AND VIDEOS WILL BE DISPLAYED</span>
          </div>
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
  mode: 'post-list',
  post: null,
  profile: null,
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  insertPostIntoCreateBox: PropTypes.func.isRequired,
  lovePost: PropTypes.func.isRequired,
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
  unlovePost: PropTypes.func.isRequired,
};

export default PostItem;
