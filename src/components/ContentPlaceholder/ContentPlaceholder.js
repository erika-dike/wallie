import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import './ContentPlaceholder.css';


class ContentPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlaceholderStream = this.renderPlaceholderStream.bind(this);
  }

  componentDidMount() {
    const { addNotification } = this.props;
    this.timer = setTimeout(() => {
      addNotification(
        'Network Error',
        'The page is taking too long to respond. Consider refreshing the page.',
      );
    }, 8000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderPlaceholderStream() {
    const { number } = this.props;
    return Array(number).fill(number).map((_, i) =>
      <div key={`timeline-item-${i}`} className="timeline-item">
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
      </div>,
    );
  }

  render() {
    return (
      <div className="timeline-wrapper" key={uuid()}>
        {this.renderPlaceholderStream()}
      </div>
    );
  }
}

ContentPlaceholder.defaultProps = {
  number: 1,
};

ContentPlaceholder.propTypes = {
  addNotification: PropTypes.func.isRequired,
  number: PropTypes.number,
};

export default ContentPlaceholder;
