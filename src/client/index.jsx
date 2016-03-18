import React from 'react'
import ReactDOM from 'react-dom';
import style from './sass/style.scss';
import App from './App.jsx';

const initialState = window.__INITIAL_STATE__;

ReactDOM.render(<App initialState={initialState} />, document.getElementById('root'));
