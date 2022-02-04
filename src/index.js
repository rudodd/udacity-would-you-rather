import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import * as ReduxThunk from 'redux-thunk';
// import * as Data from './_DATA.js';

// Import actions
import initialDataHandler from './actions/data';

// Import reducers
import loading from './reducers/loading';

// Import components
import App from './components/app';

// Middleware
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

const store = Redux.createStore(Redux.combineReducers({
  loading,
}), Redux.applyMiddleware(ReduxThunk.default, logger));
store.dispatch(initialDataHandler());

const ConnectedApp = connect((state) => ({
  loading: state.loading
}))(App)

ReactDOM.render(

  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
