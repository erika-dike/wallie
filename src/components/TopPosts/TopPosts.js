import React from 'react';

import './TopPosts.css';


const TopPosts = () =>
  <div className="TopPosts">
    <div className="TopPosts-inner">
      <div className="flex-module TopPosts-container context-TopPosts-container">
        <div className="flex-module-header">
          <h3><span className="TopPosts-title">Top Posts</span></h3>
        </div>
        <div className="flex-module-inner">
          <ul className="TopPosts-items">
            <li className="TopPosts-item context-TopPosts-item">
              <a className="u-link-complex" href="#">
                <span className="u-link-complex-target TopPosts-name" dir="ltr">
                  Welcome to the game man. You are here. A toast
                </span>
                <div className="TopPosts-item-context" />
                <div className="TopPosts-item-stats">
                  45 loves
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>;

export default TopPosts;
