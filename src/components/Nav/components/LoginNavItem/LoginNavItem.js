import React from 'react';
import {
  Button,
  Modal,
  NavItem,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { FieldGroup } from '../../../';

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

  open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    const { eventKey, href } = this.props;
    return (
      <NavItem eventKey={eventKey} href={href} onClick={this.open}>
        Log in

        <Modal show={this.state.showModal} onHide={this.close} autoFocus>
          <Modal.Header closeButton>
            <Modal.Title>Log in to Wallie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form">
              <FieldGroup type="text" placeholder="Username" autoFocus />
              <FieldGroup type="password" placeholder="Password" />
              <div className="text-center">
                <Button bsStyle="info" type="submit">
                  Log in
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </NavItem>
    );
  }
}

LoginNavItem.propTypes = {
  eventKey: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default LoginNavItem;
