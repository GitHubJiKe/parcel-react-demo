import React, { Component } from 'react';
import { observer } from "mobx-react";
import { store } from '../../store'
import './style.css'
@observer export default class ToDo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { todo } = this.props;
    const { title, id, completed } = todo;
    console.log(title, id, completed);
    return (<div
      className={`todo ${completed ? 'completed' : ''}`}
      onClick={() => store.completed(id)}
    >
      {title}
    </div>);
  }
}