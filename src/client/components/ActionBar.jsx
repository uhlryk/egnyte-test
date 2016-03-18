import React from 'react';

class ActionBar extends React.Component {
  static propTypes = {
    isChecked: React.PropTypes.bool,
    disableRename: React.PropTypes.bool,
    disableDelete: React.PropTypes.bool,
    disableCreate: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onRename: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onCreate: React.PropTypes.func

  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onClick() {
    if(this.props.onClick) {
      this.props.onClick();
    }
  }

  onRename(evt) {
    evt.preventDefault();
    if(!this.props.disableRename && this.props.onRename) {
      this.props.onRename();
    }
  }

  onDelete(evt) {
    evt.preventDefault();
    if(!this.props.disableDelete && this.props.onDelete) {
      this.props.onDelete();
    }
  }

  onCreate(evt) {
    evt.preventDefault();
    if(!this.props.disableCreate && this.props.onCreate) {
      this.props.onCreate();
    }
  }

  render() {
    return (
      <tr>
        <td>
          <input
            className='actionbar__checkbox'
            type='checkbox'
            checked={this.props.isChecked}
            onClick={this.onClick}
          />
        </td>
        <td>
          <div className='btn-toolbar pull-left'>
            <a className='btn btn-default' href='#' role='button'
               disabled={this.props.disableRename}
               onClick={this.onRename} >Rename</a>
            <a className='btn btn-danger' href='#' role='button'
               disabled={this.props.disableDelete}
               onClick={this.onDelete} >Delete</a>
          </div>
          <div className='btn-toolbar pull-right'>
            <a className='btn btn-success' href='#' role='button'
               disabled={this.props.disableCreate}
               onClick={this.onCreate} >New Folder</a>
          </div>
        </td>
      </tr>
    );
  }
}

export default ActionBar;
