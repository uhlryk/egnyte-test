import React from 'react';
import { Modal } from 'react-bootstrap';

class DeleteModal extends React.Component {

  static propTypes = {
    show: React.PropTypes.bool,
    onDeleteAccept: React.PropTypes.func.isRequired,
    onDeleteCancel: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onAccept(env) {
    env.preventDefault();
    this.props.onDeleteAccept();
  }

  onCancel(env) {
    if(env) {
      env.preventDefault();
    }
    this.props.onDeleteCancel();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the selected files?
        </Modal.Body>
        <Modal.Footer>
          <a className='btn btn-default' href='#' role='button' onClick={this.onAccept} >Yes</a>
          <a className='btn btn-default' href='#' role='button' onClick={this.onCancel} >No</a>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteModal;
