import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';

import './TopPosts.css';


const TopPosts = () =>
  <div className="TopPosts">
    <div className="TopPosts-inner">
      <Panel collapsible defaultExpanded header="Top Posts" bsStyle="primary">
        <ListGroup fill>
          <ListGroupItem>
            Wow, I love this site. It reminds me of my time in the gulf of guinea. Good times I tell ya.
          </ListGroupItem>
          <ListGroupItem>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolor, adipisci beatae cum obcaecati atque cumque, officiis, iste at, labore libero. Ex id quam delectus sunt nihil, laborum facere tenetur?
          </ListGroupItem>
          <ListGroupItem>
            &hellip;
          </ListGroupItem>
        </ListGroup>
      </Panel>
    </div>
  </div>;

export default TopPosts;
