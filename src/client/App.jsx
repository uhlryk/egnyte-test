import React from 'react';
import ListFile from './components/List.jsx';

class App extends React.Component {
  static propsTypes = {
    initialState: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ListFile file={this.props.initialState.file || []} />
    );
  }
}
export default App;

