import React from 'react';

import { AvatarContainer, UserFields } from '../';

import './ProfileCard.css';


const ProfileCard = () =>
  <div className="ProfileCard">
    <a href="#" className="ProfileCard-bg u-bg-user-color u-block" />
    <div className="ProfileCard-content">
      <AvatarContainer />
      <UserFields />
      <div className="ProfileCard-stats">
        <ul className="ProfileCard=stats-list arrange arrage-bottom arrange-equal">
          <li className="ProfileCard-stats-stat arrange-size-fit">
            <a
              className="ProfileCard-stats-stat-link u-text-user-color u-link-clean u-block"
              href=""
            >
              <span className="ProfileCard-stats-stat-label u-block">Posts</span>
              <span className="ProfileCardStats-stat-value">45</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>;

export default ProfileCard;

