import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Authentication } from '../../components';

// actions
import { loginUser, toggleLoginModal } from '../../actions/';


import './LoginModal.css';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.close();
    } else if (this.props.showLoginModal !== nextProps.showLoginModal) {
      this.setState({ showModal: nextProps.showLoginModal });
    }
  }

  open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });

    // turn global showLoginModal false if it is true
    if (this.props.showLoginModal) {
      this.props.toggleLoginModal(false, []);
    }
  }

  render() {
    const { errors } = this.props;
    let mappedErrors = null;
    if (errors.length) {
      mappedErrors = errors.map((error, index) =>
        <li className="text-danger list-unstyled" key={index}>{error}</li>,
      );
    }

    return (
      <Modal
        dialogClassName="login-modal"
        show={this.state.showModal}
        onHide={this.close}
        autoFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>Log in to Wallie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            errors.length ? <ul>{mappedErrors}</ul> : null
          }
          <Authentication
            loading={this.props.loading}
            loginUser={this.props.loginUser}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.bool.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    showLoginModal: state.auth.showLoginModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credential) => {
      dispatch(loginUser(credential));
    },
    toggleLoginModal: (showLoginModal, errors) => {
      dispatch(toggleLoginModal(showLoginModal, errors));
    },
  };
}

export { LoginModal };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));
