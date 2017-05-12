import React from 'react';
import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';


const PostItemMenu = ({ post, insertPostIntoCreateBox, deletePost }) => {
  const handleSelect = (eventKey) => {
    if (eventKey === '1') {
      insertPostIntoCreateBox(post);
    } else if (eventKey === '2') {
      deletePost(post);
    }
  };

  return (
    <ButtonToolbar>
      <DropdownButton
        bsStyle="link"
        id="dropdown-size-medium"
        title=""
        onSelect={handleSelect}
      >
        <MenuItem eventKey="1">Edit</MenuItem>
        <MenuItem eventKey="2">Delete</MenuItem>
      </DropdownButton>
    </ButtonToolbar>
  );
};


export default PostItemMenu;
