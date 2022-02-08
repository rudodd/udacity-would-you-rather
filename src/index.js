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

// Import middleware
import logger from './middleware/logger';
import validate from './middleware/validate';

const store = Redux.createStore(Redux.combineReducers({
  loading,
  session,
  users,
  questions,
}), Redux.applyMiddleware(ReduxThunk.default, logger, validate));

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
