import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  NavItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Authentication } from '../../../../components';
import { LinkWithNavItem } from '../../components';


// actions
import {
  loginUser,
  refreshAuthState,
  toggleLoginModal,
} from '../../../../actions/';


import './LoginNavItem.css';


class LoginNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
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
    this.props.refreshAuthState();

    // turn global showLoginModal false if it is true
    if (this.props.showLoginModal) {
      this.props.toggleLoginModal(false, []);
    }
  }

  render() {
    const { errors, eventKey, href } = this.props;
    let mappedErrors = null;

    if (errors.length) {
      mappedErrors = errors.map((error, index) =>
        <li className="text-danger list-unstyled" key={index}>{error}</li>,
      );
    }
    return (
      <LinkWithNavItem to="login">
        <NavItem eventKey={eventKey} href={href} onClick={this.open}>
          Log in

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
        </NavItem>
      </LinkWithNavItem>
    );
  }
}

LoginNavItem.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventKey: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  refreshAuthState: PropTypes.func.isRequired,
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
    refreshAuthState: () => dispatch(refreshAuthState()),
    toggleLoginModal: (showLoginModal, errors) => {
      dispatch(toggleLoginModal(showLoginModal, errors));
    },
  };
}

export { LoginNavItem };
export default connect(mapStateToProps, mapDispatchToProps)(LoginNavItem);
