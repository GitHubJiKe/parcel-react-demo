import React, { Component } from 'react'
import HelloWorld from './components/HelloWorld'
import { HelloAnyThing, ImageView } from './components/HelloAnyThing'


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="APP">
      <HelloWorld />
      <HelloAnyThing>Hello Parcel & React</HelloAnyThing>
      <div className="image"></div>
      <ImageView />
    </div>);
  }
}