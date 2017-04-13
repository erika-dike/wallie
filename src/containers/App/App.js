import React, { Component } from 'react';
import {
  Col,
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Well,
} from 'react-bootstrap';

// local components
import { Nav } from './../../components/';

// static files
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Grid>
          <Row className="show-grid">
            <Col xs={8} md={6} mdPush={3}>
              <section className="message-section">
                <ListGroup>
                  <ListGroupItem>
                    <Well>I am in a Well man</Well>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Well>I am in a Well man</Well>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Well>I am in a Well man</Well>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Well>I am in a Well man</Well>
                  </ListGroupItem>
                </ListGroup>
              </section>
            </Col>
            <Col xs={4} md={3} mdPull={6}>
              <section className="module profile-section" />
            </Col>
            <Col xs={4} md={3}>
              <section className="module top-post-section" />
            </Col>
            <Col xs={4} md={3} mdPush={3}>
              <section className="module top-authors-section" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
