import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getFullTime } from '../../../../utils';

import './StreamItemHeaderTimeDisplay.css';


const StreamItemHeaderTimeDisplay = ({ date_created }) => {
  const getTimeTooltip = time =>
    <Tooltip id="time-tooltip">{getFullTime(time)}</Tooltip>;

  return (
    <small className="time">
      <OverlayTrigger
        overlay={getTimeTooltip(date_created)}
        placement="top"
        delayShow={200}
        delayHide={150}
      >
        <a className="post-timestamp">
          <span className="timestamp">
            {moment(date_created).fromNow(true)}
          </span>
          <span style={{ display: 'none' }}>
            {moment(date_created).fromNow()}
          </span>
        </a>
      </OverlayTrigger>
    </small>
  );
};

StreamItemHeaderTimeDisplay.propTypes = {
  date_created: PropTypes.string.isRequired,
};

export default StreamItemHeaderTimeDisplay;
