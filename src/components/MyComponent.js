import React, { Component } from 'react';
import { click } from '../common-func'
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'MyComponent' };
  }

  __click = () => {
    alert('click')
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.state.name}
      </div>
    );
  }
}

export default MyComponent;