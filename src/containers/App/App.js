import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local components
import { Nav } from './../../components/';
import { Home, Login, NotFound, Profile, SignUp } from '../../containers';

// static files
import './App.css';

const App = ({ isAuthenticated, profile }) =>
  <Router>
    <div className="App">
      <div id="body-overlay" />
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        {isAuthenticated
          ?
            <Route path={`/${profile.user.username}`} component={Profile} />
          :
            null
        }
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>;

App.defaultProps = {
  profile: null,
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      num_posts: PropTypes.number,
    }),
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.user.profile,
  };
}

export { App };
export default connect(mapStateToProps, null)(App);
