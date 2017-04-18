import React from 'react';
import PropType from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';


class EditMenu extends React.Component {
  constructor() {
    super();
    this.toggleEditView = this.toggleEditView.bind(this);
  }

  toggleEditView() {
    this.props.callBackParent();
  }

  render() {
    return (
      <div className="Profile-edit-profile-btn">
        {
          this.props.showEditView
            ?
              (
                <ButtonToolbar>
                  <Button onClick={this.toggleEditView}>Cancel</Button>
                  <Button onClick={this.toggleEditView} bsStyle="info">Save changes</Button>
                </ButtonToolbar>
              )
            :
                <Button onClick={this.toggleEditView}>Edit Profile</Button>
        }
      </div>
    );
  }
}

EditMenu.propTypes = {
  callBackParent: PropType.func.isRequired,
  showEditView: PropType.bool.isRequired,
};

export default EditMenu;
