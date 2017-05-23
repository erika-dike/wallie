import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import { openCloudinaryUploadWidget, shakeButton } from '../../../../utils';

import './PostsCreate.css';

import { DEFAULT_PROFILE_PIC } from '../../../../constants';

class PostsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.defaultMessage = "What's happening?";
    this.state = {
      isActive: false,
      numRows: 3,
      post: {
        id: null,
        content: '',
        type: 'text',
      },
    };
    this.createImagePost = this.createImagePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocusOnInactiveFormInput = this.handleFocusOnInactiveFormInput.bind(this);
    this.handleRenderingFormInputInactive = this.handleRenderingFormInputInactive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if object was created or editied successfully, reset both the state
    // of this component and the parent with the removePostFromCreateBox
    // callback.
    if (this.props.pending && nextProps.fetched) {
      this.props.removePostFromCreateBox();
      const post = { id: null, content: '' };
      this.setState({ isActive: false, post });
    } else if (nextProps.postToEdit) {
      this.setState({ isActive: true, post: nextProps.postToEdit });
    }
  }

  MIN_ROWS = 3;

  createImagePost() {
    openCloudinaryUploadWidget()
      .then(async (result) => {
        const { post } = this.state;
        post.content = `${post.content}\n${result}`;
        this.setState({ post });
      })
      .catch((error) => {
        const title = 'Upload Image Error!';
        this.props.addNotification(title, error);
      });
  }

  /**
    Makes the textarea visible when a user clicks on the form input to be used
    as inactive placeholder

    Adds a click event to render the text area inactive when the user clicks
    outside the form and the textarea is empty
  **/
  handleFocusOnInactiveFormInput() {
    this.setState({ isActive: true });
    window.addEventListener('click', this.handleRenderingFormInputInactive);
  }

  handleRenderingFormInputInactive(event) {
    const formElement = document.getElementsByClassName('post-create-form')[0];
    if (!formElement.contains(event.target) && !this.state.post.content) {
      this.setState({ isActive: false, numRows: this.MIN_ROWS });
      window.removeEventListener('click', this.handleRenderingFormInputInactive);
    }
  }

  handleChange(event) {
    const element = event.currentTarget;
    const { post } = this.state;
    post.content = element.value;
    this.setState({ post });
    if (element.scrollHeight > element.clientHeight) {
      const rows = Math.ceil((element.scrollHeight - element.clientHeight) / 17);
      this.setState({ numRows: this.state.numRows + rows });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, content, type } = this.state.post;
    if (content.length) {
      if (id) {
        this.props.editPost(id, content);
      } else {
        this.props.createPost(content, type);
      }
    } else {
      // add shake animation to post button
      shakeButton('post-button');
    }
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        Add photos or video
      </Tooltip>
    );

    const submitButtonText = this.state.post.id ? 'Edit' : 'Post';

    const activeFormInput = (
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass="textarea"
          placeholder={this.defaultMessage}
          rows={this.state.numRows}
          value={this.state.post.content}
          autoFocus
          onChange={this.handleChange}
        />
      </FormGroup>
    );

    const inActiveFormInput = (
      <FormGroup controlId="formBasicText" onFocus={this.handleFocusOnInactiveFormInput}>
        <FormControl type="text" value={this.defaultMessage} readOnly />
      </FormGroup>
    );

    const postCreateBoxToolbar = (
      <div className="post-create-box-toolbar">
        <div className="post-create-box-extras">
          <span className="post-create-box-extras-item post-create-box-media-picker">
            <div className="photo-selector">
              <OverlayTrigger placement="top" overlay={tooltip}>
                <Button bsClass="btn icon-btn" onClick={this.createImagePost}>
                  <span className="post-create-camera Icon Icon--extra-large">
                    <i className="fa fa-camera" aria-hidden="true" />
                  </span>
                </Button>
              </OverlayTrigger>
            </div>
          </span>
        </div>
        <div className="create-post-button">
          <span className="spinner" />
          <span className="post-counter">{this.state.post.content.length}</span>
          <Button id="post-button" bsClass="btn btn-info post-btn" type="submit" onClick={this.handleSubmit}>
            <span className="button-text posting-text">
              <span className="Icon icon-post-create">
                <i className="fa fa-paint-brush" aria-hidden="true" />
              </span>
              {submitButtonText}
            </span>
          </Button>
        </div>
      </div>
    );

    return (
      <div className="post-create-box">
        <div className="home-post-create-box post-create-box-component app-user">
          <img
            className="post-create-box-user-img avatar size32"
            src={this.props.profile ? this.props.profile.profile_pic : DEFAULT_PROFILE_PIC}
            alt={this.props.profile.user.username}
          />
          <form className="post-create-form">
            <div className="rich-editor">
              <div className="rich-editor-container u-border-radius-inherit fake-focus">
                <div
                  className="rich-editor-scroll-container u-border-radius-inherit"
                >
                  {this.state.isActive ? activeFormInput : inActiveFormInput}
                </div>
              </div>
            </div>
            {this.state.isActive ? postCreateBoxToolbar : null}
          </form>
        </div>
      </div>
    );
  }
}

PostsCreate.defaultProps = {
  postToEdit: null,
  profile: null,
};

PostsCreate.propTypes = {
  addNotification: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  postToEdit: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
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
  removePostFromCreateBox: PropTypes.func.isRequired,
};

export default PostsCreate;
