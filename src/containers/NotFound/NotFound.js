import React from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

class NotFound extends React.Component {
  componentWillMount() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.add('fullscreen_errors');
  }

  componentWillUnmount() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.remove('fullscreen_errors');
  }

  render() {
    return (
      <Grid className="not-found">
        <Row>
          <Col xsOffset={1} xs={10} mdOffset={3} md={6}>
            <div className="body-content">
              <h1>Sorry, that page doesn&apos;t exist</h1>

              <p>
                You can&nbsp;
                <a href={`${window.location.origin}`}>
                  return to the homepage.
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NotFound;
