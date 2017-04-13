import React from 'react';
import {
  Col,
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Well,
} from 'react-bootstrap';

import {
  ProfileCard,
  TopPosts,
} from './components';

// css
import './Home.css';


const Home = () =>
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
        <section className="module profile-section">
          <ProfileCard />
        </section>
      </Col>
      <Col xs={4} md={3}>
        <section className="module top-post-section">
          <TopPosts />
        </section>
      </Col>
      <Col xs={4} md={3} mdPush={3}>
        <section className="module about-section" />
      </Col>
    </Row>
  </Grid>;

export default Home;
