import React from 'react';
import PropTypes from 'prop-types';


const PostTextContainer = ({ text }) => {
  const createMarkup = () => ({ __html: `${text}` });

  return (
    <div className="post-text-container">
      <div className="post-text-size post-text">
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};

PostTextContainer.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PostTextContainer;
