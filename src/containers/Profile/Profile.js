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
  EditMenu,
  EditProfile,
  Posts,
  TopPosts,
  ProfileUserFields,
} from '../../components/';

import './Profile.css';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditView: false,
    };
    this.toggleEditView = this.toggleEditView.bind(this);
  }

  componentDidUpdate() {
    const overlayElem = document.getElementById('body-overlay');
    const editProfileMenu = document.getElementById('edit-profile-menu');
    const profileUserField = document.getElementById('profile-user-field');
    if (this.state.showEditView) {
      overlayElem.classList.add('overlay');
      editProfileMenu.classList.add('spotlight');
      profileUserField.classList.add('spotlight');
    } else {
      overlayElem.classList.remove('overlay');
      editProfileMenu.classList.remove('spotlight');
      profileUserField.classList.remove('spotlight');
    }
  }

  toggleEditView() {
    this.setState({ showEditView: !this.state.showEditView });
  }

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
                <div id="edit-profile-menu" className="Profile-edit-profile-menu">
                  <EditMenu
                    callBackParent={this.toggleEditView}
                    showEditView={this.state.showEditView}
                  />
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
              <div id="profile-user-field" className="Profile-user-fields">
                {this.state.showEditView ? <EditProfile /> : <ProfileUserFields />}
              </div>
            </Col>
            <Col xs={4} md={3} mdPull={9}>
              <section className="module top-post-section">
                <TopPosts />
              </section>
            </Col>
            <Col xs={4} md={3} mdPull={6}>
              <section className="module about-section">
                <AboutUs />
              </section>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Profile;
