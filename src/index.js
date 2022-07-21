import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'normalize.css';
import App from './App.js';

const container = document.getElementById("root");

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
, container);
