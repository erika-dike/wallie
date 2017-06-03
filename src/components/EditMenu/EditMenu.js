import React from 'react';
import PropType from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';


const EditMenu = ({ handleSubmit, showEditView, toggleVisibility }) =>
  <div className="Profile-edit-profile-btn">
    {
      showEditView
        ?
          (
            <ButtonToolbar>
              <Button onClick={toggleVisibility}>Cancel</Button>
              <Button onClick={handleSubmit} bsStyle="info">Save changes</Button>
            </ButtonToolbar>
          )
        :
            <Button onClick={toggleVisibility}>Edit Profile</Button>
    }
  </div>;

EditMenu.propTypes = {
  handleSubmit: PropType.func.isRequired,
  showEditView: PropType.bool.isRequired,
  toggleVisibility: PropType.func.isRequired,
};

export default EditMenu;
