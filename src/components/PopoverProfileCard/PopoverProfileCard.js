import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'react-bootstrap';

import { ProfileCard } from '../../components';


const PopoverProfileCard = ({ author }) =>
  <Popover id="popover-trigger-hover-focus">
    <ProfileCard author={author} />
  </Popover>;

PopoverProfileCard.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }).isRequired,
};

export default PopoverProfileCard;
