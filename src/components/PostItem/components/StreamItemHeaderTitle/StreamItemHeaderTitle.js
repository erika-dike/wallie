import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import {
  ProfileCard,
} from '../../../../components';

import './StreamItemHeaderTitle.css';

// constants
import { DEFAULT_PROFILE_PIC } from '../../../../constants/';


export default class StreamItemHeaderTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverPlacement: 'bottom',
    };
    this.adaptProfileForProfileCard = this.adaptProfileForProfileCard.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.renderProfileCard = this.renderProfileCard.bind(this);
  }

  handleHover(event) {
    const offset = event.currentTarget.getBoundingClientRect();
    if (offset.top > 0.7 * window.innerHeight) {
      this.setState({ popoverPlacement: 'top' });
    } else {
      this.setState({ popoverPlacement: 'bottom' });
    }
  }

  adaptProfileForProfileCard() {
    const { post } = this.props;
    return {
      user: {
        username: post.author.username,
        first_name: post.author.first_name,
        last_name: post.author.last_name,
        num_posts: post.author.num_posts,
      },
      about: post.author.about,
      profile_pic: post.author.profile_pic,
    };
  }

  renderProfileCard() {
    return (
      <Popover id="popover-trigger-hover-focus">
        <ProfileCard profile={this.adaptProfileForProfileCard()} />
      </Popover>
    );
  }

  render() {
    const { post } = this.props;

    return (
      <a className="account-group" href={post.author.username} onClick={e => e.preventDefault()}>
        <img
          className="avatar"
          src={post.author.profile_pic || DEFAULT_PROFILE_PIC}
          alt={`${post.author.first_name} ${post.author.last_name}`}
        />
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement={this.state.popoverPlacement}
          overlay={this.renderProfileCard()}
        >
          <span className="fullname-group" onMouseOver={this.handleHover}>
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
    );
  }
}

StreamItemHeaderTitle.propTypes = {
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
  }).isRequired,
};
