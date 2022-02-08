import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import * as ReduxThunk from 'redux-thunk';

// Import reducers
import loading from './reducers/loading';
import session from './reducers/session';
import users from './reducers/users';
import questions from './reducers/questions';

// Import components
import App from './components/App';

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
  session,
  users,
  questions,
}), Redux.applyMiddleware(ReduxThunk.default, logger));

const ConnectedApp = connect((state) => ({
  loading: state.loading,
  session: state.session,
  users: state.users,
  questions: state.questions,
}))(App)

ReactDOM.render(

  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
