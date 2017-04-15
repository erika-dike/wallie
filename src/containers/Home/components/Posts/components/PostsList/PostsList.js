import React from 'react';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import ProfileCard from '../../../ProfileCard/ProfileCard';

import './PostsList.css';


const timeTooltip = (
  <Tooltip id="erika-ids">4:20 AM - 14 Apr 2017</Tooltip>
);

const Love = 'Love';
const unLove = 'Undo Love';
const loveTooltip = (
  <Tooltip id="love-tooltip">{Love}</Tooltip>
);

const popoverProfileCard = (
  <Popover id="popover-trigger-hover-focus">
    <ProfileCard />
  </Popover>
);

const PostsList = () =>
  <div className="stream-container conversations-enabled">
    <div className="stream">
      <ol className="stream-items" id="stream-items-id">
        <li className="stream-item">
          <div className="post">
            <div className="context"></div>
            <div className="content">
              <div className="stream-item-header">
                <a className="account-group" href="#">
                  <img
                    className="avatar"
                    src="http://res.cloudinary.com/andela-troupon/image/upload/v1491232845/default_profile_normal_n8yvkf.png"
                    alt="Erika {to be mapped to real value}"
                  />
                  <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverProfileCard}>
                    <span className="fullname-group">
                      <strong className="fullname show-popup-with-id">Erika</strong>
                      <span>&rlm;</span>
                      <span className="user-badges" />
                      <span className="username-break">&nbsp;</span>
                    </span>
                  </OverlayTrigger>
                  <span className="username u-dir" dir="ltr">
                    @<b>rikkydyke</b>
                  </span>
                </a>
                <small className="time">
                  <OverlayTrigger
                    overlay={timeTooltip}
                    placement="top"
                    delayShow={200}
                    delayHide={150}
                  >
                    <a className="post-timestamp">
                      <span className="timestamp">30m</span>
                      <span style={{ display: 'none' }}>31 minutes ago</span>
                    </a>
                  </OverlayTrigger>
                </small>
              </div>
              <div className="post-text-container">
                <p className="post-text-size post-text">
                  Managing technology agnostic Design systems by Erika Dike
                </p>
              </div>
              <div className="media-container media-card">
                <span style={{ display: 'none' }}>This is where links and videos will be displayed</span>
              </div>
              <div className="stream-item-footer">
                <div className="post-action-list">
                  <div className="post-action">
                    <OverlayTrigger
                      overlay={loveTooltip}
                      placement="top"
                      delayShow={200}
                      delayHide={150}
                    >
                      <Button
                        className="post-action-button action-button-undo action-button-trigger u-link-clean"
                      >
                        <div className="icon-container">
                          <div className="heart-animation-container">
                            <div className="heart-animation">
                              <i className="fa fa-heart" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <div className="icon-text-container">
                          <span className="post-action-count">
                            <span className="post-action-count-presentation" aria-hidden="true">4</span>
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
<li className="stream-item">
          <div className="post">
            <div className="context"></div>
            <div className="content">
              <div className="stream-item-header">
                <a className="account-group" href="#">
                  <img
                    className="avatar"
                    src="http://res.cloudinary.com/andela-troupon/image/upload/v1491232845/default_profile_normal_n8yvkf.png"
                    alt="Erika {to be mapped to real value}"
                  />
                  <span className="fullname-group">
                    <strong className="fullname show-popup-with-id">Erika</strong>
                    <span>&rlm;</span>
                    <span className="user-badges" />
                    <span className="username-break">&nbsp;</span>
                  </span>
                  <span className="username u-dir" dir="ltr">
                    @<b>rikkydyke</b>
                  </span>
                </a>
                <small className="time">
                  <OverlayTrigger
                    overlay={timeTooltip}
                    placement="top"
                    delayShow={200}
                    delayHide={150}
                  >
                    <a className="post-timestamp">
                      <span className="timestamp">30m</span>
                      <span style={{ display: 'none' }}>31 minutes ago</span>
                    </a>
                  </OverlayTrigger>
                </small>
              </div>
              <div className="post-text-container">
                <p className="post-text-size post-text">
                  Managing technology agnostic Design systems by Erika Dike
                </p>
              </div>
              <div className="media-container media-card">
                <span style={{ display: 'none' }}>This is where links and videos will be displayed</span>
              </div>
              <div className="stream-item-footer">
                <div className="post-action-list">
                  <div className="post-action">
                    <OverlayTrigger
                      overlay={loveTooltip}
                      placement="top"
                      delayShow={200}
                      delayHide={150}
                    >
                      <Button
                        className="post-action-button action-button-undo action-button-trigger u-link-clean"
                      >
                        <div className="icon-container">
                          <div className="heart-animation-container">
                            <div className="heart-animation">
                              <i className="fa fa-heart" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <div className="icon-text-container">
                          <span className="post-action-count">
                            <span className="post-action-count-presentation" aria-hidden="true">4</span>
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
      </ol>
    </div>
  </div>;

export default PostsList;
