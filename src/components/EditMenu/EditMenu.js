import React from 'react';
import PropType from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';


class EditMenu extends React.Component {
  render() {
    return (
      <div className="Profile-edit-profile-btn">
        {
          this.props.showEditView
            ?
              (
                <ButtonToolbar>
                  <Button onClick={this.props.toggleVisibility}>Cancel</Button>
                  <Button onClick={this.props.updateProfile} bsStyle="info">Save changes</Button>
                </ButtonToolbar>
              )
            :
                <Button onClick={this.props.toggleVisibility}>Edit Profile</Button>
        }
      </div>
    );
  }
}

EditMenu.propTypes = {
  updateProfile: PropType.func.isRequired,
  showEditView: PropType.bool.isRequired,
  toggleVisibility: PropType.func.isRequired,
};

export default EditMenu;
