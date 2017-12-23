# parcel-react-demo 
[项目地址](https://github.com/GitHubJiKe/parcel-react-demo)

![效果图](https://user-gold-cdn.xitu.io/2017/12/22/1607e2c7fc25def7?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

## parcel
[官网](https://parceljs.org/)

```
Parcel 是一个网络应用打包工具, 
适用于经验不同的开发者.
它利用多核处理提供了极快的速度, 
并且不需要任何配置.
```

## React
[官网](https://reactjs.org/)

```
A JavaScript library
一个用于构建用户图片界面的
for building user interfaces
javascript 库
```

## parcel & React

> 根据本工程根目录下的package.json的描述文件install相关依赖

### 事前准备

Yarn:

``` 
yarn global add parcel-bundler
```
npm:

```
npm install -g parcel-bundler
```

全局安装后就可以使用parcel了。

## 使用后感
- 很快（缓存机制）
- 简单上手（配置项很少）
- 有待采坑

******

#Mobx 初探
## 什么是Mobx
> [官网](http://cn.mobx.js.org/)
> [github-mobx](https://github.com/mobxjs/mobx)

```
MobX 是一个经过战火洗礼的库，
它通过透明的函数响应式编程
(transparently applying functional reactive programming - TFRP)
使得状态管理变得简单和可扩展。
```
![pic](http://cn.mobx.js.org/flow.png)

更多详细介绍，请移步官网细阅。

## 为什么使用Mobx
> React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。 ——官方文档

可能我们都比较熟悉Redux,简而言之Mobx是比Redux更有力的和React结合使用的助手。

## 如何使用
>下面我们就用一个例子简单的使用Mobx——ToDOList.
>Talking is cheap, show me your code!
>[代码地址](https://github.com/GitHubJiKe/parcel-react-demo) 由于没有和parcel使用初探的代码分离，所以，希望你也能看的明白

### 编辑器
VSCode 
#### 编辑器配置
> 为了使用Es.next的装饰器语言@，需要配置VsCode，具体——[如何(不)使用装饰器](http://cn.mobx.js.org/best/decorators.html)

![vscode setup](https://thumbnail0.baidupcs.com/thumbnail/537c4003af1581363547bb5c15dfed80?fid=3929020572-250528-342868260175806&time=1514019600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-QZ1xavc6uNw6wJCQOySTm%2BHz4KY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8273303735290392813&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)

### 依赖

```
//package.json file setup:
  "dependencies": {
    "mobx": "^3.4.1",
    "mobx-react": "^4.3.5",
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
    }
```
```
//package.json file setup:
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "mobx-react-devtools": "^4.2.15",
    }
```
### 配置

```
//.babelrc file setup:
{
  "presets": [
    "env",
    "react",
    "es2015",
    "stage-1"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```
### 代码

#### store 创建
```
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
```
#### ToDo组件
```
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
    return (<div
      className={`todo ${completed ? 'completed' : ''}`}
      onClick={() => store.toggleCompleted(id)}
    >
      {title}
    </div>);
  }
}
//style.css
.todo{
  background-color: white;
  text-align: center;
  font-size: 30px;
  margin: 3px;
}

.todo.completed{
  background-color: brown;
}
```
#### App.js
```
import React, { Component } from 'react'
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools'
import ToDo from './components/ToDo'
import { store } from './store'


const TEXT = 'please input something...';
const ToDoList = ({ todos }) => todos.map(t => <ToDo key={t.id} todo={t} store={store} />);

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
```
### 效果图
![show](https://thumbnail0.baidupcs.com/thumbnail/3b3f68cea2e0a84dbdbee84b9066b8d1?fid=3929020572-250528-464394264288365&time=1514019600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-7n8nPdwolvskHqOz2ktGLOayTZo%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8273592634680096080&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)

