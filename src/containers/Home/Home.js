import React from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  AboutUs,
  Posts,
  ProfileCard,
  TopPosts,
} from '../../components';

// css
import './Home.css';


const Home = () =>
  <Grid>
    <Row className="show-grid">
      <Col xs={8} md={6} mdPush={3}>
        <Posts />
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
      <Col xs={4} md={3}>
        <section className="module about-section">
          <AboutUs />
        </section>
      </Col>
    </Row>
  </Grid>;

export default Home;
