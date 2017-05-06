import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

// local components
import { Authentication, MessageAlert } from '../../components/';

// actions
import { loginUser } from '../../actions';

import './Login.css';


class Login extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={6} mdOffset={3}>

            <div className="alert-wrapper">
              <MessageAlert
                errors={this.props.errors}
                successful={false}
                successMessage=""
                title="Log in"
              />
            </div>

            <div className="login-wrapper">
              <h1>Login to Wallie</h1>
              <Authentication
                loading={this.props.loading}
                loginUser={this.props.loginUser}
                isAuthenticated={this.props.isAuthenticated}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
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
  };
}

export { Login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
