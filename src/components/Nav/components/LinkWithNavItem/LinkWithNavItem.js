import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const LinkWithNavItem = (props) => {
  const { children, to, history, handleSelectNavItem } = props;
  const isActive = props.location.pathname === `/${to}`;
  return React.cloneElement(children, {
    href: to,
    className: isActive ? 'selected' : null,
    onClick: (event) => {
      event.preventDefault();
      handleSelectNavItem(event);
      history.push(to);
    },
  });
};

LinkWithNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LinkWithNavItem);
