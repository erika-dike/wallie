import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// local components
import { Nav } from './../../components/';
import { Home, SignUp, Profile } from '../';

// static files
import './App.css';


const App = () =>
  <Router>
    <div className="App">
      <Nav />
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/:username" component={Profile} />
    </div>
  </Router>;

export default App;
