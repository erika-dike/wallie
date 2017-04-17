import React from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  Grid,
  Nav,
  NavItem,
  Row,
} from 'react-bootstrap';

import {
  AboutUs,
  AvatarContainer,
  Posts,
  TopPosts,
  UserFields,
} from '../../components/';

import './Profile.css';


class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <div className="Profile-first-banner u-bg-user-color">
          <Grid>
            <Row>
              <Col xsOffset={9} xs={3}>
                <div className="Profile-first-banner-content">
                  <div className="Profile-avatar-container">
                    <AvatarContainer />
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="Profile-second-banner u-box-shadow">
          <Grid>
            <Row className="Profile-second-banner-container">
              <Col xs={2} md={3}>
                <div className="Profile-edit-profile-btn-container">
                  <ButtonToolbar className="Profile-edit-profile-btn">
                    <Button>Edit Profile</Button>
                  </ButtonToolbar>
                </div>
              </Col>
              <Col xs={8} md={6}>
                <Nav bsStyle="pills">
                  <NavItem eventKey={1} className="Profile-nav-stat text-center u-border-user-color">
                    <span className="Profile-nav-label">Posts</span>
                    <span className="Profile-nav-value">87</span>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
          <Row className="Profile-main">
            <Col xs={8} md={6} mdPush={3}>
              <Posts />
            </Col>
            <Col xs={4} md={3} mdPush={3}>
              <div className="Profile-user-fields">
                <UserFields />
                <div className="Profile-join-date">
                  <span className="Icon">
                    <i className="fa fa-calendar" aria-hidden="true" />
                  </span>
                  <span className="Profile-join-date-text u-dir">
                    Joined 6th September 2017
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={4} md={3} mdPull={9}>
              <section className="module top-post-section">
                <TopPosts />
              </section>
            </Col>
            <Col xs={4} md={3} mdPush={3}>
              <section className="module about-section">
                <AboutUs />
              </section>
            </Col>
          </Row>
        </Grid>;
      </div>
    );
  }
}

export default Profile;
