import React, { Component } from 'react'
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools'
import ToDo from './components/ToDo'
import { store } from './store'


const TEXT = 'please input something...';
const ToDoList = ({ todos }) => todos.map(t => <ToDo key={t.id} {...t} />);

@observer export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  render() {
    const { title } = this.state;
    const { todos, totalCount, completedCount } = store;
    return (<div className="APP">
      <input
        style={{ width: 300 }}
        placeholder={TEXT}
        value={title}
        onChange={e => this.setState({ title: e.currentTarget.value })}
      />
      <button onClick={() => {
        store.addToDo(title);
        this.setState({ title: '' });
      }}>Add one ToDo</button>
      <div>{`total count:${totalCount}`}</div>
      <div>{`total completed count:${completedCount}`}</div>
      <ToDoList todos={todos} />
      <DevTools />
    </div>);
  }
}