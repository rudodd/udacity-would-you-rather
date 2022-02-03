import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './dist/css/app.css';
import App from './components/app';
import * as Redux from 'redux';
import * as ReduxThunk from 'redux-thunk';
import * as Data from './_DATA.js';

const reducer = (state = [], actions)=> {
  return state;
}

const middleware = (store)=> (next)=> (action)=> {
  return true;
}

const store = Redux.createStore(Redux.combineReducers({
  reducer,
}), Redux.applyMiddleware(ReduxThunk.default, middleware));

console.log(Data);

ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
