import React from 'react';
import Element from './Element.jsx';
import DeleteModal from './DeleteModal.jsx';
import ActionBar from './ActionBar.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.file.map(val=> {
        return Object.assign({
          isChecked: false,
          isEdit: false
        }, val);
      }),
      isAllChecked: false,
      isAnyChecked: false,
      isDeleteWindow: false,
      isNewElement: false
    };
    this.onAllClick = this.onAllClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRenameStart = this.onRenameStart.bind(this);
    this.onRenameSave = this.onRenameSave.bind(this);
    this.onRenameCancel = this.onRenameCancel.bind(this);
    this.onDeleteStart = this.onDeleteStart.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onDeleteAccept = this.onDeleteAccept.bind(this);
    this.onCreateStart = this.onCreateStart.bind(this);
    this.onCreateSave = this.onCreateSave.bind(this);
    this.onCreateCancel = this.onCreateCancel.bind(this);
  }

  onAllClick() {
    let length = this.state.list.length;
    if(length > 0) {
      this.setState({
        list: this.state.list.map(val=> {
          return Object.assign({}, val, { isChecked: !this.state.isAllChecked });
        }),
        isAllChecked: !this.state.isAllChecked,
        isAnyChecked: !this.state.isAllChecked
      });
    } else {
      this.setState({
        isAllChecked: false,
        isAnyChecked: false
      });
    }
  }

  onClick(id) {
    let countChecked = 0;

    let list = this.state.list.map(val=> {
      if(val.id === id) {
        if(!val.isChecked) {
          countChecked++;
        }
        return Object.assign({}, val, { isChecked: !val.isChecked });
      } else {
        if(val.isChecked) {
          countChecked++;
        }
        return Object.assign({}, val);
      }
    });
    this.setState({
      list,
      isAllChecked: countChecked === this.state.list.length,
      isAnyChecked: countChecked > 0
    });
  }

  onRenameStart() {
    this.setState({
      list: this.state.list.map(val=> Object.assign({}, val, { isEdit: val.isChecked }))
    });
  }

  onRenameSave(name, id) {
    this.setState({
      list: this.state.list.map(val=> {
        if(val.id === id) {
          return Object.assign({}, val, { isEdit: false, name });
        } else {
          return Object.assign({}, val);
        }
      })
    });
  }

  onRenameCancel(id) {
    this.setState({
      list: this.state.list.map(val=> {
        if(val.id === id) {
          return Object.assign({}, val, { isEdit: false });
        } else {
          return Object.assign({}, val);
        }
      })
    });
  }

  onDeleteStart() {
    this.setState({
      isDeleteWindow: true
    });
  }

  onDeleteCancel() {
    this.setState({
      isDeleteWindow: false
    });
  }

  onDeleteAccept() {
    let list = this.state.list.filter(val=> {
      if(val.isChecked) {
        return false;
      } else {
        return true;
      }
    });
    this.setState({
      list,
      isDeleteWindow: false,
      isAllChecked: false,
      isAnyChecked: false
    });
  }

  onCreateStart() {
    this.setState({
      isNewElement: true
    });
  }

  onCreateSave(name) {
    var list = [{
      id: Math.random().toString(36).substring(7),
      isChecked: true,
      isEdit: false,
      name
    }];
    for(let i= 0; i < this.state.list.length; i++) {
      list.push(this.state.list[i]);
    }
    this.setState({
      list,
      isNewElement: false
    });
  }

  onCreateCancel() {
    this.setState({
      isNewElement: false
    });
  }

  render() {
    var newElement = null;
    if(this.state.isNewElement) {
      newElement = <Element
        key={0}
        onSave={this.onCreateSave}
        onSaveLabel={'Save'}
        onCancel={this.onCreateCancel}
        isChecked={true}
        isEdit={true}
      />
    }
    return (
      <div className='container'>
        <table className='table table-striped table-hover'>
          <thead>
            <ActionBar
              isChecked={this.state.isAllChecked}
              onClick={this.onAllClick}
              disableRename={!this.state.isAnyChecked || this.state.isNewElement}
              onRename={this.onRenameStart}
              disableDelete={!this.state.isAnyChecked || this.state.isNewElement}
              onDelete={this.onDeleteStart}
              disableCreate={this.state.isNewElement}
              onCreate={this.onCreateStart}
            />
          </thead>
          <tbody>

            {newElement}

            {this.state.list.map(element =>
              <Element
                key={element.id}
                id={element.id}
                name={element.name}
                onClick={this.onClick}
                onSave={this.onRenameSave}
                onCancel={this.onRenameCancel}
                isChecked={element.isChecked}
                isEdit={element.isEdit}
              />
            )}
          </tbody>
        </table>
        <DeleteModal
          show={this.state.isDeleteWindow}
          onDeleteAccept={this.onDeleteAccept}
          onDeleteCancel={this.onDeleteCancel}
        />
      </div>
    );
  }
}

export default List;
