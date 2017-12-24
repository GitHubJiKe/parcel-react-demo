import React, { Component } from 'react'
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools'
import { Icon, Progress, Layout, Slider } from 'antd';
const { Header, Content, Footer } = Layout;
import ToDo from './components/ToDo'
import { store } from './store'
const HEADER_STYLE = { textAlign: 'center', color: 'white', fontSize: 30 };
const FOOTER_STYLE = { textAlign: 'center', color: 'black', fontSize: 10 };
const ICON_FONT_STYLE = { fontSize: 30, listStyle: 'none', display: 'inline-block', padding: 20 };
const FONT_SIZE_STYLE = { fontSize: 30, padding: 20 };
const TEXT = 'please input something...';
const ToDoList = ({ todos }) => todos.map(t => <ToDo key={t.id} {...t} />);




@observer export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      progress: 0,
      isPlaying: true,
      hasSound: true,
      volume: 50,
      showSound: false
    }
  }

  componentDidMount() {
    setInterval(() => this.caculateProgress(), 1000);
  }

  caculateProgress = () => {
    let progress = parseFloat(parseFloat(this.musicDom.currentTime / 2062 * 100).toFixed(1));
    this.setState({ progress })
  }

  paly = () => {
    this.musicDom.play();
    this.setState({ isPlaying: true })
  }

  pause = () => {
    this.musicDom.pause();
    this.setState({ isPlaying: false })
  }

  noSound = () => {
    this.musicDom.volume = 0;
    this.setState({ hasSound: false, volume: 0 });
  }

  sound = () => {
    this.musicDom.volume = 1;
    this.setState({ hasSound: true, volume: 100 });
  }

  showSound = () => this.setState({ showSound: true });

  render() {
    const { title, progress, isPlaying, hasSound, volume, showSound } = this.state;
    const { todos, totalCount, completedCount } = store;
    const playButton = isPlaying ? <Icon
      type="pause-circle"
      style={FONT_SIZE_STYLE}
      onClick={this.pause} /> : <Icon type="play-circle"
        style={FONT_SIZE_STYLE}
        onClick={this.paly} />
    const soundButton = hasSound ? <li
      className="iconfont icon-ttpodicon"
      style={ICON_FONT_STYLE}
      onClick={this.noSound}>
    </li> : <li
      className="iconfont icon-icon2"
      style={ICON_FONT_STYLE}
      onClick={this.sound}>
      </li>

    return (<div className="APP">
      <Header style={HEADER_STYLE}>
        Rainy Mood
      </Header>
      <Content>
        <audio
          loop
          autoPlay
          ref={audio => this.musicDom = audio}
          src="http://107.182.230.196/audio1110/0.m4a"
        >
        </audio>
        <Progress percent={progress} style={{ padding: 20 }} />
        <Icon type="backward"
          style={FONT_SIZE_STYLE}
          onClick={() => {
            this.musicDom.currentTime -= 10;
          }}
        />
        {playButton}
        <Icon type="forward"
          style={FONT_SIZE_STYLE}
          onClick={() => {
            this.musicDom.currentTime += 10;
          }}
        />
        {soundButton}
        <div style={{ display: 'inline-block' }}>
          <Slider
            style={{ width: 100 }}
            value={volume}
            step={1}
            max={100}
            onChange={v => {
              this.musicDom.volume = v / 100;
              this.setState({ volume: v })
            }}
          />
        </div>
      </Content>
      <div className="pic" />
      <Footer style={FOOTER_STYLE}>by Peter Yuan</Footer>
    </div>);
  }
}