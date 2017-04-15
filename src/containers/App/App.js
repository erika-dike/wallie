import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// local components
import { Nav } from './../../components/';
import { Home, SignUp } from '../';

// static files
import './App.css';


const App = () =>
  <Router>
    <div className="App">
      <Nav />
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
    </div>
  </Router>;

export default App;
