import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

import DeletePostModal from '../../components/DeletePostModal/DeletePostModal';


class PostItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
    };
    this.close = this.close.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.open = this.open.bind(this);
  }

  handleSelect(eventKey) {
    const { insertPostIntoCreateBox, post } = this.props;
    if (eventKey === '1') {
      insertPostIntoCreateBox(post);
    } else if (eventKey === '2') {
      this.open();
    }
  }

  open() {
    this.setState({ showDeleteModal: true });
  }

  close() {
    this.setState({ showDeleteModal: false });
  }

  deletePost() {
    this.props.deletePost(this.props.post.id);
  }

  render() {
    return (
      <ButtonToolbar>
        <DropdownButton
          bsStyle="link"
          id="dropdown-size-medium"
          title=""
          onSelect={this.handleSelect}
        >
          <MenuItem eventKey="1">Edit</MenuItem>
          <MenuItem eventKey="2">Delete</MenuItem>
        </DropdownButton>
        <DeletePostModal
          close={this.close}
          deletePost={this.deletePost}
          post={this.props.post}
          showModal={this.state.showDeleteModal}
        />
      </ButtonToolbar>
    );
  }
}

PostItemMenu.propTypes = {
  deletePost: PropTypes.func.isRequired,
  insertPostIntoCreateBox: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
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


export default PostItemMenu;
