import React, {Component} from 'react';
import Modal from 'react-modal';
import {openModalStyles} from './../Utils';

export default class DeletePopUp extends Component {

  afterOpenModal() {
  }
  closeModal() {
    this.props.closeDeleteModal()
  }
  componentWillUnMount() {
    console.log("unmount")
    // this.setState({modalIsOpen: true})
  }
  render() {
    return(
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={(e) => this.afterOpenModal()}
          onRequestClose={(e) => this.closeModal()}
          style={openModalStyles}
          contentLabel="Modal"
        >
          <div className="close-modal">
            <span onClick={(e)=>this.closeModal()}>&times;</span>
          </div>
          <div>{this.props.deleteMessage}</div>
          <div className="delete-cancel-block">
            {this.props.isDeleteActive ?
              <div>
                <button type="submit" value="Submit" className="delete-button"
                  onClick={this.props.handleConfirmDelete}>
                  Delete
                </button>
              </div> : "" }
            <div>
              <button type="submit" value="Submit" className="cancel-button"
                onClick={this.props.handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
