import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const LinkWithNavItem = (props) => {
  const { children, to, history } = props;
  const isActive = props.location.pathname === `/${to}`;

  return React.cloneElement(children, {
    href: to,
    className: isActive ? 'selected' : null,
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
