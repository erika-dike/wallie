import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import { PostItem } from '../../../../components';

import './MessageModal.css';

const MessageModal = ({ close, post, showModal }) =>
  <Modal show={showModal} onHide={close}>
    <Modal.Body>
      <PostItem post={post} mode="modal" />
    </Modal.Body>
  </Modal>;


MessageModal.defaultProps = {
  post: null,
};

MessageModal.propTypes = {
  close: PropTypes.func.isRequired,
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
  showModal: PropTypes.bool.isRequired,
};

export default MessageModal;
