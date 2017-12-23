import { observable, autorun, computed, action } from 'mobx';


class toDo {
  id = Math.random();
  @observable title = '';
  @observable completed = false;
}

class todoStore {
  @observable todos = [];

  @computed get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

  @computed get totalCount() {
    return this.todos.length;
  }

  @action.bound toggleCompleted(id) {
    this.todos.forEach(todo => {
      if (todo.id === id) todo.completed = !todo.completed;
    })
  }

  @action.bound addToDo(title) {
    if (!title) return alert('please input something...');
    let todo = new toDo();
    todo.title = title;
    this.todos.push(todo);
  }
};

const store = new todoStore();

export { store }