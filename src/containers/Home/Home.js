import React from 'react';
import {
  Button,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  AboutUs,
  Posts,
  ProfileCard,
  TopPosts,
} from '../../components';

import { fetchUser } from '../../actions';

// css
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Grid>
        <Button bsStyle="primary" onClick={this.fetchUser}>
          Fetch User
        </Button>
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
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetched: state.user.fetched,
    pending: state.user.pending,
    errors: state.user.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    },
  };
}

export { Home };
export default connect(mapStateToProps, mapDispatchToProps)(Home);


// export default Home;
