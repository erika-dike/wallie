import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import './ContentPlaceholder.css';


const ContentPlaceholder = ({ number }) => {
  const placeholderStream = Array(number).map(() =>
    <div className="timeline-wrapper" key={uuid()}>
      <div className="timeline-item">
        <div className="animated-background">
          <div className="background-masker header-top" />
          <div className="background-masker header-left" />
          <div className="background-masker header-right" />
          <div className="background-masker header-bottom" />
          <div className="background-masker subheader-left" />
          <div className="background-masker subheader-right" />
          <div className="background-masker subheader-bottom" />
          <div className="background-masker content-top" />
          <div className="background-masker content-first-end" />
          <div className="background-masker content-second-line" />
          <div className="background-masker content-second-end" />
          <div className="background-masker content-third-line" />
          <div className="background-masker content-third-end" />
        </div>
      </div>
    </div>,
  );

  return (
    <div>
      {placeholderStream}
    </div>
  );
};

ContentPlaceholder.defaultProps = {
  number: 1,
};

ContentPlaceholder.propTypes = {
  number: PropTypes.number,
};

export default ContentPlaceholder;
