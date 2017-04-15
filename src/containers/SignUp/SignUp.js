import React from 'react';
import {
  Alert,
  Button,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import { FieldGroup } from '../../components';

import './SignUp.css';


const alertInstance = (
  <Alert bsStyle="success">
    <strong>Sign up Success!</strong>&nbsp;
    Check your email to activate your account. Happy walling.
  </Alert>
);


const SignUp = () =>
  <Grid>
    <Row>
      <Col xs={10} xsOffset={1} md={6} mdOffset={3}>

        <div className="alert-wrapper">
          {alertInstance}
        </div>

        <div className="signup-wrapper">
          <h1>Start Walling today</h1>
          <form className="signup-form">
            <FieldGroup size="large" type="text" placeholder="First Name" autoFocus />
            <FieldGroup size="large" type="text" placeholder="Last Name" />
            <FieldGroup size="large" type="text" placeholder="Username" />
            <FieldGroup size="large" type="email" placeholder="Email" />
            <FieldGroup size="large" type="password" placeholder="Password" />
            <FieldGroup size="large" type="password" placeholder="Re-enter Password" />
            <Button bsStyle="info" bsSize="large" type="submit" block>
              Sign up
            </Button>
          </form>
        </div>
      </Col>
    </Row>
  </Grid>;

export default SignUp;
