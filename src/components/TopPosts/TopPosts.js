import React from 'react';
import PropTypes from 'prop-types';

import MessageModal from './components/MessageModal/MessageModal';

import './TopPosts.css';


class TopPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageModal: false,
      selectedPost: null,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showMessageModal: false });
  }

  open(event) {
    event.preventDefault();
    const postId = Number(event.currentTarget.dataset.id);
    const selectedPost = this.props.posts.filter(each => each.id === postId).pop();
    this.setState({ showMessageModal: true, selectedPost });
  }

  render() {
    const mappedPosts = this.props.posts.map(post =>
      <li key={post.id} className="TopPosts-item context-TopPosts-item">
        <a
          className="u-link-complex"
          href="view-message"
          data-id={post.id}
          onClick={this.open}
        >
          <span className="u-link-complex-target TopPosts-name" dir="ltr">
            {post.content}
          </span>
          <div className="TopPosts-item-context">
            @{post.author.username}
          </div>
          <div className="TopPosts-item-stats">
            {post.num_loves} loves
          </div>
        </a>
      </li>,
    );

    return (
      <div className="TopPosts">
        <div className="TopPosts-inner">
          <div className="flex-module TopPosts-container context-TopPosts-container">
            <div className="flex-module-header">
              <h3><span className="TopPosts-title">Top Posts</span></h3>
            </div>
            <div className="flex-module-inner">
              <ul className="TopPosts-items">
                {this.props.posts ? mappedPosts : null}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <MessageModal
            close={this.close}
            post={this.state.selectedPost}
            showModal={this.state.showMessageModal}
          />
        </div>
      </div>
    );
  }
}

TopPosts.propTypes = {
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
};

export default TopPosts;
