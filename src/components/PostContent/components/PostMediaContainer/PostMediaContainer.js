import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import uuid from 'uuid/v4';

import './PostMediaContainer.css';


const iframely = global.iframely;


class PostMediaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.SHOW_MORE_CONTENT_TEXT,
    };
    this.embedContainerId = `media-${uuid()}`;
    this.getIframelyHtml = this.getIframelyHtml.bind(this);
    this.addShowMoreButton = this.addShowMoreButton.bind(this);
    this.toggleContentVisisbility = this.toggleContentVisisbility.bind(this);
  }

  componentDidMount() {
    if (iframely) {
      iframely.load();
      this.addShowMoreButton();
    }
  }

  getIframelyHtml() {
    return { __html: `<a href=${this.props.url} data-iframely-url></a>` };
  }

  SHOW_MORE_CONTENT_TEXT = 'Show more';
  SHOW_LESS_CONTENT_TEXT = 'Less';

  addShowMoreButton() {
    const element = document.getElementById(this.embedContainerId);
    setTimeout(() => {
      if (element.scrollHeight > element.clientHeight) {
        const showMoreButton = element.nextSibling;
        showMoreButton.classList.remove('show-more-hidden');
        showMoreButton.classList.add('show-more-visible');
      }
    }, 4000);
  }

  toggleContentVisisbility() {
    const element = document.getElementById(this.embedContainerId);
    if (this.state.text.includes(this.SHOW_MORE_CONTENT_TEXT)) {
      element.classList.remove('media-container-default-size');
      this.setState({ text: this.SHOW_LESS_CONTENT_TEXT });
    } else {
      element.classList.add('media-container-default-size');
      this.setState({ text: this.SHOW_MORE_CONTENT_TEXT });
    }
  }

  render() {
    return (
      <div className="media-container">
        <div
          id={this.embedContainerId}
          className="media-container-default-size"
          dangerouslySetInnerHTML={this.getIframelyHtml()}
        />
        <Button
          bsStyle="link"
          bsClass="btn btn-link show-more-hidden"
          onClick={this.toggleContentVisisbility}
        >
          {this.state.text}
        </Button>
      </div>
    );
  }
}


PostMediaContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PostMediaContainer;
