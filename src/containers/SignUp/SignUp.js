import React from 'react';
import {
  Alert,
  Button,
  Col,
  Grid,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';

import './SignUp.css';


const alertInstance = (
  <Alert bsStyle="success">
    <strong>Sign up Success!</strong>&nbsp;
    Check your email to activate your account. Happy walling.
  </Alert>
);

function FieldGroup({ placeholder }) {
  return (
    <FormGroup bsSize="large">
      <FormControl type="text" placeholder={placeholder} />
    </FormGroup>
  );
}

const SignUp = () =>
  <Grid>
    <Row>
      <Col xs={10} xsOffset={1} md={6} mdOffset={3}>

        <div className="alert-wrapper">
          {alertInstance}
        </div>

        <div className="signup-wrapper">
          <h1>Start Walling today</h1>
          <form>
            <FieldGroup placeholder="Full name" />
            <FieldGroup placeholder="Email" />
            <FieldGroup placeholder="Password" />
            <FieldGroup placeholder="Re-enter Password" />
            <Button bsStyle="info" bsSize="large" block>
              Sign up
            </Button>
          </form>
        </div>
      </Col>
    </Row>
  </Grid>;

export default SignUp;
