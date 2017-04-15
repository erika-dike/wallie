import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const LinkWithNavItem = (props) => {
  const { children, to, history } = props;
  return React.cloneElement(children, {
    href: to,
    onClick: (e) => {
      e.preventDefault();
      history.push(to);
    },
  });
};

LinkWithNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(LinkWithNavItem);
