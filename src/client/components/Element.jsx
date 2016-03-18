import React from 'react';

class Element extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    isEdit: React.PropTypes.bool,
    isChecked: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      inputName: ''
    }
  }
  onClick() {
    if(this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }

  onSave(env) {
    env.preventDefault();
    this.props.onSave(this.state.inputName, this.props.id);
  }

  onCancel(env) {
    env.preventDefault();
    this.setState({
      inputName: this.props.name
    }, ()=> {
      this.props.onCancel(this.props.id);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isEdit) {
      this.setState({
        inputName: nextProps.name
      });
    }
  }

  onChange(evt) {
    this.setState({
      inputName: evt.target.value
    });
  }

  render() {
    var element = null;
    if(this.props.isEdit) {
      element = (
          <div>
            <input
              className='element__forminput'
              type='text'
              value={this.state.inputName}
              onChange={this.onChange}
            />
            <a className='element__formbutton btn-primary' href='#' role='button' onClick={this.onSave} >{this.props.onSaveLabel || 'Save'}</a>
            <a className='element__formbutton btn-default' href='#' role='button' onClick={this.onCancel}>Cancel</a>
          </div>
      );
    } else {
      element = <div className='element__label' onClick={this.onClick} >{this.props.name}</div>;
    }
    return (
      <tr className='element'>
        <td>
          <input
            className='element__checkbox'
            onChange={this.onClick}
            type='checkbox'
            checked={this.props.isChecked}
          />
        </td>
        <td>
          {element}
        </td>
      </tr>
    );
  }
}

export default Element;
