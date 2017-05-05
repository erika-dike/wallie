import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  NavItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Authentication } from '../../../../components';

// actions
import { loginUser, refreshAuthState } from '../../../../actions/';


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
    }
  }

  open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
    this.props.refreshAuthState();
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
      <NavItem eventKey={eventKey} href={href} onClick={this.open}>
        Log in

        <Modal show={this.state.showModal} onHide={this.close} autoFocus>
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
    );
  }
}

LoginNavItem.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventKey: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  refreshAuthState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credential) => {
      dispatch(loginUser(credential));
    },
    refreshAuthState: () => dispatch(refreshAuthState()),
  };
}

export { LoginNavItem };
export default connect(mapStateToProps, mapDispatchToProps)(LoginNavItem);
