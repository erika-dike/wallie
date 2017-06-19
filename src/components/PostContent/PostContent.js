import React from 'react';
import getUrls from 'get-urls';
import linkifyHtml from 'linkifyjs/html';
import PropTypes from 'prop-types';

import {
  PostMediaContainer,
  PostTextContainer,
} from './components';


const PostContent = ({ content }) => {
  const urls = Array.from(getUrls(content));  // returns a set
  let contentToBeRendered = content;
  let mappedUrls;

  if (urls.length) {
    contentToBeRendered = linkifyHtml(content);
    mappedUrls = urls.map((url, index) =>
      <PostMediaContainer key={index} url={url} />,
    );
  }

  return (
    <div>
      <PostTextContainer text={contentToBeRendered} />
      {mappedUrls}
    </div>
  );
};


PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
