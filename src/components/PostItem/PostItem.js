import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import { ProfileCard } from '../../components';

import PostItemMenu from './components/PostItemMenu/PostItemMenu';

import './PostItem.css';

// constants
import { DEFAULT_PROFILE_PIC } from '../../constants/';


const timeTooltip = (
  <Tooltip id="erika-ids">4:20 AM - 14 Apr 2017</Tooltip>
);

const Love = 'Love';
const unLove = 'Undo Love';
const loveTooltip = (
  <Tooltip id="love-tooltip">{Love}</Tooltip>
);


const renderFullTime = time =>
  <div className="full-time">
    <span>{moment(time).format('h:mm a - D MMM YYYY')}</span>
  </div>;

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
  lovePost,
  mode,
  post,
  profile,
  unlovePost,
  insertPostIntoCreateBox,
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
                    post={post}
                    insertPostIntoCreateBox={insertPostIntoCreateBox}
                  />
                </div>
              :
                null
            }

            <small className="time">
              <OverlayTrigger
                overlay={timeTooltip}
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

            {mode === 'modal' ? renderFullTime(post.date_created) : null}

            <div className="post-action-list">
              <div className="post-action">
                <OverlayTrigger
                  overlay={loveTooltip}
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
};

PostItem.propTypes = {
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
  unlovePost: PropTypes.func.isRequired,
};

export default PostItem;
