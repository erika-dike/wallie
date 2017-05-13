import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

import { PostItem } from '../../../../components';


const DeletePostModal = ({ close, deletePost, post, showModal }) =>
  <Modal show={showModal} onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure you want to delete this Post?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <PostItem post={post} mode="modal" />
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="info" type="submit" onClick={deletePost}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>;

DeletePostModal.propTypes = {
  close: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
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
  showModal: PropTypes.bool.isRequired,
};

export default DeletePostModal;
