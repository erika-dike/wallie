import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local components
import { Nav } from './../../components/';
import { Home, Login, NotFound, Profile, SignUp } from '../../containers';

// actions
import { logout } from '../../actions/';

// static files
import './App.css';

const App = ({ isAuthenticated, logoutUser, profile }) =>
  <Router>
    <div className="App">
      <div id="body-overlay" />
      <Nav
        isAuthenticated={isAuthenticated}
        logout={logoutUser}
        profile={profile}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        {isAuthenticated && profile
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
  logoutUser: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => {
      dispatch(logout());
    },
  };
}

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
