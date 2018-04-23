import React, { Component } from 'react'
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools'
import { Icon, Progress, Layout, Slider } from 'antd';
const { Header, Content, Footer } = Layout;
import { store } from './store'
import MyComponent from './components/MyComponent';



@observer export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Title'
    }
  }

  _click = (word) => {
    word = 'Fuck';
    console.log(word)
  }

  render() {
    return <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}>
      {this.state.name}
      <MyComponent click={this._click} />
    </div>
  }
}


