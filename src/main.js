import React from 'react';
import { render } from 'react-dom';
import App from './App'
import './styles/style.css';
import './styles/antd.css';
import './styles/font/iconfont.css';

let rootElement = document.getElementById('root');
if (!rootElement) rootElement = document.createElement('div');

render(<App />, rootElement);
