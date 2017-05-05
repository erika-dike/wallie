import React from 'react';

import './Spinner.css';

/*
Tiny component for rendering a spinner animation
*/
const Spinner = () =>
  <div>
    <div className="overlay" />
    <span className="spotlight spinner">
      <i className="fa fa-spinner fa-pulse fa-2x fa-fw" />
      <span className="sr-only">Loading...</span>
    </span>
  </div>;

export default Spinner;
